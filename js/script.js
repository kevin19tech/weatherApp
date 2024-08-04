// Variáveis e seleção de elementos
//API
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")
//Funções
//Acessando a API
const getWeatherData = async(city) => {
    const apiWeatherURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json()

    return data
}

//vai esperar a cidade
const showWeatherData = async(city) =>{
    const data = await getWeatherData(city);
    //Exibir dados
    cityElement.innerText = data.name
    //tirar casas decimais da temperatura
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    //Ícone dinâmico do tempo
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    //NOme do país
    countryElement.innerText = data.sys.country
    //umidade
    humidityElement.innerText =`${data.main.humidity}%`
    //Vento
    windElement.innerText = `${data.wind.speed}km/h`

    //Reexibir o container dos dados
    weatherContainer.classList.remove("hide")
}
//Eventos
//Click no botão de pesquisa
searchBtn.addEventListener("click",(e) =>{
    //Não dar refresh na página
    e.preventDefault()
    //Pegar nome da cidade
    const city = cityInput.value;

    showWeatherData(city)
})

//Pesquisar com enter

cityInput.addEventListener("keyup",(e) =>{
    if(e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city)
    }
})
