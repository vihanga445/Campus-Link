import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]); // State to store search results
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Extract the search query from the URL

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Search query:", query); // Log the search query
        const endpoint = `http://localhost:5000/Back/user/search?q=${query}`;
        console.log("Calling endpoint:", endpoint); // Log the endpoint being called

        setLoading(true);
        const response = await axios.get(endpoint);
        console.log("Response data:", response.data); // Log the response data

        setResults(response.data); // Set the search results
        setLoading(false);
      } catch (err) {
        console.error("Error fetching search results:", err); // Log the error
        setError("Failed to fetch search results.");
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p className="text-gray-600">{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
