import { IUser } from "../types/user";
import styles from "./ModalCard.module.scss";

interface IModalCard {
 type: string;
 user: IUser | undefined;
 body: string | undefined;
}

export default function ModalCard({ type, user, body }: IModalCard) {
 return <div>MNOGO QKA KARTA BRATAN</div>;
}
