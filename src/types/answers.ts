import { IUser } from "./user";
export interface IAnswer {
 createdAt: string;
 user: IUser;
 body: string;
 correct: boolean;
 id: string;
 questionId: string;
}
