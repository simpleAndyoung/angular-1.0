<?php
	// function _post($str){ 
	// 	$val = !empty($_POST[$str]) ? $_POST[$str] : null; 
	// 	return $val; 
	// }
	$res = json_decode(file_get_contents('php://input', 'r'), true);
	$conn = mysql_connect("localhost","root","123456");

	mysql_select_db("angular",$conn);

	//支持中文
	mysql_query("SET NAMES UTF8");

	//获取数据库的数据数量
	$sql="SELECT COUNT(*) AS count FROM people";
	$query=mysql_query($sql,$conn);

	if(mysql_num_rows( $query)){
	   $rs=mysql_fetch_array($query);
	   //统计结果
	   $count=$rs[0];
	}else{
	    $count=0;
	}
	
	

	// // //获取POST请求的数据
	$id=$count+1;
	$page = ceil(($count+1) / 5);
	$username = $res['username'];
	$password = $res['password'];
	$tel = $res['tel'];
	$sex = $res['sex'];
	$info = $res['info'];
	// echo $username;


	// $input = file_get_contents('php://input');


	//获取POST请求的数据
	// $username = $input['username'];
	// $password = $input['password'];
	// $tel = $input['tel'];
	// $sex = $input['sex'];
	// $info = $input['info'];

	$sql = "INSERT INTO people(id,page,username,tel,password,sex,info) VALUES ({$id},{$page},'{$username}','{$tel}','{$password}','{$sex}','{$info}')";
	// //执行sql语句，返回影响的条目数。
	$result = mysql_query($sql);

	if($result == 1){
		//保存成功
		$res = array(
			'errno' => 0 
			);
		echo json_encode($res);
	}
	
?>