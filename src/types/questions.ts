import { IAnswer } from "./answers";
import { IUser } from "./user";

export interface IQuestion {
 theme: string;
 user: IUser;
 createdAt: string;
 xp: number;
 completed: boolean;
 question: string;
 answers: IAnswer[];
 id: string;
}
