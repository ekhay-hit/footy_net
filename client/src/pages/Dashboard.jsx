import "./styles/dashboard.css";
import { useState } from "react";
import Button from "../components/Button";
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
        <div className="section">
          <h1>Here where I can add field</h1>
        </div>
      )}
      {showAddGames && (
        <div className="section">
          <h1>Here were we can add games</h1>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
