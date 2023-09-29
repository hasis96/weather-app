(()=>{const t=document.getElementById("userLocation"),e=document.getElementById("headerLocation"),o=document.getElementById("searchButton"),a=document.getElementById("convertButton"),c=document.getElementById("form"),n=document.getElementsByClassName("today"),r=document.getElementsByClassName("tomorrow"),s=document.getElementsByClassName("nextDay");let i;async function l(t,e){switch(e){case 0:i=n,i.currentTemp.textContent=`${Math.floor(t.current.temp_f)}°`,i.feelsLike.textContent=`feels like: ${Math.floor(t.current.feelslike_f)}°`;break;case 1:i=r,i.avgTemp.textContent=`${Math.floor(t.forecast.forecastday[e].day.avgtemp_f)}°`;break;case 2:i=s,i.avgTemp.textContent=`${Math.floor(t.forecast.forecastday[e].day.avgtemp_f)}°`;break;default:console.error("error occured")}i.condition.textContent=`${t.forecast.forecastday[e].day.condition.text.toLowerCase()}`,i.lowTemp.textContent=`L: ${Math.floor(t.forecast.forecastday[e].day.mintemp_f)}° `,i.highTemp.textContent=`H: ${Math.floor(t.forecast.forecastday[e].day.maxtemp_f)}°`,i.humidity.textContent=`humidity: ${t.forecast.forecastday[e].day.avghumidity}%`,i.precip.textContent=`precipitation: ${t.forecast.forecastday[e].day.totalprecip_in} in`,i.wind.textContent=`winds: ${t.forecast.forecastday[e].day.maxwind_mph}mph`}async function d(t,e){switch(e){case 0:i=n,i.currentTemp.textContent=`${Math.floor(t.current.temp_c)}°`,i.feelsLike.textContent=`feels like: ${Math.floor(t.current.feelslike_c)}°`;break;case 1:i=r,i.avgTemp.textContent=`${Math.floor(t.forecast.forecastday[e].day.avgtemp_c)}°`;break;case 2:i=s,i.avgTemp.textContent=`${Math.floor(t.forecast.forecastday[e].day.avgtemp_c)}°`;break;default:console.error("error occured")}i.condition.textContent=`${t.forecast.forecastday[e].day.condition.text}`,i.lowTemp.textContent=`L: ${Math.floor(t.forecast.forecastday[e].day.mintemp_c)}° `,i.highTemp.textContent=`H: ${Math.floor(t.forecast.forecastday[e].day.maxtemp_c)}°`,i.humidity.textContent=`humidity: ${t.forecast.forecastday[e].day.avghumidity}%`,i.precip.textContent=`precipitation: ${t.forecast.forecastday[e].day.totalprecip_mm} mm`,i.wind.textContent=`winds: ${t.forecast.forecastday[e].day.maxwind_kph}kph`}async function f(t){try{const o=`http://api.weatherapi.com/v1/forecast.json?key=dce20a773104456c989234619230409&q= ${t} &days=3`,a=await fetch(o,{mode:"cors"}),c=await a.json(),n=c.location.name;e.textContent=n.toLowerCase(),console.log(c),l(c,0),l(c,1),l(c,2)}catch(t){console.log(`an error occurred: ${t}`)}}o.addEventListener("click",(()=>{localStorage.setItem("location",t.value),f(t.value),c.reset(),console.log(localStorage.getItem("location"))})),a.addEventListener("click",(()=>{const t=localStorage.getItem("location");console.log(t),"farenheit"==a.classList?(f(t),a.classList="celsius"):"celsius"==a.classList&&(async function(t){try{const o=`http://api.weatherapi.com/v1/forecast.json?key=dce20a773104456c989234619230409&q= ${t} &days=3`,a=await fetch(o,{mode:"cors"}),c=await a.json(),n=c.location.name;e.textContent=n.toLowerCase(),console.log(c),d(c,0),d(c,1),d(c,2)}catch(t){console.log(`an error occurred: ${t}`)}}(t),a.classList="farenheit")})),f("los angeles"),localStorage.setItem("location","los angeles")})();