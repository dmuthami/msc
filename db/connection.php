<?php
$hostname_localhost ="localhost";
$database_localhost ="msc";
$username_localhost ="root";
$password_localhost ="root";

$localhost = mysql_connect($hostname_localhost,$username_localhost,$password_localhost)
or
trigger_error(mysql_error(),E_USER_ERROR);

 mysql_select_db($database_localhost,$localhost);
 /*
  * Postgres Sql code shown below
  */
 
 $conn = pg_connect("dbname='fgs722_v2' host='localhost' port='5432' user='postgres' password='Q4jqt3ee9H'")
        or die("<font color='red'>Eeeek! Could not connect to cso satabase</font>");
 
 
?>
