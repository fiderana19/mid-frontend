import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LoadingOutlined } from '@ant-design/icons';
import useGetRequestForChart from '@/hooks/useGetRequestForChart';

const RequestChart: React.FunctionComponent = () => {
    const { data, isLoading } = useGetRequestForChart();
    const [chartData, setChartData] = useState<{ options: any; series: number[], labels: string[] }>({
        options: {
            labels: []
        },
        series: [],
        labels: []
    });

    useEffect(() => {
        fetchRequestChart();        
    }, [data]);

    async function fetchRequestChart() {
        if(data) {
            const newchartData = 
            {
                options: {
                    labels: ['Accepté', 'Refusé', 'En attente'],
                    colors: ['#73EC8B', '#FF5D6E', '#FFEB55']
                },
                series: [data.total_accepted, data.total_denied, data.total_waiting],
                labels: ['Accepté', 'Refusé', 'En attente'],
                colors: ['#73EC8B', '#FF5D6E', '#FFEB55']
            }
            setChartData(newchartData);
        }    
    }

    return(
        <div className="rounded border bg-white shadow-md p-4 h-full">
            <div className="text-lg font-latobold">DEMANDES D'AUDIENCE</div>
            {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            {
                chartData &&
                <ReactApexChart 
                    options={chartData.options}  
                    series={chartData.series}
                    type="donut"
                />
            }
        </div>
    )
}

export default RequestChart;