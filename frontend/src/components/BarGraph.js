import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStateContext } from '../context/ContextProvider';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






export default function BarGraph() {

  const { 
    kpiLeft, 
    driver1, 
    driver2, 
    driver3, 
  } = useStateContext()
  const options = {
    
    // plugins: {
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart - Stacked',
      // },
      // tooltip: {
      //   callbacks: {
      //       label: function(context) {
                
      //           if(context.dataIndex===4){
      //             return context.raw[0]+context.raw[1]
      //           }
      //           return context.raw[0]-context.raw[1];
      //       }
      //   }
      // },
      
    // },
    
    // responsive: true,
    // interaction: {
    //   mode: 'index',
    //   intersect: false,
    // },
    // scales: {
    //   x: {
    //     stacked: true,
    //   },
    //   y: {
    //     stacked: true,
    //   },
    // },
  };



  const labels = ['EBITDA before', 'Driver1', 'Driver2', 'Driver3', 'EBITDA after'];
  const data = {
    labels,
    datasets: [{
      plugins: [ChartDataLabels],
      datalabels: {
        color: 'white',
        formatter: function (value, context) {
          if(context.dataIndex===4){
            return Math.round(value[0]-value[1])*-1;
          } else {
            return Math.round(value[0]-value[1]);
          }
        },
        font: {
          weight: 'bold',
        },        
      },
      tooltip: {
        callbacks: {
            label: function(context) {
                
                if(context.dataIndex===4){
                  return context.raw[0]+context.raw[1]
                }
                return context.raw[0]-context.raw[1];
            }
        }
      },
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      legend: false,
        // label: 'Dataset 1',
        data: [
          [kpiLeft,0],
          [kpiLeft-driver1,kpiLeft],
          [(kpiLeft-driver1)+driver2,kpiLeft-driver1],
          [((kpiLeft-driver1)+driver2)-driver3,(kpiLeft-driver1)+driver2],
          [0,((kpiLeft-driver1)+driver2)-driver3],
        ],
        backgroundColor: function(value){
          
          
          if(value.raw[0]>value.raw[1] || value.dataIndex===4){
            if(value.raw[1]<0){
              return 'rgba(142, 12, 12, 0.7)'
            }
            return 'rgba(12, 142, 23, 0.7)'
          } else {
            return 'rgba(142, 12, 12, 0.7)'
          }
          
        },
        
        stack: 'Stack 0',
        borderSkipped: false,
      }],
  };
    
  return (
    <Bar options={options} data={data} />
  )
}
