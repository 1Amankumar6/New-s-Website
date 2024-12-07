import React from "react";
import PropTypes from "prop-types";

const Card = ({ data }) => {
  // If the data is empty or not passed, return nothing
  if (!data || data.length === 0) {
    return null;
  }

  // Function to handle opening URLs
  const openUrl = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        // Skip rendering this item if no image is available
        if (!curItem.urlToImage) return null;

        return (
          <div className="card" key={index}>
            <img
              src={curItem.urlToImage}
              alt={curItem.title || "News article image"}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="content p-4">
              <a
                href={curItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="title text-xl font-semibold text-blue-600 block hover:underline"
              >
                {curItem.title}
              </a>
              <p className="text-gray-700 mt-2">{curItem.description}</p>
              <button
                onClick={() => openUrl(curItem.url)}
                className="mt-4 px-4 py-2 inline text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Define propTypes to ensure correct usage of props
Card.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      urlToImage: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Card;
