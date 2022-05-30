import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.scss";
import { IQuestion } from "../types/questions";
import { IAnswer } from "../types/answers";
import { IUser } from "../types/user";
import ModalCard from "./ModalCard";
import Notification from "./Notification";
interface IBackdrop {
 handleClose: () => void;
 question: IQuestion | undefined;
 currentUser: IUser;
}
const dropIn = {
 hidden: {
  y: "-100vh",
 },
 visible: {
  y: "0",
  transition: {
   delay: 0.2,
   type: "spring",
   damping: 25,
   stiffness: 500,
  },
 },
 exit: {
  y: "200vh",
  transition: {
   duration: 0.5,
  },
 },
};

export default function Modal({
 handleClose,
 question,
 currentUser,
}: IBackdrop) {
 const [answer, setAnswer] = useState<string>("");
 const currentDate: string = dayjs().toString();

 const nextId = question && (Number(question?.answers?.length) + 1).toString();
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";

 const [apiAnswers, setapiAnswers] = useState<IAnswer[]>([]);
 const [answered, setAnswered] = useState<boolean>(false);

 const lastAnswer = useRef<HTMLDivElement>(null);
 const [isAnswered, setIsAnswered] = useState<boolean>(false);

 const [askedByUser, setAsked] = useState<boolean>(false);
 const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

 useEffect(() => {
  setapiAnswers((question && question?.answers) || []);
  console.log(question?.user.id);
  console.log(currentUser.id);
  question?.user.name == currentUser.name ? setAsked(true) : setAsked(false);
 }, [question]);

 const scrollToBottom = (): void =>
  lastAnswer.current?.scrollIntoView({
   behavior: "smooth",
  });

 const showNotification = () => {
  setNotificationOpen(true);
  setTimeout(() => {
   setNotificationOpen(false);
  }, 3000);
 };

 const handlePost = () => {
  const answerBody: IAnswer = {
   createdAt: currentDate,
   user: currentUser,
   body: answer,
   correct: false,
   id: nextId,
   questionId: question?.id,
  };

  const newAnswer = async () => {
   try {
    await fetch(`${url}/questions/${question?.id}/answers`, {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify(answerBody),
    }).then(() => {
     setapiAnswers([...apiAnswers, answerBody]);
     setAnswered(true);
     setIsAnswered(true);
     scrollToBottom();
    });
   } catch (error) {
    console.log(error);
   }
  };

  console.log(answerBody);
  newAnswer();
 };

 return (
  <Backdrop onClick={handleClose}>
   {notificationOpen && askedByUser && (
    <Notification type={askedByUser ? "newAnswer" : "accepted"} />
   )}

   <motion.div
    onClick={(e) => e.stopPropagation()}
    className={styles.modal}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
   >
    {/* TOP */}

    <div className={styles.topModal}>
     <div className={styles.title}>
      <h1>{question?.theme}</h1>
     </div>
     <div className={styles.info}>
      <div className={styles.leftBlock}>
       <div className={styles.bounty}>
        <h3 className={styles.bountyTitle}>Bounty</h3>
        <h2 className={styles.gradientText}>+{question?.xp}xp</h2>
       </div>
       <div className={styles.answers}>
        <h3 className={styles.answersTitle}>Answers</h3>
        <h2 className={styles.gradientText}>{question?.answers.length}</h2>
       </div>
       <div className={styles.user}>
        <img src={question?.user.avatar} />
       </div>
      </div>
      <div className={styles.rightBlock}>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.99 }}
        className={styles.viewButton}
       >
        View Task
       </motion.button>
      </div>
     </div>
    </div>

    {/* Cards */}

    <div className={styles.cardWrapper}>
     <div className={styles.questionsCards}>
      <h4 className={styles.cardTitle}>Questions</h4>
      <ModalCard
       type="question"
       body={question?.question}
       user={question?.user}
      />
     </div>
     <div className={styles.answersCards}>
      <h4 className={styles.cardTitle}>Answers</h4>
      {question &&
       apiAnswers.map((answer) => {
        console.log(answer);
        return (
         <div
          className={answer.correct ? styles.correct : styles.card}
          key={answer.createdAt}
         >
          <ModalCard
           type="answer"
           body={answer?.body}
           user={answer?.user}
           correct={answer?.correct}
           askedByUser={askedByUser}
           questionId={answer?.questionId}
           answerId={answer?.id}
          />
         </div>
        );
       })}
      <div ref={lastAnswer}></div>
     </div>
    </div>

    {/* BOTOM */}
    <div className={styles.bottomModal}>
     <div className={styles.inputContainer}>
      {!answered ? (
       <input
        type="text"
        className={styles.input}
        placeholder={`Type your answer here... If it’s accepted you will win the bounty of ${question?.xp} xp...`}
        onChange={(e) => setAnswer(e.target.value)}
       />
      ) : (
       <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.05 }}
        exit={{ scale: 0.8 }}
       >
        <h2
         className={styles.answered}
        >{`Question answered if it’s accepted you will win the bounty of ${question?.xp} xp  🤓`}</h2>
       </motion.div>
      )}
     </div>
     <div className={styles.buttonContainer}>
      {!isAnswered ? (
       <button
        className={styles.postButton}
        onClick={() => {
         handlePost();
         showNotification();
        }}
       >
        POST
       </button>
      ) : (
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.99 }}
        className={styles.postButton}
        onClick={handleClose}
       >
        Close
       </motion.button>
      )}
     </div>
    </div>
   </motion.div>
  </Backdrop>
 );
}
