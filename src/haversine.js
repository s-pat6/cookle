export default function haversine (city, cur) { // Calculate the distance between 2 cities
    const lon1 = city.long * Math.PI / 180;
      const lon2 = cur.long * Math.PI / 180;
      const lat1 = city.lat * Math.PI / 180;
      const lat2 = cur.lat * Math.PI / 180;

      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a = Math.pow(Math.sin(dlat / 2), 2)
               + Math.cos(lat1) * Math.cos(lat2)
               * Math.pow(Math.sin(dlon / 2),2);
               
      let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in kilometers. Use 3956
        // for miles
      let r = 6371;
   
        // calculate the result
    //   console.log("Dist" + c*r)
      return(c * r);
  }