<script>
    $(function () {
        $('#m_gender').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true
            },
            title: {
                text: 'School distribution by gender'
            },
            tooltip: {
                pointFormat: ' <b>{point.percentage}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.y +' ';
                        }
                    }
                }
            },
            series: [{
                    type: 'pie',
                    name: 'gender',
                    data: [
                        ['BOYS',  
<?php
//$query2 = "SELECT COUNT(`name`) FROM `school` WHERE gender = 'BOYS ONLY';";
//$result2 = mysql_query($query2);

$query_pg = "SELECT COUNT(name) FROM school WHERE gender = 'BOYS ONLY';";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[0];
}
?>
                        ],
                        ['GIRLS',     
<?php
//$query2 = "SELECT COUNT(`name`) FROM `school` WHERE gender = 'GIRLS ONLY';";
//$result2 = mysql_query($query2);

$query_pg = "SELECT COUNT(name) FROM school WHERE gender = 'GIRLS ONLY';";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[0];
}
?>
                        ],
                   
                        ['MIXED',   
					
<?php
//$query2 = "SELECT COUNT(`name`) FROM `school` WHERE gender = 'MIXED';";
//$result2 = mysql_query($query2);

$query_pg = "SELECT COUNT(name) FROM school WHERE gender = 'MIXED';";
$result_pg = pg_query($conn, $query_pg) or die("<font color='red'>Eeeek! Could not query</font>");


//create combo box for webform
while ($row2 = pg_fetch_array($result_pg)) {
    echo $row2[0];
}
?>
                        ],
                    
                    ]
                }]
        });
    });
    

</script>