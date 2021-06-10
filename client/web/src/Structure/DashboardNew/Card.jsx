import React from "react";
import styles from "./Card.module.css";
import { backGround, allColors } from "./Styles/Colors";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
const Card = ({ topicData, setQuizTitle }) => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const { name } = topicData;
  const logoPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}_logo.svg`;
  const textPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}.svg`;

  const gradientColor = backGround[name.toLowerCase()];

  return (
    <>
      <div
        className={styles.Card}
        onClick={() => {
          setIsOpen(true);
          setQuizTitle(name);
        }}
      >
        <div className={styles.svgLogo} style={{ background: gradientColor }}>
          <img src={logoPath} alt="Logo not found" />
          <img src={textPath} alt="Logo not found" />
        </div>
        <div className={styles.startQuiz}>
          <h3>START {name} QUIZ</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
