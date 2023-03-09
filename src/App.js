import { useRef, useState } from "react";
import "./App.css";

function App() {
  const load = useRef("");
  const [name, setName] = useState("");
  const [animes, setAnimes] = useState();
  const findAnime = () => {
    load.current.style.display = "flex";
    let url = `https://api.jikan.moe/v4/anime?q=naruto&sfw`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnimes(data);
        load.current.style.display = "none";
      });
    setName("");
  };
  return (
    <div className="App">
      <div className="logo">
        lh<span>n</span>XJi<span>kan</span>{" "}
      </div>
      <div className="loader" ref={load}>
        <div className="lds-hourglass"></div>
      </div>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          findAnime();
        }}
      >
        <input
          placeholder="find an anime, e.g Naruto"
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn">Find</button>
      </form>

      <div className="content">
        {animes?.data.map((anime) => {
          return (
            <div key={anime.mal_id} className="content__anime">
              <a className="content__link" href={anime.url}>
                <img
                  className="content__img"
                  src={anime.images.jpg.image_url}
                  alt="hinh"
                />
                <div className="content__title">{anime.title}</div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
