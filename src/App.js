import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState();
  const temp = data;

  useEffect(() => {
    const getAllBooks = async () => {
      setData(await getAll());
    };
    getAllBooks();
  }, []);

  const handleSelect = (id, shelf) => {
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        temp[i].shelf = shelf;
      }
    }
    setData((arr) => [...arr, temp]);
    update(id, shelf);
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>

              <div className="bookshelf-books">
                <CurrentlyReading data={data} handleSelect={handleSelect} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <WantToRead data={data} handleSelect={handleSelect} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <Read data={data} handleSelect={handleSelect} />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to={"/search"} href="">
            Add a book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
