import { IUser } from "../types/user";
import styles from "./ModalCard.module.scss";
import correctIcon from "../assets/correct_icon.svg";
import { useState, useEffect } from "react";

interface IModalCard {
 type?: "question" | "answer";
 correct?: boolean;
 user: IUser | undefined;
 body: string | undefined;
 askedByUser?: boolean;
 questionId?: string | undefined;
 answerId?: string | undefined;
}

export default function ModalCard({
 user,
 body,
 correct = false,
 askedByUser = false,
 questionId,
 answerId,
}: IModalCard) {
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [completed, setCompleted] = useState<boolean>(correct);

 const handleAccept = async () => {
  const correctAnswer = { correct: true };
  const completedQuestion = { completed: true };

  try {
   await fetch(`${url}/questions/${questionId}/answers/${answerId}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(correctAnswer),
   });
  } catch (error) {
   console.log(error);
  }

  try {
   await fetch(`${url}/questions/${questionId}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(completedQuestion),
   });
  } catch (error) {
   console.log(error);
  }
  setCompleted(true);
 };

 return (
  <div className={correct ? styles.correct : styles.wrapper}>
   <div className={styles.user}>
    <div className={styles.leftBlock}>
     <img src={user?.avatar} />
     <div>
      <p>{user?.name}</p>
      <p className={styles.gradientText}>{user?.xp}xp</p>
     </div>
    </div>
    <div className={styles.rightBlock}>
     {completed ? (
      <img src={correctIcon} className={styles.correctIcon} />
     ) : null}
     {!completed && askedByUser ? (
      <button className={styles.acceptButton} onClick={handleAccept}>
       Accept Answer
      </button>
     ) : null}
    </div>
   </div>
   <div className={styles.questionContainer}>
    <p>{body}</p>
   </div>
  </div>
 );
}
