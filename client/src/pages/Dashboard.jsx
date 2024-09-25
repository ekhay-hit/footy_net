import "./styles/dashboard.css";
import { useState } from "react";
import Button from "../components/Button";
import AddField from "../components/AddField";
import AddGame from "../components/AddGame";
import Game from "../components/Game.jsx";
import Field from "../components/Field";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { FIELDS_BY_USER, GAMES_BY_USER } from "../utils/queries";
import { REMOVE_FIELD } from "../utils/mutations";

function Dashboard() {
  // states
  const [showJoinedGames, setShowJoinedGames] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [showAddGames, setShowAddGames] = useState(false);

  // function to handle states
  function showJoinedGameSection() {
    setShowJoinedGames(true);
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

  // section for queries

  //*************************** */ GET Fields owened by a user ******************************************************************
  const {
    loading: loadingFields,
    error: errorField,
    data: fieldsData,
  } = useQuery(FIELDS_BY_USER);

  //*************************** */ GET Games owned by a user ******************************************************************
  const {
    loading: loadingGames,
    error: errorGames,
    data: gamesData,
  } = useQuery(GAMES_BY_USER);

  if (errorGames) {
    console.error("Error fetching games:", errorGames);
  }
  console.log("This is your games data");
  console.log(gamesData);
  console.log(
    "This is your games data:",
    gamesData ? gamesData : "No data received"
  );
  // SECTION FOR MUTATION and its funtions

  const [removeField, { error }] = useMutation(REMOVE_FIELD, {
    refetchQueries: [{ query: FIELDS_BY_USER }], // REFETCH FIELDS
  });

  // function to handle remove field
  const handelRemoveField = async (fieldId) => {
    console.log("the id of the field clicked is");
    console.log(fieldId);
    try {
      await removeField({ variables: { fieldId } });
    } catch (error) {
      console.log("Failed to delete the field");
    }
  };

  return (
    <main className="dash-main">
      <nav>
        <Button className="button" onClick={showJoinedGameSection}>
          My joined games
        </Button>
        <Button className="button" onClick={showAddGameSection}>
          Add game
        </Button>
        <Button className="button" onClick={showAddFieldSection}>
          Add Field
        </Button>
      </nav>

      {showJoinedGames && (
        <div className="section">
          {/* <Game image={field1} /> */}
          {/* <Game image={field2} /> */}
          {/* <Game image={field3} /> */}
          {/* <Game image={field1} /> */}
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
                <Field
                  key={field._id}
                  field={field}
                  onRemove={() => handelRemoveField(field._id)}
                />
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
            {loadingGames ? (
              <p>... Loading your Games</p>
            ) : (
              gamesData?.gamesByUser?.map((game) => (
                <Game
                  key={game._id}
                  game={game}
                  buttonText="Delete"
                  buttonClass="remove_gameBtn"
                  // onRemove={() => handelRemoveGame(game._id)}
                />
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
