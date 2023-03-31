const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors')

const app = express();

const corsOptions = {
  origin: `*`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());


// server production assets like css, images, js
app.use(express.static('build'));
app.use(cors(corsOptions))

require('./routes/contact')(app);
require('./routes/health')(app);
require('./routes/orders')(app);

// app.use('*',(req,res,next)=>{
//   console.log(req.headers.host)
//   console.log(req.headers.origin)
//   console.log(req.headers.referer)
//   next()
// })
// if route is not recognized server index.html

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
}); 

// create server instance
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
  console.log(`${__dirname}`)
});