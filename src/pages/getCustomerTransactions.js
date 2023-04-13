export const getCustomerTransactions = (id) => {
  setTimeout(() => {
    fetch("/transations.json")
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.customers[id] === undefined) {
              alert("No customer found with this id");
              return -1;
            }
            return data.customers[id].transactions;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 500);
};
