// Déclarations des variables
let countrySubmit = document.querySelector('#countrySubmit');
let townSubmit = document.querySelector('#townSubmit');
let countryInput = document.querySelector('#countryInput');
let townInput = document.querySelector('#townInput');
let country = document.querySelector('#country');
let town = document.querySelector('#town');
let weatherImg = document.createElement('img');
let weatherLogo = document.createElement('img');

/* Définition de quelques style en js 
pour ne pas avoir à faire de fichier.css*/
weatherImg.setAttribute('class', 'col-sm-2 col-sm-offset-5');
weatherImg.style.marginBottom = '2%';
weatherImg.style.marginTop = '1%';
weatherLogo.setAttribute('class', 'col-sm-2 col-sm-offset-5');

// Au premire clic on remplace le champ de formulaire
countrySubmit.addEventListener('click', function (e) {
    e.preventDefault();
    countryInput.setAttribute('style', 'display : none');
    countrySubmit.setAttribute('style', 'display : none');
    townInput.removeAttribute('style');
    townSubmit.removeAttribute('style');
})

/* Au second clic on rééchange les champs de formulaire, 
on récupère leur valeurs, on les vide 
et on appelle la fonction getWeather*/
townSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    townInput.setAttribute('style', 'display : none');
    townSubmit.setAttribute('style', 'display : none');
    countryInput.removeAttribute('style');
    countrySubmit.removeAttribute('style');
    let townValue = document.querySelector('#town').value;
    let countryValue = document.querySelector('#country').value;
    town.value = '';
    country.value = '';
    getWeather(countryValue, townValue);
});

/* Définition de getWeather qui appelle l'api, 
puis appelle les fonctions setIcon et showWeather*/
function getWeather(country, town) {
    let key = '82eec39816078d51bc7412103fbd8a91';
    let xhrRes = new XMLHttpRequest();
    xhrRes.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + town + ',' + country + '&units=metric&lang=fr&appid=' + key);

    xhrRes.onreadystatechange = function () {
        if (xhrRes.readyState === XMLHttpRequest.DONE) {
            if (xhrRes.status <= 200) {
                let weather = JSON.parse(xhrRes.responseText);
                let iconId = weather.weather[0].icon;
                setIcon(iconId);
                showWeather(weather);
            } else {
                alert('Une erreur s’est produite.');
            }
        }
    };

    xhrRes.send();
}

/* Définition de setIcon qui switch sur le code icone de l'api, 
va chercher les images persos en rapport 
et change le background dynamiquement */
function setIcon(iconId) {
    let body = document.querySelector('body');
    let legend = document.querySelector('legend');
    body.style.color = 'white';
    legend.style.color = 'white';

    switch (iconId) {
        case '01d':
            weatherImg.setAttribute('src', 'imgs/soleil.gif');
            weatherLogo.setAttribute('src', 'imgs/soleil.png');
            body.style.background = '#EECB6A';
            break;
        case '02d':
            weatherImg.setAttribute('src', 'imgs/nuage_soleil.gif');
            weatherLogo.setAttribute('src', 'imgs/nuage_soleil.png');
            body.style.background = '#CDAF79';
            break;
        case '03d':
        case '04d':
            weatherImg.setAttribute('src', 'imgs/nuages.gif');
            weatherLogo.setAttribute('src', 'imgs/nuages.png');
            body.style.background = '#809EAC';
            break;
        case '09d':
        case '10d':
            weatherImg.setAttribute('src', 'imgs/pluie.gif');
            weatherLogo.setAttribute('src', 'imgs/pluie.png');
            body.style.background = '#536978';
            break;
        case '11d':
            weatherImg.setAttribute('src', 'imgs/orage.gif');
            weatherLogo.setAttribute('src', 'imgs/orage.png');
            body.style.background = '#5E7C7B';
            break;
        case '13d':
            weatherImg.setAttribute('src', 'imgs/neige.gif');
            weatherLogo.setAttribute('src', 'imgs/neige.png');
            body.style.background = '#B1C0C8';
            break;
        case '50d':
        weatherImg.setAttribute('src', 'imgs/brume.gif');
        weatherLogo.setAttribute('src', 'imgs/brume.png');
        body.style.background = '#DDD8D0';
            break;
        case '01n':
            weatherImg.setAttribute('src', 'imgs/lune.gif');
            weatherLogo.setAttribute('src', 'imgs/nuit.png');
            body.style.background('#003465');
            break;
        case '02n':
        case '03n':
            weatherImg.setAttribute('src', 'imgs/lune_nuages.gif');
            weatherLogo.setAttribute('src', 'imgs/nuit.png');
            body.style.background = '#202D4B';
            break;
        case '09n':
        case '10n':
            weatherImg.setAttribute('src', 'imgs/lune_pluie.gif');
            weatherLogo.setAttribute('src', 'imgs/nuit.png');
            body.style.background = '#0A3541';
            break;
        case '11n':
            weatherImg.setAttribute('src', 'imgs/lune_orage.gif');
            weatherLogo.setAttribute('src', 'imgs/nuit.png');
            body.style.background = '#2C2E07';
            break;
        case '13n':
            weatherImg.setAttribute('src', 'imgs/lune_neige.gif');
            weatherLogo.setAttribute('src', 'imgs/nuit.png');
            body.style.background = '#4D4D4F';
            break;
        case '50n':
            weatherImg.setAttribute('src', 'imgs/lune_brume.png');
            weatherLogo.setAttribute('src', 'imgs/nuit.gif');
            body.style.background = '#434139';
            break;
        default:
            weatherImg.setAttribute('src', 'imgs/logo_meteo.png');
            weatherLogo.setAttribute('src', 'imgs/neutre.png');
            break;
    }
}

/* Définition de showWeather qui vérifie si des conditions 
sont déjà affichées, le cas échéant les effacent, 
et peuple la section weather du html dynamiquement 
avec des éléments créés à la volée et les données de l'api;*/
function showWeather(weather) {
    if (weatherDiv.childNodes.length > 1) {
        weatherDiv.innerHTML = '';
    }
    let town = document.createElement('h2');
    town.innerText = weather.name;

    let temp = document.createElement('h3');
    temp.innerText = parseInt(weather.main.temp, 10) + ' °C';
    
    let cond = document.createElement('h3');
    let condText = weather.weather[0].description;
    cond.innerText = condText.toUpperCase();

    let elements = [town, temp, cond, weatherImg, weatherLogo];
    let weatherDiv = document.querySelector('#weather');
    
    for (let i = 0; i < elements.length; i++) {
        weatherDiv.appendChild(elements[i]);
    }
}