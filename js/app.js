window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureMin = document.querySelector(".temperature-min");
    let temperatureMax = document.querySelector(".temperature-max");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    const forlocal = "https://cors-anywhere.herokuapp.com/";
    const key = '430487fde5ca8f75eecdc328f72d8a3f';

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      
    function success(pos) {
        let crd = pos.coords;
        long = crd.longitude;
        lat = crd.latitude;
        const api = `${forlocal}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

        fetch(api)
            .then(response => {
            return response.json();
        })

        .then(data => {
            console.log(data);
        /* Set DOM elements with data */
            temperatureDegree.textContent = data.main.temp; 
            locationTimeZone.style.color = "white";
            locationTimeZone.value = data.name;
            temperatureDescription.textContent = data.weather[0].description;
            temperatureMax.textContent = data.main.temp_max;
            temperatureMin.textContent = data.main.temp_min;
            humidity.textContent = data.main.humidity;
            wind.textContent = data.wind.speed;

            const iconId = data.weather[0].icon;    
            setIcons(iconId);

            cerca();
        });
    }

    function setIcons(iconId, currentIcon){
        currentIcon = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        iconImg = document.querySelector(".icon");
        iconImg.style.display = "block";
        iconImg.classList.add('animated', 'fadeIn', 'faster');
        iconImg.src = currentIcon;
    }

    function error() {
        alert("Ok! Scrivi una città");
        locationTimeZone.style.color = "white";
        cerca();
    }

    function cerca() {
    document.getElementById('btn').onclick = function(){
        let city = locationTimeZone.value;  
        const api = `${forlocal}api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        console.log(api);

        fetch(api)
            .then(response => {
            return response.json();
        })

        .then(data => {
            temperatureDegree.textContent = data.main.temp; 
            temperatureDegree.textContent = data.main.temp; 
            locationTimeZone.value = data.name;
            temperatureDescription.textContent = data.weather[0].description;
            temperatureMax.textContent = data.main.temp_max;
            temperatureMin.textContent = data.main.temp_min;
            humidity.textContent = data.main.humidity;
            wind.textContent = data.wind.speed;

            const iconId = data.weather[0].icon;    
            setIcons(iconId);
         })
        };
    }

    navigator.geolocation.getCurrentPosition(success, error, options);  
});