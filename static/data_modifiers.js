function addContractor() { //adds a contractor using the form on the AddContractors.html page
	//get info from form and create new contractor object
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("zip").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var contact = document.getElementById("contact").value;
	var last = document.getElementById("last").value;
	
	//if invalid input, do not enter contractor
	var a = validateEntry(name, zip, last);
	var cont = a[0];
	last = a[1];
	if (!cont) { 
		return;
	}

	var contractor = {"Town":city,"Name":name,"Zip":zip,"Last Use":last,"Phone":phone,"State":state,"Contact":contact,"Address":address, "Email":email};

	//update database
	cont = avoidDuplicatesAdd(zip, contractor);
	if (!cont) { //don't reset the form or update the database if entry is a duplicate
		return;
	}
	resetForm();
	
	//Only to be used with save_to_server saving method
	saveUpdates(CONTRACTOR_INFO);
}


function resetForm() { //clears the "add contractor" form each time a contractor is entered, so that a new entry can be made
	document.getElementById("adder").reset();
}


function removeContractor(name, zip) { //finds and removes a contractor based on its name and zip code
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


function editSaveAll(total_number) { //saves all edits on the EditContractors2.html page
	for (var i=0; i<total_number; i++) {
		editContractor(i);
	}
	saveUpdates(CONTRACTOR_INFO);
}


function editContractor(id) { //makes edits to the 
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
	
	//if invalid input, do not save updated info
	var a = validateEntry(name, zip, last);
	var cont = a[0];
	last = a[1];
	if (!cont) { 
		return;
	}
	
	var contractor = {"Town":city,"Name":name,"Zip":zip,"Last Use":last,"Phone":phone,"State":state,"Contact":contact,"Address":address,"Email":email};
	
	//insert updated contractor where appropriate
	avoidDuplicatesAdd (zip, contractor);
}


function prefillForm(n, z, id) { //generates and pre-fills edit forms with existing contractor data, while removing the existing data in preparation for the updated entries being input
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


function validateEntry(name, zip, last) {
	//require contractor name and zip code
	if (name == "" || zip == "") {
		alert("Error: Invalid input. Contractor name, zip code, and last use required.");
		return [false, last];
	}
	//if no last use is entered, default to current month/year
	if (last == "") {
		var new_date = new Date();
		var m = new_date.getMonth();
		var y = new_date.getFullYear() - 2000; //will need to be changed in the year 2100
		y = String(y);
		var month_dict = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		last = month_dict[m];
		last = last.concat("-");
		last = last.concat(y);
	}
	return [true, last];
}


function avoidDuplicatesAdd (zip, contractor) { //prevent the addition of duplicate entries while adding new/updated contractor
	if (zip in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[zip].length; i++) {
			if (CONTRACTOR_INFO[zip][i]["Name"] == contractor["Name"]) {
				alert("Error: Contractor \""+contractor["Name"]+"\" already present in database. Duplicates cannot be added.");
				return false;
			}
		}
		CONTRACTOR_INFO[zip].push(contractor);
	} else {
		CONTRACTOR_INFO[zip] = [contractor];
	}
	return true;
}
