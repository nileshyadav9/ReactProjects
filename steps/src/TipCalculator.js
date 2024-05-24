import { useState } from "react";
export default function TipCalculator() {
  const [billAmnt, setBillAmnt] = useState("");
  const [perc1, setPerc1] = useState(1);
  const [perc2, setPerc2] = useState(1);
  const tipAmt = Number(billAmnt * ((perc1 + perc2) / 2 / 100));

  function handleReset() {
    setBillAmnt("");
    setPerc1(0);
    setPerc2(0);
  }
  return (
    <div>
      <BillInput billAmnt={billAmnt} setBillAmnt={setBillAmnt} />
      <div>
        <PercentageIntake percentage={perc1} handleChange={setPerc1}>
          How did you like the service?
        </PercentageIntake>
      </div>
      <div>
        <PercentageIntake percentage={perc2} handleChange={setPerc2}>
          How did your friend like the service?
        </PercentageIntake>
      </div>
      {billAmnt > 0 && (
        <>
          {" "}
          <FinalBill>
            You pay ${billAmnt + tipAmt} (${billAmnt} + ${Number(tipAmt)} tip)
          </FinalBill>
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ billAmnt, setBillAmnt }) {
  return (
    <div>
      <div>
        <p>How much was the bill?</p>
        <input
          placeholder="Bill $ amount"
          type="text"
          value={billAmnt}
          onChange={(e) => setBillAmnt(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

function PercentageIntake({ children, percentage, handleChange }) {
  return (
    <div>
      <p> {children}</p>
      <select
        value={percentage}
        onChange={(e) => handleChange(Number(e.target.value))}
      >
        <option key={1} value={0}>
          0%
        </option>
        <option key={2} value={5}>
          5%
        </option>
        <option key={3} value={10}>
          10%
        </option>
        <option key={4} value={15}>
          15%
        </option>
        <option key={5} value={20}>
          20%
        </option>
      </select>
    </div>
  );
}

function FinalBill({ children }) {
  return (
    <div>
      <h2>{children}</h2>
    </div>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}
