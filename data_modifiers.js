function addContractor() {
	//get info from form
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("zip").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementByID("email").value;
	var contact = document.getElementById("contact").value;
	var last = document.getElementById("last").value;
	if (name == "" || zip == "" || last =="") {
		alert("Error: Invalid input. Contractor name, zip code, and last use required.");
		return;
	}
	//create new contractor object
	var contractor = {"Town":city,"Name":name,"Zip":zip,"Last Use":last,"Phone":phone,"State":state,"Contact":contact,"Address":address};
	//update database
	if (zip in CONTRACTOR_INFO) {
		//prevent the addition of duplicate entries
		for (var i=0; i<CONTRACTOR_INFO[zip].length; i++) {
			if (CONTRACTOR_INFO[zip][i]["Name"] == contractor["Name"]) {
				alert("Error: Contractor \""+updated[zip][i]["Name"]+"\" already present in database. Duplicates cannot be added.");
				return;
			}
		}
		CONTRACTOR_INFO[zip].push(contractor);
	} else {
		CONTRACTOR_INFO[zip] = [contractor];
	}
	resetForm();
}


function resetForm() { //clears add contractor form each time a contractor is entered
	document.getElementById("adder").reset();
}


function removeContractor(name, zip) {
	var entry;
	for (var key in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[key].length; i++) {
			entry = CONTRACTOR_INFO[key][i];
			if (entry["Name"]==name && entry["Zip"]==zip) {
				CONTRACTOR_INFO[key].splice(i,1);
				if (CONTRACTOR_INFO[zip].length == 0) {
					delete CONTRACTOR_INFO[zip];
				}
				break;
			}
		}
	}				
}


function editSaveAll(total_number) {
	for (var i=0; i<total_number; i++) {
		editContractor(i);
	}
	saveUpdates(CONTRACTOR_INFO);
}


function editContractor(id) {
	//get info from form and construct updated contractor object
	id = String(id);
	var name = document.getElementById("name"+id).value;
	var address = document.getElementById("address"+id).value;
	var city = document.getElementById("city"+id).value;
	var state = document.getElementById("state"+id).value;
	var zip = document.getElementById("zip"+id).value;
	var phone = document.getElementById("phone"+id).value;
	var email = document.getElementById("email"+id).value;
	var contact = document.getElementById("contact"+id).value;
	var last = document.getElementById("last"+id).value;
	var contractor = {"Town":city,"Name":name,"Zip":zip,"Last Use":last,"Phone":phone,"State":state,"Contact":contact,"Address":address,"Email":email};
	
	//insert updated contractor where appropriate
	if (zip in CONTRACTOR_INFO) {
		CONTRACTOR_INFO[zip].push(contractor);
	} else {
		CONTRACTOR_INFO[zip] = [contractor];
	}
}


function prefillForm(n, z, id) {
	var entry;
	for (var key in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[key].length; i++) {
			entry = CONTRACTOR_INFO[key][i];
			if (entry["Name"]==n && entry["Zip"]==z) {
				var name = entry["Name"];
				var address = entry["Address"];
				var city = entry["Town"];
				var state = entry["State"];
				var zip = entry["Zip"];
				var phone = entry["Phone"];
				var email = entry["Email"];
				var contact = entry["Contact"];
				var last = entry["Last Use"];
				
				CONTRACTOR_INFO[key].splice(i,1);
				if (CONTRACTOR_INFO[zip].length == 0) {
					delete CONTRACTOR_INFO[zip];
				}
				break;
			}
		}
	}
	document.write('<form style=\"line-height:2\"> Company: <input id=\"name'+id+'\" type=\"text\" name=\"code\" value=\"'+name+'\" /><br>'
		+'Address: <input id=\"address'+id+'\" type=\"text\" name=\"code\" value=\"'+address+'\" /><br>'
		+'City: <input id=\"city'+id+'\" type=\"text\" name=\"code\" value=\"'+city+'\" /><br>'
		+'State: <input id="state'+id+'" type="text" name="code" value=\"'+state+'\" /><br>'
		+'Zip: <input id="zip'+id+'" type="text" name="code" value=\"'+zip+'\" /><br>'
		+'Phone #: <input id="phone'+id+'" type="text" name="code" value=\"'+phone+'\" /><br>'
		+'Email: <input id="email'+id+'" type="text" name="code" value=\"'+email+'\" /><br>'
		+'Contact: <input id="contact'+id+'" type="text" name="code" value=\"'+contact+'\" /><br>'
		+'Last Use (Mmm-YY): <input id="last'+id+'" type="text" name="code" value=\"'+last+'\" /><br>'
		+'</form>');
}