import React from "react";
import styles from "./Card.module.css";

import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
const Card = ({ topicData, setQuizTitle }) => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const { name } = topicData;
  const logoPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}_logo.svg`;
  const textPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}.svg`;
  const backGround = {
    html: `linear-gradient(152.85deg, #FC490B -42.62%, rgba(254, 177, 151, 0.428027) 25.72%, rgba(254, 189, 166, 0.364284) 46.09%, rgba(254, 216, 202, 0.215488) 88.61%, rgba(255, 255, 255, 0) 121.7%)
  `,
    css: `linear-gradient(152.85deg, #2196F3 -42.62%, rgba(33, 150, 243, 0.428027) 25%, rgba(33, 150, 243, 0.364284) 45.01%, rgba(33, 150, 243, 0.215488) 74.88%, rgba(255, 255, 255, 0) 121.7%)
    `,
    java: `linear-gradient(152.85deg, #73A1FB -42.62%, rgba(115, 161, 251, 0.428027) 25%, rgba(115, 161, 251, 0.364284) 45.01%, rgba(115, 161, 251, 0.215488) 74.88%, rgba(255, 255, 255, 0) 121.7%)
    `,
    javascript: `linear-gradient(160.91deg, #F7DF1E -58.22%, rgba(247, 223, 30, 0.603928) 6.27%, rgba(247, 223, 30, 0.428027) 20.73%, rgba(247, 223, 30, 0.364284) 30.81%, rgba(247, 223, 30, 0.286328) 42.48%, rgba(247, 223, 30, 0.259816) 54.64%, rgba(247, 223, 30, 0.215488) 68.76%, rgba(247, 223, 30, 0.0467335) 94.96%, rgba(247, 223, 30, 0) 125.38%)
    `,
    node_js: `linear-gradient(152.85deg, #539E43 -42.62%, rgba(83, 158, 67, 0.428027) 25.72%, rgba(83, 158, 67, 0.364284) 46.09%, rgba(83, 158, 67, 0.215488) 88.61%, rgba(255, 255, 255, 0) 121.7%)
    `,
    python: `linear-gradient(152.85deg, #387EB8 -42.62%, rgba(56, 126, 184, 0.428027) 25%, rgba(56, 126, 184, 0.364284) 45.01%, rgba(56, 126, 184, 0.215488) 74.88%, rgba(255, 255, 255, 0) 121.7%)
    `,
    react: `linear-gradient(152.85deg, #73A1FB -42.62%, rgba(115, 161, 251, 0.428027) 25%, rgba(115, 161, 251, 0.364284) 45.01%, rgba(115, 161, 251, 0.215488) 74.88%, rgba(255, 255, 255, 0) 121.7%)
    `,
    sql: `linear-gradient(160.91deg, #F7DF1E -58.22%, rgba(247, 223, 30, 0.603928) 6.27%, rgba(247, 223, 30, 0.428027) 20.73%, rgba(247, 223, 30, 0.364284) 30.81%, rgba(247, 223, 30, 0.286328) 42.48%, rgba(247, 223, 30, 0.259816) 54.64%, rgba(247, 223, 30, 0.215488) 68.76%, rgba(247, 223, 30, 0.0467335) 94.96%, rgba(247, 223, 30, 0) 125.38%)
    `,
  };

  const allColors = {
    html: `#FC490B`,
    css: `#2196F3`,
    java: `#DB380E`,
    javascript: `#000000`,
    node_js: `#539E43`,
    python: `#FFC331`,
    react: `#5BCCEB`,
    sql: ` #F29111`,
  };

  const gradientColor = backGround[name.toLowerCase()];
  const textColor = allColors[name.toLowerCase()];
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
          {/* <p style={{ color: textColor }}>{name}</p> */}
        </div>
        <div className={styles.startQuiz}>
          <h3>START {name} QUIZ</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
