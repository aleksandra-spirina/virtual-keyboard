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

let PSText = document.createElement('div');
PSText.classList.add('ps');
let span = document.createElement('span');
span.innerText = 'P.S. Created in Windows. To change the language: Shift + Alt.';
PSText.appendChild(span);
container.appendChild(PSText);

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
currentLang = localStorage.lang || currentLang;
fullKeyboard((currentLang === "ENG") ? KEYS_ENG : KEYS_RU);

function setCaretPosition(ctrl, pos) {
	// Modern browsers
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);

		// IE8 and below
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

const KEYS = document.querySelectorAll('.key');
let keysPressed = {};
let cursorPosition = {
	x: 0,
	y: 0
};

let changeKeySet = false;
let caps = false;

function startInput(eventParrent) {
	keysPressed[eventParrent.id] = true;
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
			// TODO: setCaretPosition(...);
			document.querySelector('textarea').value += eventParrent.innerText;
		} else if (eventParrent.id === 'tab') {
			document.querySelector('textarea').value += '\xa0\xa0\xa0\xa0';
		}
	}
}

function endInput(eventParrent) {
	keysPressed[eventParrent.id] = false;
	if (eventParrent.classList.contains('key') && eventParrent.id != 'capslock') {
		eventParrent.classList.remove('_active');

		if (changeKeySet && !caps && !(keysPressed['shiftleft'] || keysPressed['shiftright'])) {
			fullKeyboard((currentLang != 'ENG') ? KEYS_RU : KEYS_ENG, false);
			changeKeySet = false;
		}
	}
}

document.addEventListener('mousedown', (e) => {
	let eventParrent = e.target;
	startInput(eventParrent);
});

document.addEventListener('mouseup', (e) => {
	let eventParrent = e.target;
	endInput(eventParrent);
});

document.addEventListener('keydown', (e) => {
	keysPressed[e.code.toLowerCase()] = true;
	document.querySelector('textarea').blur();

	if ((keysPressed['shiftleft'] && keysPressed['altleft']) ||
		(keysPressed['shiftright'] && keysPressed['altright'])) {
		currentLang = localStorage.lang || currentLang;
		fullKeyboard((currentLang === 'ENG') ? KEYS_RU : KEYS_ENG);
		currentLang = (currentLang === 'ENG') ? 'RU' : 'ENG';
		localStorage.setItem('lang', currentLang);
	}

	let currentKey = document.getElementById(e.code.toLowerCase());
	if (currentKey) {
		if (e.code === 'Tab' || e.code.includes('Alt')) {
			currentKey.focus();
			e.preventDefault();
		}
		startInput(currentKey);
	}

});

document.addEventListener('keyup', (e) => {
	let currentKey = document.getElementById(e.code.toLowerCase());
	if(currentKey) {
		endInput(currentKey);
	}
});