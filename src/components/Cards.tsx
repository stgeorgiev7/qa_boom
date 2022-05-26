import { IQuestion } from "../types/questions";
import { useState, useEffect } from "react";
import styles from "./Cards.module.scss";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import icon from "../assets/icon.svg";

export default function Cards() {
 const url = "https://628f2b72dc478523653aa33e.mockapi.io/";
 const [questions, setQuestions] = useState<IQuestion[]>([]);
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
 }, []);

 return (
  <div className={styles.wrapper}>
   {questions.map((question) => {
    console.log(question);
    return (
     <div>
      <Card>
       <CardContent>
        <img src={icon} />

        <Typography variant='h5' component='h2'>
         {question.theme}
        </Typography>
       </CardContent>
      </Card>
     </div>
    );
   })}
  </div>
 );
}
