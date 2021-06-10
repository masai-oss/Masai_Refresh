import React from "react";
import styles from "./Card.module.css";
import { backGround } from "./Styles/Colors";
const Card = ({ name, onClick, cardContent }) => {
  const logoPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}_logo.svg`;
  const textPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}.svg`;
  const gradientColor = backGround[name.toLowerCase()];
  return (
    <>
      <div className={styles.Card} onClick={onClick}>
        <div className={styles.svgLogo} style={{ background: gradientColor }}>
          <img src={logoPath} alt="Logo not found" />
          <img src={textPath} alt="Text not found" />
        </div>
        {cardContent}
      </div>
    </>
  );
};

export default Card;
