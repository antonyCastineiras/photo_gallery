$( document ).ready( function() {

	// append new image containers to the document until the gallery element is no longer fully in view 
	while( isScrolledIntoView( $('.gallery') ) ) {
		new ImageContainer( $('.gallery') );
	}

	// when the document is scrolled
	$(document).scroll(function() {

		// check if the gallery is scrolled into view
		if ( isScrolledIntoView( $('.gallery') ) ) {
			// create a new image container 
			ic = new ImageContainer( $('.gallery') );
		}
		
	})
});

// Function for checking if the bottom of the element is scrolled into view
function isScrolledIntoView(element) {
	// stores the number of pixels between the top of the document and the current view
	docViewTop = $(window).scrollTop();
	// adds the docViewTop to the height of the window to return the bottom position of the current view  
	docViewBottom = docViewTop + $(window).height();

	// determine the elements top position relative to the document
	elementTop = $(element).offset().top;
	// determine the elements bottom position relative to the document
	elementBottom = elementTop + $(element).height();

	// if the elements bottom position is within the current view return true
	return  elementBottom <= docViewBottom;
}

// Constructor method that deals with appending an image container to a parent container 
function ImageContainer(parentContainer) {
	// sets the objects parent container to the passed in parent container 
	this.parentContainer = $(parentContainer);
	// creates a new div element that will be appended to the objects parent container
	this.element = $('<div>', {
		class: 'image-container'
	});
	// creates a new image layout to handle the layout of the images
	this.layout = new ImageLayout(this),
	// init function that runs on object creation after all variables have been set
	this.init()
}

// Sets the behaviour of the object when it is created
ImageContainer.prototype.init = function() {
	this.parentContainer.append(this.element);
};

// LAYOUTS

// Constructor method for creting an object that deals with the layout of elemnts
function ImageLayout(imageContainer) {
	// sets the the objects image cotainer to the passed in container
	this.imageContainer = imageContainer,
	// assigns a random layout from the layout list
	this.layoutType = this.selectLayoutType(),
	this.init()
}

// returns an array of constructor method names. Separated into its own function for ease of adding new layouts 
ImageLayout.prototype.layoutList = function() {
	return [FirstLayout, SecondLayout, ThirdLayout]
};

// generates a random number based on the current number of layouts and returns a new instance
ImageLayout.prototype.selectLayoutType = function() {
	layoutList = this.layoutList();
	rand = Math.floor( Math.random() * layoutList.length )

	selectedLayout = layoutList[rand]
	return new selectedLayout(this) 
};

// targets the layouts image container and appends the selected layouts elements to the image container element
ImageLayout.prototype.appendElements = function() {
	imageContainer = this.imageContainer.element;
	for(i=0; i<this.layoutType.imageCount; i++) {
		newElement = $('<div>', {class: 'image'})
		$(imageContainer).append( $(newElement).hide().delay(500).fadeIn(1000) )
	}
};

// sets the class of the parent image container to the layouts name
ImageLayout.prototype.setClassName = function() {
	$(this.imageContainer.element).addClass(this.layoutType.className)
}

// Sets the behaviour of the object when created
ImageLayout.prototype.init = function() {
	this.appendElements();
	this.setClassName();
};


// Constructor method for the first layout
function FirstLayout() {	
	this.className = 'first-layout',
	this.imageCount = 2	
}

// Constructor for the second layout
function SecondLayout() {
	this.className = 'second-layout',
	this.imageCount = 3
}

// Constructor for the third layout
function ThirdLayout() {
	this.className = 'third-layout',
	this.imageCount = 4
}
