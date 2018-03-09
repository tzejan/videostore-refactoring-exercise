class StatementData {
  constructor(customerName) {
    (this.customerName = customerName),
      (this.rentedMovies = []),
      (this.frequentRenterPoints = 0);
  }
}

module.exports = StatementData;
