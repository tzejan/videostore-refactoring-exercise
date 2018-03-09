const movieRates = {
  regular: { initialAmount: 2, freeDays: 2, dailyRate: 1.5 },
  new: { initialAmount: 0, freeDays: 0, dailyRate: 3 },
  children: { initialAmount: 1.5, freeDays: 3, dailyRate: 1.5 }
};

class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  calculateRentalCost() {
    let movieRate = movieRates[this.movie.code];
    return this.calculateRentalCostFromRates(movieRate);
  }

  calculateRentalCostFromRates({ initialAmount, freeDays, dailyRate }) {
    let rentalAmount = initialAmount;
    if (this.days > freeDays) {
      rentalAmount += (this.days - freeDays) * dailyRate;
    }
    return rentalAmount;
  }

  calculateRentalPoints() {
    return this.movie.code === "new" && this.days > 2 ? 2 : 1;
  }
}

module.exports = Rental;
