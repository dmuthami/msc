<script>
$(function () {
        $('#m_grade').highcharts({
            chart: {
                type: 'column',
                margin: [ 50, 50, 100, 80]
            },
            title: {
                text: 'Schools perfomance per grade'
            },
            xAxis: {
                categories: [
                    'A',
                    'A-',
                    'B+',
                    'B',
                    'B-',
                    'C+',
                    'C',
                    'C-',
                    'D+',
                    'D',
                    'D-',
                    'E',
                    'F'
                  
                ],
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of schools'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        ' '+ Highcharts.numberFormat(this.y, 1) +
                        ' Schools';
                }
            },
            series: [{
                name: 'Population',
                data: [4, 11, 20, 30, 49, 79, 19, 18, 18,
                    17, 20, 18, 15],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    x: 4,
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    });
	</script>