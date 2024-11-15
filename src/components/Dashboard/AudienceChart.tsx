import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const AudienceChart: React.FunctionComponent = () => {
    const [chartData, setChartData] = useState<{ options: any; series: any[], labels: any[] }>({
        options: {
            labels: ['A', 'B', 'C', 'D', 'E']
        },
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    });

    return(
        <div className="rounded border shadow-md bg-white  p-4">
            <div className="text-lg font-bold">LES ETATS DES DEMANDES D'AUDIENCE</div>
            <ReactApexChart 
                options={chartData.options}  
                series={chartData.series}
                type="donut"
            />
        </div>
    )
}

export default AudienceChart;