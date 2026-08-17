import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (!url.backdrop || !data?.results?.length) return;
    const bg =
      url.backdrop +
      data.results[Math.floor(Math.random() * data.results.length)]
        ?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const searchQueryHandler = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery.length > 0) {
      navigate(`/search/${trimmedQuery}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="eyebrow">Built for binge discovery</span>
          <h1 className="title">movieflix</h1>
          <span className="subTitle">
            A fast, responsive OTT experience for movies, shows, trailers, and
            personalized discovery.
          </span>
          <form className="searchInput" onSubmit={searchQueryHandler}>
            <input
              type="text"
              placeholder="Search for a movie, show, or artist"
              aria-label="Search for a movie, show, or artist"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
