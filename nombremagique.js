let prompt = require('prompt-sync')();

let min = 1;
let max = 10;
//This way we can change the variable everytime we replay the game, without declaring new variables each time

min = parseInt(prompt(`Chose a min. number (higher than 0): `));
if (min < 1)
	min = 1;
console.log(`min. number is ${min}.`);

max = parseInt(prompt(`Chose a max. number (higher than min. number): `));
if (max < min + 1) {
	max = min + 9;
}
console.log(`max. number is ${max}.`);

let difficulty = parseInt(prompt(`Type 1 for easy mode, 2 for normal mode, 3 for hard mode, 4 for very hard mode: `));
if (difficulty < 1 || difficulty > 5) {
	difficulty = 2;
	console.log('Difficulty set to normal mode');
}

let attemptLimit =
	difficulty == 1 ? Math.ceil(Math.sqrt(	max - min + 1)) + 1 :
	difficulty == 2 ? Math.ceil(Math.sqrt(	max - min + 1)) :
	difficulty == 3 ? Math.ceil(Math.sqrt( (max - min)* 0.8 )) - 0.5 :
	difficulty == 4 ? Math.ceil(Math.sqrt( (max - min)* 0.75)) - 1 :
	difficulty == 5 ? 1 :
	Math.ceil(Math.sqrt(max - min + 1));
//5 is the hidden "impossible mode"

function lower (answer, currentMax) {
	if (difficulty < 4) {
		console.log('Lower!');
	}
	else {
		console.log('Nope!')
	}		
	if (difficulty == 1) {
		currentMax = answer - 1;
	}
	return currentMax;
}
function higher (answer, currentMin) {
	if (difficulty < 4) {
		console.log('Higher!');
	}
	else {
		console.log('Nope!')
	}
	if (difficulty == 1) {
		currentMin = answer + 1;
	}
	return currentMin;
}

function PlayGame() {
	currentMin = min;
	currentMax = max;
	let magicNumber = Math.floor(Math.random()* (max - min + 1) + min);
	let attempt = 0;
	let answer = '';

	while (attempt < attemptLimit) {
		
		if (difficulty < 3) {
			answer = parseInt(prompt(`Guess the magic number between ${currentMin} and ${currentMax} (both included)! `));
		}
		else {
			answer = parseInt(prompt(`Guess the magic number! `));
		}

		if (answer == magicNumber) {
			console.log(`You won! ${answer} is the magic number!`);
			attempt = attemptLimit;
		}
		else {
			attempt++;
			if (attempt >= attemptLimit) {
				console.log(`You lost! ${magicNumber} was the magic number!`);
			}
			else {
				while ((answer > currentMax || answer < currentMin || !answer) && difficulty == 1) {
					answer = parseInt(prompt(`between ${currentMin} and ${currentMax}! `));
				}
				if (answer > magicNumber) {
					currentMax = lower(answer, currentMax);
				}
				if (answer < magicNumber) {
					currentMin = higher(answer, currentMin);
				}
				console.log('Try again!');
			}
		}
	};
	let replay = prompt('Type 1 to replay with the same parameters\n');
	if (replay == 1) {
		PlayGame();
	}
}

PlayGame();








