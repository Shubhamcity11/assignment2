require('dotenv').config()
const express    = require('express'),
      app        = express();
      morgan     = require('morgan'),
      port       = process.env.PORT || 3000,
    routes       = require("./routes/routes")


app.use(express.json());
app.use(morgan('tiny'))
app.use(routes)
app.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 500;
    next(error)
})
//global error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
        message: err.message || "Something went wrong"
    })
})

app.listen(port, async () => {
    console.log('Server started on port: ' + port);
})

module.exports = app