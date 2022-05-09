function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = () => {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

const KEYS_CODE = [
	'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
	'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
	'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
	'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
	'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
];

const KEYS_ENG = [
	'`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
	'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
	'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
	'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
	'Ctrl', 'Win', 'Alt', '\xa0', 'Alt', '←', '↓', '→', 'Ctrl'
];

const KEYS_ENG_SHIFT = [
	'~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
	'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'Del',
	'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '\"', 'Enter',
	'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '↑', 'Shift',
	'Ctrl', 'Win', 'Alt', '\xa0', 'Alt', '←', '↓', '→', 'Ctrl'
];


const KEYS_RU = [
	'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
	'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
	'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
	'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
	'Ctrl', 'Win', 'Alt', '\xa0', 'Alt', '←', '↓', '→', 'Ctrl'
];

const KEYS_RU_SHIFT = [
	'ё', '!', '\"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
	'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del',
	'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
	'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '↑', 'Shift',
	'Ctrl', 'Win', 'Alt', '\xa0', 'Alt', '←', '↓', '→', 'Ctrl'
];

const KEYS_NUM = 64;
let currentLang = 'ENG';

// const file = "config.json";
// readTextFile(file, (text) => {
// 	let tmpObj = JSON.parse(text);
// 	currentLang = tmpObj.lang;
// });

const BODY = document.querySelector('body');

let container = document.createElement('div');
container.classList.add('container');
BODY.appendChild(container);

let inputWrapper = document.createElement('div');
inputWrapper.classList.add('input-wrapper');
inputWrapper.appendChild(document.createElement('textarea'));

let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
inputWrapper.appendChild(keyboard);

container.appendChild(inputWrapper);


function createKeyboard() {
	keyboard.innerHTML = '';

	for (let i = 0; i < KEYS_NUM; ++i) {
		let key = document.createElement('div');
		key.classList.add('key');
		key.innerText = '';
		key.setAttribute('id', KEYS_CODE[i].toLowerCase());
		keyboard.appendChild(key);
	}

}

function fullKeyboard(KEYS_SET, toUpper = false) {
	let keyElements = document.querySelectorAll('.key');
	for (let i = 0; i < KEYS_NUM; ++i) {
		keyElements[i].innerText =
			(toUpper && keyElements[i].id.includes('key')) ? KEYS_SET[i].toUpperCase() : KEYS_SET[i];
	}
}

createKeyboard();
fullKeyboard(KEYS_ENG);

const KEYS = document.querySelectorAll('.key');
let keysPressed = {};
let cursorPosition = {
	x: 0,
	y: 0
};

let changeKeySet = false;
let caps = false;

document.addEventListener('mousedown', (e) => {
	let eventParrent = e.target;

	if (eventParrent.classList.contains('key')) {

		eventParrent.classList.add('_active');

		if (eventParrent.id.includes('shift')) {
			fullKeyboard((currentLang != 'ENG') ? KEYS_RU_SHIFT : KEYS_ENG_SHIFT, true);
			changeKeySet = true;
		} else if (eventParrent.id === 'capslock') {
			if (!changeKeySet) {
				fullKeyboard((currentLang != 'ENG') ? KEYS_RU_SHIFT : KEYS_ENG_SHIFT, true);
				changeKeySet = true;
				caps = true;
			} else {
				eventParrent.classList.remove('_active');
				fullKeyboard((currentLang != 'ENG') ? KEYS_RU : KEYS_ENG, false);
				changeKeySet = false;
				caps = false;
			}
		}

		if (eventParrent.id.includes('key') || eventParrent.id.includes('digit') ||
			eventParrent.id.includes('quote') || eventParrent.id.includes('bracket') ||
			eventParrent.id.includes('slash') || eventParrent.id === 'minus' ||
			eventParrent.id === 'semicolon' || eventParrent.id === 'equal' ||
			eventParrent.id === 'comma' || eventParrent.id === 'period' ||
			eventParrent.id === 'space') {

			document.querySelector('textarea').value += eventParrent.innerText;
			cursorPosition.x++;

		} else if (eventParrent.id === 'backspace') {

			let text = document.querySelector('textarea').value;

			if (text.length > 0) {
				document.querySelector('textarea').value = text.slice(0, -1);
				cursorPosition.x--;
			}

		} else if (eventParrent.id === 'enter') {
			document.querySelector('textarea').value += '\n';
			cursorPosition.y++;
		} else if (eventParrent.id.includes('arrow')) {
			setCaretToPos(document.getElementById('textarea'), 1);
		}
	}
});

document.addEventListener('mouseup', (e) => {
	let eventParrent = e.target;
	if (eventParrent.classList.contains('key') && eventParrent.id != 'capslock') {
		eventParrent.classList.remove('_active');

		if (changeKeySet && !caps) {
			fullKeyboard((currentLang != 'ENG') ? KEYS_RU : KEYS_ENG, false);
			changeKeySet = false;
		}
	}
});

document.addEventListener('keydown', (e) => {
	keysPressed[e.code] = true;
	document.querySelector('textarea').focus();

	if ((keysPressed['ShiftLeft'] && keysPressed['AltLeft']) ||
		(keysPressed['ShiftRight'] && keysPressed['AltRight'])) {
		fullKeyboard((currentLang === 'ENG') ? KEYS_RU : KEYS_ENG);
		currentLang = (currentLang === 'ENG') ? 'RU' : 'ENG';
	}

	let currentKey = document.getElementById(e.code.toLowerCase());
	if (currentKey) {
		currentKey.classList.add('_active');

		if (e.code === 'Tab' || e.code.includes('Alt')) {
			console.log('focus');
			currentKey.focus();
			e.preventDefault();
		}

	}

});

document.addEventListener('keyup', (e) => {
	keysPressed[e.code] = false;
	let currentKey = document.getElementById(e.code.toLowerCase());
	if (currentKey) {
		currentKey.classList.remove('_active');
	}
});