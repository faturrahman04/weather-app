const date = document.querySelector('.date');
const day = document.querySelector('.day');
const time = document.querySelector('.time');

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

day.textContent = `${weekday[new Date().getDay()]}`

date.textContent = `${new Date().getDate()} ${month[new Date().getMonth()]} ${new Date().getFullYear()}`;


setInterval(() => {
  time.textContent = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}, 1000);

fetch('https://api.openweathermap.org/data/2.5/weather?appid=8a13c4c2b37255f02fa20d826791ffd9&units=metric&lang=id&q=Bukittinggi')
  .then(response => response.json())
  .then(response => {

    let responseData = {
      cuaca : response.weather[0].main,
      icon  : response.weather[0].icon,
      suhu  : Math.floor(response.main.temp),
      location  : response.name,
      humidity  : response.main.humidity,
      visibility: response.visibility,
      sunrise   : response.sys.sunrise,
      sunset    : response.sys.sunset,
      wind  : response.wind.speed,
      cloud : response.clouds.all
    }

    const ketLokasi = document.querySelector('.location');
    ketLokasi.innerHTML = ` <img width="15" src="./img/location.svg" alt=""> ${responseData.location}`;
    const imageCuaca = document.querySelector('.image-cuaca');
    imageCuaca.src = `https://openweathermap.org/img/wn/${responseData.icon}@2x.png`
    const ketSuhu = document.querySelector('.suhu');
    ketSuhu.textContent += `${responseData.suhu}℃`;
    const ketCuaca = document.querySelector('.cuaca');
    ketCuaca.textContent = responseData.cuaca;

    document.querySelector('.humidity').textContent = `${responseData.humidity}%`;

    document.querySelector('.visibility').textContent = `${responseData.visibility/1000} km`;

    document.querySelector('.sunrise').textContent =`${new Date(responseData.sunrise * 1000).getHours()}.${new Date(responseData.sunrise * 1000).getMinutes()} AM`;

    document.querySelector('.sunset').textContent =`${new Date(responseData.sunset * 1000).getHours()}.${new Date(responseData.sunset * 1000).getMinutes()} PM`;

    document.querySelector('.wind').textContent = `${responseData.wind} m/s`;

    document.querySelector('.cloud').textContent = `${responseData.cloud}%`;
});

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Bukittinggi&appid=8a13c4c2b37255f02fa20d826791ffd9&units=metric')
  .then(response => response.json())
  .then(response => {
    let list = response.list;
    let prediction = document.querySelector('.container .details .prediction');
    list.forEach(e => {
      let waktu = e.dt;
      let formatWaktu = `${new Date(waktu * 1000).getHours()}:${new Date(waktu * 1000).getMinutes()}0`;

      let iconPredict = e.weather[0].icon;

      let tempPredict = Math.floor(e.main.temp);
      
      prediction.innerHTML += `<div class="card">
                <h4>${formatWaktu}</h6>
                  <img width="150" src="https://openweathermap.org/img/wn/${iconPredict}@2x.png" alt="">
                  <h4>${tempPredict}℃</h4>
                </div>`
  });
});

