import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import BoardList from "./components/BoardList";
import NewBoardForm from "./components/NewBoardForm";
import CardList from "./components/CardList";
import NewCardForm from "./components/NewCardForm";

const appURL = "https://bored-inspo-backend.herokuapp.com/";

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    return axios
      .get(`${appURL}/boards`)
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const selectBoard = (boardId, title, owner) => {
    const board = { title: title, owner: owner };
    setSelectedBoard(board);

    axios
      .get(`${appURL}/boards/${boardId}/cards`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <header>
        <h1>Inspo Board</h1>
      </header>
      <main>
        <div>
          <h2>Board List</h2>
          <BoardList boards={boards} onSelectBoard={selectBoard} />
        </div>
        <div>
          <h2>Selected Board:</h2>
          <h3>
            {selectedBoard
              ? `${selectedBoard.title} - ${selectedBoard.owner}`
              : "Select a board from the list!"}
          </h3>
        </div>
        <div>
          <h2>Create a new board:</h2>
          <NewBoardForm />
        </div>
        {cards.length > 0 ? (
          <>
            <div>
              <h2>Cards for {selectedBoard.title}</h2>
              <CardList cards={cards} />
            </div>
            <div>
              <h2>Create a new card:</h2>
              <NewCardForm />
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
