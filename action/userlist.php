<?php

$conn = mysql_connect("localhost","root","123456");

mysql_select_db("angular",$conn);

//支持中文
mysql_query("SET NAMES UTF8");

$page = $_GET['pageNum'];

$sql = "SELECT * FROM people WHERE page = {$page}";
$query = mysql_query($sql);
$data = array();
while($rs = mysql_fetch_array($query)){
	$data[] = $rs;
}
 
$result = array(
	"errno" => 0,
	"data" => $data
);
echo json_encode($result);
