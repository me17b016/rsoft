import React, { useState, useEffect } from 'react';
import './basicdetails.styles.css';

import { Helmet } from "react-helmet";
import TextField from '@material-ui/core/TextField';
import noProfileImage from '../../../assests/noprofileimage.png';
const BasicDetails = props => {

  const [fields, setFields] = useState({image: "",  imageURl: "", imageName: "", name: "", degree: "", linkedIn: ""});

  useEffect(() => {
    let newFields = {...props.fields};
    if (props.fields.image === "") {
      newFields.image = noProfileImage;
    }
    setFields(newFields);
  }, [props])

  const func = (e) => {
    const realUplBtn = document.getElementById('real-upload-input');
    const customTxt = document.getElementById('custom-image-upload-text');
    if (realUplBtn.value) {
      if (e.target.files[0].size > 250000) {  
        alert("Image size is too large \nImage size can be upto 250kb")
        realUplBtn.value = null
      }
      else {

        customTxt.innerHTML = realUplBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

        let newFields = {...fields};

        // newFields.imageURl = URL.createObjectURL(e.target.files[0]);
        newFields.imageName = realUplBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            newFields.image = base64
        }).then(() => {
            props.stateChange("basicDetails", newFields);
            setFields(newFields);
        });
      }
    }
    else {
      //setUrl(noProfileImage);
      customTxt.innerHTML = "No file Chosen"
    }
    realUplBtn.removeEventListener("change", func, false);
  }

  const Addimage = () => {
    //console.log('click');
    const realUplBtn = document.getElementById('real-upload-input');
    //const customUplBtn = document.getElementById('custom-image-upload-button');
    const customTxt = document.getElementById('custom-image-upload-text');

    realUplBtn.click()
    realUplBtn.addEventListener("change", func, false)
  }

  const stateChange = (fieldName, value) => {
    let newFields = {...fields};
    newFields[fieldName] = value;
    //console.log("newfields", newField);
    props.stateChange("basicDetails", newFields);
    setFields(newFields);
  }

  return (
    <div className="basic-details">
      <Helmet>
        <title>Basic Details</title>
      </Helmet>
      <div className="basic-details-image">
        <figure className="basic-details-image-container">
          <img className="basic-details-image-tag" src={fields.image} width="50%" height="100%" alt="no profile"/>
        </figure>
        <input id="real-upload-input" type="file"  hidden="hidden" accept="image/x-png,image/gif,image/jpeg" /> 
        <button type="button" id="custom-image-upload-button" 
          className="basic-details-image-button" onClick={() => Addimage()}> 
          Add Your Photo 
        </button>
        <span id="custom-image-upload-text"> {fields.imageName} </span>
      </div>
      <div className="basic-details-text">
        <TextField className="basic-details-name" label="Name" variant="outlined" value={fields.name}
          onChange={(e) => stateChange("name", e.target.value)}/>
        <TextField className="basic-details-degree" label="Degree" variant="outlined" value={fields.degree}
          onChange={(e) => stateChange("degree", e.target.value)}/>
        <TextField className="basic-details-linkedin" label="LinkedIn Id" variant="outlined" value={fields.linkedIn}
          onChange={(e) => stateChange("linkedIn", e.target.value)}/>
      </div>
    </div>
  );
}

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
     reader.readAsDataURL(file);
  });
}


export default BasicDetails;