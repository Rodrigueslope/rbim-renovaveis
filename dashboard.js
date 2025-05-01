
document.addEventListener('DOMContentLoaded', function () {
    const updateDataBtn = document.getElementById('update-data');
    const locationSelect = document.getElementById('location');
    const lastUpdateTime = document.getElementById('last-update-time');

    const currentTemp = document.getElementById('current-temp');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const weatherDesc = document.getElementById('weather-desc');
    const windSpeed = document.getElementById('wind-speed');
    const windDirection = document.getElementById('wind-direction');
    const radiationValue = document.getElementById('radiation-value');
    const uvValue = document.getElementById('uv-value');
    const uvCategory = document.getElementById('uv-category');

    const API_KEY = 'd9da98b3560b007a19706897feaa7416';

    const cityCoordinates = {
        'fortaleza': { lat: -3.71722, lon: -38.5433 },
        'saopaulo': { lat: -23.5505, lon: -46.6333 },
        'riodejaneiro': { lat: -22.9068, lon: -43.1729 },
        'brasilia': { lat: -15.8267, lon: -47.9218 },
        'salvador': { lat: -12.9777, lon: -38.5016 }
    };

    async function fetchWeatherData(cityKey) {
        const coords = cityCoordinates[cityKey];
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

        try {
            const [weatherRes, uvRes] = await Promise.all([
                fetch(weatherURL),
                fetch(uvURL)
            ]);

            const weatherData = await weatherRes.json();
            const uvData = await uvRes.json();

            currentTemp.textContent = weatherData.main.temp.toFixed(1);
            feelsLike.textContent = weatherData.main.feels_like.toFixed(1);
            humidity.textContent = weatherData.main.humidity;
            pressure.textContent = weatherData.main.pressure;
            weatherDesc.textContent = weatherData.weather[0].description;
            windSpeed.textContent = weatherData.wind.speed.toFixed(1);
            windDirection.textContent = weatherData.wind.deg;

            // Radiação solar simulada (API não fornece direto na free tier)
            const hora = new Date().getHours();
            const simulRad = hora < 6 || hora > 18 ? 0 : Math.round(950 * Math.sin(Math.PI * (hora - 6) / 12));
            radiationValue.textContent = simulRad;

            // UV index
            uvValue.textContent = uvData.value.toFixed(1);
            const uv = uvData.value;
            let category = 'Indefinido', color = '#ccc';
            if (uv <= 2) {
                category = 'Baixo'; color = '#4caf50';
            } else if (uv <= 5) {
                category = 'Moderado'; color = '#ff9800';
            } else if (uv <= 7) {
                category = 'Alto'; color = '#f44336';
            } else if (uv <= 10) {
                category = 'Muito Alto'; color = '#9c27b0';
            } else {
                category = 'Extremo'; color = '#000';
            }
            uvCategory.textContent = category;
            uvCategory.style.backgroundColor = color;

            const now = new Date();
            lastUpdateTime.textContent = now.toLocaleTimeString("pt-BR");

        } catch (err) {
            console.error("Erro ao buscar dados da API OpenWeather:", err);
        }
    }

    if (updateDataBtn) {
        updateDataBtn.addEventListener('click', () => {
            const selectedCity = locationSelect.value;
            fetchWeatherData(selectedCity);
        });
    }

    fetchWeatherData('fortaleza'); // inicial
});

        
   
