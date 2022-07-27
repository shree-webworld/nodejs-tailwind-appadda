
const getInfo = async(event) =>
{
  event.preventDefault();
  let city_val = $("#cityname").val();

  let d = new Date();
  let currtime = d.toLocaleTimeString();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currday = days[d.getUTCDay()];
  let currdate = d.getUTCDate();
  let months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
  let currmonth = months[d.getUTCMonth()];

  const rain_audio = '<audio autoplay><source src="images/rain-thunder.wav" type="audio/wav"></audio>';
  const rain_icon = '<i class="bi bi-cloud-rain-fill text-primary"></i>';
  console.log(currday);
  // $(".day").text(currday);
  $(".dates").text(currtime+`, `+currday+' '+currdate+` `+currmonth);

  if (city_val === "")
  {
        $("#temp").addClass("data_hide");
       alert(`Plz enter the city`);
       $("#city_name").text(`Get Output Here`);
      // $("#city_name").text("Plz enter the city");
  } else
  {
    try
    {

      const url =`https://api.openweathermap.org/data/2.5/weather?q=${ city_val }&units=metric&appid=98df8785cb9aa191e35e66cab570c000`
      const response = await fetch(url);
      const data = await response.json(); //converts to object.
      // console.log(response);
      const arr_data = [data];  //converts to array.

      $("#city_name").text(`${arr_data[0].name}, ${arr_data[0].sys.country}`);
      $(".deg_cel").text(arr_data[0].main.temp);
      $("#temp_status").text(arr_data[0].weather[0].main);
      $(".description").text(arr_data[0].weather[0].description);

      const temp_icon = arr_data[0].weather[0].main;
        if (temp_icon === "Clouds")
        {
          $("#temp_status").html('<i class="bi bi-cloud-fill text-blue-500 text-7xl"></i>');
        }
        else if( temp_icon === "Rain")
        {
              $("#temp_status").html(`<i class="bi bi-cloud-rain-fill text-blue-500 text-7xl"></i>`);

        }
        else if (temp_icon === "Clear")
        {
            $("#temp_status").html('<i class="bi bi-sun-fill text-yellow-500 text-7xl"></i>');
        }
        else
        {
          $("#temp_status").html('<i class="bi bi-cloud-haze2-fill text-blue-500 text-7xl"></i>');
        }

        $("#temp").removeClass("data_hide");
    }
    catch (e)
    {
      alert(`Plz Enter The City Name Properly`);
      $("#temp").addClass("data_hide");
      $("#city_name").text(`Get Output Here`);
    }

  }
}

window.onload = function()
{
  document.getElementById("cityname").focus();
};

document.querySelector('#submitButton').
addEventListener('keydown', function (e)
                            {
                              if (e.key === 'Enter')
                              {
                                    document.getElementById("submitButton").focus();
                                    click(getInfo);
                              }
                            }
                );

$("#submitButton").click(getInfo);






//.middle_layer p   -> #temp
