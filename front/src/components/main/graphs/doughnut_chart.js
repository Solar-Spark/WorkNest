import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

class DoughnutChart extends Component {
  render() {
    const data = {
      labels: this.props.labels || [],
      datasets: [
        {
          label: this.props.label || '',
          data: this.props.data || [],
          backgroundColor: this.props.backgroundColor || [
            '#41aaff', 
            '#dd5454', 
            '#5456dd'
          ],
          borderWidth: this.props.borderWidth || 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
            display: true,
            position: 'left',
            labels: {
              boxWidth: 20,
              padding: 10,
              borderWidth: 0,
              generateLabels: (chart) => {
                const datasets = chart.data.datasets[0];
                const labels = chart.data.labels || [];
                const data = datasets.data || [];
      
                return labels.map((label, index) => ({
                  text: `${label}: ${data[index]}`,
                  fillStyle: datasets.backgroundColor[index],
                  strokeStyle: 'transparent',
                  hidden: datasets.hidden || false,
                  datasetIndex: 0,
                }));
              },
            },
          },
      },
    };

    return (
      <div className='statistics'>
        {this.props.title && <h2>{this.props.title}</h2>}
        <Doughnut data={data} options={options} />
      </div>
    );
  }
}

export default DoughnutChart;
