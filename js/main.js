// DOM Objects 
let $mainInputs = $('#main-inputs');
let	$formContainer = $('#form-container');
let $addNewRowButton = $('#addNewRowButton');

// function to appending new row 
let addNewRow = function() {
	$formContainer.append('<div class="row" id="main-inputs">' + $mainInputs.html() + "</div>");
}

// Adding 3 rows by default 
for(let i=0; i<3; i++){
	addNewRow();
}

// Add new row when click the button
$addNewRowButton.click(function() {
	addNewRow();
});

// Knockoutjs ViewModel 
// Colecting values from the inputs 
