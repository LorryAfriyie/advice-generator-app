import { useEffect, useState } from "react";
import { Card } from "./assets/components/card";
import { DiceButton } from "./assets/components/button.tsx";
import "./css/App.css";
import dividerDesktop from "/images/pattern-divider-desktop.svg";
import dividerMobile from "/images/pattern-divider-mobile.svg";

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
  const [advice, getAdvice] = useState({
    id: 0,
    advice: "",
  });

  function getAdviceData() {
    fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        getAdvice({ id: res.slip.id, advice: res.slip.advice });
      });
  }

  useEffect(() => {
    getAdviceData();
  }, []);

  return (
    <>
      <div className="rounded-2xl overflow-hidden shadow-lg p-3 bg-gray-700 advice-generator-card">
        <div className="text-center">
          {/*{!(advice.advice && advice.id) && <p>No advice could be loaded</p>}*/}
        </div>

        {advice && (
          <>
            <small className={"text-center"}>Advice #{advice.id}</small>
            <p
              className={
                "text-center justify-items-center advice mb-8 mt-6 pl-6 pr-6"
              }
            >
              "{advice.advice}"
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
