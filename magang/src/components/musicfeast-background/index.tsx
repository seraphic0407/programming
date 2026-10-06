import type { CSSProperties, ReactNode } from "react";
import bground from "../../assets/bground.png";

type MusicFeastBackgroundProps = {
  children: ReactNode;
};

export const MusicFeastBackground = ({
  children,
}: MusicFeastBackgroundProps) => {
  const backgroundStyle: CSSProperties = {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#080511",
    color: "#ffffff",
  };

  const imageStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bground})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    pointerEvents: "none",
    zIndex: 0,
  };

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(6,3,15,0.12) 0%, rgba(5,2,14,0.34) 100%)",
    pointerEvents: "none",
    zIndex: 1,
  };

  const glowStyle: CSSProperties = {
    position: "fixed",
    top: "10%",
    left: "50%",
    width: "520px",
    height: "520px",
    transform: "translateX(-50%)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(198,74,202,0.08) 0%, rgba(198,74,202,0.025) 35%, transparent 70%)",
    filter: "blur(8px)",
    pointerEvents: "none",
    zIndex: 1,
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <div style={imageStyle} />
      <div style={overlayStyle} />
      <div style={glowStyle} />
      <div style={contentStyle}>{children}</div>
    </div>
  );
};
