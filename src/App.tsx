import { useEffect, useState } from "react";
import { Card } from "./assets/components/card";

import "./css/App.css";

function App() {
  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <AdviceGenerator />
      </Card>
    </div>
  );
}

function AdviceGenerator() {
  const [advice, getAdvice] = useState([]);

  function getAdviceData() {
    fetch("https://api.adviceslip.com/advice")
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        getAdvice(res);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getAdviceData();
  }, []);

  return (
    <div className="advice-gen-container">
      {advice.slip && <p>{advice.slip.advice}</p>}
      <button onClick={getAdviceData}>Get Advice</button>
    </div>
  );
}

export default App;
