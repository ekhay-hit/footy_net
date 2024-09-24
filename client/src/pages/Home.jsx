import "./styles/home.css";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GAME_BY_DATE } from "../utils/queries";
import Game from "../components/Game.jsx";
function Home() {
  // get the today default date
  const today = new Date();
  const defaultDate = today;
  const [gameDate, setGameDate] = useState(defaultDate);
  // console.log(gameDate);
  // const date = new Date(gameDate);
  // date.setUTCHours(0, 0, 0, 0);
  // const formatDate = date.toISOString();

  const { loading, data } = useQuery(GAME_BY_DATE, {
    variables: {
      gameDate: gameDate,
    },
    skip: !gameDate,
  });

  const handleDateChange = (e) => {
    setGameDate(e.target.value);
  };

  return (
    <>
      <div className="home-main">
        <h3>Game </h3>
        <form className="main form-control">
          <label>Search Game date:</label>
          <input
            type="date"
            name="gameDate"
            placeholder="Select a date"
            value={gameDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </form>
        <section className="sub-section">
          <div className="main-area">
            {loading ? (
              <p>... Loading the games</p>
            ) : (
              data?.gameByDate?.map((game, i) => (
                <Game key={game._id} game={game} />
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;
