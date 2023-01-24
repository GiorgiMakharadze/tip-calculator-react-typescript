import { useState, useEffect } from "react";
import styles from "./Calculator.module.scss";

function Calculator(): JSX.Element {
  const [bill, setBill] = useState<number | undefined>(undefined);
  const [people, setPeople] = useState<number | undefined>(undefined);
  const [tip, setTip] = useState<number | undefined>(undefined);
  const [peopleError, setPeopleError] = useState<boolean>(false);

  const tipPercentages = [0.05, 0.1, 0.15, 0.25, 0.5];

  useEffect(() => {
    if (people === 0) {
      setPeopleError(true);
    } else {
      setPeopleError(false);
    }
  }, [people]);

  const alright =
    bill !== undefined && people !== undefined && tip !== undefined;
  const tipAmount = alright && ((bill * tip) / people).toFixed(2);
  const totalPerPerson = alright && ((bill * (1 + tip)) / people).toFixed(2);
  const showTip = !(tipAmount === "NaN" || tipAmount === "Infinity");
  const showTotal = !(
    totalPerPerson === "NaN" || totalPerPerson === "Infinity"
  );

  return (
    <div className={styles.App}>
      <div className={styles.containerOne}>
        <p>Bill</p>
        <input
          placeholder="Bill"
          type="number"
          min={0}
          value={bill}
          onChange={(e) => {
            console.log(e.target.valueAsNumber);
            setBill(e.target.valueAsNumber); //radgan vlaue stringia numberad gadagvaq
          }}
        />
        <p>Select tip %</p>
        <div className={styles.btnContainer}>
          {tipPercentages.map((tip) => (
            <button
              key={tip}
              onClick={() => setTip(tip)}
              className={styles.tipButton}
            >
              <span>{tip * 100}%</span>
            </button>
          ))}
          <input
            placeholder="Custom"
            type="number"
            min={0}
            max={100}
            value={tip && tip * 100}
            onChange={(e) => {
              setTip(e.target.valueAsNumber / 100);
            }}
          />
        </div>

        <p>Number of People</p>
        <input
          className={peopleError ? styles.errorInput : styles.normalInput}
          placeholder="Number of People"
          type="number"
          min={1}
          value={people}
          onKeyDown={(e) => {
            if (e.key === ".") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setPeople(Number(e.target.valueAsNumber.toFixed()));
          }}
        />
        <div className={styles.error}>
          {peopleError ? `Can't be Zero !` : null}
        </div>
      </div>
      <div className={styles.containerTwo}>
        <span>Tip amount</span> person: {showTip ? tipAmount : "0.00"}
        <span>Total</span> person: {showTotal ? totalPerPerson : "0.00"}
      </div>
    </div>
  );
}

export default Calculator;
