import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "التأخير",
                data: [10, 41, 35, 51,69, 91, 148]
            },
            {
                name: "الغياب",
                data: [ 99, 30, 60, 49, 10, 100, 69]
            },
            {
                name: "الحضور",
                data: [70, 49, 44, 67, 101, 94, 30]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'],
                }
            }
        };
    }

    render() {
        return (
            <div>
                
                        <div id="chart">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                        </div>
                        <div id="html-dist"></div>
                   
            </div>
        );
    }
}

export default ApexChart;
