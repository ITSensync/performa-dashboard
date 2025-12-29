import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart, {
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  defaults,
} from "chart.js/auto"; // Import necessary modules
import axios from "axios";
import { API_URL } from "../../api/config";
import { useTheme } from "../ThemeContext";

interface DataItem {
  week: number;
  interval_date: string;
  data_count: number;
  percent: string;
}

interface Props {
  id: string;
  month: number; // Add month prop
  year: number; // Add year prop
}

const ChartComponent: React.FC<Props> = ({ id, month, year }) => {
  
  const [data, setData] = useState<DataItem[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/previous-month-data/${id}/${month}/${year}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, month, year]);

  useEffect(() => {
    Chart.register(
      ArcElement,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      BarElement
    ); // Register scale types
  }, []);

  const getCurrentMonth = () => {
    const date = new Date();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[date.getMonth()];
  };

  const chartData = {
    labels: data.map((item) => item.interval_date),
    datasets: [
      {
        label: getCurrentMonth(),
        data: data.map((item) => parseFloat(item.percent)),
        fill: false,
        backgroundColor: isDarkMode
          ? [
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(255, 205, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(201, 203, 207, 0.8)",
            ]
          : [
              "rgba(54, 162, 235, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 205, 86, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(201, 203, 207, 0.8)",
            ],
        borderColor: isDarkMode
          ? [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ]
          : [
              "rgb(54, 162, 235)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 205, 86)",
              "rgb(255, 159, 64)",
              "rgb(255, 99, 132)",
              "rgb(201, 203, 207)",
            ],
        borderWidth: 1,
      },
    ],
  };
  
  const verticalLinePlugin = {
    id :'verticalLinePlugin',
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales["x"];
      const yAxis = chart.scales["y"];

      const drawLine = (value: number) => {
        const xPixel = xAxis.getPixelForValue(value);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPixel, yAxis.top);
        ctx.lineTo(xPixel, yAxis.bottom);
        ctx.strokeStyle = "red";
        ctx.lineWidth= 2;
        ctx.setLineDash([3]);
        ctx.stroke();
        ctx.restore();
      };
       // Draw vertical lines at 85 and 90
      //
       drawLine(90);
    }
  }

  const options = {
    maintainAspectRatio: false,
    indexAxis: "y" as "y" | undefined,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? ["#F0F0F0"] : ["#000000"],
          callback: function (value: any) {
            return value + "%";
          },
        },
        grid: {
          drawOnChartArea: false,
          color: isDarkMode ? "#444444" : "#E5E7EB",
        },
      },
      y: {
        // stacked: true,
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          color: isDarkMode ? ["#F0F0F0"] : ["#000000"],
        },
        grid: {
          color: isDarkMode ? "#444444" : "#E5E7EB",
        },
      },
    },
    plugins: {
      subtitle: {
        display: true,
        text: "SENSYNC 90% PER 2 MNT",
        font: {
          size: 12,
          color: isDarkMode ? "#F0F0F0" : "#000000", // Change subtitle color
        },
        padding: {
          bottom: 10,
        },
        position: "top" as const,
        color: isDarkMode ? "#F0F0F0" : "#000000", // Change subtitle color
      },
      legend: {
        display: false,
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "#F0F0F0" : "#000000", // Change legend text color
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.raw + "%";
          },
        },
      },
    },
  };

  Chart.register(verticalLinePlugin);

  return (
    <div style={{ height: "190px" }}>
      {" "}
      {/* Atur tinggi grafik di sini */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
