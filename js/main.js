window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSpan = document.querySelector('.temperature-convention');
    let locationTimeZone = document.querySelector(".input-city");
    let temperatureMin = document.querySelector(".temperature-min");
    let temperatureMax = document.querySelector(".temperature-max");
    let humidity = document.querySelector(".umidita");
    let wind = document.querySelector(".speed-wind");
    let pressure = document.querySelector(".pressione");
    const forlocal = "https://cors-anywhere.herokuapp.com/";
    const key = '430487fde5ca8f75eecdc328f72d8a3f';

    function success(pos) {
        let crd = pos.coords;
        long = crd.longitude;
        lat = crd.latitude;
        const api = `${forlocal}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&lang=it`;
        
        fetch(api)
        .then(response => {
        return response.json();
        })

            .then(data => {
            /* Set DOM elements with data */
            console.log(data);
                temperatureDegree.textContent = data.main.temp; 
                locationTimeZone.style.color = "white";
                locationTimeZone.value = data.name;
                temperatureDescription.textContent = data.weather[0].description;
                temperatureMax.textContent = data.main.temp_max;
                temperatureMin.textContent = data.main.temp_min;
                humidity.textContent = data.main.humidity;
                wind.textContent = data.wind.speed;
                pressure.textContent = data.main.pressure;
                let celsius = Math.round(data.main.temp - 273);
                const iconId = data.weather[0].icon; 
                setIcons(iconId);
                changeTemperature(celsius);
                cerca();

            });
            
        }

    /* Set icons */
    function setIcons(iconId, currentIcon){
        currentIcon = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        iconImg = document.querySelector(".img-current-weather");
        iconImg.style.display = "block";
        iconImg.classList.add('animated', 'fadeIn', 'faster');
        iconImg.src = currentIcon;
    }
    
    function error(){
        alert("Ok! Scrivi una città");
        locationTimeZone.style.color = "white";
        cerca();
    };

     /* Search onclick */
     function cerca() {
        document.getElementById('btn').onclick = function(){
            let city = locationTimeZone.value;  
            const api = `${forlocal}api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=it`;
    
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
                pressure.textContent = data.main.pressure;
                let celsius = Math.round(data.main.temp - 273);
                const iconId = data.weather[0].icon;    
                setIcons(iconId);
                changeTemperature(celsius);
             })
             /* error city name */
             .catch(err => alert("Wrong city name!")); 
            }
        }
    
        /* Set temperature convention */
        function changeTemperature(celsius) {
            document.getElementById('degree-section').onclick = function(){    
                if(temperatureSpan.textContent==="Kelvin"){
                    temperatureSpan.textContent = "Celsius";
                    temperatureDegree.textContent = celsius + "°";
                } else {
                        temperatureSpan.textContent = "Kelvin";
                        temperatureDegree.textContent = celsius + 273;
                }
            }
        }

    navigator.geolocation.getCurrentPosition(success, error);  

});