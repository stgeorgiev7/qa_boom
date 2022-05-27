import { IQuestion } from "../types/questions";
import { useState, useEffect } from "react";
import styles from "./Cards.module.scss";
import icon from "../assets/icon.svg";
import dayjs from "dayjs";

export default function Cards() {
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [questions, setQuestions] = useState<IQuestion[]>([]);
 useEffect(() => {
  const getQuestions = async () => {
   const resp = await fetch(url + "/questions");
   if (resp.ok === true) {
    const questionsData: IQuestion[] = await resp.json();
    setQuestions(questionsData);
   } else {
    throw new Error("Failed to fetch questions");
   }
  };
  getQuestions();
 }, []);

 return (
  <div className={styles.wrapper}>
   {questions.map((question) => {
    console.log(question);
    return (
     <div className={styles.container}>
      <div className={styles.leftblock}>
       <img src={icon} />
       <div className={styles.theme}>
        <h3 className={styles.title}>{question.theme}</h3>
        <h4 className={styles.gradientText}>
         {dayjs().diff(question.createdAt, "day")} days ago
        </h4>
       </div>
      </div>
      <div className={styles.rightBlock}>
       <div className={styles.bounty}>
        <h3 className={styles.bountyTitle}>Bounty</h3>
        <h4 className={styles.gradientText}>+{question.xp}xp</h4>
       </div>
       <div className={styles.answers}>
        <h3 className={styles.answersTitle}>Answers</h3>
        <h4 className={styles.gradientText}>{question.answers.length}</h4>
       </div>
       <div className={styles.user}>
        <img src={question.user.avatar} />
       </div>
      </div>
     </div>
    );
   })}
  </div>
 );
}
