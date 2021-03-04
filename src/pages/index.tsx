import CompletedChallenges from '../components/CompletedChallenges';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';

import Head from 'next/head'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import {GetServerSideProps} from 'next';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  startTime: Date;
}

export default function Home(props: HomeProps) {
    console.log(props)


  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>   

      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />
      <CountdownProvider 
        startTime={props.startTime}
      >
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => { 
  const {level, currentExperience, challengesCompleted, startTime} = ctx.req.cookies;
  

  return {
    props: {
      level: Number(level) | 0,
      currentExperience: Number(currentExperience) | 0,
      challengesCompleted: Number(challengesCompleted) | 0,
      startTime: startTime ?? null,
    }
  }
}