import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.scss";
import { IQuestion } from "../types/questions";
interface IBackdrop {
 handleClose: () => void;
 question: IQuestion | undefined;
}
const dropIn = {
 hidden: {
  y: "-100vh",
  scale: 0,
 },
 visible: {
  y: "0",
  scale: 1,
  transition: {
   duration: 0.1,
   type: "spring",
   damping: 25,
   stiffness: 500,
  },
 },
 exit: {
  scale: 0,
  y: "100vh",
  opacity: 0,
 },
};

export default function Modal({ handleClose, question }: IBackdrop) {
 return (
  <Backdrop onClick={handleClose}>
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
       <button className={styles.viewButton}>View Task</button>
      </div>
     </div>
    </div>

    {/* Cards */}

    <div className={styles.cardWrapper}>NQKWI KARTI BRAAAT</div>

    {/* BOTOM */}
    <div className={styles.bottomModal}>
     <div className={styles.inputContainer}>
      <input
       type="text"
       className={styles.input}
       placeholder={`Type your answer here... If it’s accepted you will win the bounty of ${question?.xp} xp...`}
      />
     </div>
     <div className={styles.buttonContainer}>
      <button className={styles.postButton}>POST</button>
     </div>
    </div>
   </motion.div>
  </Backdrop>
 );
}
