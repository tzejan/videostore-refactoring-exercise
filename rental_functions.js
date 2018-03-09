const movieRates = {
  regular: { initialAmount: 2, freeDays: 2, dailyRate: 1.5 },
  new: { initialAmount: 0, freeDays: 0, dailyRate: 3 },
  children: { initialAmount: 1.5, freeDays: 3, dailyRate: 1.5 }
};

function calculateRentalAmountByMovieCode(daysRented, movieCode) {
  let movieRate = movieRates[movieCode];
  return calculateRentalAmount(daysRented, movieRate);
}

function calculateFrequentRentalPoints(movieCode, daysRented) {
  return movieCode === "new" && daysRented > 2 ? 2 : 1;
}

function calculateRentalAmount(
  daysRented,
  { initialAmount, freeDays, dailyRate }
) {
  let rentalAmount = initialAmount;
  if (daysRented > freeDays) {
    rentalAmount += (daysRented - freeDays) * dailyRate;
  }
  return rentalAmount;
}

function formatStatement(statement) {
  let totalAmount = 0;
  let result = `Rental Record for ${statement.customerName}\n`;
  for (let rentedMovie of statement.rentedMovies) {
    result += `\t${rentedMovie.title}\t${rentedMovie.rentalCost}\n`;
    totalAmount += rentedMovie.rentalCost;
  }
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${
    statement.frequentRenterPoints
  } frequent renter points\n`;
  return result;
}

module.exports = {
  calculateRentalAmountByMovieCode,
  calculateRentalAmount,
  calculateFrequentRentalPoints,
  movieRates,
  formatStatement
};
