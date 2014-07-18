function contractorSearch(zip, radius) { //uses API to get a list of zip codes near the customer's location, parses the response, and finds contractors within those zip codes
	var link = "https://zipcodedistanceapi.redline13.com/rest/uu4eHJIQw6guvFrQFKjIxZknBmMELWBgqFu7ocYVjeqOUSFzCYhaYCxzYkeJgPZG/radius.json/" + zip + "/" + radius + "/mile";
	var data;
	var contractors;
	jQuery.get(link, function(d) {
		data = d.responseText;
		if (data != "") {
			data = trimResponse(data);
			data = extractZips(data, zip);
			data = findZipsWithContractors(data);
			contractors = getContractors(data);
			outputResults(zip, contractors);
		} else {
			alert("ERROR: Invalid zip code.");
			location.reload();
			//window.location.href = "index";
		}
	});
	return;
}


function trimResponse(data) { //extracts JSON data from the response
	var start_i = data.indexOf("{");
	var end_i = data.search("</p>");
	data = data.substring(start_i, end_i);
	data = JSON.parse(data);
	return data;
}


function extractZips(obj, zip) { //converts the JSON data into an array of (zip, distance) tuples
	var l = obj["zip_codes"];
	var zips = [[zip, 0]]; //add the customer's zip code to the list, as the API does not include it
	var entry;
	for (var i=0; i< l.length; i++) {
		entry = [l[i]["zip_code"], l[i]["distance"]];
		zips.push(entry);
	}
	return zips;
}


function findZipsWithContractors(zips) { //determines which nearby zips have contractors listed
	var zips_w_con = [];
	for (var i=0; i<zips.length; i++) {
		if (zips[i][0] in CONTRACTOR_INFO) {
			zips_w_con.push(zips[i]);
		}	
	}
	zips_w_con.sort(function(a, b){return a[1]-b[1];});
	return zips_w_con;
}


function getContractors(zips) { //compiles a list of all contractors in the nearby zips
	var contractors = [];
	var cur_zip;
	var dist;
	var cons_in_zip;
	for (var i=0; i<zips.length; i++) {
		cur_zip = zips[i][0];
		dist = zips[i][1];
		cons_in_zip = CONTRACTOR_INFO[cur_zip];
		for (var j=0; j<cons_in_zip.length; j++) {
			contractors.push([cons_in_zip[j], dist]);
		}
	}
	return contractors;
}

	
function outputResults(zip, contractors) { //crude, but dynamically generates search result page
	//define javascript files to load in header
	document.write("<head>");
	document.write("<title>Search Results</title>");
	document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../static/css.css\">");
	document.write("<script type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"../static/jquery.cookie.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"../static/contractor_info.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"../static/file_saver.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"../static/contractor_search.js\"></script>");
	document.write("</head>");
	//display results
	document.write("<body>");
	document.write("<a href=\"index\"><h1>FenceDirect Contractor Search</h1></a>");
	document.write("<h2>" + contractors.length + " Contractors Found Near <span style=\"color:DarkRed\">"+zip+"</span>:</h2>");
	document.write("<h5>Note: To save \"last use\" or removal changes, click the \"Save Changes\" button at the bottom of the page. To edit an entry, first make and save any usage or removal changes, save them, and then hit the edit button.</h5>");
	
	if (contractors.length == 0) {
		alert("No contractors were found within 35 miles of the selected zip code. Returning to homepage...");
		window.location.href = "index";
	} else {
		document.write("<ol>");
		for (var i=0; i<contractors.length; i++) {
			var c = contractors[i][0];
			var d = contractors[i][1];
			document.write("<li><span class=\"name\">"+c["Name"]+"</span>&nbsp&nbsp");
			if (d <= 15) {
				document.write("(<span style=\"color:Green;\">");
			} else if (d>15 && d<=25) {
				document.write("(<span style=\"color:#FF6600;\">");
			} else {
				document.write("(<span style=\"color:#CC0000;\">");
			}
			document.write(d+" miles</span>)<br>");
			document.write(c["Address"]+"<br>");
			document.write(c["Town"]+", "+c["State"]+" "+c["Zip"]+"<br>");
			document.write("<b>Phone #:</b> "+c["Phone"]+"<br>");
			document.write("<b>Email:</b> "+c["Email"]+"<br>");
			document.write("<b>Contact:</b> "+c["Contact"]+"<br>");
			document.write("<span style=\"font-size:13px;font-style:italic;\">Last Used "+c["Last Use"]+"</span><br>");
			//add update and removal buttons
			document.write("<button onclick=\"use(\'"+c["Name"]+"\', \'"+c["Zip"]+"\');\">Use</button><button onclick=\"edit(\'"+c["Name"]+"\', \'"+c["Zip"]+"\');\">Edit</button><button onclick=\"rmEntry(\'"+c["Name"]+"\', \'"+c["Zip"]+"\');\">Remove</button>");
			document.write("</li><br>");
		}
		document.write("</ol>");
		document.write('<div style="text-align:center;"><a href="ContractorSearch.html" class="button">New Search</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick="saveUpdates(CONTRACTOR_INFO);return false;" class="button">Save Changes</a></div>');
	}	
	document.write("</body>");
	return;
}


function use(name, zip) { //updates the date of last use for a contractor when the "Use" button is pressed
	var entry;
	for (var key in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[key].length; i++) {
			entry = CONTRACTOR_INFO[key][i];
			if (entry["Name"]==name && entry["Zip"]==zip) {
				var new_date = new Date();
				var m = new_date.getMonth();
				var y = new_date.getFullYear() - 2000; //will need to be changed in the year 2100
				y = String(y);
				var month_dict = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				new_date = month_dict[m];
				new_date = new_date.concat("-");
				new_date = new_date.concat(y);
				
				CONTRACTOR_INFO[key][i]["Last Use"] = new_date;
				alert("Last use updated to " + new_date + ".");
				break;
			}
		}
	}	
}


function edit(name, zip) { //opens a new page where the selected contractor can be edited, when an "Edit" button is pressed
	var entry;
	for (var key in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[key].length; i++) {
			entry = CONTRACTOR_INFO[key][i];
			if (entry["Name"]==name && entry["Zip"]==zip) {
				var sv = confirm("Note: If you have any unsaved usage or removal changes from this page, you must download and save those changes before proceeding to edit this entry. Do you wish to proceed?");
				if (sv == true) {
					var cookie = entry["Name"];
					cookie = cookie.concat("@@");
					cookie = cookie.concat(entry["Zip"]);
					jQuery.cookie("toEdit", cookie);
					window.open("EditContractors2");
				}
				break;
			}
		}
	}	
}


function rmEntry(name, zip) { //removes the selected contractor when a "Remove" button is pressed
	var entry;
	for (var key in CONTRACTOR_INFO) {
		for (var i=0; i<CONTRACTOR_INFO[key].length; i++) {
			entry = CONTRACTOR_INFO[key][i];
			if (entry["Name"]==name && entry["Zip"]==zip) {
				CONTRACTOR_INFO[key].splice(i,1);
				alert("Contractor removed successfully.");
				break;
			}
		}
	}
}
