let exportfns = {};

exportfns.getHome = (req, res) => {
  res.send("We are viewing home !!");
  console.log("youre home");
};

exportfns.getHouse = (req, res) => {
    res.send("We are viewing house in home !!");
    console.log("youre in the house");
  };

module.exports = exportfns;
