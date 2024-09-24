/* eslint-disable react/prop-types */
import("../components/styles/game.css");

function Game({ game }) {
  return (
    <div className="card">
      <img src={game.fieldId.image} alt="field image" />
      <h2>Winter Garden</h2>
      <h6>{game.fieldId.location}</h6>
      <h6>
        {game.players.length}/{game.capacity} Spots Filled
      </h6>
      <div className="info">
        <span className="date">
          {game.startTime} - {game.endTime}
        </span>
        <span className="price">$11.50</span>
      </div>
      <button className="joinBtn">Join</button>
    </div>
  );
}
export default Game;
