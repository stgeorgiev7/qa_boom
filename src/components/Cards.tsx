import { IQuestion } from "../types/questions";
import { IUser } from "../types/user";
import { IAnswer } from "../types/answers";
import { useState, useEffect } from "react";
import styles from "./Cards.module.scss";
import icon from "../assets/icon.svg";
import successIcon from "../assets/success_icon.svg";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

export default function Cards() {
 const [modalOpen, setModalOper] = useState<boolean>(false);
 const openModal = (): void => setModalOper(true);
 const closeModal = (): void => setModalOper(false);
 const defaultUser: IUser = {
  name: "Wilbert Lynch",
  avatar:
   "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1120.jpg",
  xp: 67,
  id: "2",
 };

 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [questions, setQuestions] = useState<IQuestion[]>([]);
 const [questionBody, setQuestionBody] = useState<string>("");
 const [openedQuestion, setOpenedQuestion] = useState<IQuestion>();

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

 useEffect(() => {
  const selectedQuestion = questions.find(
   (element) => element.question === questionBody,
  );
  setOpenedQuestion(selectedQuestion);
 }, [questionBody]);

 return (
  <motion.div className={styles.wrapper}>
   {questions.map((question) => {
    return (
     <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      onClick={(): void => {
       modalOpen ? closeModal() : openModal();
       setQuestionBody(question.question);
      }}
      className={question.completed ? styles.completed : styles.container}
      key={question.id}
     >
      <div className={styles.leftblock}>
       {question.completed ? (
        <img src={successIcon} alt='success-icon' />
       ) : (
        <img src={icon} alt='icon' />
       )}
       <div className={styles.theme}>
        <h3 className={styles.title}>{question.theme}</h3>
        <h4
         className={
          question.completed ? styles.successText : styles.gradientText
         }
        >
         {dayjs().diff(question.createdAt, "day")} days ago
        </h4>
       </div>
      </div>
      <div className={styles.rightBlock}>
       <div className={styles.bounty}>
        <h3 className={styles.bountyTitle}>Bounty</h3>
        <h2
         className={
          question.completed ? styles.successText : styles.gradientText
         }
        >
         +{question.xp}xp
        </h2>
       </div>
       <div className={styles.answers}>
        <h3 className={styles.answersTitle}>Answers</h3>
        <h2
         className={
          question.completed ? styles.successText : styles.gradientText
         }
        >
         {question.answers.length}
        </h2>
       </div>
       <div className={styles.user}>
        <img src={question.user.avatar} />
       </div>
      </div>
     </motion.div>
    );
   })}
   <AnimatePresence initial={false} exitBeforeEnter={true}>
    {modalOpen && (
     <Modal
      question={openedQuestion}
      handleClose={closeModal}
      currentUser={defaultUser}
     />
    )}
   </AnimatePresence>
  </motion.div>
 );
}
