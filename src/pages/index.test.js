import App from "./index";
import { getCustomerTransactions } from "./getCustomerTransactions";
import { getRewardsPoints } from "./getReqrdsPoints";
import React from "react";
import ReactDOM from "react-dom";

it("app exists", () => {
  expect(App).toBeDefined();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("getCustomerTransactions exists", () => {
  expect(getCustomerTransactions).toBeDefined();
});

it("getRewardsPoints exists", () => {
  expect(getRewardsPoints).toBeDefined();
});

it("getRewardsPoints returns 0 when no transactions", () => {
  expect(getRewardsPoints([])).toEqual(0);
});

it("getRewardsPoints returns 0 when no transactions in last 3 months", () => {
  expect(
    getRewardsPoints([
      {
        date: "2023-01-01",
        amount: 100,
      },
    ])
  ).toEqual(0);
});

it("getRewardsPoints returns 0 when there is less than 50 dollars spent in transactins", () => {
  expect(
    getRewardsPoints([
      {
        date: "2023-04-01",
        amount: 49,
      },
    ])
  ).toEqual(0);
});

it("getRewardsPoints returns 1 when there is 51 dollars spent in transactins", () => {
  expect(
    getRewardsPoints([
      {
        date: "2023-04-01",
        amount: 51,
      },
    ])
  ).toEqual(1);
});

it("getRewardsPoints returns 90 when there is 120 dollars spent in transactins", () => {
  expect(
    getRewardsPoints([
      {
        date: "2023-04-01",
        amount: 120,
      },
    ])
  ).toEqual(90);
});

it("getRewardsPoints returns 50 when there is 100 dollars spent in transactins", () => {
  expect(
    getRewardsPoints([
      {
        date: "2023-04-01",
        amount: 100,
      },
    ])
  ).toEqual(50);
});

it("a fetch call is made when getCustomerTransactions is called", () => {
  const spy = jest.spyOn(window, "fetch");
  getCustomerTransactions("id1");
  expect(spy).toHaveBeenCalled();
});

it("getCustomerTransactions returns and array", async () => {
  const transactions = await getCustomerTransactions("id1");
  expect(Array.isArray(transactions)).toBeTruthy();
});
