import Select from "react-select"
import React, { useEffect } from "react";
import { useState } from "react";


function InputBox(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await fetch("./data/data.json");
        const options = await response.json();
        console.log(options);
        console.log("Ashwin")
        setOptions(
          options.map(({ recipe_name }) => ({
            label: recipe_name,
            value: recipe_name
          }))
        );
      } catch (error) {
        // ignore
      }
    };
    getOptions();
  }, []);

  return (
    <>
      <Select
        className="text-xl"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        required
        isClearable={true}
        id="jurisdiction-code"
      />

      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em"
        }}
      >
      </div>
    </>
  )
}

export default InputBox;