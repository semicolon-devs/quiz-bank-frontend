// components/MarksChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UserMark {
  _id: string;
  paperId: {
    _id: string;
    title: string;
  };
  userId: string;
  reading: number;
  logicalAndProblemSolving: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didNotAnswer: number;
  wrongAnswer: number;
  corrcetAnswer: number;
  lostmarks: number;
  total: number;
  __v: number;
}

interface MarksChartProps {
  marks: UserMark[] | undefined;
}

const MarksChart: React.FC<MarksChartProps> = ({ marks }) => {
  if (!marks) return null;

  const labels = marks.map((mark, index) => `Model Paper ${index + 1}`);
  const readingScores = marks.map((mark) => mark.reading);
  const logicalScores = marks.map((mark) => mark.logicalAndProblemSolving);
  const biologyScores = marks.map((mark) => mark.biology);
  const chemistryScores = marks.map((mark) => mark.chemistry);
  const physicsScores = marks.map((mark) => mark.physicsAndMaths);
  const totalScores = marks.map((mark) => mark.total);

  const data = {
    labels,
    datasets: [
      {
        label: 'Reading',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: readingScores,
      },
      {
        label: 'Logical & Problem Solving',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        data: logicalScores,
      },
      {
        label: 'Biology',
        backgroundColor: 'rgba(255,159,64,0.4)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: biologyScores,
      },
      {
        label: 'Chemistry',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: chemistryScores,
      },
      {
        label: 'Physics & Maths',
        backgroundColor: 'rgba(54,162,235,0.4)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        data: physicsScores,
      },
      {
        label: 'Total',
        backgroundColor: 'rgba(255,206,86,0.4)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
        data: totalScores,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Student Marks by Subject',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Increment y-axis labels by 2
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MarksChart;
