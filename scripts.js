//localStorage.clear();
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;
let countClick = 10;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;

let priceLvlEnergy = localStorage.getItem("priceLvlEnergy")
	? Number(localStorage.getItem("priceLvlEnergy"))
	: 300;
let LvlEnergy = localStorage.getItem("LvlEnergy")
	? Number(localStorage.getItem("LvlEnergy"))
	: 0;
let countEnergy = localStorage.getItem("countEnergy")
	? Number(localStorage.getItem("countEnergy"))
	: 100;
let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 100;
let countRestart = 0;
let today = new Date().toDateString();
let saveDataGame = localStorage.getItem("countRestartDate");
if (today !== saveDataGame) {
	countRestart = 0;
	localStorage.setItem("countRestart", countRestart);
	localStorage.setItem("countRestartDate", today);
} else {
	countRestart = Number(localStorage.getItem("countRestart"));
}

//ПЕРЕМЕНЫЕ ДЛЯ ОТОБРАЖЕНИЯ НА СТРАНИЦЕ
let scoreHTML = document.getElementById("score");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");

let priceLvlEnergyHTML = document.getElementById("priceLvlEnergy");
let LvlEnergyHTML = document.querySelectorAll(".lvlFullEnergy");
let countEnergyHTML = document.getElementById("countEnergy");

let countRestartHTML = document.querySelectorAll(".lvlRestart");

let scoreInHourHTML = document.getElementById("scoreInHour");

//структура для карточек пфссивного дохода
let = cardsData = {
	1: {
		img: "icons8-доход-48.png",
		title: "бустецкий",
		level: 0,
		bonus: 1000,
		price: 900,
		coef: 3.75,
	},
	2: {
		img: "free-icon-worldwide-9307306.png",
		title: " ос бустецкий",
		level: 0,
		bonus: 500,
		price: 400,
		coef: 2.15,
	},
	3: {
		img: "free-icon-trading-3953807.png",
		title: "дрин бустецкий",
		level: 0,
		bonus: 2000,
		price: 100,
		coef: 1.5,
	},
	4: {
		img: "free-icon-income-1101624.png",
		title: "киб бустецкий",
		level: 0,
		bonus: 1000,
		price: 500,
		coef: 4.35,
	},
	5: {
		img: "free-icon-growth-10622816 (1).png",
		title: "буст",
		level: 0,
		bonus: 3000,
		price: 2950,
		coef: 5,
	},
};

Object.keys(cardsData).forEach(id => {
	let saveData = JSON.parse(localStorage.getItem("card${id}"));
	if (saveData) {
		cardsData[id] = saveData;
	}
});

let cardPassive = document.querySelectorAll(".cardPassive");
cardPassive.forEach(card => {
	let id = card.getAttribute("data-id");
	let data = cardsData[id];
	if (data) {
		card.innerHTML = `
		<div class="imageCard"
		     style="margin-left: 5%;
		       padding-top: 1%;
		       background-image: url('${data.img}');
		       background-size:cover;" >
			<p>ур. <span id=lvl${id} class="lvlPassive">${data.level}</span> <p>
			</div>
			<p class="textCard" style="text-align: center; ">${data.title}</p>`;
	}
});
let dialog = document.getElementById("screenPassive");
cardPassive.forEach(card => {
	let touchStartX = 0;
	let touchEndX = 0;
	card.addEventListener("touchstart", event => {
		touchStartX = event.changedTouches[0].screenX;
	});
	card.addEventListener("touchend", event => {
		touchEndX = event.changedTouches[0].screenX;
		if (Math.abs(touchStartX - touchEndX) < 10) {
			let id = card.getAttribute("data-id");
			let data = cardsData[id];
			if (data) {
				dialog.innerHTML = `
		<form method="dialog">
				<button class="closeButton">X</button>
				<img class="imgDialog" src="${data.img}" />
				<h2>${data.title}</h2>
				<div class="textContainer">
          <p>ур.<span class="lvlPassive">${data.level}</span></p>
					<img src="coffe.png" />
					<p>+<span class="bonusPassive">${data.bonus}</span> в час</p>
				</div>
				<button class="pay payPassiveCard">
				<p>Купить за <span class="pricePassive">${data.price}</span></p>
				</button>
			</form>`;
				if (score < data.price) {
					dialog.querySelector(".payPassiveCard").style.background = "grey";
				}
				dialog.showModal();
				dialog
					.querySelector(".payPassiveCard")
					.addEventListener("touchstart", event => {
						payPassiveCard(id, data);
					});
			}
		}
	});
});

function payPassiveCard(id, data) {
	if (score >= data.price) {
		score -= data.price;
		data.level++;
		scoreInHour += data.bonus;
		data.price = Math.round(data.price * data.coef);
		data.price = Math.round((data.price * data.coef) / 1.5);

		localStorage.getItem(`card${id}`, JSON.stringify(data));
		document.getElementById(`lvl${id}`).innerText = data.level;
		saveData();
		dataScreen();
	}
}
let obj = document.getElementById("objectPanel");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}
let obj2 = document.getElementById("clickFullEnergy");
let obj2Pay = document.getElementById("payLvlEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", function () {
		if (score < priceLvlEnergy) {
			document.getElementById("payLvlEnergy").style.background = "grey";
		}
		document.getElementById("screenlvlEnergy").showModal();
	});
	obj2Pay.addEventListener("touchstart", payLvlEnergy);
}
let obj3 = document.getElementById("clickRestart");
let obj3Pay = document.getElementById("payLvlRestart");
if (obj3) {
	obj3.addEventListener("touchstart", function () {
		document.getElementById("screenRestart").showModal();
	});
	obj3Pay.addEventListener("touchstart", payRestart);
}

function payRestart() {
	if (countRestart < 6) {
		energy = fullEnergy;
		countRestart++;
		saveData();
		dataScreen2();
	}
}

function payLvlEnergy() {
	if (score > priceLvlEnergy) {
		score -= priceLvlEnergy;
		LvlEnergy++;
		fullEnergy += countEnergy;
		priceLvlEnergy = Math.round(priceLvlEnergy * 3.25);
		countEnergy += 50;
		saveData();
		dataScreen2();
	}
}

function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("scoreInHour", scoreInHour);
	localStorage.setItem("energy", energy);
	localStorage.setItem("fullEnergy", fullEnergy);

	localStorage.setItem("lvlEnergy", LvlEnergy);
	localStorage.setItem("priceLvlEnergy", priceLvlEnergy);
	localStorage.setItem("countEnergy", countEnergy);

	localStorage.setItem("countRestart", countRestart);
	localStorage.setItem("countRestartDate", today);
}

function dataScreen() {
	scoreHTML.innerText = Math.round(score);
	energyHTML.innerText = energy;
	fillEnergy();
	scoreInHourHTML.innerText = scoreInHour;
}
function dataScreen2() {
	dataScreen();
	LvlEnergyHTML.forEach(element => {
		element.innerText = LvlEnergy;
	});
	priceLvlEnergyHTML.innerText = priceLvlEnergy;
	countEnergyHTML.innerText = countEnergy;

	countRestartHTML.forEach(element => {
		element.innerText = countRestart;
	});
}

let path = window.location.pathname;
if (path.includes("index.html")) dataScreen();
else if (path.includes("earnings")) dataScreen2();

function clicker(event) {
	if (energy > countClick) {
		score += countClick;
		energy -= countClick;
		scoreHTML.innerText = Math.round(score);
		energyHTML.innerText = energy;
		fillEnergy();

		let img = event.currentTarget.querySelector("#objectImg");
		img.style.transform = "scale(0.9)";
		setTimeout(() => {}, 200);
	}
	const plus = document.createElement("div");
	plus.className = "plus";
	plus.innerText = "+" + countClick;
	const panel = event.currentTarget;
	const rect = panel.getBoundingClientRect();
	plus.style.left = `${event.clientX - rect.left}px`;
	plus.style.top = `${event.clientY - rect.top}px`;
	panel.appendChild(plus);
	setTimeout(() => {
		plus.remove();
	}, 2200);
}

function fillEnergy() {
	percentEnergy = (energy * 100) / fullEnergy;
	energyFillHTML.style.width = percentEnergy + "%";
}
saveData();

function regeneratEnergy() {
	if (energy < fullEnergy) {
		energy++;
		energyHTML.innerText = Math.round(energy);
		fillEnergy();
		saveData();
	}
	score += score / 3600;
	scoreHTML.innerText = Math.round(score);
	saveData();
}
setInterval(regeneratEnergy, 1000);

window.addEventListener("beforeunload", () => {
	localStorage.setItem("lastVick", Date.now());
});

window.addEventListener("load", () => {
	let lastVisit = localStorage.getItem("lastVisit");
	let nowVisit = Date.now();
	if (nowVisit - lastVisit > 30 * 1000 && lastVisit) {
		let hoursAway = (nowVisit - parseInt(lastVisit)) / (100 * 60 * 60);
		if (hoursAway > 3) hoursAway = 3;

		let offlineScore = Math.round(hoursAway * scoreInHour);
		score += offlineScore;
		scoreHTML.innerText = score;

		let offlineEnergy = Math.round(hoursAway * 3600);
		energy = Math.min(energy + offlineEnergy, fullEnergy);
		energyHTML.innerText = energy;

		alert("За ваше отсутствие заработоно ${offlineScore} кофейный зерен");
	}
});
