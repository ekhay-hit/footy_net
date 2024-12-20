import "./styles/home.css";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GAME_BY_DATE } from "../utils/queries";
import { JOIN_GAMES, WITHDRAWFROM_GAMES } from "../utils/mutations.js";
import Game from "../components/Game.jsx";
import JoinGame from "../components/JoinGame.jsx";

import { useUser } from "../context/UserContext";

function Home() {
  // using context to get the user that loggs in
  const { user } = useUser();

  //used to show the dialog box for showing the game info and join or add friend to join
  const [selectedGame, setSelectedGame] = useState(null);
  // this to find out if the current loggedin user joined the selectedGame so update the label of the button to withdraw instead of join
  const isJoined = selectedGame?.players.some(
    (player) => player._id === user._id
  );
  // use for storing the game that user clicked to join and passing it to dialog t show the game info
  // get the today default date
  const today = new Date();
  const defaultDate = today;
  const [gameDate, setGameDate] = useState(defaultDate);
  console.log(gameDate);
  const date = new Date(gameDate);
  date.setUTCHours(0, 0, 0, 0);
  const formatDate = date.getTime();

  const { loading, data } = useQuery(GAME_BY_DATE, {
    variables: {
      gameDate: formatDate,
    },
    skip: !gameDate,
  });

  const [joinGames, { error }] = useMutation(JOIN_GAMES, {
    refetchQueries: [{ query: GAME_BY_DATE }],
  });
  const [withdrawFromGames] = useMutation(WITHDRAWFROM_GAMES, {
    refetchQueries: [{ query: GAME_BY_DATE }],
  });
  // get the date from the form change the state
  const handleDateChange = (e) => {
    setGameDate(e.target.value);
  };

  // showing the box to joing the game

  function handleShowJoinGame(game) {
    console.log("I am here in selection");
    setSelectedGame(game);
  }
  function handleCancel() {
    console.log("I am here in selection");
    setSelectedGame(null);
  }
  // handle join the game

  // handle join the game
  const handleJoinGame = async (game, count) => {
    const gameId = game?._id;
    const isJoined = game?.players.some((player) => player?._id === user?._id);
    console.log(isJoined);
    if (isJoined) {
      console.log("I am in joined");
      try {
        await withdrawFromGames({ variables: { gameId } });
        setSelectedGame(null);
      } catch (error) {
        console.log("Failed to withdraw from the game");
      }
    } else if (!isJoined) {
      console.log("I am not joined");
      try {
        await joinGames({ variables: { gameId, count } });
        setSelectedGame(null);
      } catch (error) {
        console.log("Failed to join the game");
      }
    }
  };
  return (
    <>
      <div className="home-main">
        <div className="date-selector">
          <form className="date-form form-control">
            <label>Search games by date:</label>
            <input
              type="date"
              name="gameDate"
              placeholder="Select a date"
              value={gameDate}
              onChange={handleDateChange}
              className="form-control"
            />
          </form>
          {loading && <h6>....Loading games</h6>}
        </div>
        <section className="home-section">
          <div className="home-area">
            {selectedGame && (
              <section className="join-game">
                <JoinGame
                  isJoined={isJoined}
                  selectedGame={selectedGame}
                  handleCancel={() => handleCancel()}
                  handleJoinGame={handleJoinGame}
                />
              </section>
            )}
            {loading ? (
              <p>... Loading the games</p>
            ) : (
              data?.gameByDate?.map((game) => {
                const userJoined = game?.players.some(
                  (player) => player?._id === user?._id
                );
                return (
                  <Game
                    key={game._id}
                    game={game}
                    buttonText={userJoined ? "Withdraw" : "join"}
                    buttonClass="joinBtn"
                    handleClick={() => handleShowJoinGame(game)}
                  />
                );
              })
            )}
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;
