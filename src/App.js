import React, { useState, useEffect } from "react";
import "./App.css";
import Logo from "./shehacks-logo.svg";

function App() {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: ""
  });
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [balance, setBalance] = useState("");
  const [income, setincome] = useState(
    JSON.parse(localStorage.getItem("income"))
  );

  const [expenses, setexpenses] = useState(
    JSON.parse(localStorage.getItem("expenses"))
  );
  const [retail, setRetail] = useState(
    JSON.parse(localStorage.getItem("retail")) || 0
  );
  const [grocery, setGrocery] = useState(
    JSON.parse(localStorage.getItem("grocery")) || 0
  );
  const [household, setHousehold] = useState(
    JSON.parse(localStorage.getItem("household")) || 0
  );
  const [entertainment, setEntertainment] = useState(
    JSON.parse(localStorage.getItem("entertainment")) || 0
  );
  const [education, setEducation] = useState(
    JSON.parse(localStorage.getItem("education")) || 0
  );
  const [other, setOther] = useState(
    JSON.parse(localStorage.getItem("other")) || 0
  );

  const [dropdown, setDropdown] = useState("");

  const updateForm = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]:
        e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
    });
  };

  const getBalance = () => {
    const amounts = list.map((i) => i.amount);
    const money = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    setBalance(money);
  };

  useEffect(() => {
    getBalance();
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("retail", JSON.stringify(retail));
    localStorage.setItem("grocery", JSON.stringify(grocery));
    localStorage.setItem("household", JSON.stringify(household));
    localStorage.setItem("entertainment", JSON.stringify(entertainment));
    localStorage.setItem("education", JSON.stringify(education));
    localStorage.setItem("other", JSON.stringify(other));
  }, [list]);

  const plusMinus = () => {
    transaction.amount > 0
      ? setincome(income + transaction.amount)
      : setexpenses(expenses + Math.abs(transaction.amount));
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
        setOther(other + Math.abs(transaction.amount));
      }
    }
  };

  const clearBudget = () => {
    setList([]);
    setincome(0);
    setexpenses(0);
    setRetail(0);
    setGrocery(0);
    setEducation(0);
    setHousehold(0);
    setEntertainment(0);
    setOther(0);
  };

  return (
    <div className="outer">
      <div className="parent">
        <ul id="flat">
          <img className="photo" src={Logo} />
          <h1 className="title">ufinance</h1>
        </ul>

        <div className="container">
          <div className="form">
            <div className="userInput">
              <div className="upper-bar">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="lower-bar">
                <h2 className="subtitle"> New Transaction</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setList([transaction, ...list]);
                    plusMinus();
                    addCategory();
                    setTransaction({ description: "", amount: "" });
                  }}
                >
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Transaction"
                    value={transaction.description}
                    name="description"
                    onChange={updateForm}
                  />
                  <input
                    type="number"
                    step=".01"
                    className="input"
                    placeholder="Enter Amount"
                    name="amount"
                    value={transaction.amount}
                    onChange={updateForm}
                  />{" "}
                  <div>
                    <select
                      className="selectDropdown"
                      value={dropdown}
                      onChange={(e) => {
                        setDropdown(e.target.value);
                      }}
                    >
                      <option value="" selected>
                        Select Category
                      </option>{" "}
                      <option value="retail"> Retail </option>
                      <option value="grocery"> Grocery </option>
                      <option value="household"> Household Expenses </option>
                      <option value="entertainment"> Entertainment </option>
                      <option value="education"> Education </option>
                      <option value="other"> Other </option>
                    </select>
                  </div>
                  <button type="submit" className="submitButton">
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="transaction">
              <div className="upper-bar">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="lower-bar">
                <h2 className="subtitle">Transaction History</h2>

                {list.map((i) => {
                  return (
                    <table className="table">
                      <tbody key={i.description} className="transactionhistory">
                        <tr>{i.description}</tr>
                        <td>${parseFloat(i.amount)}</td>
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
            <div className="upper-bar">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="lower-bar">
              <div className="balanceHeader">
                <h2><b>Current Balance:</b></h2>
                <h3 className="balance">${balance}</h3>
              </div>
              <div className="balanceSubHeader">
                <div className="output">
                  <div className="incomeOutput">
                    <h3>Income</h3>
                    <h4>${income}</h4>
                  </div>
                  <div className="expensesOutput">
                    <h3>Expenses</h3>
                    <h2>-${expenses}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <h4 className="categories"> Retail </h4>
                  <h4 className="categories"> Grocery </h4>
                  <h4 className="categories"> Household Expenses </h4>
                  <h4 className="categories"> Entertainment </h4>
                  <h4 className="categories"> Education </h4>
                  <h4 className="categories"> Other </h4>
                </div>

                <div className="column">
                  <h3 className="amount"> ${retail} </h3>
                  <h3 className="amount"> ${grocery} </h3>
                  <h3 className="amount"> ${household} </h3>
                  <h3 className="amount"> ${entertainment} </h3>
                  <h3 className="amount"> ${education} </h3>
                  <h3 className="amount"> ${other} </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

