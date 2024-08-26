import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CountryDetails = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const data = await response.json();
                setCountry(data[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCountry();
    }, [countryCode]);

    if (!country) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="p-4 bg-black min-h-screen text-white flex items-center justify-center">
            <div className="border rounded bg-white text-black h-[36rem] w-[25rem] flex flex-col items-center justify-center gap-4">

                <h1 className="text-4xl mb-4">{country.name.common}</h1>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="w-40 h-auto mb-4" />
                <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Continent:</strong> {country.continents.join(", ")}</p>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${country.name.common}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block border p-4  rounded text-lg font-bold hover:bg-black hover:text-white bg-white text-black border-black"
                >
                    View on Google Maps
                </a>
            </div>
        </div>

    );
};

export default CountryDetails;
