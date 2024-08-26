import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetching country data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handling search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtering countries based on search term
  const filteredCountries = data
    ? data.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handling country click, navigating to details page
  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      {/* Navbar */}
      <Navbar searchTerm={searchTerm} handleSearch={handleSearch} />

      {/* Display list of countries */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {filteredCountries.map((country) => (
          <li
            key={country.cca3}
            className="cursor-pointer p-4 border border-gray-700 rounded text-center text-white hover:bg-white hover:text-black"
            onClick={() => handleCountryClick(country.cca3)}
          >
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-20 h-auto mx-auto mb-2"
            />
            <p>{country.name.common}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
