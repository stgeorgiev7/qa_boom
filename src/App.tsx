import { IQuestion } from "./types/questions";
import { IUser } from "./types/user";
import { useState, useEffect } from "react";
import styles from "./styles/App.module.scss";
import Cards from "./components/Cards";

function App() {
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [questions, setQuestions] = useState<IQuestion[]>([]);
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

  getQuestions();

  //   const getUsers = async () => {
  //    const resp = await fetch(url + "/users");
  //    if (resp.ok === true) {
  //     const usersData: IUser[] = await resp.json();
  //     setUsers(usersData);
  //    } else {
  //        throw new Error("Failed to fetch users")
  //    }
  //   };
  console.log(questions);
 }, []);

 return (
  <div className={styles.app}>
   <div className={styles.wrapper}>
    <Cards />
   </div>
  </div>
 );
}

export default App;
