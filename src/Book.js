import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { get } from "./BooksAPI";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      setBook(await get(id));
    };
    getAllBooks();
  }, []);

  return (
    <div className="list-books">
      {book && (
        <div>
          <Link className="close-book" to={"/"} href=""></Link>
          <div className="list-books-title">
            <h1>{book.title}</h1>
          </div>

          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{book.shelf}</h2>

                <div className="books-grid">
                  <div>
                    <div
                      className="book-cover "
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                      }}
                    ></div>

                    <div className="book-title">
                      Title: <span className="book-authors">{book.title}</span>
                    </div>
                    <div className="book-title">
                      Authors:
                      <span className="book-authors">
                        {book.authors.map((author, index) => (
                          <div key={index}>{author}</div>
                        ))}
                      </span>
                    </div>
                    <div className="book-title">
                      AverageRating:
                      <span className="book-authors">{book.averageRating}</span>
                    </div>
                    <div className="book-title">
                      Categories:
                      <span className="book-authors">
                        {book.categories.map((category, index) => (
                          <div key={index}>{category}</div>
                        ))}
                      </span>
                    </div>
                    <div className="book-title">
                      ContentVersion:
                      <span className="book-authors">
                        {book.contentVersion}
                      </span>
                    </div>
                    <div className="book-title">
                      Description:
                      <span className="book-authors">{book.description}</span>
                    </div>
                    <div className="book-title">
                      Language:
                      <span className="book-authors">{book.language}</span>
                    </div>
                    <div className="book-title">
                      MaturityRating:
                      <span className="book-authors">
                        {book.maturityRating}
                      </span>
                    </div>
                    <div className="book-title">
                      PageCount:
                      <span className="book-authors">{book.pageCount}</span>
                    </div>
                    <div className="book-title">
                      PublishedDate:
                      <span className="book-authors">{book.publishedDate}</span>
                    </div>
                    <div className="book-title">
                      Publisher:
                      <span className="book-authors">{book.publisher}</span>
                    </div>
                    <div className="book-title">
                      Subtitle:
                      <span className="book-authors">{book.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
