import Select from "react-select"
import React, { useEffect } from "react";
import { useState } from "react";
import data from "./data.json"
import "./InputBox.css"
function InputBox( {selectedOption, setSelectedOption, handleOnSubtmit} ) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const options = data;
        setOptions(
          options.map(({ recipe_name }) => ({
            label: recipe_name,
            value: recipe_name
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getOptions();
  }, []);

  return (
    <>
      {console.log(selectedOption)}
      <Select
        className="text-xl"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        required
        isClearable={true}
        id="jurisdiction-code"
      />
      <button onClick={handleOnSubtmit}>Ashwin</button>

    </>
  )
}

export default InputBox;