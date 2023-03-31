const cache = {
  buys: [],
  sells: [],
};

module.exports = (app) => {
  app.get("/api/orders", (req, res) => {
    res.status(200).send(cache);
  });

  app.post("/api/orders", (req, res) => {
    const { buys, sells } = req.body;

    cache.buys = [...buys];
    cache.sells = [...sells];

    // console.log(cache.buys);
    // console.log(cache.sells);

    res.status(200).send({
      success: true,
    });
  });
};
