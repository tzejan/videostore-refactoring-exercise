let Movie = require("./Movie");
let Customer = require("./Customer");
let Rental = require("./Rental");
let StatementData = require("./StatementData");

module.exports = function statement(customer, movies) {
  let rentalCustomer = new Customer(customer);
  let rentals = customer.rentals.map(
    rental =>
      new Rental({
        movie: new Movie({
          id: rental.movieID,
          title: movies[rental.movieID].title,
          code: movies[rental.movieID].code
        }),
        days: rental.days
      })
  );

  let customerStatement = new StatementData(rentalCustomer.name);

  for (let rental of rentals) {
    let thisAmount = rental.calculateRentalCost();
    customerStatement.addMovieItem(rental.movie.title, thisAmount);
    customerStatement.frequentRenterPoints += rental.calculateRentalPoints();
  }

  return customerStatement.getFormattedStatement();
};
