import { IUser } from "../types/user";
import styles from "./ModalCard.module.scss";
import correctIcon from "../assets/correct_icon.svg";

interface IModalCard {
 type?: "question" | "answer";
 correct?: boolean;
 user: IUser | undefined;
 body: string | undefined;
}

export default function ModalCard({ user, body, correct = false }: IModalCard) {
 return (
  <div className={correct ? styles.correct : styles.wrapper}>
   <div className={styles.user}>
    <img src={user?.avatar} />
    <div>
     <p>{user?.name}</p>
     <p className={styles.gradientText}>{user?.xp}xp</p>
    </div>
    {correct ? <img src={correctIcon} className={styles.correctIcon} /> : null}
   </div>
   <div className={styles.questionContainer}>
    <p>{body}</p>
   </div>
  </div>
 );
}
