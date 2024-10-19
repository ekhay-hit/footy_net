import("../components/styles/joinGame.css");
function JoinGame() {
  return (
    <div className="row border border-dark rounded  col-lg-3 col-md-10 ">
      <header className="col-12 p-2 bg-success">
        <h3>Game</h3>
      </header>
      <div className="text-center fw-normal fs-4 lead">
        <p className="mx-2  my-3">Spot left</p>
        <p className="mx-2  my-3">date</p>
        <p className="mx-2  my-3">location</p>
      </div>

      <div className="text-center fw-normal fs-4 lead">
        <h3 className="mx-2 my-4">bring friends</h3>
        <span className="mx-2 my-3">
          <button className="btn-style">+</button> <span> 0 </span>
          <button className="btn-style">-</button>
        </span>
        <div className="mx-2 my-4">
          <span>price</span> | <span>Total</span>
        </div>
        <div className=" border-top border-dark my-5 d-flex lead">
          <button className="btn  my-2  btn-cancel ">CANCEL</button>
          <button className=" btn my-2 btn-join">JOIN</button>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
