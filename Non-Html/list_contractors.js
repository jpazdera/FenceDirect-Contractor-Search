function populateList() { //generates a list of all contractors' names and zip codes, while printing a checkbox list of all their names
	var zip;
	var i;
	var name;
	var list = [];
	for (zip in CONTRACTOR_INFO) {
		for (i=0; i<CONTRACTOR_INFO[zip].length; i++) {
			name = CONTRACTOR_INFO[zip][i]["Name"];
			zip = CONTRACTOR_INFO[zip][i]["Zip"];
			list.push([name,zip]);
		}
	}
	list.sort();
	for (i=0; i<list.length; i++) {
		document.write('<input type=\"checkbox\" value=\"'+list[i][0]+'@@'+list[i][1]+'\" /> '+(i+1)+'. '+list[i][0]+'<br>');
	}
}


//CODE BELOW IS MODIFIED FROM STACKOVERFLOW USER Jonas G. Drange

function inputsToArray (inputs) {
    var arr = [];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked)
            arr.push(inputs[i].value);
    }
    return arr;
}