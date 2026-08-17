import React, { useMemo } from "react";
import dayjs from "dayjs";
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineDeviceMobile,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/no-poster.png";

import "./style.scss";

const StreamingHub = () => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/trending/all/week");

  const picks = useMemo(() => {
    return (data?.results || [])
      .filter((item) => item.poster_path && (item.title || item.name))
      .slice(0, 5);
  }, [data]);

  const heroPick = picks[0];
  const heroTitle = heroPick?.title || heroPick?.name || "Start exploring";
  const heroPoster = heroPick?.poster_path
    ? url.poster + heroPick.poster_path
    : PosterFallback;

  const openPick = (item) => {
    navigate(`/${item.media_type || "movie"}/${item.id}`);
  };

  return (
    <section className="streamingHub" aria-labelledby="streamingHubTitle">
      <ContentWrapper>
        <div className="hubHeader">
          <div>
            <span className="sectionKicker">Viewer Experience</span>
            <h2 id="streamingHubTitle">Your 2026 watch hub</h2>
          </div>
          <button type="button" onClick={() => navigate("/explore/movie")}>
            Explore library
          </button>
        </div>

        <div className="hubGrid">
          <article className="featurePanel">
            <div className="posterStack" aria-hidden="true">
              {loading
                ? [1, 2, 3].map((item) => <div key={item} className="posterGhost skeleton" />)
                : picks.slice(0, 3).map((item) => (
                    <Img
                      key={item.id}
                      src={url.poster + item.poster_path}
                      alt=""
                    />
                  ))}
            </div>
            <div className="featureCopy">
              <span>Now peaking</span>
              <h3>{heroTitle}</h3>
              <p>
                {heroPick?.overview ||
                  "Discover high-signal movie and TV recommendations with a fast, responsive interface."}
              </p>
              {heroPick && (
                <button type="button" onClick={() => openPick(heroPick)}>
                  View details
                </button>
              )}
            </div>
          </article>

          <div className="experiencePanel">
            <div className="signalCard">
              <HiOutlineSparkles />
              <span>Personalized rails</span>
              <strong>{picks.length || 0}</strong>
            </div>
            <div className="signalCard">
              <HiOutlineLightningBolt />
              <span>API-first discovery</span>
              <strong>TMDB</strong>
            </div>
            <div className="signalCard">
              <HiOutlineDeviceMobile />
              <span>Responsive UX</span>
              <strong>Web</strong>
            </div>
          </div>

          <div className="queuePanel">
            <div className="queueHeader">
              <span>Continue watching</span>
              <small>{dayjs().format("MMM D, YYYY")}</small>
            </div>
            <div className="queueList">
              {(loading ? [] : picks.slice(1, 5)).map((item, index) => {
                const title = item.title || item.name;
                return (
                  <button
                    key={item.id}
                    className="queueItem"
                    type="button"
                    onClick={() => openPick(item)}
                  >
                    <Img
                      src={url.poster + item.poster_path}
                      alt={`${title} poster`}
                    />
                    <span>
                      <strong>{title}</strong>
                      <small>{index === 0 ? "Resume" : "Add to queue"}</small>
                    </span>
                  </button>
                );
              })}
              {loading && [1, 2, 3, 4].map((item) => <div key={item} className="queueGhost skeleton" />)}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default StreamingHub;
