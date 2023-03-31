module.exports = (app) => {
  app.get("/api/health", (req, res) => {
    res.status(200).send({
      'live':true
    });
  });
};
