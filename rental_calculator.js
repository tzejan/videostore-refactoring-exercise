let appFn = require("./rental_functions");
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
    let thisAmount = appFn.calculateRentalAmountByMovieCode(
      rental.days,
      rental.movie.code
    );
    let movieItem = { title: rental.movie.title, rentalCost: thisAmount };
    customerStatement.rentedMovies.push(movieItem);

    customerStatement.frequentRenterPoints += appFn.calculateFrequentRentalPoints(
      rental.movie.code,
      rental.days
    );
  }

  return appFn.formatStatement(customerStatement);
};
