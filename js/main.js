// DOM Objects 
let $mainInputs = $('#main-inputs-0');
let	$formContainer = $('#form-container');
let $addNewRowButton = $('#addNewRowButton');

// Row's Index Tracking Variable
let rowIndex = 1; 

// Function to append new row 
let addNewRow = function(index) {
	$formContainer.append('<div class="row" id="main-inputs-' + index + '">' + 
		                  $mainInputs.html() + "</div>");
}

// Adding 3 rows on pageload
for(let i=1; i<4; i++){
	addNewRow(i);
	rowIndex = i; // Increasing Row Index by 1 with each iteration
}

// On click button add new row
$addNewRowButton.click(function() {
	addNewRow(rowIndex + 1);
	// Bind the new row with new instance of the singleRowViewModel
	viewModelInstance = new singleRowViewModel;
	ko.applyBindings(viewModelInstance, 
		             document.getElementById('main-inputs-'+(rowIndex + 1)));
	
	// push the row's result to the finalResultViewModelInstance
	finalResultViewModelInstance.observablearray.push(viewModelInstance.rowResult);
    
    // Increasing Row Index by 1
    rowIndex = rowIndex + 1;
});



// Knockoutjs ViewModels
// ViewModel for final result
let finalResultViewModel = function() {
	  let self = this;
	  // An observable array to hold each row's result 
	  self.observablearray = ko.observableArray();
	  
	  // An array to hold each row's result after value change
	  let lastChangedValues = [];
	  
	  // function to caculate the sum of array values
	  lastChangedValues.sum = function () {
	  	    let result = 0;
	  	    for(let i=0; i < lastChangedValues.length; i++){
        	   result = result + lastChangedValues[i]
        	}
        	return result;
      }
      /* Pushing the last results after value change to lastChangedValues array
		And returning the result
      */
      self.finalResult = ko.computed(function() {
      	    for(let i=0; i < self.observablearray().length; i++){
        	   lastChangedValues[i] = self.observablearray()[i]();
        	}
        	return  lastChangedValues.sum();
        		
    	}, self);
};
let finalResultViewModelInstance = new finalResultViewModel;
ko.applyBindings(finalResultViewModelInstance, document.getElementById('result'));

// ViewModel to calculate the result of each row
let singleRowViewModel = function() {
	let self = this;
	    self.quantity =  ko.observable(0);        
        self.capacity =  ko.observable(0);
        self.dailyOperatingHours =  ko.observable(0);

        this.rowResult = ko.computed(function() {
        	return (self.quantity() * self.capacity() * self.dailyOperatingHours());
    	}, self);
}
// Binding new instance for each row
for(let i=0; i <= rowIndex; i++){
  viewModelInstance = new singleRowViewModel;
  ko.applyBindings(viewModelInstance, document.getElementById('main-inputs-'+i));
  finalResultViewModelInstance.observablearray.push(viewModelInstance.rowResult);
};










