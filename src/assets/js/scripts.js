// Variables
var loc = document.querySelector('#location');
var temp = document.querySelector('#temp');
var span = document.querySelector('#span');
var fore = document.querySelector('#forecast');
var icon = document.querySelector('#icon');
var toggle = document.querySelector('#toggle');
var wBtn = document.querySelector('#wBtn');
var dBtn = document.querySelector('#dBtn');

// Event Listeners
wBtn.addEventListener('click', getWeather);
dBtn.addEventListener('click', changeTemp);


// Functions
function getWeather() {
	console.log('before');
	var coords = [];

	function success(pos) {
		var crd = pos.coords;
		var xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + crd.latitude + '&lon=' + crd.longitude, true);

	xhr.onload = function() {
		if (this.status === 200) {
			var response = JSON.parse(this.responseText);
			console.log(response);
			loc.innerHTML = response.name + ', ' + response.sys.country;
			temp.innerHTML = response.main.temp + "&#176;";
			span.innerHTML = "Celcius";
			fore.innerHTML = response.weather[0].main;
			icon.src = response.weather[0].icon;
			icon.style.height = "150px";
		} else {
			console.log('oops');
		}
	};

		xhr.send();
	}

	navigator.geolocation.getCurrentPosition(success);
}

function changeTemp() {
	if (span.innerHTML == "Celcius") {
		span.innerHTML = "Fahrenheit";
		temp.innerHTML = (parseFloat(temp.innerHTML) * parseFloat(9/5) + 32).toFixed(2) + "&#176;";
	} else if (span.innerHTML = "Fahrenheit") {
		span.innerHTML = "Celcius";
		temp.innerHTML = ((parseFloat(temp.innerHTML)-32) * parseFloat(5/9)).toFixed(2) + "&#176;";
	}
}