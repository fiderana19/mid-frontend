import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRequestChart } from '../../api/dashboard';
import { LoadingOutlined } from '@ant-design/icons';

const RequestChart: React.FunctionComponent = () => {
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
    const response = await getRequestChart(token);
    
    const newchartData = 
    {
        options: {
            labels: ['Accepté', 'Refusé', 'En attente'],
            colors: ['#73EC8B', '#FF5D6E', '#FFEB55']
        },
        series: [response.data.total_accepted, response.data.total_denied, response.data.total_waiting],
        labels: ['Accepté', 'Refusé', 'En attente'],
        colors: ['#73EC8B', '#FF5D6E', '#FFEB55']
    }
    setChartData(newchartData);
    setIsLoading(false);
  }


    return(
        <div className="rounded border bg-white shadow-md p-4 h-full">
            <div className="text-lg font-latobold">DEMANDES D'AUDIENCE</div>
            {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            {/* <ReactApexChart 
                options={chartData.options}  
                series={chartData.series}
                type="donut"
            /> */}
        </div>
    )
}

export default RequestChart;