import "./ChartVacation.css";

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';


 export interface VacationData {
    vacation: string;
    followers: number;
  }
  
  interface VacationChartProps {
    data: VacationData[];
  }
  

    function ChartVacation(props: VacationChartProps): JSX.Element {
        const { data } = props;
        const chartRef = useRef<HTMLCanvasElement>(null);
        const [chart, setChart] = useState<Chart | null>(null);

        
      
        useEffect(() => {
          if (chartRef.current && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
              const labels = data.map(item => item.vacation);
              const followers = data.map(item => item.followers);
      
              if (chart) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = followers;
                chart.update();
              } else {
                const newChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels,
                    datasets: [{
                      label: 'Number of users who followed this vacation',
                      data: followers,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                    }]
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...followers) + 1,
                        ticks: {
                            stepSize: 1,
                            
                          }
                      }
                    }
                  }
                });
                setChart(newChart);
              }
            }
          }
        }, [data, chart]);
    
    return (
        <div className="ChartVacation" >
			
            <canvas style={{height:'600px',width: '90%', margin:'auto' }} ref={chartRef}></canvas>
        </div>
    );
}

export default ChartVacation


