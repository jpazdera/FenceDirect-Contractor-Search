function autoClean() {
 	var updated = CONTRACTOR_INFO;
					
	var month_dict = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6, "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12};
	var today = new Date();
	var this_month = today.getMonth() + 1;
	var this_year = today.getFullYear();
	
	var i;
	var n = 0; //counts number of removed entries
	var entry;
	var entry_month;
	var entry_year;
	
	for (zip in updated) {
		for (i=0; i<updated[zip].length; i++) {
			entry = updated[zip][i];
			entry_month = entry["Last Use"].slice(0,3);
			entry_month = month_dict[entry_month];
			entry_year = entry["Last Use"].slice(4);
			entry_year = parseInt(entry_year) + 2000; //this will need to be updated after the year 2100
			
			if ((this_year - entry_year > 5) || ((this_year - entry_year == 5) && (this_month - entry_month > 0))) {
				updated[zip].splice(i,1);
				n += 1;
				i -= 1;
			}
		}
		if (updated[zip].length == 0) {
			delete updated[zip];
		}
	}
	
	if (n > 0) {
		var alert = "Auto-Clean has found "; //give message stating number of contractors removed, and ask if user wants to download
		alert = alert.concat(n.toString());
		if (n == 1) {
			alert = alert.concat(" entry that has not been used in 5 years or more. Would you like to remove it?");
		} else {
			alert = alert.concat(" entries that have not been used in 5 years or more. Would you like to remove them?");
		}
		var dl = confirm(alert);					
		if (dl == true) {
			saveUpdates(updated); //save updated contractor list
		}
	}
}