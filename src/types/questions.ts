import { IAnswer } from "./answers";

export interface IQuestion {
 theme: string;
 createdBy: number;
 xp: number;
 completed: boolean;
 question: string;
 answers: IAnswer[];
 id: string;
}
