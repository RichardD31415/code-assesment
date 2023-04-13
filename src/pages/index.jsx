import "../styles/Home.module.css";
import { useState } from "react";
import Transactions from "./Transactions";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const getCustomerTransactions = () => {
    const id = document.getElementById("customerId").value;
    //adding timeout to simulate a network delay
    setTimeout(() => {
      fetch("/transations.json")
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              if (data.customers[id] === undefined) {
                alert("No customer found with this id");
                return;
              }
              setTransactions(data.customers[id].transactions);
              return data;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  };

  const getRewardsPoints = (transactions) => {
    let rewardsPoints = 0;
    transactions.forEach((transaction) => {
      if (
        new Date(transaction.date) >
        new Date().setMonth(new Date().getMonth() - 3)
      ) {
        if (transaction.amount > 50 && transaction.amount < 100) {
          rewardsPoints += Math.floor(transaction.amount) - 50;
        } else if (transaction.amount == 100) {
          rewardsPoints += 50;
        } else if (transaction.amount > 100) {
          rewardsPoints += 2 * (Math.floor(transaction.amount) - 100) + 50;
        }
      }
    });
    return rewardsPoints;
  };

  return (
    <>
      <h1>
        See your transactions here and how many rewards points you have earned.
      </h1>
      <p>
        for the assesment, just look up id1, id2, or id3 for now, proof of
        concept
      </p>
      <label htmlFor="customerId">Customer Id</label>
      <input type="text" id="customerId" />
      <button onClick={getCustomerTransactions}>Search</button>
      {transactions.length > 0 ? (
        <div>
          <Transactions transactions={transactions}></Transactions>
          <div>Rewards Points: {getRewardsPoints(transactions)}</div>
        </div>
      ) : null}
    </>
  );
}
