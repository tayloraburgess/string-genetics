/* bodyPrintLine:
Quick "print" function.
Assigns body & br tag elements to objects, creates a text node from input string,
then appends text node & br element to body */
function bodyPrintLine(string) {
	var body = document.querySelector("body");
	var line = document.createTextNode(string);
	var lineBreak = document.createElement("br");

	body.appendChild(line);
	body.appendChild(lineBreak);
}

function bodyTable() {
	var body = document.querySelector("body");
	tag = document.createElement("table");
	body.appendChild(tag);

	return tag;
}

function tableAddRow(table) {
	var row = table.insertRow();

	for (o = 1; o < arguments.length; o++) {
		var col = document.createElement("td");
		var line = document.createTextNode(arguments[o]);
		col.appendChild(line);
		row.appendChild(col);
	}

	return row;
}

function fitness(targetString, compareString) {
	var hammingDistance = 0;

	for (l = 0; l < targetString.length; l++) {
		if (targetString.charAt(l) != compareString.charAt(l)) { hammingDistance++; }
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

var input = "Please hold the line.";
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
	var genChildren = [];
	var fittest = [];

	for (i = 0; i < popValue; i++) {
		var tempChild = new child(genStrings[i], fitness(input, genStrings[i]));
		genChildren.push(tempChild);
	}

	for (i = 0; i < genChildren.length; i++) {
		var isGreater = 0;
		for (j = 0; j < genChildren.length; j++) {
			if (genChildren[i].fitValue > genChildren[j].fitValue && j != i) {
				isGreater++;
			}
		}
		if (isGreater == 0) fittest.push(genChildren[i]);
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