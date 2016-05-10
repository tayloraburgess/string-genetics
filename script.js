/* fitness:
Given a target string and a string to compare (of the same length),
returns the edit distance between the two strings
using their Hamming distance as the algorithm. */
function fitness(targetString, compareString) {
	var hammingDistance = 0;

	/* Iterate through each character in target string;
	if the character doesn't match the corresponding character in the compare string,
	increase "hammingDistance" by 1. */
	for (l = 0; l < targetString.length; l++) {
		if (targetString.charAt(l) != compareString.charAt(l)) hammingDistance++;
	}

	return hammingDistance;
}

/* randomCharacter:
Returns a random character from a function-defined string of possible characters. */
function randomCharacter() {
	var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()~`_-+=<,>.?/ ";
	return possible.charAt(Math.floor(Math.random() * possible.length));
}

/* mutate:
Returns an array filled with "popSize" number of strings.
Output strings are based on the input parent string,
with some characters randomly changed based on the input mutation rate. */
function mutate(parentString, popSize, mutationRate) {
	var population = [];

	for (j = 0; j < popSize; j++) {
		population[j] = "";
		for (k = 0; k < parentString.length; k++) {
			/* For every character in the parent string, 
			there is a 1 in "mutationRate" chance that it will mutate to a random character
			in this particular child string. */
			population[j] += Math.floor(Math.random() * mutationRate) == 1 ? randomCharacter() : parentString.charAt(k);
		}
	}
	
	return population;
}

/* child:
Object constructor for children in mutated generations.
Has values for its string and its fitness relative to overall target string. */
function child(s, f) {
	this.string = s;
	this.fitValue = f;
}

var startTime = Date.now();

/* Main variables--change these to experiment with optimizing the program through higher or lower population pools,
or to evolve toward a different target string */
var input = "A Moon Shaped Pool";
var popValue = 200;

// Initialize variables that will be used in each iteration of main loop
var mRate = 2;
var current = "";
var generation = 0;

// For the first generation, create random string of the same length as the target
for (i = 0; i < input.length; i++) current += randomCharacter();

var startFitness = fitness(input, current);

bodyPrintLine("Target String:");
bodyPrintLine(input);
bodyPrintLine("");

// Initialize table for data
var printTable = bodyTable();
printTable.style.borderSpacing = "6px";

// Add header row and first gen values to data table
topRow = tableAddRow(printTable, "Generation", "String", "Fitness", "Mutation Rate");
topRow.style.background = "gray";
tableAddRow(printTable, "Start", current, startFitness, "1 in " + mRate);

// Main program loop--will run until current generation's fitness is 0, meaning mutations have evolved to target string
while (fitness(input, current) > 0) {
    generation++;
    /* Scale the mutation rate down as the fitness approaches 0,
    so that there are as few generations as possible */
    mRate = 2 + startFitness - fitness(input, current);

    // Set variables for this loop, including an array of mutated strings for this generation
	var genStrings = mutate(current, popValue, mRate);
	var minFitness = 0;
	var genChildren = [];
	var fittest = [];
	var fitnessArray = [];

	/* For the population of strings in this generation,
	create child objects that hold those strings & their calculated fitness values */
	for (i = 0; i < popValue; i++) {
		var tempChild = new child(genStrings[i], fitness(input, genStrings[i]));
		genChildren.push(tempChild);
		/* In addition to child objects, fill an array with fitness values for every string
		so that the minimum fitness value for the generation can be easily found */
		fitnessArray.push(fitness(input, genStrings[i]));
	}

	// Find the minimum fitness value of this generation of strings
	minFitness = Math.min(...fitnessArray);

	/* Check that the minimum generation fitness value is <= to that of the last generation string--
	held in the "current" variable--before deciding on a new, more fit string,
	so that the program doesn't go backward to a less fit string */
	if (minFitness <= fitness(input, current)) {

		/* For all of the child objects in this generation,
		add them to array "fittest" if they match the generation's minimum fitness value */
		for (i = 0; i < genChildren.length; i++) {
			if (genChildren[i].fitValue == minFitness) fittest.push(genChildren[i]);
		}
 
 		// Pick a random child from the array of fittest children and choose it for the new generation
		var randFittest = Math.floor(Math.random() * (fittest.length));
		current = fittest[randFittest].string;
	} 

	// Add values of chosen child for this generation to the output display table
	tableAddRow(printTable, generation, current, fitness(input, current),"1 in " + mRate);
}

var endTime = Date.now();

/* Based on the difference between Date objects created at the start and end of the program, 
output the amount of seconds this program took to run*/
milliseconds = endTime - startTime;
bodyPrintLine("");
bodyPrintLine("Time elapsed: " + milliseconds/1000 + " seconds");