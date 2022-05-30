import styles from "./Notification.module.scss";
import { motion } from "framer-motion";
import icon from "../assets/notifications.svg";
import { useState, useEffect } from "react";

interface INotifications {
 type: "newAnswer" | "accepted";
}

export default function Notification({ type }: INotifications) {
 const [text, setText] = useState<string>("");

 useEffect(() => {
  if (type === "newAnswer") {
   setText(
    "You have a new answer on your question for “You think you know GIT"
   );
  } else if (type === "accepted") {
   setText("Your answer for “You think you know GIT” has been accepted!");
  }
 }, []);

 return (
  <motion.div
   className={styles.wrapper}
   initial={{ opacity: 0, y: 50, scale: 0.3 }}
   animate={{ opacity: 1, y: 0, scale: 1 }}
   exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  >
   <div className={styles.icon}>
    <img src={icon} alt="notification" />
   </div>
   <div className={styles.notification}>
    <p>
     <span className={styles.qa}>Q&A</span>
     {text}
    </p>
   </div>
   <div className={styles.buttonContainer}>
    <button className={styles.buttonGradient}>OK</button>
   </div>
  </motion.div>
 );
}
