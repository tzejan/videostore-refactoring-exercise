// import { generateStatement, formatStatement } from './app';
let appFn = require("./rental_functions");

let customer = {
  name: "martin",
  rentals: [{ movieID: "F001", days: 3 }, { movieID: "F002", days: 1 }]
};

let movies = {
  F001: { title: "Ran", code: "regular" },
  F002: { title: "Trois Couleurs: Bleu", code: "regular" }
};

describe('Calculate movie rental amount', () => {
  describe('from the supplied parameters', () => {
    let regularRates = { initialAmount: 2, freeDays: 2, dailyRate: 1.5 };
    it('should calculate correctly for 0 days', () => {
      const amount = appFn.calculateRentalAmount(0, regularRates);
      expect(amount).toBe(2);
    });
    it('should calculate correctly for 3 days', () => {
      const amount = appFn.calculateRentalAmount(3, regularRates);
      expect(amount).toBe(3.5);
    });
  });
});

describe('Calculate movie rental amount by movie code', () => {
  describe('for regular movies', () => {
    it('should calculate correctly for 0 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(0, "regular");
      expect(amount).toBe(2);
    });
    it('should calculate correctly for 3 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(3, "regular");
      expect(amount).toBe(3.5);
    });
  });
  describe('for new movies', () => {
    it('should calculate correctly for 0 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(0, "new");
      expect(amount).toBe(0);
    });
    it('should calculate correctly for 3 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(3, "new");
      expect(amount).toBe(9);
    });
  });
  describe('for childrens movies', () => {
    it('should calculate correctly for 0 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(0, "children");
      expect(amount).toBe(1.5);
    });
    it('should calculate correctly for 4 days', () => {
      const amount = appFn.calculateRentalAmountByMovieCode(4, "children");
      expect(amount).toBe(3);
    });
  });

});

describe('Statement', () => {
  describe('generated statement', () => {
    it.skip('should match', () => {
      var statement = appFn.generateStatement(customer, movies);
      let expectedStatement = {
        frequentRenterPoints: 2,
        customerName: "martin",
        rentedMovies: [{title: "Ran", rentalCost: 3.5},
                       {title: "Trois Couleurs: Bleu", rentalCost: 2}]
      };
      expect(statement).toEqual(expectedStatement);
    });
  });
  describe.skip('formatted statement', () => {
    it('should match', () => {
      const expectedFormattedStatement = `Rental Record for martin
  Ran     3.5
  Trois Couleurs: Bleu    2
Amount owed is 5.5
You earned 2 frequent renter points`;
    let statement = {
      frequentRenterPoints: 2,
      customerName: "martin",
      rentedMovies: [{title: "Ran", rentalCost: 3.5},
                    {title: "Trois Couleurs: Bleu", rentalCost: 2}]
    };
    expect(formatStatement(statement)).toEqual(expectedFormattedStatement);
    });
  });
});

describe('Calculate frequent rental points', () => {
  describe('non-new movies', () => {
    it('should calculate correctly', () => {
      let movieCode = 'regular';
      let daysRented = 4;
      expect(appFn.calculateFrequentRentalPoints(movieCode, daysRented)).toEqual(1);
    });
  });

  describe('new movies', () => {
    it('should calculate 1 point for 2 rented days', () => {
      let movieCode = 'new';
      let daysRented = 2;
      expect(appFn.calculateFrequentRentalPoints(movieCode, daysRented)).toEqual(1);
    });
    it('should calculate 2 points for 4 rented days', () => {
      let movieCode = 'new';
      let daysRented = 4;
      expect(appFn.calculateFrequentRentalPoints(movieCode, daysRented)).toEqual(2);
    });
  });
});
