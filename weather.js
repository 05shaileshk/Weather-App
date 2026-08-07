document.addEventListener('DOMContentLoaded', () => {

  const cityInput = document.getElementById('city-input');
  const searchBtn = document.getElementById('search-btn');
  const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

  const weatherCard = document.querySelector('.weather-card');
  const statsGrid = document.querySelector('.stats-grid');

  window.getWeather = async (city) => {
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      
      if (!response.ok) {
        alert("City not found!");
        return;
      }

      const data = await response.json();

      // 1. Hide state se Show state me convert karein
      weatherCard.classList.add('active');
      statsGrid.classList.add('active');

      // 2. Data render karein
      document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById('weather-condition').textContent = data.weather[0].main;
      document.getElementById('wind-speed').textContent = `${data.wind.speed} km/h`;
      document.getElementById('humidity').textContent = `${data.main.humidity}%`;
      document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
      document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

      // Weather Image Switcher
      const weatherMain = data.weather[0].main.toLowerCase();
      const weatherImg = document.getElementById('weather-img');
      if (weatherImg) {
        if (weatherMain.includes('cloud')) weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
        else if (weatherMain.includes('rain')) weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png';
        else if (weatherMain.includes('clear')) weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
        else if (weatherMain.includes('snow')) weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/642/642000.png';
        else weatherImg.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
      }

      // 3. GSAP Animation on Reveal
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(".weather-card", 
          { opacity: 0, y: 30, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        gsap.fromTo(".stat-card", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.1 }
        );
      }

    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Event Listeners
  if (searchBtn && cityInput) {
    searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
        getWeather(city);
        cityInput.value = '';
      }
    });

    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
          getWeather(city);
          cityInput.value = '';
        }
      }
    });
  }

});