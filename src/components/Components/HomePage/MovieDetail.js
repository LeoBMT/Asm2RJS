import { useState, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import classes from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  const API_KEY = "e64d8c841a5c33f0c728a299182ef201";
  const [data, setData] = useState([]);
  const request = `/movie/${props.movie.id}/videos?api_key=${API_KEY}`;
  const { error, sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    const getMovie = (data) => {
      setData(data.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [fetchMovie]);

  let trailer = (
    <img
      src={`${
        props.movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
          : props.movie.poster_path
          ? `https://image.tmdb.org/t/p/original${props.movie.poster_path}`
          : ""
      }`}
      alt=""
    ></img>
  );
  if (data.length !== 0) {
    for (const e of data) {
      if (e.site === "YouTube" && (e.type === "Teaser" || e.type === "Trailer"))
        trailer = (
          <iframe
            width="48%"
            height="400"
            src={`https://www.youtube.com/embed/${e.key}`}
          ></iframe>
        );
    }
  }
  return (
    <div className={classes.moviedetail}>
      <div>
        <h1>{props.movie.name || props.movie.title}</h1>
        <p>
          <strong>
            Release Date:
            {props.movie.release_date || props.movie.first_air_date}
          </strong>
        </p>
        <p>
          <strong>Vote: {props.movie.vote_average}/10</strong>
        </p>
        <p>{props.movie.overview}</p>
      </div>
      {trailer}
    </div>
  );
};
export default MovieDetail;
