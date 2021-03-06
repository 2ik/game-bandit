/* author script: web-electron.com */
    
var banditHand = document.querySelector('.bandit__hand'),
    banditCircle = document.querySelector('.bandit__circle'),
    meterCount = document.querySelector('.meter__count'),
    banditFinish = document.querySelector('.bandit__finish'),
    banditFinishTitle = document.querySelector('.bandit__finish--title'),
    banditFinishText = document.querySelector('.bandit__finish--text'),
    banditFormPercent = document.querySelector('.bandit form input[name="tema"]'),
    banditAttemp = document.querySelector('.bandit__body--attempt i'),
    overStepFive = false;

/* run automat */
banditHand.addEventListener('click', getHand, false);
banditCircle.addEventListener('click', getHand, false);

/* create event */
var eventNew = document.createEvent("Event");
eventNew.initEvent("meterOff", true, true);

/* end replay event */
meterCount.addEventListener('meterOff', function (e) {
	meterCount.classList.remove('animated');
	banditHand.classList.remove('armGo');
	banditCircle.classList.remove('circleGo');
	banditFinish.classList.remove('bounceOut');
	banditFinish.classList.add('slideInDown');
}, false);

getAttemp();
/* click to hand */
function getHand(e) {
	if (banditHand.classList.contains('armGo')) return;
	if (meterCount.classList.contains('animated')) return;

	if (banditFinish.classList.contains('slideInDown')) {
		banditFinish.classList.remove('slideInDown');
		banditFinish.classList.add('bounceOut');
	}

	getCookie('bandit') >= 5 ? getStop() : getCookie('bandit') ? createCookieBandit('bandit', parseInt(parseInt(getCookie('bandit')) + 1)) : createCookieBandit('bandit', 1);

	if (overStepFive === true) return;
	getAttemp();
	banditHand.classList.add('armGo');
	banditCircle.classList.add('circleGo');

	meterCount.classList.add('animated');
	getRandom(meterCount, 2, 7);
}

function getAttemp() {
	banditAttemp.textContent = getCookie('bandit') ? 5 - parseInt(getCookie('bandit')) : 5;
}

function getStop() {
	overStepFive = true;
	banditFinish.classList.remove('bounceOut');
	banditFinishTitle.style.color = '#2b5adf';
	banditFinishTitle.textContent = 'Попытки закончились. Попробуйте через 30 минут';
	banditFinishText.textContent = 'Оставьте свой номер телефона, и вы получите максимальную скидку ;-)';
	setTimeout(function () {
		banditFinish.classList.add('slideInDown');
	}, 0);
}
/* generate random num */
function getRandom(el, min, max) {
	var i = 0;
	var random = {
		value: 0,
		getRandomInt: function getRandomInt(min, max) {
			var randNum = Math.floor(Math.random() * (max - min + 1)) + min;

			if (randNum === random.value) return random.getRandomInt(min, max);
			random.value = randNum;

			return randNum;
		}
	};
	var replay = setInterval(function () {
		if (i >= 15) {
			clearInterval(replay);
			meterCount.dispatchEvent(eventNew);
		}

		el.classList.add('fadeOutUp');
		setTimeout(function () {
			el.classList.remove('fadeOutUp');
			el.classList.add('fadeInDown');
		}, 100);
		el.classList.remove('fadeInDown');
		var percent = random.getRandomInt(min, max);
		el.textContent = percent;
		i++;
	}, 150);
}
	
/* author script: web-electron.com */
