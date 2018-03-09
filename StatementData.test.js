var StatementData = require("./StatementData");

describe("formatted statement", () => {
  it("should match", () => {
    let statement = new StatementData("martin");
    statement.frequentRenterPoints = 2;
    statement.rentedMovies = [
      { title: "Ran", amount: 3.5 },
      { title: "Trois Couleurs: Bleu", amount: 2 }
    ];
    let actualFormattedStatement = statement.getFormattedStatement();
    expect(actualFormattedStatement).toMatch(/Rental Record for martin/);
    expect(actualFormattedStatement).toMatch(/\tRan\t3.5/);
    expect(actualFormattedStatement).toMatch(/\tTrois Couleurs: Bleu\t2/);
    expect(actualFormattedStatement).toMatch(/Amount owed is 5.5/);
    expect(actualFormattedStatement).toMatch(/You earned 2 frequent renter points/);
  });
});

describe("addMovieItem", () => {
  it("should add movies to the list of rented movies", () => {
    let data = new StatementData();
    let movieItem = { title: "Sitar Wars", amount: 10 };
    data.addMovieItem(movieItem.title, movieItem.amount);
    expect(data.rentedMovies).toHaveLength(1);
    expect(data.rentedMovies[0]).toEqual(movieItem);
  });
});
