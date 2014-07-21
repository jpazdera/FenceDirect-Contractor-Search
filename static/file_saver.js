function saveUpdates(data) {
	var data = JSON.stringify(data);
	data = data.concat(";");
	var front = "var CONTRACTOR_INFO = ";
	data = front.concat(data);
	
	//saveTextAsFile(data); //if run on internal server
	saveToServer(data); //if accessing remote server
}


function saveToServer(info) {
	jQuery.ajax({
	  type: "POST",
	  url: "overwrite_data",
	  data: {"text": info},
	  dataType: "text",
	  success: function() {
	  	alert("Save successful!");
	  }
	});
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