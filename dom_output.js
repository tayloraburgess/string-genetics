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