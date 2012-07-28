/*
  Polarion related functions
 */
 
var dataFields_de; // Todo
var dataFields_en = ["Type", "Author", "Priority", "Severity", "Error Version", "Target OS", "TV SW Packet", "Repair Version"];
var ctrl;
var t;
var s;


// finds ID and returns it
function findID() {
	var items = document.getElementsByTagName("span");

	for (i=0; i < items.length; i++) {
		if (items[i].firstChild && items[i].firstChild.tagName == "SPAN") {								
			return items[i].firstChild.innerText;
		}
	}
	
	return "";
}

// checks if the span with copyright exists
function SpanExists() {
	var items = document.getElementsByTagName("td");

	for (i=0; i < items.length; i++) {
		if (items[i].innerText.match(/Powered by Polarion/gi)) {
			return true;
		}
	}
	
	return false;
}

// finds the Polarion Copyright notice and dispatches it back to the global page
function findPolarionCopyright() {
	shortcut.remove("Ctrl+Shift+P");
	console.log("find the Polarion Copyright");
	if (SpanExists()) {
		console.log("found copyright");
		var polarionID = findID();
		console.log("id: " + polarionID);
		if (polarionID == "") {
			safari.self.tab.dispatchMessage("polarionID", "not found");	
		} else {
			safari.self.tab.dispatchMessage("polarionID", polarionID);
			shortcut.add("Ctrl+Shift+P",function() {
				findPolarionData();
			});	
		}
	} else {
		console.log("didn't find copyright");
		safari.self.tab.dispatchMessage("polarionID", "not found");
	}
}

// iterates through "td" tags and finds the column with the content matching the passed name
function findCol(name) {
	var items = document.getElementsByTagName("td");

	for (i=0; i < items.length; i++) {
		if (items[i].innerText == (name + ":")) {
			var cols = items[i].nextSibling.childNodes;
			for (j=0; j < cols.length; j++) {
				var col = cols[j]
			  	if (col.tagName == "SPAN") {								
					return col.innerText;
			  	}
			}	
			return items[i].nextSibling.innerText;
		}		
	}
	
	return "";
}

function findCreatedDate() {
	// en - "Created: "
	var name = "Created: ";
	var items = document.getElementsByTagName("div");
	for (i=0; i < items.length; i++) {
		if (items[i].firstChild.textContent == name) {
			return items[i].lastElementChild.innerText;
		}		
	}
	return "";
}

function findDescription() {
	// en - "Description"
	var name = "Description";
	var items = document.getElementsByTagName("tr");
	for (i=0; i < items.length; i++) {
		if (items[i].firstChild.innerText == name) {
			return items[i].nextSibling.firstChild.innerText;
		}		
	}
	return "";
}

function findLink() {
	var items = document.getElementsByTagName("a");
	for (i=0; i < items.length; i++) {
		if (items[i].hash.charAt(0) == "#") {
			return items[i].hash;
		}		
	}
	return "";
}

function findTitle() {
	var items = document.getElementsByTagName("span");

	for (i=0; i < items.length; i++) {
		if (items[i].firstChild && items[i].firstChild.tagName == "SPAN") {								
			return items[i].innerText;
		}
	}
	
	return "";
}

function addOverlay() {
	ctrl = getBusyOverlay("viewport", {color: 'black', opacity: 0.5, text: 'Copying...', style: 'font-weight: bold;font-family: Helvetica;color: black;'});
	t = setTimeout("ctrl.settext('Done!')", 400);
	s = setTimeout("ctrl.remove()", 600);
}

// finds the polarion data of the columns defined in dataFields_en 
// and dispatches it back to the global page global.html
function findPolarionData() {
	console.log("find polarionData");
	addOverlay();
	
	var error_type = findCol(dataFields_en[0]);
	if (error_type != "") {
		data = [error_type, findCol(dataFields_en[1]), findCol(dataFields_en[2]), findCol(dataFields_en[3]), findCol(dataFields_en[4]), findCol(dataFields_en[5]), findCol(dataFields_en[6]), findCol(dataFields_en[7])];
		data[8] = findCreatedDate();
		data[9] = findDescription();
		data[10] = findLink();
		data[11] = findTitle();
		safari.self.tab.dispatchMessage("polarionData",data);
		return;
	}
	safari.self.tab.dispatchMessage("polarionData",new Array());
}

/*
  Github issues related functions
 */

// inserts the data passed in the array into the "new github issue" page 
// using dataFields_en
function insertPolarionData(data_array) {
	document.getElementById("issue_title").focus();
	// set title
	document.getElementById("issue_title").value = data_array[11];
	// set body
	var desc_with_blockquote = data_array[9].replace(/\n\n/g, "\n\n>");
	var date_blockquote = "\n\n> _Creation Date_: " + data_array[8];	
	var type_blockquote = "\n\n> _" + dataFields_en[0] + "_: " + data_array[0];
    var author_blockquote = "\n\n> _" + dataFields_en[1] + "_: " + data_array[1];
    var prio_blockquote = "\n\n> _" + dataFields_en[2] + "_: " + data_array[2];
    var severity_blockquote = "\n\n> _" + dataFields_en[3] + "_: " + data_array[3];
    var error_version_blockquote = "\n\n> _" + dataFields_en[4] + "_: " + data_array[4];    
    var target_version_os_blockquote = "\n\n> _" + dataFields_en[5] + "_: " + data_array[5];
    var tv_sw_version_blockquote = "\n\n> _" + dataFields_en[6] + "_: " + data_array[6];
    var repair_version_blockquote = "\n\n> _" + dataFields_en[7] + "_: " + data_array[7];                        
	var body = "\n\n\n\n_Polarion Info_:\n\n>" + desc_with_blockquote + "\n\n>" + 
				date_blockquote + 
				type_blockquote + 
				author_blockquote + 
				prio_blockquote +				
				severity_blockquote +  
				error_version_blockquote +
				target_version_os_blockquote +
				tv_sw_version_blockquote +
				repair_version_blockquote +												 
				"\n\n>[ID: " + data_array[12] + "](" + data_array[10] + ")";
	document.getElementsByTagName("textarea")[0].value = body;	
}

/*
  Common stuff
 */

function performMessage(theMessageEvent) {
	console.log("message received");	
   	if (theMessageEvent.name === "polarion_copyright") {
    	console.log("polarion_copyright");
   		findPolarionCopyright();
   	} else if (theMessageEvent.name === "polarionData") {
   		console.log("polarionData");
   		findPolarionData();   		
   	} else if (theMessageEvent.name === "insertPolarionData") {
   		console.log("insertPolarionData");
   		insertPolarionData(theMessageEvent.message);   		
   	}
}

safari.self.addEventListener("message", performMessage, false);
shortcut.add("Ctrl+Shift+O",function() {
	safari.self.tab.dispatchMessage("performInsert","");
});	