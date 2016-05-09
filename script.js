function fitness(targetString, compareString) {
	var hammingDistance = 0;

	for (l = 0; l < targetString.length; l++) {
		if (targetString.charAt(l) != compareString.charAt(l)) hammingDistance++;
	}

	return hammingDistance;
}


function randomCharacter() {
	var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()~`_-+=<,>.?/ ";
	return possible.charAt(Math.floor(Math.random() * possible.length));
}


function mutate(parentString, popSize, mutationRate) {
	var population = [];
	mutationRate = Math.round(mutationRate);

	for (j = 0; j < popSize; j++) {
		population[j] = "";
		for (k = 0; k < parentString.length; k++) {
			population[j] += Math.floor(Math.random() * mutationRate) == 1 ? randomCharacter() : parentString.charAt(k);
		}
	}
	
	return population;
}

function child(s, f) {
	this.string = s;
	this.fitValue = f;
}

var startTime = Date.now();

var input = "A Moon Shaped Pool";
var popValue = 200;
var startMuteRate = 10;

var muteRate = startMuteRate;
var current = "";
var generation = 0;

for (i = 0; i < input.length; i++) current += randomCharacter();

bodyPrintLine("Target String:");
bodyPrintLine(input);
bodyPrintLine("");

var printTable = bodyTable();
printTable.style.borderSpacing = "6px";

topRow = tableAddRow(printTable, "Generation", "String", "Fitness", "Mutation Rate");
topRow.style.background = "gray";
tableAddRow(printTable, "Start", current, fitness(input,current), "1 in " + startMuteRate);

startFitness = fitness(input,current);

while (fitness(input, current) > 0) {
    generation++;
    muteRate = startMuteRate + (startFitness / fitness(input, current));

	var genStrings = mutate(current, popValue, muteRate);
	var minFitness = 0;
	var genChildren = [];
	var fittest = [];
	var fitnessArray = [];

	for (i = 0; i < popValue; i++) {
		var tempChild = new child(genStrings[i], fitness(input, genStrings[i]));
		genChildren.push(tempChild);
		fitnessArray.push(fitness(input, genStrings[i]));
	}

	minFitness = Math.min(...fitnessArray);

	for (i = 0; i < genChildren.length; i++) {
		if (genChildren[i].fitValue == minFitness) fittest.push(genChildren[i]);
	}

	if (fittest[0].fitValue <= fitness(input, current)) {
		var randFittest = Math.floor(Math.random() * (fittest.length));
		current = fittest[randFittest].string;
	} 

	tableAddRow(printTable, generation, current, fitness(input, current),"1 in " + Math.round(muteRate));
}

var endTime = Date.now();

milliseconds = endTime - startTime;
bodyPrintLine("");
bodyPrintLine("Time elapsed: " + milliseconds/1000 + " seconds");