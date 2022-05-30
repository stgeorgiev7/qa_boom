import { IQuestion } from "./types/questions";
import { IUser } from "./types/user";
import { useState, useEffect } from "react";
import styles from "./styles/App.module.scss";
import Cards from "./components/Cards";
import Notification from "./components/Notification";

function App() {
 return (
  <div className={styles.app}>
   <div className={styles.wrapper}>
    <Notification type='newAnswer' />
    <Cards />
   </div>
  </div>
 );
}

export default App;
