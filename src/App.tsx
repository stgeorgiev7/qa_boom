import { IQuestion } from "./types/questions";
import { IUser } from "./types/user";
import {useState, useEffect} from "react";
import styles from "./styles/App.module.scss";

function App() {
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

//   const getUsers = async () => {
//    const resp = await fetch(url + "/users");
//    if (resp.ok === true) {
//     const usersData: IUser[] = await resp.json();
//     setUsers(usersData);
//    } else {
//        throw new Error("Failed to fetch users")
//    }
//   };

 }, []);


 return <div className={styles.app}>
     <div className={styles.wrapper}>
         
     </div>

 </div>;
}

export default App;
