import "./styles/dashboard.css";
import { useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import Game from "../components/Game";
function Dashboard() {
  const [showJoinedGames, setShowJoinedGames] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [showAddGames, setShowAddGames] = useState(false);
  function showJoinedGameSection() {
    setShowJoinedGames((value) => !value);
  }
  function showAddGameSection() {
    console.log("you click Game");
    setShowAddGames(true);
    setShowAddField(false);
    setShowJoinedGames(false);
  }
  function showAddFieldSection() {
    console.log("you click field");
    setShowAddField(true);
    setShowAddGames(false);
    setShowJoinedGames(false);
  }

  return (
    <main className="dash-main">
      <nav>
        <Button className="button" handleBtnClick={showJoinedGameSection}>
          My joined games
        </Button>
        <Button className="button" handleBtnClick={showAddGameSection}>
          Add game
        </Button>
        <Button className="button" handleBtnClick={showAddFieldSection}>
          Add Field
        </Button>
      </nav>

      {showJoinedGames && (
        <div className="section">
          <h1>Here will be my joined games</h1>
        </div>
      )}
      {showAddField && (
        <section className="sub-section">
          <div className="form-area">
            <Field />
          </div>
          <div className="main-area">
            <h1>Here will my field be rendered</h1>
          </div>
        </section>
      )}
      {showAddGames && (
        <section className="sub-section">
          <div className="form-area">
            <Game />
          </div>
          <div className="main-area">
            <h1>Here will my games be rendered</h1>
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
