import React from "react";
import { Link } from "react-router-dom";

const BookShelf = ({ data, type, handleSelect }) => {
  return (
    <ol className="books-grid">
      {data &&
        data.map((data, index) => (
          <div key={index}>
            {data.shelf == type && (
              <li draggable>
                <div className="book">
                  <div className="book-top">
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none" }}
                      href=""
                    >
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${data.imageLinks.smallThumbnail})`,
                        }}
                      ></div>
                    </Link>
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
                        <option value="wantToRead"> Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>

                  <div className="book-title">{data.title}</div>
                  <div className="book-authors">
                    {data.authors.map((author, index) => (
                      <div key={index}>{author}</div>
                    ))}
                  </div>
                </div>
              </li>
            )}
          </div>
        ))}
    </ol>
  );
};

export default BookShelf;
