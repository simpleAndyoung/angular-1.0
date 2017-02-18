<?php

		$res = json_decode(file_get_contents('php://input', 'r'), true);
		$conn = mysql_connect('localhost','root',123456);
			mysql_select_db('angular',$conn);
				//支持中文
		mysql_query("SET NAMES UTF8");
		// 检测传输的值是否为空
		function _post ($str) {
			$val = !empty($_POST[$str]) ? $_POST[$str] :null;
			return $val;
		}

		//获取数据库的数据数量
		$sql="SELECT COUNT(*) AS count FROM news";
		//查询数据库的返回
		$query=mysql_query($sql,$conn);


		if(mysql_num_rows( $query)){
		   $rs=mysql_fetch_array($query);
		   //统计结果
		   $count=$rs[0];
		}else{
		    $count=0;
		}
		//获取POST请求的数据
		$id=$count+1;
		$page = ceil(($count+1) / 5);
		$title = $res['title'];
		$writer = $res['writer'];
		$date = $res['date'];
		$content = $res['content'];

		$sql = "INSERT INTO news(id,page,title,writer,date,content) VALUES ({$id},{$page},'{$title}','{$writer}',{$date},'{$content}')";

		//执行sql语句，返回影响的条目数。
		// 
		$result = mysql_query($sql);
		if($result == 1){
			//保存成功
			$res = array(
				'errno' => 0 
				);
			echo json_encode($res);
		}