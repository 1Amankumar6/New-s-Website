import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"; // Ensure this component handles the 'data' prop correctly

const Newsapp = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("India");
  // const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const API_KEY = "23d520a9c3ed4ed2807439487cc24e69";

  const myFun = async () => {
    if (search.trim() === "") {
      setMsg("Please Enter a search term.");
      setData([]);
      return;
    }
    setMsg(""); // Clear any previous messages
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      console.log(response.data);

      if (response.data.articles && response.data.articles.length > 0) {
        setData(response.data.articles); // Set articles data
      } else {
        setData([]);
        setMsg("No news articles found for your search.");
      }
    } catch (error) {
      setMsg("An error occurred while fetching data.");
      console.error(error);
    }
  };

  useEffect(() => {
    myFun(); // Fetch news when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          News App
        </h1>

        {/* Search Bar */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={search}
            onChange={handleInput}
            placeholder="Search for news..."
            className="p-2 border border-gray-300 rounded w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={myFun}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Error or Success Message */}
        {msg && (
          <h4 className="text-center text-red-500 font-semibold mb-4">{msg}</h4>
        )}

        {/* Display News Articles */}
        {data.length > 0 ? (
          <div>
            <Card data={data} />{" "}
            {/* Pass the fetched data to the Card component */}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            {msg === ""
              ? "No news to show. Try searching for something."
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsapp;
