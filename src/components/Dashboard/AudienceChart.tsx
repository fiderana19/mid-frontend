import { useEffect, useState } from 'react';
import { getAudienceChart } from '../../api/dashboard';
import { LoadingOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

const AudienceChart: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        if(token) {
            setAccessToken(token);
        }
        fetchRequestChart();        
    }, []);

    async function fetchRequestChart() {
        const token = localStorage.getItem('token');
        const response = await getAudienceChart(token);
        const newchartData = 
        {
            options: {
                labels: ['Fixé', 'Annulé', 'Reporté', 'Absent', 'Classé'],
                colors: ['#37AFE1', '#FF5D6E', '#FFEB55', '#A6AEBF', '#73EC8B']
            },
            series: [response.data.total_fixed, response.data.total_canceled, response.data.total_postponed, response.data.total_missed, response.data.total_closed],
            labels: ['Fixé', 'Annulé', 'Reporté', 'Absent', 'Classé'],
            colors: ['#37AFE1', '#FF5D6E', '#FFEB55', '#A6AEBF', '#73EC8B']
        }
        setChartData(newchartData);
        setIsLoading(false);
    }

    return(
        <div className="rounded border shadow-md bg-white  p-4 h-full">
            <div className="text-lg font-latobold">AUDIENCES</div>
            {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            {/* <ReactApexChart 
                options={chartData.options}  
                series={chartData.series}
                type="donut"
            /> */}
        </div>
    )
}

export default AudienceChart;