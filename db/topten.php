<?php

header('Content-type: application/json');
require_once('connection.php');


//$q = $_GET["q"];
//$y = $_GET["y"];
//$q = "2010";
//$y = "10";
$q = $_GET["q"];
$y = $_GET["y"];
$z = $_GET["z"];
/*
﻿SELECT 
  mean_score.school_code,
  school.name,  
  mean_score.mean_score, 
  mean_score.year,
  ST_AsText(school.geom) as geom
FROM 
  public.mean_score, 
  public.school

WHERE 
  mean_score.school_code = school.school_code AND
  mean_score.year = '2010'
ORDER BY
  mean_score.mean_score DESC
  limit 10;
 * 
 */

 $topten= "
     SELECT 
        mean_score.school_code,
        c.name,  
        c.address, 
        c.gender, 
        c.latt, 
        c.longg,
        c.day_or_boarding,
        c.sponsor,
        mean_score.mean_score, 
        mean_score.year,
        ST_AsText(c.geom) as geom
      FROM 
        public.mean_score, 
        (select
		a.*,
		b.sponsor
	from	

		school as a inner join sponsor as b
	on
		a.sponsor_id = b.sponsor_id
		
	) 
	as c
      WHERE 
        mean_score.school_code = c.school_code AND
        mean_score.year = '" . $y . "'
      ORDER BY
        mean_score.mean_score DESC
        limit '" . $z . "';";

  $toptenGirls= "
     SELECT 
        mean_score.school_code,
        c.name,  
        c.address, 
        c.gender, 
        c.latt, 
        c.longg,
        c.day_or_boarding,
        c.sponsor,
        mean_score.mean_score, 
        mean_score.year,
        ST_AsText(c.geom) as geom
      FROM 
        public.mean_score, 
        (select
		a.*,
		b.sponsor
	from	

		school as a inner join sponsor as b
	on
		a.sponsor_id = b.sponsor_id
		
	) 
	as c
      WHERE 
        mean_score.school_code = c.school_code AND
        c.gender = 'GIRLS ONLY' AND
        mean_score.year = '" . $y . "'
      ORDER BY
        mean_score.mean_score DESC
        limit '" . $z . "';";
       
    $toptenBoys= "
     SELECT 
        mean_score.school_code,
        c.name,  
        c.address, 
        c.gender, 
        c.latt, 
        c.longg,
        c.day_or_boarding,
        c.sponsor,
        mean_score.mean_score, 
        mean_score.year,
        ST_AsText(c.geom) as geom
      FROM 
        public.mean_score, 
        (select
		a.*,
		b.sponsor
	from	

		school as a inner join sponsor as b
	on
		a.sponsor_id = b.sponsor_id
		
	) 
	as c
      WHERE 
        mean_score.school_code = c.school_code AND
        c.gender = 'BOYS ONLY' AND
        mean_score.year = '" . $y . "'
      ORDER BY
        mean_score.mean_score DESC
        limit '" . $z . "';";
  
if ($q=='1'){
  $query_pg = $topten;  
}else if ($q=='2'){
    $query_pg = $toptenGirls; 
}else {
    $query_pg = $toptenBoys; 
}
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
    $row_array['sponsor'] = $row['sponsor'];

    array_push($return_arr, $row_array);
}

echo json_encode($return_arr);
?>
