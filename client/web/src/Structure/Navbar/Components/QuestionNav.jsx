import React from 'react';
import styles from '../Styles/QuestionNav.module.css';

const QuestionNav = ({topic, action, progress, num}) => {
    return <>
        <div className={styles.nav}>
            <div>{ topic }</div>
            <div>{ action }</div>
        </div>
        {progress && (
            <div className={styles.progress}></div>
        )}
    </>;
};

export default QuestionNav;
