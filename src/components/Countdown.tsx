import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

import { TimeDisplay } from '../components/TimeDisplay';


export default function Countdown() {
  const {minutes,seconds,hasFinished,isActive,minutesCountdown,percentTime, resetCountdown,startCountdown} = useContext(CountdownContext);
 

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  

  return (
    <div>
        {isActive && <TimeDisplay minutesCountdown={minutesCountdown} />}
        <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button         
        disabled
        className={styles.countdownButton}
      >Ciclo Finalizado</button>
      ): (
        <>
          { isActive ? (
            <button         
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
          >Abandonar Ciclo
            <div><div style={{width: `${percentTime}%`}}></div></div>
          </button>
          ): (
            <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}
          >Iniciar um ciclo</button>
          )}
        </>
      )}                  
    </div>
  );
}