import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRequestChart } from '../../api/dashboard';

const RequestChart: React.FunctionComponent = () => {
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
    const response = await getRequestChart(access_token);
    
    const newchartData = 
    {
        options: {
            labels: ['Accepté', 'Refusé', 'En attente'],
            colors: ['#2EB872', '#FF5D6E', '#FBFF00']
        },
        series: [response.data.total_accepted, response.data.total_denied, response.data.total_waiting],
        labels: ['Accepté', 'Refusé', 'En attente'],
        colors: ['#2EB872', '#FF5D6E', '#FBFF00']
    }
    setChartData(newchartData);
  }


    return(
        <div className="rounded border bg-white shadow-md p-4 h-full">
            <div className="text-lg font-latobold">DEMANDES D'AUDIENCE</div>
            <ReactApexChart 
                options={chartData.options}  
                series={chartData.series}
                type="donut"
            />
        </div>
    )
}

export default RequestChart;