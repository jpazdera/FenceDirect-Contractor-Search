function saveUpdates(data) {
	var data = JSON.stringify(data);
	data = data.concat(";");
	var front = "var CONTRACTOR_INFO = ";
	data = front.concat(data);
	
	//saveTextAsFile(data); //to download to client
	saveToServer(data); //to update server file directly
}


function saveToServer(info) {
	jQuery.ajax({
	  type: "POST",
	  url: "Non-Html/file_save_helper.py",
	  data: { "text": info},
	  dataType: 'html',
	  success: function( o ) {
	  	alert("Save successful!");
	  }
	});
	  
	/*jQuery.post({
  		url: 'Non-Html/contractor_info2.js',//url of receiver file on server
  		data: info, //your data
  		success: function(){alert("Save successful!");}, //callback when ajax request finishes
  		dataType: 'text'
	});*/
	/*var XML = "Non-Html/contractor_info.js";
	var xhr = new XMLHttpRequest();
	xhr.open( 'post', 'Non-Html/file_save_helper.php', true );
	xhr.send("D="+info+'&F='+XML);*/
}


//ALL CODE BELOW ADAPTED FROM http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
function saveTextAsFile(edited_info)
{
	var textToWrite = edited_info;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "contractor_info.js";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}