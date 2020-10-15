let maxMassStorage = 1000;
let maxEnergyStorage = 10000;

let massStorage = 0;
let energyStorage = 0;

let massProd = 20;
let energyProd = 80;

let massConsumption = 0;
let energyConsumption = 0;

let balance = 0;

let currentRatio = 0;

const simpleBot = {
	massCost: 400,
	energyCost: 300
}

const factory = {
	buildPower: 30,
	inUse: false,
	taskGoalCompletion: 0,
	currentCompletion: 0,
	massConsumption: 0
}

const loop = () => {
	setInterval(() => {

		computeStorageVariation();
		computeRatio();
		computeFact();

		display();
	}, 1000);
}

const computeStorageVariation = () => {
	balance = massProd - factory.massConsumption;
	massStorage += balance;

	if(massStorage <= 0) {
		massStorage = 0;
	}

	console.log(`Balance: ${balance}`);
}

const computeRatio = () => {
	let cumulBuildPower = 0;

	if(massStorage === 0) {
		if(factory.inUse) {
			cumulBuildPower = factory.buildPower;
		}

		if(cumulBuildPower === 0) {
			currentRatio = '-';
		} else {
			currentRatio = Math.round(massProd / cumulBuildPower * 100);
		}
	}
}

const computeFact = () => {
	//buildUnit(simpleBot);
}

const display = () => {
	document.getElementById('currentMassStorage').innerHTML = massStorage;
	document.getElementById('currentMaxMassStorage').innerHTML = maxMassStorage;
	document.getElementById('currentEnergyStorage').innerHTML = energyStorage;
	document.getElementById('currentMaxEnergyStorage').innerHTML = maxEnergyStorage
	document.getElementById('currentRatio').innerHTML = currentRatio;
}

const buildUnit = (unit) => {
	let instantBuildPower = 0;

	console.log(factory.inUse);

	if(factory.inUse) {
		if(massStorage > 0) {
			instantBuildPower = factory.buildPower;			
		} else {
			instantBuildPower = factory.buildPower * (currentRatio/100);
		}
		console.log(instantBuildPower);

		factory.taskGoalCompletion = unit.massCost;
		factory.currentCompletion += instantBuildPower;

		factory.massConsumption = instantBuildPower;

		console.log(`TaskGoalCompletion = ${factory.taskGoalCompletion}, currentCompletion = ${factory.currentCompletion}`)

		if(factory.currentCompletion >= factory.taskGoalCompletion) {
			factory.currentCompletion = 0;
			factory.inUse = false;
			factory.massConsumption = 0;
		}
	} else {
		factory.inUse = true;
	}
}

loop();