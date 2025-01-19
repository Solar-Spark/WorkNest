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
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.label,
            data: this.props.data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.props.title,
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <h2>Bar Chart (Class Component)</h2>
        <Bar data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}

export default BarChart;
