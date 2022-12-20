var searchbutton = document.querySelector("#searchcitybutton");
var mainbody = document.querySelector("main");
var citysearched = document.querySelector("#city");

searchbutton.addEventListener("click", startsearch);

function startsearch() {
    var citysearch = citysearched.value;
    mainbody.innerHTML = "";

    var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + citysearch + "&appid=f8f05728e5d0859e6c94cf670535026a"
    var lat;
    var lon;
    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=f8f05728e5d0859e6c94cf670535026a&units=imperial"

            var cityname;
            var humidity;
            var temp;
            var date;
            var weather;


            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (let i = 0; i < 40; i = i + 8) {
                        cityname = data.city.name;
                        humidity = data.list[i].main.humidity;
                        temp = data.list[i].main.temp;
                        date = data.list[i].dt_txt.slice(0, 10);
                        weather = data.list[i].weather[0].main
                        let citystats = document.createElement("p");
                        citystats.textContent = cityname + " on " + date + " will have a temperature of: " + temp + " degree" + " A Weather of: " + weather + " and a humidity of: " + humidity + "%";
                        mainbody.appendChild(citystats);
                    }
                    let newbutton = document.createElement("button");
                    mainbody.appendChild(newbutton);
                    newbutton.setAttribute("class", "btn btn-primary")
                    newbutton.textContent = "Return";
                    newbutton.addEventListener("click", function(){
                        location.reload();
                    });
                })
        })


}


