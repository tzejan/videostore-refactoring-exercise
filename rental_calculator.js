let appFn = require("./rental_functions");

module.exports = function statement(customer, movies) {
  let customerStatement = {
    frequentRenterPoints: 0,
    customerName: customer.name,
    rentedMovies: []
  };

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
