<?php

// header("Content-type: text/html; charset=utf-8");

	$res = json_decode(file_get_contents('php://input', 'r'), true);
	session_start();
    		$_SESSION['username'] = $res['username'];
			$_SESSION['password'] = $res['password'];
	$name=$res['username'];
	$conn=mysql_connect("localhost","root","123456");
	mysql_select_db("angular",$conn);
	mysql_query('SET NAMES UTF8');
	$sql="SELECT * FROM people WHERE username='{$name}'";
	$result=mysql_query($sql);
	$row=mysql_fetch_array($result);
		if($row['password']===$_SESSION['password']){
			$opt = array('errno' => 0,
			 			'data' => array(
			 				'username' => $row['username']));
    		echo json_encode($opt); 

			}else{
				echo(-1);
		}


//登录成功
// $_SESSION['username'] = $_POST['username'];
// $_SESSION['userid'] = $_POST['password'];