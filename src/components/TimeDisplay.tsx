import { format, addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from '../styles/components/TimeDisplay.module.css'

interface TimeDisplayProps {
  minutesCountdown: number;
  startTime: Date;
}

export function TimeDisplay(props:TimeDisplayProps) {
  const [startTime,setStartTime] = useState(props.startTime ?? new Date())
  const [endTime,setendTime] = useState(new Date())

  useEffect(()=>{    
    setendTime(addMinutes(startTime,props.minutesCountdown));   
    Cookies.set('startTime', String(startTime));
    console.log('calculou');
  },[])

  

  return (
    
    <div className={styles.TimeDisplayContainer}>
      <p>{format(startTime, 'HH:mm' )} --> {format(endTime, 'HH:mm' )}</p>
    </div>
  )
}