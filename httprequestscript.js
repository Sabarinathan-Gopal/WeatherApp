let timeFiveHrs;
/**
 *This function gets the response from the link and stores the values in a JSON format
 *Stores a default value when the page loads
 */
const getTimeHrs=async(timeLine)=>
{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "city_Date_Time_Name": timeLine,
    "hours": 6
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch("https://soliton.glitch.me/hourly-forecast", requestOptions)
    .then(response => response.json())
    .then((result) => {
      timeFiveHrs=result;
      console.log(timeFiveHrs);
      return result;
    })
    .catch(error => console.log('error', error));
}


/**
 *To get the timelog of the selected city respectively
 *To get the temperature for the next five hours through Post
 * @param {string} cityValue
 */
const timeLog = async (cityValue) =>
{
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://soliton.glitch.me?city="+cityValue, requestOptions)
      .then((response) => response.json())
      .then(async(result) => {
        timeLine=result.city_Date_Time_Name;
        await getTimeHrs(timeLine);
        console.log(timeLine);
      })
      .catch((error) => console.log("error", error));
}