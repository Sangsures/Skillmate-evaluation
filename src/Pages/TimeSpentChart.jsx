import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TimeSpentChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Time Spent (hrs)",
        data: [20, 25, 30, 22, 27, 35, 40],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-64">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">Time Spent on Learning</h3>
      <Line data={data} />
    </div>
  );
}
