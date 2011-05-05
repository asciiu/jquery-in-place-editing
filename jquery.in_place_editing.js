jQuery.fn.in_place_editing = function(options) {
		
	var settings = {
		handleImage: "sample.png",
		handleWidth: "15px",
		handleHeight: "15px"
	};
	
	// extend the settings with options
	jQuery.extend(settings,options);
	
	// wrap the inner 
	$(this).wrapInner('<span class="editable_content" />').prepend('<img style="width:15px;height:15px;position:relative;top:-4;padding-left:7px;opacity:1" src='+settings.handleImage+' class="editable_handle">');
	
	// on click handler
	$("img.editable_handle").click(function() {
		// the next sibling will be the span that wraps the editable text
		var $editableElement = $(this.nextSibling);
		
		// keep track of object state
		$editableElement.data('editing',true);
		$editableElement.data('text',$editableElement.html());		    
		
		$editableElement.prop("contentEditable",true);
		$editableElement.focus();
	});
	
	$("span.editable_content").blur(function() {
		$this = $(this);
		
		// turn off editing
		$this.prop("contentEditable",false);
		
		// were we editing while the element lost focus
		if($this.data('editing')) {
		  // set content text
		  $this.html($this.data('text'));
		  // reset editing flag
		  $this.data('editing',false);
		} 
	});
	
	$("span.editable_content").keypress(function(event) {
		// return key code
		if(event.keyCode == 13) {			
			// these are invalid states for the new value
			if(this.innerHTML == '' || this.innerHTML == '<br>') {
				// return the field back to it's original value
				this.blur();
				return;
			}
			
			// set new value of text
			$(this).data('text',this.innerHTML);

			this.blur();   
		}
	});
}