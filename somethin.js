import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: ""
  });
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [balance, setBalance] = useState("");
  const [credit, setCredit] = useState(
    JSON.parse(localStorage.getItem("credit"))
  );
  const [debit, setDebit] = useState(JSON.parse(localStorage.getItem("debit")));
  const [retail, setRetail] = useState(
    JSON.parse(localStorage.getItem("retail"))
  );
  const [grocery, setGrocery] = useState(
    JSON.parse(localStorage.getItem("grocery"))
  );
  const [household, setHousehold] = useState(
    JSON.parse(localStorage.getItem("household"))
  );
  const [entertainment, setEntertainment] = useState(
    JSON.parse(localStorage.getItem("entertainment"))
  );
  const [education, setEducation] = useState(
    JSON.parse(localStorage.getItem("education"))
  );
  const [other, setOther] = useState(JSON.parse(localStorage.getItem("other")));

  const [dropdown, setDropdown] = useState("");

  const updateForm = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
  };

  const getBalance = () => {
    const amounts = list.map((i) => i.amount);
    const money = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    setBalance(money);
  };
  // what does this do and do i have to add the categories
  useEffect(() => {
    getBalance();
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("credit", JSON.stringify(credit));
    localStorage.setItem("debit", JSON.stringify(debit));
  }, [list]);

  const plusMinus = () => {
    transaction.amount > 0
      ? setCredit(credit + transaction.amount)
      : setDebit(debit + transaction.amount);
  };

  const addCategory = () => {
    if (transaction.amount < 0) {
      if (dropdown === "grocery") {
        setGrocery(grocery + Math.abs(transaction.amount));
      } else if (dropdown === "retail") {
        setRetail(retail + Math.abs(transaction.amount));
      } else if (dropdown === "household") {
        setHousehold(household + Math.abs(transaction.amount));
      } else if (dropdown === "entertainment") {
        setEntertainment(entertainment + Math.abs(transaction.amount));
      } else if (dropdown === "education") {
        setEducation(education + Math.abs(transaction.amount));
      } else {
        setOther(other + transaction.amount);
      }
    }
  };

  const clearBudget = () => {
    setList([]);
    setCredit(null);
    setDebit(null);
    setRetail(null);
    setGrocery(null);
    setEducation(null);
    setHousehold(null);
    setEntertainment(null);
    setOther(null);
  };

  return (
    <div>
      <div className="container">
        <h1 className="title">Budget</h1>

        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setList([transaction, ...list]);
              plusMinus();
              addCategory();
              setTransaction({ description: "", amount: "" });
            }}
          >
            <div className="userInput">
              <h2 className="subtitle"> New Entry </h2>
              <div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Transaction"
                  value={transaction.description}
                  name="description"
                  onChange={updateForm}
                />
              </div>
              <input
                type="number"
                className="input"
                placeholder="Enter Amonut"
                name="amount"
                value={transaction.amount}
                onChange={updateForm}
              />
              <div>
                <select
                  value={dropdown}
                  onChange={(e) => {
                    setDropdown(e.target.value);
                  }}
                >
                  <option value="" selected>
                    Select
                  </option>{" "}
                  // idk about error if they choose this
                  <option value="retail"> Retail </option>
                  <option value="grocery"> Grocery </option>
                  <option value="household"> Household Expenses </option>
                  <option value="entertainment"> Entertainment </option>
                  <option value="education"> Education </option>
                  <option value="other"> Other </option>
                </select>

                <button type="submit" className="submitButton">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="transaction">
            <h2 className="subtitle">History</h2>
            {list.map((i) => {
              return (
                <table className="table">
                  <tbody key={i.description}>
                    <tr>{i.description}</tr>
                    <td>${parseInt(i.amount)}</td>
                  </tbody>
                </table>
              );
            })}
            <button className="clearButton" onClick={clearBudget}>
              Clear Budget
            </button>
          </div>
        </div>
      </div>
      <div className="totals">
        <h2 className="subtitle">Current Balance:</h2>
        <h3>${balance}</h3>
        <div>
          <h3 className="subtitle">Income</h3>
          <h4>${credit}</h4>
        </div>
        <div>
          <h3 className="subtitle">Expenses</h3>
          <h2>${debit}</h2>
        </div>
        <div>
          <h4 className="categories"> Retail </h4>
          <h3> ${retail} </h3>
        </div>
        <div>
          <h4 className="categories"> Grocery </h4>
          <h3> ${grocery} </h3>
        </div>
        <div>
          <h4 className="categories"> Household Expenses </h4>
          <h3> ${household} </h3>
        </div>
        <div>
          <h4 className="categories"> Entertainment </h4>
          <h3> ${entertainment} </h3>
        </div>
        <div>
          <h4 className="categories"> Education </h4>
          <h3> ${education} </h3>
        </div>
        <div>
          <h4 className="categories"> Other </h4>
          <h3> ${other} </h3>
        </div>
      </div>
    </div>
  );
}

export default App;