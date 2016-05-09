/* bodyPrintLine:
Quick "print"-ish function.
Assigns body & br tag elements to objects, creates a text node from input string,
then appends text node & br element to body. 
Returns created text node. */
function bodyPrintLine(string) {
	var body = document.querySelector("body");
	var line = document.createTextNode(string);
	var lineBreak = document.createElement("br");

	body.appendChild(line);
	body.appendChild(lineBreak);

	return line;
}

/* bodyTable:
Initializes a table in HTML body and returns it. */
function bodyTable() {
	var body = document.querySelector("body");
	tag = document.createElement("table");
	body.appendChild(tag);

	return tag;
}

/* tableAddRow:
Takes a table DOM object and column data (indefinite number of columns) as arguments.
Creates a row, adds it to the table object, and then appends all input column data to the row.
Returns created row object. */
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