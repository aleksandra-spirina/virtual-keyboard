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
	'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
];

const KEYS_RU = [
	'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
	'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
	'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
	'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
	'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
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

function fullKeyboard(KEYS_SET, shift = false, caps = false) {
	let keyElements = document.querySelectorAll('.key');
	for (let i = 0; i < KEYS_NUM; ++i) {
		keyElements[i].innerText = KEYS_SET[i];
	}
}

createKeyboard();
fullKeyboard(KEYS_ENG);

const KEYS = document.querySelectorAll('.key');
let keysPressed = {};

document.addEventListener('click', (e) => {
	let eventParrent = e.target;

	if (eventParrent.classList.contains('key')) {
		if (eventParrent.id.includes('key') || eventParrent.id.includes('digit') ||
			eventParrent.id.includes('quote') || eventParrent.id.includes('bracket') ||
			eventParrent.id.includes('slash') || eventParrent.id === 'minus' ||
			eventParrent.id === 'semicolon' || eventParrent.id === 'equal' ||
			eventParrent.id === 'comma' || eventParrent.id === 'period') {
			document.querySelector('textarea').value += eventParrent.innerText;

		}
	}

});

document.addEventListener('keydown', (e) => {
	keysPressed[e.code] = true;

	if ((keysPressed['ShiftLeft'] && keysPressed['AltLeft']) || 
	(keysPressed['ShiftRight'] && keysPressed['AltRight'])) {
		fullKeyboard((currentLang === 'ENG') ? KEYS_RU : KEYS_ENG);
		currentLang = (currentLang === 'ENG') ? 'RU' : 'ENG';
	}

	document.querySelector('textarea').focus();

	let currentKey = document.getElementById(e.code.toLowerCase());
	currentKey.classList.add('_active');

	console.log(e.code.toLowerCase());
});

document.addEventListener('keyup', (e) => {
	keysPressed[e.code] = false;
	let currentKey = document.getElementById(e.code.toLowerCase());
	currentKey.classList.remove('_active');
});