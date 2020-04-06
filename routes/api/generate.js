const express = require('express');
const Router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const latex = require('node-latex');
const makeTex = require('../../template/template');

// GET
// for deleting all files in resumefiles folder
Router.get('/delete', (req, res) => {
  const directory = path.join(__dirname, '../../', 'resumefiles');
  fs.readdir(directory, (err, files) => {
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        
      });
    }
  });

  res.send('All files deleted');
})


// POST
Router.post('/', (req, res) => {
  
  let raw = req.body;

  // using hash name for each request
  let fileName = crypto.randomBytes(20).toString('hex');
  fileName.toString();

  let imageName = fileName + '.png';
  let pdfName = fileName + '.pdf';
  let texName = fileName + '.tex';

  // Creating image from base64 to file
  let base64String = req.body.basicDetails.image; 
  let base64Image = base64String.split(';base64,').pop();
  const imagePath = path.join(__dirname, '../../', 'resumefiles', imageName);
  fs.writeFile(imagePath, base64Image, {encoding: 'base64'}, function(err) {
    // console.log('Image created');
  });

  // Creating tex file
  let texPath = path.join(__dirname, '../../', 'resumefiles', texName);
  raw.basicDetails.imageName = imagePath;
  makeTex(raw, texPath);

  // Creating Pdf 
  let pdfPath = path.join(__dirname, '../../', 'resumefiles', pdfName);
  const input = fs.createReadStream(texPath)
  const output = fs.createWriteStream(pdfPath)
  
  const pdf = latex(input)
  
  pdf.pipe(output)
  pdf.on('error', err => {
    // console.error(err)
    fs.stat(pdfPath, (err, stats) => {
      //if (err) console.log(err);
      fs.unlink(pdfPath, (err) =>{
        //if (err) throw err;
        // console.log('Pdf deleted');
      })
    })
    
    fs.stat(imagePath, (err, stats) => {
      fs.unlink(imagePath, (err) =>{
        //if (err) throw err;
        // console.log('Image deleted');
      })
    })
    
    fs.stat(texPath, (err, stats) => {
      fs.unlink(texPath, (err) =>{
        //if (err) throw err;
        // console.log('Tex file deleted');
      })
    })
  })
  pdf.on('finish', () => {
    console.log('PDF generated!')
    let file = fs.createReadStream(pdfPath)
    file.pipe(res);

    fs.stat(pdfPath, (err, stats) => {
      fs.unlink(pdfPath, (err) =>{
        //if (err) throw err;
        // console.log('Pdf deleted');
      })
    })
    
    fs.stat(imagePath, (err, stats) => {
      fs.unlink(imagePath, (err) =>{
        //if (err) throw err;
        // console.log('Image deleted');
      })
    })
    
    fs.stat(texPath, (err, stats) => {
      fs.unlink(texPath, (err) =>{
        // if (err) throw err;
        // console.log('Tex file deleted');
      })
    })
    
  })
})


module.exports = Router;