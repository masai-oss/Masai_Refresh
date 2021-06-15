import React, { useLayoutEffect } from 'react';
import styles from '../Styles/QuestionNav.module.css';

const QuestionNav = ({ firstText, secondText, firstIcon, secondIcon, progress, length, num, handleExit }) => {

    
    function useWindowSize() {
        const [size, setSize] = React.useState([0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
      }
      const [x] = useWindowSize();
      const width = (x/length)*num
    
    return <>
        <div className={styles.nav}>
            <div>
                <img src={firstIcon} alt="Logo not found" />
                <div style={{marginLeft:'23px'}}>{ firstText}</div>
            </div>
            <div
                className={styles.action}
                onClick={handleExit}
            >
                <div style={{marginRight:'23px', marginTop:'-10px'}}>{secondText}</div>
                <div>{ secondIcon }</div>
            </div>
        </div>
        {progress && (
            <div className={styles.progress}>
                <div
                    style={{
                        top: '0',
                        width: `${width}px`,
                        height: '8px',
                        background:'#1E84EB'
                    }}></div>
            </div>
        )}
    </>;
};

export default QuestionNav;
