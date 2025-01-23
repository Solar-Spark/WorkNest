import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class BarChart extends Component {
  render() {
    const data = {
      labels: this.props.labels || [],
      datasets: [
        {
          label: this.props.label || 'Task Distribution',
          data: this.props.data || [],
          backgroundColor: this.props.backgroundColor || [
            '#41aaff',
            '#dd5454',
            '#5456dd'
          ],
          borderWidth: 1,
          barThickness: 100,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
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
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    return (
      <div className="statistics">
        {this.props.title && <h2>{this.props.title}</h2>}
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default BarChart;
