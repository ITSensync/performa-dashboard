import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FaDatabase } from "react-icons/fa6";
import { API_URL } from "../../api/config";

interface CardData {
  id: string;
  title: string;
  average_percent: string;
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

const CardComponents: React.FC = () => {
  const [allData, setAllData] = useState<CardData | null>(null);
  const [bandungData, setBandungData] = useState<CardData | null>(null);
  const [nonBandungData, setNonBandungData] = useState<CardData | null>(null);
  const [pwkData, setPwkData] = useState<CardData | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  // const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const allResponse = await axios.get(`${API_URL}/percentages-hours/all`);
      setAllData(allResponse.data.data[0]);

      const bandungResponse = await axios.get(`${API_URL}/percentages-hours/bandung`);
      setBandungData(bandungResponse.data.data[0]);

      const nonBandungResponse = await axios.get(
        `${API_URL}/percentages-hours/nonbandung`
      );
      setNonBandungData(nonBandungResponse.data.data[0]);

      const pwkResponse = await axios.get(`${API_URL}/percentages-hours/pwk`);
      setPwkData(pwkResponse.data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const month = Number(event.target.value);
    setSelectedMonth(month);
    await fetchData(month, selectedYear);
  };

  const handleYearChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    await fetchData(selectedMonth, year);
  };

  const fetchData = async (month: number | null, year: number | null) => {
    if (month !== null && year !== null) {
      try {
        setLoading(true);
        const allResponse = await axios.get(
          `${API_URL}/percentages-hours/all/${month}/${year}`
        );
        setAllData(allResponse.data.data[0]);

        const bandungResponse = await axios.get(
          `${API_URL}/percentages-hours/bandung/${month}/${year}`
        );
        setBandungData(bandungResponse.data.data[0]);

        const nonBandungResponse = await axios.get(
          `${API_URL}/percentages-hours/nonbandung/${month}/${year}`
        );
        setNonBandungData(nonBandungResponse.data.data[0]);

        const pwkResponse = await axios.get(
          `${API_URL}/percentages-hours/pwk/${month}/${year}`
        );
        setPwkData(pwkResponse.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderCard = (data: CardData | null, title: string) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center flex-1 m-2">
      <FaDatabase className="mb-2" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : data ? (
          `${data.average_percent}%`
        ) : (
          "No Data"
        )}
      </p>
    </div>
  );

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

  return (
    <div>
      <div className="container  mx-auto p-4 mt-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">
          Performa Sparing {currentMonthLabel} {currentYear}
        </h1>
        <div className="flex space-x-2 ">
          <div>
            <select
              id="month-select"
              value={selectedMonth || ""}
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
          <div className=" flex space-x-2">
            {/* <select
              id="year-select"
              value={selectedYear || ""}
              onChange={handleYearChange}
              className="p-2 border rounded bg-white dark:bg-gray-800"
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
          
            </select> */}
             <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="p-2 border rounded bg-white dark:bg-gray-800"
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-around mb-6">
        {renderCard(allData, "All Site")}
        {renderCard(bandungData, "Bandung")}
        {renderCard(nonBandungData, "Non Bandung")}
        {renderCard(pwkData, "Indorama PWK")}
      </div>
    </div>
  );
};

export default CardComponents;
