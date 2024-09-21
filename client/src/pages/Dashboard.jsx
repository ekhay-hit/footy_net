import "./styles/dashboard.css";
import { useState } from "react";
import Button from "../components/Button";
import AddField from "../components/AddField";
import AddGame from "../components/AddGame";
import Game from "../components/Game";
import Field from "../components/Field";
import { useQuery } from "@apollo/client";
import { FIELDS_BY_USER } from "../utils/queries";

// import images for field
import field1 from "../assets/images/field1.jpeg";
import field2 from "../assets/images/field2.jpeg";
import field3 from "../assets/images/field3.jpeg";
function Dashboard() {
  // states
  const [showJoinedGames, setShowJoinedGames] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [showAddGames, setShowAddGames] = useState(false);

  // function to handle states
  function showJoinedGameSection() {
    setShowJoinedGames((value) => !value);
    setShowAddField(false);
    setShowAddGames(false);
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

  // section for queries and mutation

  const {
    loading: loadingFields,
    error: errorField,
    data: fieldsData,
  } = useQuery(FIELDS_BY_USER);
  console.log(fieldsData);
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
          <Game image={field1} />
          <Game image={field2} />
          <Game image={field3} />
          <Game image={field1} />
        </div>
      )}
      {showAddField && (
        <section className="sub-section">
          <div className="form-area">
            <AddField />
          </div>
          <div className="main-area">
            {loadingFields ? (
              <p>... Loading your field</p>
            ) : (
              fieldsData?.fieldsByUser?.map((field) => (
                <Field key={field.id} field={field} />
              ))
            )}
          </div>
        </section>
      )}
      {showAddGames && (
        <section className="sub-section">
          <div className="form-area">
            <AddGame />
          </div>
          <div className="main-area">
            <Game image={field3} />
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
