<?php

header('Content-type: application/json');
require_once('connection.php');


$a = $_GET["a"];
$b = $_GET["b"];
$c = $_GET["c"];
$d = $_GET["d"];
$e = $_GET["e"];
$f = $_GET["f"];

//build query torun from view
$query_search = "
            SELECT 
                * 
            FROM 
                `zote` 
            where 
                constituen like '%" . $a . "%'  and 
                category like '%" . $b . "%'    and 
                day_or_boa like '%" . $c . "%'  and 
                gender like '%" . $d . "%'      and 
                ordinary_o like '%" . $e . "%'  and 
                sponsor like '%" . $f . "%';";
//$query_search = "SELECT * FROM population WHERE province='EASTERN'";
$result = mysql_query($query_search) or die(mysql_error());

$return_arr = array();
while ($row = mysql_fetch_array($result)) {



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
