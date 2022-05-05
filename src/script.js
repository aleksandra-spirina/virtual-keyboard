const KEYS_ENG = [
	['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
	['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
	['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
	['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '△', 'Shift'],
	['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◁', '▽', '▷', 'Ctrl']
];

const ROWS = 5;

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

for (let i = 0; i < ROWS; ++i) {
	for (let j = 0; j < KEYS_ENG[i].length; ++j) {
		let key = document.createElement('div');
		key.classList.add('keys');
		key.innerText = KEYS_ENG[i][j];
		key.setAttribute('id', KEYS_ENG[i][j].toLowerCase());
		keyboard.appendChild(key);

		if (KEYS_ENG[i][j].toLowerCase() === 'space') {
			key.innerText = '';
		}
	}
}
