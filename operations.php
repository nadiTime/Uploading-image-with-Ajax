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
