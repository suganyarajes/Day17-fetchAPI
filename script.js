var result = fetch("https://restcountries.com/v2/all");

result.then((data) => data.json()).then((data1) => {
    console.log(data1);

    var container = document.createElement('div');
    container.className = 'container';

    var row;

    for (var i = 0; i < data1.length; i++) {
        if (i % 4 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            container.appendChild(row);
        }

        var col = document.createElement('div');
        col.className = 'col-md-3'; // Bootstrap column class for 1/3 width
        row.appendChild(col);

        col.innerHTML = `
            <div class="card" style="width: 18rem;">
                <header class="nativeName">${data1[i].name}</header>
                <img src="${data1[i].flag}" class="countryflag" alt="...">
                <p class="region"><b>Region:</b> ${data1[i].region}</p>
                <p class="capital"><b>Capital:</b> ${data1[i].capital}</p>
                <p class="latlng"><b>Latlng:</b> ${data1[i].latlng}</p>
                <p class="countryCode"><b>Countrycode:</b> ${data1[i].alpha3Code}</p>
                <p class="population"><b>population:</b> ${data1[i].population}</p>
                <button type="button" class="btn btn-primary">click for weather</button>
            
            </div>
        `;

        (function(index) {
            col.querySelector('.btn.btn-primary').addEventListener('click', function() {
                var capital = data1[index].capital;
                fetchWeather(capital);
            });
        })(i);
    }

    document.body.appendChild(container);
});

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4222b5838d28c0c1c15f2c674adbce7c`)
        .then((response) => response.json())
        .then((weatherData) => {
            console.log(weatherData);
            alert(`Weather in ${city}:\nTemperature: ${weatherData.main.temp}\nDescription: ${weatherData.weather[0].description}`);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
}
