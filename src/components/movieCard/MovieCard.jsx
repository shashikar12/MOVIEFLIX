import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const title = data.title || data.name;
  const target = `/${data.media_type || mediaType}/${data.id}`;
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  const openDetails = () => navigate(target);

  return (
    <div
      role="button"
      tabIndex="0"
      className="movieCard"
      aria-label={`Open details for ${title}`}
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} alt={`${title} poster`} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={(data.vote_average || 0).toFixed(1)} />
            <Genres data={(data.genre_ids || []).slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{title}</span>
        <span className="date">
          {dayjs(data.release_date || data.first_air_date).format(
            "MMM D, YYYY"
          )}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
