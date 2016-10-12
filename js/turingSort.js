//declare our our global variables
items = []
lptr = -1;
rptr = -1;
start = -1;

//Install our enter key handler
$('new_item').addEventListener("keyup", function(event){
	event.preventDefault();
	if(event.keyCode == 13) {
		addItem();
	}
});

//DOM Manipulation Functions
function addItem() {
	text =	$('new_item').value;
	items.push(text);
	addItemRow(items.length, text);
	text = $('new_item').value = "";
}

function addItemRow(rank, text) {
	$add($('item_table_body'),
 		TR({}, 
			TD({}, rank),
			TD({}, text)
		)
	);
}

function clearList() {
	if(confirm("Are you sure you want to clear the list?")) {
		items = [];
		$remove($$('tbody tr'));
	}
}

function refreshTable() {
	$remove($$('tbody tr'))
	for(i = 0; i < items.length; i++) {
		addItemRow(i+1, items[i]);
	}
}

function setButtonsDisable(bool) {
		$('left').disabled = bool;
		$('right').disabled = bool;
}

function setButtonText(ltext, rtext) {
	$setHTML($('left'), ltext ? ltext : items[lptr]);
	$setHTML($('right'), rtext ? rtext : items[rptr]);
}
//Turing Sort Functions
function beginSort() {
	start = 0;
	if(nextPass()) {
		setButtonText();
		setButtonsDisable(false);
	}
}

function nextPass() {
	start += 1
	if(start == items.length) {
		setButtonsDisable(true);
		refreshTable();
		setButtonText("Left", "Right");
		alert("Turing Sort Complete!");
		return false;
	} else {
		lptr = start - 1;
		rptr = start;
		return true;
	}
}

function swap(i, j) {
	temp = items[i]
	items[i] = items[j]
	items[j] = temp;
}

function tsLeft() {
	cont = nextPass();
	if(cont) {
		setButtonText();
	}
}

function tsRight() {
	swap(lptr, rptr);
	cont = true;
	if(lptr == 0)
	{
		cont = nextPass();
	} else {
		lptr -= 1;
		rptr -= 1;
	}
	setButtonText();
}
