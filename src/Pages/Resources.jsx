import React, { useState, useEffect } from "react";

const Resources = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const fetchBooks = async (query, start = 0) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${start}&maxResults=9`
      );
      const data = await response.json();
      setBooks(data.items || []);
      setStartIndex(start);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks("javascript");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  const handlePageChange = (newStartIndex) => {
    fetchBooks(searchQuery || "javascript", newStartIndex);
  };

  return (
    <div className="container mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Learning Resources</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-orange-900 text-white rounded-md"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => {
          const volumeInfo = book.volumeInfo;
          return (
            <div
              key={index}
              className="border border-gray-300 rounded-md shadow-md p-4"
            >
              {volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={volumeInfo.imageLinks.thumbnail}
                  alt={volumeInfo.title}
                  className="mb-4 w-full h-60 object-cover"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{volumeInfo.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown Author"}
              </p>
              {volumeInfo.averageRating && (
                <p className="text-yellow-500 text-sm mb-2">
                  Rating: {volumeInfo.averageRating} / 5
                </p>
              )}
              <a
                href={volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-950 hover:underline"
              >
                More Info
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(Math.max(0, startIndex - 10))}
          disabled={startIndex === 0}
          className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(startIndex + 10)}
          className="ml-2 px-4 py-2 bg-orange-950 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Resources;
