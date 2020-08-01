import React from 'react';
import './about.css';

import { Helmet } from 'react-helmet';
import TopNavBar from '../../components/topnavbar/topnavbar.component';

import dotsrsoft from '../../assests/4dotsrsoft.jpeg';
import iittplogo from '../../assests/logoupdated.png';
import newprojectoverleaf from '../../assests/newprojectoverleaf.jpeg';
import threefilesrsoft from '../../assests/threefilesrsoft.jpeg';
import photorsoft from '../../assests/photorsoft.jpeg';
import photonameandextension from '../../assests/photonameandextension.jpeg';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="aboutpage">
        <Helmet>
          <title>About</title>
        </Helmet>
        <TopNavBar />  
        <div className="about-section">
          <h1 style={{marginTop:20, paddingTop:20, paddingLeft: 20}}>Developer</h1>
          <p style={{marginTop:0, paddingLeft:20}}>My name is Raj Garg and I am currently pursuing my final year of Bachelor's in Mechanical Engineering from IIT, Tirupati.</p>
          <h1 style={{marginTop:0, paddingTop:20, paddingLeft: 20}}>How to Use </h1>
          <p style={{marginTop:0, paddingLeft:20}}>○ Image Size can be upto 250kb. Images with jpeg, jpg and png extensions are allowed.</p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Every section and fields are optional.</p>
          <p style={{marginTop:0, paddingLeft:20}}> ○ <img src={dotsrsoft} alt="4 dots" style={{margin:0, paddingRight:6}}/> In Every field you can see this 4 dots. By moving the cursor on this 4 dots, you can change the order of your project, courses, etc.</p>
          <p style={{marginTop:0, paddingLeft:20}}>○ In Publications, Experiences, Projects, Achievements, Position of Responsibility and Extra Curricular Activity, while writing description you can use double backslash (\\) to write into a new line</p>
          <p style={{marginTop:0, paddingLeft:40}}>For example : </p>
          <p style={{marginTop:0, paddingLeft:40}}>It is a shopping web app. \\ &lt; any leading text > </p>
          <p style={{marginTop:0, paddingLeft:40}}>Output will be :</p>
          <p style={{marginTop:0, paddingLeft:40}}>It is a shopping web app.</p>
          <p style={{marginTop:0, paddingLeft:40}}>&lt; any leading text ></p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Your resume data will be saved in your device local storage automatically. It can take a while to get response from server if your data is more, So wait for the response.</p>
          <p style={{marginTop:0, paddingLeft:20}}>○ You can always delete your data from your device by clicking "Make New Resume" button on landing page and make new resume. </p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Report an issue if pdf is not generating.</p>
          <h1 style={{marginTop:20, paddingTop:20, paddingLeft: 20}}>Setup for customizable resume</h1>
          <p style={{marginTop:0, paddingLeft:20}}>○ You need 3 files for that</p>
          <p style={{marginTop:0, paddingLeft:40}}>1. TEX file (Download from this website) </p>
          <p style={{marginTop:0, paddingLeft:40}}>2. IIT Tirupati logo (<a href={iittplogo} download="IITTLOGO.png"><b>here</b></a>) </p>
          <p style={{marginTop:0, paddingLeft:40}}>3. Your Photo</p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Make your account on <a href="https://www.overleaf.com/" target="blank">https://www.overleaf.com/</a> and, then create a new project in it. <img src={newprojectoverleaf} alt="new project overleaf" /></p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Upload all three file in this project folder. <img src={threefilesrsoft} alt="3 files" /></p>
          <p style={{marginTop:0, paddingLeft:20}}>○ Open resume.tex and do the  following steps</p>
          <p style={{marginTop:0, paddingLeft:40}}>1. On line 47 change &lt; LOGO NAME WITHOUT EXTENSION> with IIT Tirupati logo name. (according to above pic, logo name will be: IITTLOGO)</p>
          <p style={{marginTop:0, paddingLeft:40}}>2. Around line no. 57 you can see &lt; PHOTO NAME WITHOUT EXTENSION>. Change it with your photo name. (according to above pic, photo name will be: cfcat)</p>
          <p style={{marginTop:0, paddingLeft:40}}><b>Note :</b> By default extension of your photo is png in the tex file <img src={photorsoft} alt="photo extension" />. In case your's photo extension is different then change it. (according to above pic of project folder it will be : <img src={photonameandextension} alt="photo name and extension"/></p>
          <h1 style={{marginTop:20, paddingTop:20, paddingLeft: 20}}>Report Your Issue</h1>
          <p style={{marginTop:0, paddingLeft:20, paddingBottom: 10}}>Before reporting make sure you have checked all your input fields and read above points. </p>
          <a className="report-issue-link" target="_blank" href="https://forms.gle/c1earJr733WtUm4j8">Report Issue</a>
          <p style={{marginTop:20, paddingLeft:20, paddingBottom: 10, marginBottom:100}}> </p>
        </div>      
      </div>
    );
  }
}

export default About;