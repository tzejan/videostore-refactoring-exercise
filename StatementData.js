class StatementData {
  constructor(customerName) {
    this.customerName = customerName;
    this.rentedMovies = [];
    this.frequentRenterPoints = 0;
  }

  updateRentalPoints(rentals) {
    for (let rental of rentals) {
      this.frequentRenterPoints += rental.calculateRentalPoints();
    }
  }

  addMovieItem(title, amount) {
    this.rentedMovies.push({ title: title, amount: amount });
  }

  addAllRentedMovieItems(rentals) {
    for (let rental of rentals) {
      this.addMovieItem(rental.movie.title, rental.calculateRentalCost());
    }
  }
  getFormattedStatement() {
    let totalAmount = 0;
    let result = `Rental Record for ${this.customerName}\n`;
    for (let rentedMovie of this.rentedMovies) {
      result += `\t${rentedMovie.title}\t${rentedMovie.amount}\n`;
      totalAmount += rentedMovie.amount;
    }
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${this.frequentRenterPoints} frequent renter points\n`;
    return result;
  }
}

module.exports = StatementData;
