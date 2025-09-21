import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Air Pollution', 'Waste Mismanagement', 'Water Issues', 'Green Space Loss'],
  datasets: [{ label: 'Complaints (Last Month)', data: [45, 30, 25, 15], backgroundColor: 'rgba(75, 192, 192, 0.6)' }]
};

// Fetch real data from API if time: use useEffect to call Express endpoint querying MongoDB
function PollutionChart() {
  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Green Issue Trends' } } }} />;
}