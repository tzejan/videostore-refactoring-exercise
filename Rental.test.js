let Rental = require("./Rental");
let Movie = require("./Movie");

describe("Calculate movie rental amount", () => {
  describe("from the supplied parameters", () => {
    let regularRates = { initialAmount: 2, freeDays: 2, dailyRate: 1.5 };
    it("should calculate correctly for 0 days", () => {
      let rental = new Rental({ movie: new Movie({}), days: 0 });
      const amount = rental.calculateRentalCostFromRates(regularRates);
      expect(amount).toBe(2);
    });
    it("should calculate correctly for 3 days", () => {
      let rental = new Rental({ movie: new Movie({}), days: 3 });
      const amount = rental.calculateRentalCostFromRates(regularRates);
      expect(amount).toBe(3.5);
    });
  });
});

describe("Calculate movie rental amount by movie code", () => {
  describe("for regular movies", () => {
    let regularMovie = new Movie({ code: "regular" });
    it("should calculate correctly for 0 days", () => {
      let rental = new Rental({ movie: regularMovie, days: 0 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(2);
    });
    it("should calculate correctly for 3 days", () => {
      let rental = new Rental({ movie: regularMovie, days: 3 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(3.5);
    });
  });
  describe("for new movies", () => {
    let newMovie = new Movie({ code: "new" });
    it("should calculate correctly for 0 days", () => {
      let rental = new Rental({ movie: newMovie, days: 0 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(0);
    });
    it("should calculate correctly for 3 days", () => {
      let rental = new Rental({ movie: newMovie, days: 3 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(9);
    });
  });
  describe("for children movies", () => {
    let childrenMovie = new Movie({ code: "children" });
    it("should calculate correctly for 0 days", () => {
      let rental = new Rental({ movie: childrenMovie, days: 0 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(1.5);
    });
    it("should calculate correctly for 4 days", () => {
      let rental = new Rental({ movie: childrenMovie, days: 4 });
      const amount = rental.calculateRentalCost();
      expect(amount).toBe(3);
    });
  });

  describe("Calculate frequent rental points", () => {
    describe("non-new movies", () => {
      it("should calculate correctly", () => {
        let regularMovie = new Movie({ code: "regular" });
        let rental = new Rental({ movie: regularMovie, days: 4 });
        expect(rental.calculateRentalPoints()).toEqual(1);
      });
    });

    describe("new movies", () => {
      let newMovie = new Movie({ code: "new" });
      it("should calculate 1 point for 2 rented days", () => {
        let rental = new Rental({ movie: newMovie, days: 2 });
        expect(rental.calculateRentalPoints()).toEqual(1);
      });
      it("should calculate 2 points for 4 rented days", () => {
        let rental = new Rental({ movie: newMovie, days: 4 });
        expect(rental.calculateRentalPoints()).toEqual(2);
      });
    });
  });
});
