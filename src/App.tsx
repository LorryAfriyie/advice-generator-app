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
  return (
    <div className="advice-gen-container">
      <h1>Advice generator section</h1>
    </div>
  );
}

export default App;
