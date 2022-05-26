import { IQuestion } from "./types/questions";
import { IUser } from "./types/user";
import {useState, useEffect} from "react";

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

  const getUsers = async () => {
   const resp = await fetch(url + "/users");
   if (resp.ok === true) {
    const usersData: IUser[] = await resp.json();
    setUsers(usersData);
   } else {
       throw new Error("Failed to fetch users")
   }
  };
  getQuestions();
  getUsers();
  console.log("questions", questions);
  console.log("users", users)
 }, []);


 return <div className="App">
    

 </div>;
}

export default App;
