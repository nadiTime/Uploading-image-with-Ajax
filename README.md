# Uploading-image-with-Ajax
Simple uploading file solution, client and server side

first the html:
```
<input type="file" name="pic" />
<button id="uploadImage">Upload</button>
```
unt now z javascript: just copy it all
```
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
        contentType: false, //jQuery will tell the server its a query string request
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
```
and finally server side:
```
if(isset($_GET['image'])){ 
	$target = 'pics/profile/';
	if(is_uploaded_file($_FILES['pic']['tmp_name'])){
		$ext = pathinfo($_FILES['pic']['name'], PATHINFO_EXTENSION);
		echo $ext;
		$name = $_SESSION['id'];
      	$status = array();
      	$answer = move_uploaded_file($_FILES['pic']['tmp_name'], $target.$name.".".$ext);
     	if(!$answer){
     		$status = array('success' => 0);
     	}
     	else{
     		$path = 'api/'.$target.$name.".".$ext;
     		updatePicture($path);
     		$status = array('success' => 1);

     	}
      	echo json_encode($status);
    }
}
```
Hope it helps

yours truly,

#Nadi

  
