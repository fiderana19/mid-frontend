import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAudienceChart } from '../../api/dashboard';

const AudienceChart: React.FunctionComponent = () => {
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )
    const [chartData, setChartData] = useState<{ options: any; series: any[], labels: any[] }>({
        options: {
            labels: []
        },
        series: [],
        labels: []
    });


    
    //fetching value for the chart
    useEffect(() => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
        fetchRequestChart();        
    }, []);

    async function fetchRequestChart() {
        const response = await getAudienceChart(access_token);
        console.log(response);
        const newchartData = 
        {
            options: {
                labels: ['Fixé', 'Annulé', 'Reporté'],
                colors: ['#2EB872', '#FF5D6E', '#37AFE1']
            },
            series: [response.data.total_fixed, response.data.total_canceled, response.data.total_postponed],
            labels: ['Fixé', 'Annulé', 'Reporté'],
            colors: ['#2EB872', '#FF5D6E', '#37AFE1']
    }
        setChartData(newchartData);
    }

    return(
        <div className="rounded border shadow-md bg-white  p-4 h-full">
            <div className="text-lg font-latobold">AUDIENCES</div>
            <ReactApexChart 
                options={chartData.options}  
                series={chartData.series}
                type="donut"
            />
        </div>
    )
}

export default AudienceChart;