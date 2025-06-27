import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import useGetAudienceForChart from '@/hooks/useGetAudienceForChart';

const AudienceChart: React.FunctionComponent = () => {
    const { data, isLoading } = useGetAudienceForChart();
    const [chartData, setChartData] = useState<{ options: any; series: number[], labels: string[] }>({
        options: {
            labels: []
        },
        series: [],
        labels: []
    });
    
    useEffect(() => {
        fetchAudienceChart();
    }, [data]);

    async function fetchAudienceChart() {
        if(data) {
            const newchartData = 
            {
                options: {
                    labels: ['Fixé', 'Annulé', 'Reporté', 'Absent', 'Classé'],
                    colors: ['#37AFE1', '#FF5D6E', '#FFEB55', '#A6AEBF', '#73EC8B']
                },
                series: [data.total_fixed, data.total_canceled, data.total_postponed, data.total_missed, data.total_closed],
                labels: ['Fixé', 'Annulé', 'Reporté', 'Absent', 'Classé'],
                colors: ['#37AFE1', '#FF5D6E', '#FFEB55', '#A6AEBF', '#73EC8B']
            }
            setChartData(newchartData);
        }
    }

    return(
        <div className="rounded border shadow-md bg-white  p-4 h-full">
            <div className="text-lg font-latobold">AUDIENCES</div>
            {isLoading  && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
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

export default AudienceChart;