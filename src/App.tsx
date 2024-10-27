import { useEffect, useState } from "react";
import { Card } from "./assets/components/card";
import { DiceButton } from "./assets/components/button.tsx";
import "./css/App.css";

import dividerDesktop from "../public/images/pattern-divider-desktop.svg";
import dividerMobile from "../public/images/pattern-divider-mobile.svg";

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
    <>
      <div className="rounded-2xl overflow-hidden shadow-lg p-3 bg-gray-700 advice-generator-card">
        <div className="text-center">
          {!advice.slip && <p>No advice could be loaded</p>}
        </div>

        {advice.slip && (
          <>
            <small className={"text-center"}>Advice #{advice.slip.id}</small>
            <p
              className={
                "text-center justify-items-center advice mb-8 mt-6 pl-6 pr-6"
              }
            >
              "{advice.slip.advice}"
            </p>
          </>
        )}
        <picture>
          <source media="(min-width: 600px)" srcSet={dividerDesktop} />
          <source srcSet={dividerMobile} />
          <img src={dividerDesktop} alt={dividerDesktop} />
        </picture>
      </div>
      <div className={"text-center relative bottom-7"}>
        <DiceButton adviceFunc={getAdviceData} />
      </div>
    </>
  );
}

export default App;
