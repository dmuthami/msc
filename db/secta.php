<?php

header('Content-type: application/json');
require_once('connection.php');


$q = $_GET["q"];
/*
 * MYSQL Query
    $query_search = "SELECT * FROM shule where gender =  '" . $q . "'";
    //$query_search = "SELECT * FROM population WHERE province='EASTERN'";
    $result = mysql_query($query_search) or die(mysql_error());
    */
$query_pg = "SELECT * FROM shule where gender =  '" . $q . "'";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


$return_arr = array();
while ($row = pg_fetch_array($result_pg)) {

    $row_array['namez'] = $row['name'];
    $row_array['code'] = $row['school_cod'];
    $row_array['Longitude'] = $row['longg'];
    $row_array['Latitude'] = $row['latt'];
    $row_array['addressz'] = $row['address'];
    $row_array['gender'] = $row['gender'];
    $row_array['dayz'] = $row['day_or_boa'];
    $row_array['sponsor'] = $row['sponsor'];

    array_push($return_arr, $row_array);
}

echo json_encode($return_arr);
?>
