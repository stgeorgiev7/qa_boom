import { IQuestion } from "./types/questions";
import { IUser } from "./types/user";
import { createContext, useState, useEffect } from "react";

export interface IAppContext {
 questions: IQuestion[] | null;
 users: IUser[] | null;
}

export const AppContext = createContext<IAppContext | null>(null);

export function Context() {
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [questions, setQuestions] = useState<IQuestion[] | null>(null);
 const [users, setUsers] = useState<IUser[] | null>(null);

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

  const getUsers = async () => {
   const resp = await fetch(url + "/users");
   if (resp.ok === true) {
    const usersData: IUser[] = await resp.json();
    setUsers(usersData);
   }
  };

  getQuestions();
  getUsers();
 }, []);

 const qaPageContext: IAppContext = {
  questions: questions,
  users: users,
 };
 // samo da si gi pokaja
 useEffect(() => {
  console.log("questions", questions);
  console.log("users", users);
 }, [questions, users]);

 return (
  <AppContext.Provider value={qaPageContext}>
   <div className="App">hey there</div>
  </AppContext.Provider>
 );
}
