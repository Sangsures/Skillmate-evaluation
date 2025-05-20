import React, { useEffect, useState } from "react";

const genres = ["programming", "javascript", "python", "react", "webdev"];

const Resources = () => {
  const [articles, setArticles] = useState([]);
  const [genre, setGenre] = useState("programming");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async (selectedGenre, selectedPage = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dev.to/api/articles?tag=${selectedGenre}&page=${selectedPage}&per_page=9`
      );
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(genre, page);
  }, [genre, page]);

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
    setPage(1);
  };

  const handlePageChange = (direction) => {
    if (direction === "next") setPage((prev) => prev + 1);
    if (direction === "prev" && page > 1) setPage((prev) => prev - 1);
  };

  const filteredArticles = articles.filter((article) => {
    const titleMatch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = (article.user.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || authorMatch;
  });

  return (
    <div className="container mx-auto px-5 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-900">
        Learning Resources
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search articles by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-orange-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-900"
        />
      </div>

      <div className="flex flex-wrap justify-center mb-6 gap-2">
        {genres.map((tag) => (
          <button
            key={tag}
            onClick={() => handleGenreChange(tag)}
            className={`px-4 py-2 rounded-full border ${
              genre === tag
                ? "bg-orange-900 text-white"
                : "bg-white text-orange-900 border-orange-900"
            } transition`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading articles...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="border border-gray-300 rounded-md shadow-md p-4 flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  By {article.user.name || "Unknown Author"}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-orange-900 hover:underline"
                >
                  Read More →
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No articles found.
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-orange-900 font-semibold">
          Page {page}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          className="px-4 py-2 bg-orange-900 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Resources;
