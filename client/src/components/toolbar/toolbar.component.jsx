import React, { useState, useEffect } from 'react';
import './toolbar.styles.css';

import axios from 'axios'

import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import ZoomOutSharpIcon from '@material-ui/icons/ZoomOutSharp';
import ZoomInSharpIcon from '@material-ui/icons/ZoomInSharp';


const ToolBar = props => {
  const [texGeneratingState, setTexState] = useState("generate")

  const GenerateTex = async () => {
    setTexState("generating")
    let we = localStorage.getItem('rsoft-resume')
    //console.log(we);
    if (we == null) {
      let tem = {
        basicDetails : {
          image: "",
          imageURl: "",
          imageName: "No file chosen",
          name: "",
          degree: "",
          linkedIn: ""
        },
        educationDetails: [],
        areasOfInterest: [],
        technicalProficiencies: [],
        Publications: [],
        Projects: [],
        Experiences: [],
        relevantCourses: [],
        Achievements: [],
        positionOfResponsibilities: [],
        extraCurricularActivities: [],
        hobbiesOrInterests: [],
        TBC: ""
      }
      we = JSON.stringify(tem)
    }
    else {
      we = JSON.parse(we);
      we.basicDetails.image = "";
      we = JSON.stringify(we);
    }
    //console.log(we);
    const config = {
      responseType: "blob", //Force to receive data in a Blob Format
      headers : {
        'Content-Type' : 'application/json',
        responseType : "blob"
      }
    }
    axios.post('/api/generate/tex', we, config)
    .then(response => {
      const file = new Blob([response.data]);
      setTexState("generate")
      let url = window.URL.createObjectURL(file);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'resume.tex';
      a.click();
    })
    .catch(error => {
        console.log(error);
        setTexState("generate")
      }
    )
  }

  return (
    <div className="toolbar">
      <div className="toolbar-download">
        <a href={props.pdfUrl} download="resume.pdf">
          <GetAppTwoToneIcon color="secondary" style={{ fontSize: 27, marginBottom: -8 }}/>
          PDF
        </a>
      </div>
      <div className="toolbar-tex-download">
        {
          texGeneratingState == "generate" ?
          <a onClick={() => GenerateTex()}>
            <GetAppTwoToneIcon color="primary" style={{ fontSize: 27, marginBottom: -8 }}/>
            TEX
          </a>
          : <button className="toolbar-tex-download-button">wait</button>
        } 
      </div>
      <div className="toolbar-pages">
        <button className="toolbar-backward" onClick={() => props.prePage()}>
          <i className="fa fa-long-arrow-left"></i>
        </button>
        <div className="toolbar-pages-number"> Page  {props.pageNumber}</div>
        <button className="toolbar-forward" onClick={() => props.nextPage()}>
          <i className="fa fa-long-arrow-right"></i>
        </button>
      </div>
      <div className="toolbar-zoom">
        <ZoomOutSharpIcon className="toolbar-zoom-out" onClick={() => props.zoomOut()}/>
        <ZoomInSharpIcon className="toolbar-zoom-in" onClick={() => props.zoomIn()}/>
      </div>
    </div>
  )
}
export default ToolBar;