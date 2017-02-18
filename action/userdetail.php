<?php

$conn = mysql_connect("localhost","root","123456");

mysql_select_db("angular",$conn);

//支持中文
mysql_query("SET NAMES UTF8");

$id = $_GET['userId'];

$sql = "SELECT * FROM people WHERE id = {$id}";

$query = mysql_query($sql);

$data = mysql_fetch_assoc($query);

$result = array(
	"errno" => 0,
	"data" => $data
);
echo json_encode($result);
?>