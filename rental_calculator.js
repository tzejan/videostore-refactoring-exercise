let appFn = require("./rental_functions");
let Movie = require("./Movie");
let Customer = require("./Customer");
let Rental = require("./Rental");
let StatementData = require("./StatementData");

module.exports = function statement(customer, movies) {
  let rentalCustomer = new Customer(customer);
  let rentals = customer.rentals.map(
    rental =>
      new Rental(
        new Movie(
          rental.movieID,
          movies[rental.movieID].title,
          movies[rental.movieID].code
        ),
        rental.days
      )
  );

  let customerStatement = new StatementData(rentalCustomer.name);

  for (let rentedMovie of customer.rentals) {
    let movie = movies[rentedMovie.movieID];
    let thisAmount = appFn.calculateRentalAmountByMovieCode(
      rentedMovie.days,
      movie.code
    );
    let movieItem = { title: movie.title, rentalCost: thisAmount };
    customerStatement.rentedMovies.push(movieItem);

    customerStatement.frequentRenterPoints += appFn.calculateFrequentRentalPoints(
      movie.code,
      rentedMovie.days
    );
  }

  return appFn.formatStatement(customerStatement);
};
