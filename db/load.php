<?php

header('Content-type: application/json');
require_once('connection.php');


$q = $_GET["q"];

/*
 *  MySQL Queries
    $query_search = "SELECT * FROM shule WHERE category = " . $q . "";
    //$query_search = "SELECT * FROM population WHERE province='EASTERN'";
    $result = mysql_query($query_search) or die(mysql_error());
*/
$query_pg = "SELECT * FROM shule WHERE category = " . $q . "";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");

$return_arr = array();
while ($row = pg_fetch_array($result_pg)) {

    $row_array['namez'] = $row['name'];
    $row_array['code'] = $row['school_code'];
    $row_array['Longitude'] = $row['longg'];
    $row_array['Latitude'] = $row['latt'];
    $row_array['addressz'] = $row['address'];
    $row_array['gender'] = $row['gender'];
    $row_array['dayz'] = $row['day_or_boarding'];
    $row_array['category'] = $row['category'];
    $row_array['ordinary_or_special'] = $row['ordinary_or_special'];
    $row_array['enrollment'] = $row['enrollment'];
    $row_array['teaching_staff'] = $row['teaching_staff'];
    $row_array['pupil_teacher_ratio'] = $row['pupil_teacher_ratio'];
    $row_array['acreage'] = $row['acreage'];
    $row_array['tsc_male_teachers'] = $row['tsc_male_teachers'];
    $row_array['tsc_female_teachers'] = $row['tsc_female_teachers'];
    $row_array['sponsor'] = $row['sponsor'];


    array_push($return_arr, $row_array);
}


echo json_encode($return_arr);
?>
