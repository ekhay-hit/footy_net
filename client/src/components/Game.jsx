import("../components/styles/game.css");

function Game({ image }) {
  return (
    <div className="card">
      <img src={image} alt="field image" />
      <h2>Winter Garden</h2>
      <h6>3/4 Spots Filled</h6>
      <div className="info">
        <span className="date">02.30 PM- 3.30 PM</span>
        <span className="price">$11.50</span>
      </div>
      <button className="joinBtn">Join</button>
    </div>
  );
}
export default Game;
