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

const getWeatherApi = async () => {
  try {
    let data = await fetch('https://api.weatherapi.com/v1/current.json?key=ea34db3bb49345e5b11174539251402&q=-0.322941,100.393698&lang=id');
    let response = await data.json();
  
    let responseData = {
      cuaca : response.current.condition.text,
      icon  : response.current.condition.icon,
      suhu  : Math.ceil(response.current.temp_c),
      location  : response.location.name,
      provinsi  : response.location.region,
      humidity  : response.current.humidity,
      visibility: response.current.vis_km,
      uv   : response.current.uv,
      pressure  : response.current.pressure_mb,
      wind  : response.current.wind_kph,
      cloud : response.current.cloud
    }
    const changeResolution = responseData.icon;
    const highRes = changeResolution.replace("64x64", "128x128");
    const ketLokasi = document.querySelector('.location');
    ketLokasi.innerHTML = ` <img width="15" src="./img/location.svg" alt=""> ${responseData.location}, ${responseData.provinsi}`;
    const imageCuaca = document.querySelector('.image-cuaca');
    imageCuaca.src = `${highRes}`
    const ketSuhu = document.querySelector('.suhu');
    ketSuhu.textContent += `${responseData.suhu}℃`;
    const ketCuaca = document.querySelector('.cuaca');
    ketCuaca.textContent = responseData.cuaca;
    document.querySelector('.humidity').textContent = `${responseData.humidity}%`;
    document.querySelector('.visibility').textContent = `${responseData.visibility} km`;
    document.querySelector('.uv').textContent = responseData.uv
    document.querySelector('.pressure').textContent = `${responseData.pressure} mb`
    document.querySelector('.wind').textContent = `${responseData.wind} km/h`;
    document.querySelector('.cloud').textContent = `${responseData.cloud}%`;
  } catch(e) {
    console.log(e + 'Cek endpointnya!')
  }
  
}

const getForecastApi = async () => {
  try {
    let api = await fetch('https://api.weatherapi.com/v1/forecast.json?key=ea34db3bb49345e5b11174539251402&q=-0.322941,100.393698&days=10');
    let response = await api.json();
    let data = response.forecast.forecastday;
      let prediction = document.querySelector('.container .details .prediction');
      data.forEach(e => {
        let waktu = e.date;
        let formatWaktu = `${weekday[new Date(waktu).getDay()]}`;
        let iconPredict = e.day.condition.icon;
        const highRes = iconPredict.replace("64x64", "128x128");
        let tempPredict = e.day.avgtemp_c;
        let weatherPredict = e.day.condition.text;
        prediction.innerHTML += `<div class="card">
                  <h4>${formatWaktu}</h6>
                    <img width="150" src="${highRes}" alt="">
                    <h4 style="font-weight: 300;">${weatherPredict}</h4>
                    <h4 style="font-weight: 300;">${tempPredict}℃</h4>
                  </div>`
    });
  } catch(e) {
    console.log(e + 'Terjadi kesalahan dalam mengambil API')
  }
  
}

getWeatherApi();
getForecastApi();


