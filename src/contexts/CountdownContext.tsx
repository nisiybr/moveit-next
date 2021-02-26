import {createContext, useState, ReactNode, useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';


interface CountdownContextData{
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}
interface CountdownProviderProps{
  children: ReactNode;
}
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({children}: CountdownProviderProps){
  const minutesCountdown = 25;
  const [time, setTime] =  useState(minutesCountdown*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);  
  const seconds = time % 60; 

  const  { startNewChallenge } = useContext(ChallengesContext);

  function startCountdown(){
    setIsActive(true);    
  }
  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);  
    setTime(minutesCountdown*60);
    setHasFinished(false);
  }  

  useEffect(()=>{
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time])

  return  (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}