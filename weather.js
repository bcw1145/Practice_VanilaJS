const weather= document.querySelector(".js-weather");

const API_KEY="38f44a7f5a553af6fa3bb6d11771a016";
const COORDS = "coords";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(resposnse){
        return resposnse.json()
    }).then(function(json){
        const temparature= json.main.temp;
        const place = json.name;
        weather.innerText=`${temparature} @ ${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude= position.coords.latitude;
    const longitude= position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);

}

function handleGeoError(){
    console.log("can't access geo location");
}


function askForCoords(){
    console.log("in");
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords= localStorage.getItem(COORDS);
    console.log(loadedCoords);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parseCoords=JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();