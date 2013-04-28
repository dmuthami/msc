<script>
    /*
     * Displays information about school sponsors
     */
    $(function () {
        $('#m_sponsor').highcharts({
            chart: {
                type: 'line',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Schools Perfomance',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: nitaandika baadaye',
                x: -20
            },
            xAxis: {
                categories: ['2006', '2007', '2008', '2009', '2010', '2012',
                ]
            },
            yAxis: {
                title: {
                    text: 'Grade'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: [{
                    name: 'A',
                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'A' GROUP BY `year`;";
//$result2 = mysql_query($query2); 

$query_pg = "SELECT  year , COUNT(name) AS ras 
                        FROM grades WHERE grade_attained = 'A' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");

//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                                    ]}, 
                                {
                                    name: 'A-',
                                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'A-' GROUP BY `year`;";
//$result2 = mysql_query($query2); 

$query_pg = "SELECT  year , COUNT(name) AS ras 
                                FROM grades WHERE grade_attained = 'A-' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");

//create combo box for webform
while ($row2 = mysql_fetch_array($result2)) {
    echo $row2[1] . ",";
}
?>
                                            ]
                                        },{
                                            name: 'B+',
                                            data: [
<?php

//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'B+' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'B+' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                    ]
                },
                {
                    name: 'B',
                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'B' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'B' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");



//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                                          ]
                                      },{
                                          name: 'B-',
                                          data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'B-' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'B-' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                    ]
                }, {
                    name: 'C+',
                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'C+' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'C+' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                    ]
                }, {
                    name: 'C',
                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'C' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'C' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                    ]
                },{
                    name: 'C-',
                    data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'C-' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'C-' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");

//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                    ]
                },{
                    name: 'D+',
                    data: [<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'D+' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'D+' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>]
                    },{
                        name: 'D',
                        data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'D' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'D' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                        ]
                    },{
                        name: 'D-',
                        data: [
<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'D-' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'D-' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>
                        ]
                    },{
                        name: 'E',
                        data: [<?php
//$query2 = "SELECT  year , COUNT(`name`) AS ras FROM `grades` WHERE grade_attained = 'E-' GROUP BY `year`;";
//$result2 = mysql_query($query2);

$query_pg = "SELECT  year , COUNT(name) AS ras 
    FROM grades WHERE grade_attained = 'E' GROUP BY year;";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[1] . ",";
}
?>]
                        },]
                });
            });
    
</script>