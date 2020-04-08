const express = require('express');
const cors = require('cors');

const generate = require('./routes/api/generate');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
//app.get('/', (req, res) => res.send('Welcome to backend'));
app.use('/api/generate', generate);


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.use('*', express.static('client/build')); 
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // relative path
  // });
}


// routes


app.listen(PORT, () => console.log('Server running in PORT ', PORT));
//ftp://tug.org/historic/systems/texlive/2019/tlnet-final