

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
  formatStatement
};
