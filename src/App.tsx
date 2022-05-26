import { useContext, useEffect } from "react";
import { Context } from "./_app";
import { AppContext } from "./_app";

function App() {
 Context();
 //  const { questions, users } = useContext(AppContext);

 //  useEffect(() => {
 //   console.log("questions", questions);
 //   console.log("users", users);
 //  }, [questions, users]);

 return <div className="App">hey there</div>;
}

export default App;
