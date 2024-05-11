import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize with current date

  useEffect(() => {
    fetchAPOD(selectedDate);
  }, [selectedDate]);

  const fetchAPOD = async (date) => {
    try {
      const apiKey = import.meta.env.VITE_NASA_API_KEY;
      const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: apiKey,
          date: date,
        },
      });
      setApodData(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(https://wallpapercave.com/wp/wp9406169.jpg)`,
      }}
    >
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Astronomy Picture of the Day
        </h1>
        <div className="flex justify-center mb-4">
          <label htmlFor="date" className="mr-2 font-medium text-white">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          {apodData ? (
            <div className="max-w-4xl">
              <img
                src={apodData.url}
                alt={apodData.title}
                className="object-cover w-full h-96"
              />
              <div className="p-6 text-white">
                <div className="text-center">
                  <h2 className="text-3xl font-semibold mb-4">
                    {apodData.title}
                  </h2>
                  <p className="mb-6">{apodData.explanation}</p>
                  <div className="flex flex-wrap mb-4 justify-center">
                    <div className="w-full lg:w-1/2 text-center">
                      {" "}
                      {/* Centered Date section */}
                      <strong>Date:</strong> {apodData.date}
                    </div>
                  </div>
                  <p>
                    <strong>HD Image:</strong>{" "}
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View HD Image
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default APOD;
