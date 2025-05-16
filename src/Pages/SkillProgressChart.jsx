import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SkillProgressChart() {
  const data = {
    labels: ["Frontend", "Backend", "Database", "DevOps"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ["#f97316", "#60a5fa", "#34d399", "#facc15"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-64 flex flex-col">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">
        Skill Progress Chart
      </h3>
      <div className="flex-1 relative">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
