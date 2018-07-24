$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#markerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		name : $("#lcp").val(),
			addr :  $("#addr").val(),
			lat : $("#lat").val(),
			lng : $("#lng").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "http://localhost:8081/add_marker",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(user) {
				$("#postResultDiv").html("<p>" + 
					"Posted Successfully!");
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#lcp").val("");
		$("#addr").val("");
		$("#lat").val("");
		$("#lng").val("");
    }
})