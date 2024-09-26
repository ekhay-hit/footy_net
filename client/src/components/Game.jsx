/* eslint-disable react/prop-types */
import Button from "../components/Button.jsx";
import("../components/styles/game.css");

function Game({ game, buttonText, buttonClass, handleClick }) {
  return (
    <div className="card">
      <img src={game.field.image} alt="field image" />
      <h2>Winter Garden</h2>
      <h6>{game.field.location}</h6>
      <h6>
        {game.players.length}/{game.capacity} Spots Filled
      </h6>
      <h6>{new Date(game.gameDate).toISOString().split("T")[0]}</h6>
      <div className="info">
        <span className="date">
          {game.startTime} - {game.endTime}
        </span>
        <span className="price">{game.price}</span>
      </div>
      <Button className={buttonClass} onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
}
export default Game;
