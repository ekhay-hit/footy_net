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

  const handleDateChange = (e) => {
    setGameDate(e.target.value);
  };

  return (
    <>
      <div className="home-main">
        <div className="form">
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
            {loading ? (
              <p>... Loading the games</p>
            ) : (
              data?.gameByDate?.map((game) => (
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
