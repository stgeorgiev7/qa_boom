import { IUser } from "../types/user";
import styles from "./ModalCard.module.scss";

interface IModalCard {
 type?: "question" | "answer";
 user: IUser | undefined;
 body: string | undefined;
}

export default function ModalCard({ user, body }: IModalCard) {
 return (
  <div className={styles.wrapper}>
   <div className={styles.user}>
    <img src={user?.avatar} />
    <div>
     <p>{user?.name}</p>
     <p className={styles.gradientText}>{user?.xp}xp</p>
    </div>
   </div>
   <div className={styles.questionContainer}>
    <p>{body}</p>
   </div>
  </div>
 );
}
