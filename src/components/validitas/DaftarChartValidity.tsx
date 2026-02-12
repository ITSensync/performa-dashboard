import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartValidityComponent";
import axios from "axios";
import { API_URL } from "../../api/config";

interface DataItem {
  id: string;
  title: string;
}

interface SiteItem {
  id: string;
  title: string;
  ph_percent: number;
  cod_percent: number;
  tss_percent: number;
  nh3n_percent: number;
}

interface Props {
  data: DataItem[];
}

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

const DaftarChart: React.FC<Props> = ({ data }) => {
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return now.getMonth() + 1; // getMonth() returns month from 0-11, hence +1
  };

  const getCurrentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const getMonthLabel = (month: number | null) => {
    if (month !== null) {
      const foundMonth = months.find((m) => m.value === month);
      return foundMonth ? foundMonth.label : "";
    }
    return "";
  };

  const currentMonth = selectedMonth || getCurrentMonth();
  const currentYear = selectedYear || getCurrentYear();
  const currentMonthLabel = getMonthLabel(currentMonth);

  useEffect(() => {
    axios
      .get(`${API_URL}/previous-month-validity/${currentMonth}/${currentYear}`)
      .then((res) => setSites(res.data.data));
  }, [currentMonth, currentYear]);

  return (
    <div>
      <div className="container  mx-auto p-4 mt-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Grafik Validitas SPARING {currentMonthLabel} {currentYear}
        </h1>
        <div className="flex space-x-2">
          <div>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border rounded bg-white dark:bg-gray-800"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="p-2 border rounded bg-white dark:bg-gray-800"
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className=" flex flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Lakukan pemetaan (mapping) pada array data dan render ChartComponent untuk setiap data */}
        {data.map(({ id, title }) => {
          const siteData = sites.find((s) => s.id === id);

          if (!siteData) return null;

          return (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center"
            >
              <h4 className="text-lg font-semibold mb-1 text-center">
                {title}
              </h4>

              <ChartComponent site={siteData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaftarChart;
