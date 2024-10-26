import { useState } from "react";
/* eslint-disable react/prop-types */
import("../components/styles/joinGame.css");
function JoinGame({ selectedGame, handleCancel, handleJoinGame }) {
  const [count, setCount] = useState(0);
  return (
    <div className="row border border-dark rounded  col-lg-3 col-md-10 ">
      <header className="col-12 p-2 bg-success">
        <h3>Game</h3>
      </header>
      <div className="text-center  fw-normal  fs-4 lead">
        <p className="mx-2  my-3">
          {selectedGame.capacity - selectedGame.players.length} spot left
        </p>
        <p className="mx-2  my-3">
          {new Date(selectedGame.gameDate).toISOString().split("T")[0]}
        </p>
        <p className="mx-2  my-3">{selectedGame.field.location}</p>
      </div>

      <div className="text-center border-top border-dark  fw-normal fs-4  lead">
        <h3 className="mx-2 my-4">bring friends</h3>
        <span className="mx-2 my-3">
          <button
            className="btn-style"
            disabled={
              count + selectedGame.players.length + 2 > selectedGame.capacity
            }
            onClick={() => setCount((prevCount) => prevCount + 1)}
          >
            +
          </button>
          <span> {count} </span>
          <button
            className="btn-style"
            disabled={count < 1}
            onClick={() => setCount((prevCount) => prevCount - 1)}
          >
            -
          </button>
        </span>
        <div className="mx-2 my-4">
          <span>${selectedGame.price}</span> |{" "}
          <span>${selectedGame.price * (count + 1)}</span>
        </div>
        <div className=" border-top border-dark my-5 d-flex lead">
          <button onClick={handleCancel} className="btn  my-2  btn-cancel ">
            CANCEL
          </button>
          <button
            onClick={() => handleJoinGame(selectedGame._id, count)}
            className=" btn my-2 btn-join"
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
