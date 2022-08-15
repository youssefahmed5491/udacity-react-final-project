import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { get, getAll, update, search } from "./BooksAPI";
import debounce from "lodash/debounce";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      setData(await getAll());
    };
    getAllBooks();
  }, []);

  const handleSelect = (id, shelf) => {
    update(id, shelf);
  };
  const handleSearch = (searchfor) => {
    if (searchfor != "") {
      const searchForBooks = async () => {
        setSearchResult(await search(searchfor));
      };

      searchForBooks();
    } else {
      setSearchResult([]);
    }
  };
  const debouncedOnChange = useMemo(() => debounce(handleSearch, 170), []);
  if (searchResult.length > 0) {
    for (let i = 0; i < searchResult.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].id === searchResult[i].id) {
          searchResult[i].shelf = data[j].shelf;
        }
      }
      if (!searchResult[i].shelf) {
        searchResult[i].shelf = "none";
      }
    }
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"} href=""></Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => {
              debouncedOnChange(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult != undefined &&
            searchResult.length > 0 &&
            searchResult
              .filter((result) => {
                return result.imageLinks != null;
              })
              .map((data, index) => (
                <div key={index}>
                  <li>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${data.imageLinks.smallThumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            defaultValue={data.shelf}
                            onChange={(e) => {
                              handleSelect(data.id, e.target.value);
                            }}
                          >
                            <option value="none" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{data.title}</div>
                      <div className="book-authors">
                        {data.authors &&
                          data.authors.map((author, index) => (
                            <div key={index}>{author}</div>
                          ))}
                      </div>
                    </div>
                  </li>
                </div>
              ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
