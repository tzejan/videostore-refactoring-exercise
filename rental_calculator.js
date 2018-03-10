let Customer = require("./Customer");
let Rental = require("./Rental");
let StatementData = require("./StatementData");

module.exports = function statement(customer, movies) {
  let rentalCustomer = new Customer(customer);
  let rentals = Rental.createRentals(customer, movies);

  let customerStatement = new StatementData(rentalCustomer.name);

  customerStatement.updateRentalPoints(rentals);
  customerStatement.addAllRentedMovieItems(rentals);

  return customerStatement.getFormattedStatement();
};
