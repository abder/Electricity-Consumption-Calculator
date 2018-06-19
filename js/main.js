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
// Adding 3 more rows on pageload
for(let i=1; i<4; i++){
  if ($('body').width() > 576 ){
	     addNewRow(i);
  }
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
        	   result = result + lastChangedValues[i];
        	}
        	return result;
      	}
      
      /* Pushing the last results after value change to lastChangedValues array
		And returning the result
      */
      self.totalConsumption = ko.computed(function() {
      	    for(let i=0; i < self.observablearray().length; i++){
        	   lastChangedValues[i] = self.observablearray()[i]();
        	}
        	return lastChangedValues.sum();		
    	}, self);
      
      // Loss of efficiency is 30% more 
      self.totalConsumptionWithLossOfEfficiency = ko.computed(function() {
      	    let sum = self.totalConsumption();
        	return  (sum + sum * 30 / 100);		
    	}, self);

};
let finalResultViewModelInstance = new finalResultViewModel;
ko.applyBindings(finalResultViewModelInstance, document.getElementById('result'));

// ViewModel to calculate the result of each row
let singleRowViewModel = function() {
	      let self = this;
	      self.quantity =  ko.observable();        
        self.capacity =  ko.observable();
        self.dailyOperatingHours =  ko.observable();
        self.rowResult = ko.computed({
        	read: function () {
            if (isNaN(self.quantity()) || isNaN(self.capacity()) || isNaN(self.dailyOperatingHours())) {
            return 0;
            } else {
            let result = self.quantity() * self.capacity() * self.dailyOperatingHours();
          	return result; }

      	   }, 
          write: function (value) {
            self.quantity(value);
          },
            owner: self
        });

        self.removeRow = function(ele, event) {
          ele.rowResult(0);
          let rowNode = event.currentTarget.parentNode.parentNode;
          $(rowNode).detach();  
        }
}
// Binding new instance for each row
for(let i=0; i <= rowIndex; i++){
  viewModelInstance = new singleRowViewModel;
  ko.applyBindings(viewModelInstance, document.getElementById('main-inputs-'+i));
  finalResultViewModelInstance.observablearray.push(viewModelInstance.rowResult);
};



/* PDF print */
$("#printPDF").click(function () {
            window.print();
}); 
