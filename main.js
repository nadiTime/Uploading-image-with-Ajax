var files; //global variable to store the file
	$('input[type=file]').on('change', function(e){
		files = event.target.files; //store the file
	});
	$('#uploadImage').click(function(){ 
		var data = new FormData(); //craeting formData to send to server
		var image = files[0];
		data.append('pic', image); //just copy everything below, change to url to your target
		$.ajax({
	        url: 'api/operations.php?image',
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: function(data, textStatus, jqXHR)
	        {
	            if(typeof data.error === 'undefined')
	            {
	                // Success so call function to process the form
	                submitForm(event, data);
	            }
	            else                                                    //error handling
	            {
	                // Handle errors here
	                console.log('ERRORS: ' + data.error);
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	            // Handle errors here
	            console.log('ERRORS: ' + textStatus);
	            // STOP LOADING SPINNER
	        }
  		});
	})
