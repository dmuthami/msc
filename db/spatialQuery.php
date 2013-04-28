<?php

header('Content-type: application/json');
require_once('connection.php');

$z = $_GET["z"];//Constituency
$y = $_GET["y"];//Sponsor
$x = $_GET["x"];//Gender
$w = $_GET["w"];//Day Or Boarding
$v = $_GET["v"];//Ordinary Special
$u = $_GET["u"];//Category

//Define the spatial query taking in a few parameters
$query_pg="
    
            with query1 as (
                    select
                            constituency.geom,
                            constituency.constituen
                    from
                            public.constituency
                    where
                            public.constituency.constituen = '" . $z . "'
            )
            select
                d.*
            from
                    (select
                            c.*
                    from

                            (select
                                    a.*,
                                    b.sponsor
                            from	

                                    school as a inner join sponsor as b
                            on
                                    a.sponsor_id = b.sponsor_id

                                    ) 
                            as c, query1
                    where
                            ST_Within(c.geom, query1.geom) = true)  as d
            where

                lower(category) like lower('%" . $u . "%')

                and	lower(sponsor) like lower('%" . $y . "%')

                and	lower(gender) like lower('%" . $x . "%')

                and	lower(day_or_boarding) like lower('%" . $w . "%')

                and	lower(ordinary_or_special) like lower('%" . $v . "%')

            order by
                    name asc
            ;
    ";
$buildQuery=$query_pg;
$result_pg = pg_query($conn, $buildQuery) or die("<font color='red'>Eeeek! Could not query</font>");
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
