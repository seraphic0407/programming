import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import loginTransition from "../../assets/login-transition.mp4";
import loginTransitionMusic from "../../assets/login-transition.mp3";

const MUSIC_START_TIME = 5;
const TRANSITION_DURATION = 10000;
const CLOSING_START = 8000;
const BLACK_SCREEN_DURATION = 3000;

const LoginTransition = () => {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isClosing, setIsClosing] = useState(false);
  const [blackScreen, setBlackScreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) {
      return;
    }

    let fadeInTimer: number | undefined;
    let fadeOutTimer: number | undefined;

    video.currentTime = 0;

    audio.volume = 0;
    audio.currentTime = MUSIC_START_TIME;

    video.play().catch(() => {});
    audio.play().catch(() => {});

    let volume = 0;

    fadeInTimer = window.setInterval(() => {
      volume += 0.04;

      if (volume >= 0.35) {
        volume = 0.35;

        if (fadeInTimer !== undefined) {
          window.clearInterval(fadeInTimer);
        }
      }

      audio.volume = volume;
    }, 120);

    const closingTimer = window.setTimeout(() => {
      setIsClosing(true);

      if (fadeInTimer !== undefined) {
        window.clearInterval(fadeInTimer);
      }

      const startVolume = audio.volume;
      const startTime = Date.now();

      fadeOutTimer = window.setInterval(() => {
        const progress = Math.min((Date.now() - startTime) / 2000, 1);

        audio.volume = startVolume * (1 - progress);

        if (progress >= 1) {
          if (fadeOutTimer !== undefined) {
            window.clearInterval(fadeOutTimer);
          }

          audio.pause();
          audio.currentTime = MUSIC_START_TIME;
          audio.volume = 0;
        }
      }, 50);
    }, CLOSING_START);

    const transitionTimer = window.setTimeout(() => {
      video.pause();
      audio.pause();

      video.currentTime = 0;
      audio.currentTime = MUSIC_START_TIME;
      audio.volume = 0;

      if (fadeInTimer !== undefined) {
        window.clearInterval(fadeInTimer);
      }

      if (fadeOutTimer !== undefined) {
        window.clearInterval(fadeOutTimer);
      }

      window.clearTimeout(closingTimer);

      setIsClosing(false);
      setBlackScreen(true);
    }, TRANSITION_DURATION);

    return () => {
      window.clearTimeout(closingTimer);
      window.clearTimeout(transitionTimer);

      if (fadeInTimer !== undefined) {
        window.clearInterval(fadeInTimer);
      }

      if (fadeOutTimer !== undefined) {
        window.clearInterval(fadeOutTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (!blackScreen) {
      return;
    }

    const timer = window.setTimeout(() => {
      navigate("/home");
    }, BLACK_SCREEN_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [blackScreen, navigate]);

  if (blackScreen) {
    return <div className="login-black-screen" />;
  }

  return (
    <div className={`login-transition ${isClosing ? "closing" : ""}`}>
      <video
        ref={videoRef}
        className="login-transition-video"
        src={loginTransition}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <audio
        ref={audioRef}
        className="login-transition-audio"
        src={loginTransitionMusic}
        preload="auto"
      />

      <div className="login-transition-overlay" />

      <div className="login-transition-particles">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>·</span>
        <span>✧</span>
        <span>·</span>
        <span>✦</span>
      </div>

      <div className="login-transition-content">
        <p className="transition-label">MUSICFEAST</p>

        <h1>
          Let the Rhythm
          <span>Be Your Wings.</span>
        </h1>

        <p className="transition-description">
          Explore a world where music, light,
          <br />
          and memories come alive.
        </p>

        <div className="transition-decoration">
          <span />
          <i>✦</i>
          <span />
        </div>
      </div>
    </div>
  );
};

export default LoginTransition;
