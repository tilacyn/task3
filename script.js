"use strict";

var lettersList = document.getElementsByClassName("letters__list")[0];

const cross = document.getElementById("hide-article-cross");
const article = document.getElementById("article");
const deleteLetter = document.getElementById("delete");

article.style.display = 'none';
cross.style.display = 'none';

/*** onclick handlers ***/

const clickOnTheme = function() {
	lettersList.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
};

deleteLetter.onclick = function() {
	const toRemove = [];
	for (let i = 0; i < lettersList.children.length; i++) {
		const child = lettersList.children[i];
		//alert("kek");
		if (child.firstElementChild.checked) {
			toRemove.push(child);
		}
	}
	for (let i = 0; i < toRemove.length; i++) {
		lettersList.removeChild(toRemove[i]);
	}
};

function sleep(milliseconds) {
	const start = new Date().getTime();
	for (let i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

cross.onclick = function() {
	article.style.display = 'none';
	cross.style.display = 'none';
	lettersList.style.display = 'block';
};


function setThemeOnclick() {
	lettersList.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
}



function setUnreadThemeOnclick(letter) {
	letter.getElementsByClassName('letter__theme')[0].className = 'letter__theme';
	letter.getElementsByClassName('letter__author')[0].className = 'letter__author';
	letter.getElementsByClassName('letter__unread-oval')[0].style.display = 'none';
}


const sourceThemes = ['Доступ к аккаунту', 'Как читать почту с мобильного', 'Как читать почту с мобильного', 'Соберите всю почту в этот ящик'];
const sourceContents = ['Получить доступ к аккаунту очень просто, нужно всего лишь...<a href>читать далее</a>',
	'Для начала надо установить мобильное приложение Яндекс.Почты. Затем...',
	'Пользуйтесь Яндексом и на Ваших мобильных приложениях..',
	'Чем больше человечество использует интернет, тем больше..'];




for (let i = 0; i < 4; i++) {
	lettersList.children[i].getElementsByClassName('letter__theme')[0].onclick = function() {
		article.getElementsByTagName('h3')[0].innerHTML = sourceThemes[i];
		article.getElementsByTagName('p')[0].innerHTML = sourceContents[i];
		if (i < 2) {
			setUnreadThemeOnclick(lettersList.children[i]);
		}
		setThemeOnclick();
	}
}



/*** author and theme generators ***/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


const authors = ['Яндекс', 'Google'];

function rndAuthor() {
	return authors[getRandomInt(0, authors.length)];
}

const themes = {
	'Яндекс' : ['Яндекс.Технологии', 'Яндекс.Музыка', 'Яндекс.Дзен'],
	'Google' : ['Google Play', 'GDrive']	
};

const contents = {
	'Яндекс.Технологии' : 'Мы расскажем вам про Яндекс.Технологии',
	'Яндекс.Музыка' : 'Подписывайтесь на Яндекс.Музыку',
	'Яндекс.Дзен' : 'Умная лента от Яндекс позволит Вам оставаться в курсе новостей',
	'Google Play' : 'Would you like to know more about Google Play?',
	'GDrive' : 'Here is a simple tutorial to get started with GDrive'
};

function rndTheme(author) {
	const concreteThemes = themes[author];
	return concreteThemes[getRandomInt(0, concreteThemes.length)];
}


const queue = [];

/*** new mail ***/

function newLetter() {
	const letter = document.createElement('div');
	letter.className = "letter";
	
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = "letters__marker";
	letter.appendChild(checkbox);

	/*const authorImage = document.createElement('div');
	authorImage.className = 'author-image';
	authorImage.style.background = 'grey';
	letter.appendChild(authorImage);*/

	const unreadOval = document.createElement('figure');
	unreadOval.className = 'letter__unread-oval';
	unreadOval.innerHTML = '<img src="src/images/Oval.png" alt="unread">';
	letter.appendChild(unreadOval);

	const author = document.createElement('p');
	author.className = 'letter__author letter_unread';
	author.innerHTML = rndAuthor();
	letter.appendChild(author);

	const theme = document.createElement('p');
	theme.className = 'letter__theme letter_unread';
	theme.innerHTML = rndTheme(author.innerHTML);
	letter.appendChild(theme);

	const date = document.createElement('p');
	date.className = 'letter__date';
	date.innerHTML = '23 мар';
	letter.appendChild(date);

	const line = document.createElement('div');
	line.className = 'letters__line';
	letter.appendChild(line);


	theme.onclick = function() {
		lettersList.style.display = 'none';
		cross.style.display = 'block';
		article.style.display = 'block';
		article.getElementsByTagName('h3')[0].innerHTML = theme.innerHTML;
		article.getElementsByTagName('p')[0].innerHTML = contents[theme.innerHTML];
		unreadOval.style.display = 'none';
		theme.className = 'letter__theme';
		author.className = 'letter__author';
	};

	lettersList.insertBefore(letter, lettersList.firstElementChild);

	lettersList.classList.toggle('letters__list_shift-down');
	//alert("New Letter");



	setTimeout(() => {
		lettersList.classList.toggle('letters__list_transition-active');
	}, 500);


	setTimeout(() => {
		lettersList.classList.toggle('letters__list_shift-down');
		}, 1000);


	setTimeout(() => {
		lettersList.classList.toggle('letters__list_transition-active');
	}, 2000);

}


const interval = 60000;

let currentTime = 0;
let nextTime = 0;
let currentIntervalRbound = interval;

currentTime = getRandomInt(0, interval);

setTimeout(function invokeAndSetNext() {
	newLetter();
	nextTime = currentIntervalRbound + getRandomInt(0, interval);
	setTimeout(invokeAndSetNext, nextTime - currentTime);
	currentTime = nextTime;
	currentIntervalRbound += interval;
}, currentTime);


