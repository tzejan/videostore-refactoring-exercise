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

describe("Statement", () => {
  describe("generated statement", () => {
    it.skip("should match", () => {
      var statement = appFn.generateStatement(customer, movies);
      let expectedStatement = {
        frequentRenterPoints: 2,
        customerName: "martin",
        rentedMovies: [
          { title: "Ran", rentalCost: 3.5 },
          { title: "Trois Couleurs: Bleu", rentalCost: 2 }
        ]
      };
      expect(statement).toEqual(expectedStatement);
    });
  });
  describe.skip("formatted statement", () => {
    it("should match", () => {
      const expectedFormattedStatement = `Rental Record for martin
  Ran     3.5
  Trois Couleurs: Bleu    2
Amount owed is 5.5
You earned 2 frequent renter points`;
      let statement = {
        frequentRenterPoints: 2,
        customerName: "martin",
        rentedMovies: [
          { title: "Ran", rentalCost: 3.5 },
          { title: "Trois Couleurs: Bleu", rentalCost: 2 }
        ]
      };
      expect(formatStatement(statement)).toEqual(expectedFormattedStatement);
    });
  });
});



