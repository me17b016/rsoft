import React from 'react';
import './about.css';

import { Helmet } from 'react-helmet';
import TopNavBar from '../../components/topnavbar/topnavbar.component';

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
          <h1 style={{marginTop:0, paddingTop:20, paddingLeft: 20}}>How to Use </h1>
          <p style={{marginTop:0, paddingLeft:20}}>Image Size can be upto 250kb. Images with jpeg, jpg and png extensions are allowed.</p>
          <p style={{marginTop:0, paddingLeft:20}}>Every section and fields are optional.</p>
          <p style={{marginTop:0, paddingLeft:20}}>Your resume data will be saved in your device local storage after you click "GENERATE" button and get successful response. It can take a while to get response from server if your data is more, So wait for the response before clicking again on "GENERATE" button.</p>
          <p style={{marginTop:0, paddingLeft:20}}>You can always delete your data from your device by clicking "Make New Resume" button on landing page and make new resume. </p>
          <p style={{marginTop:0, paddingLeft:20}}>Report an issue if pdf is not generating.</p>
          <h1 style={{marginTop:20, paddingTop:20, paddingLeft: 20}}>Report Your Issue</h1>
          <p style={{marginTop:0, paddingLeft:20, paddingBottom: 10}}>Before reporting make sure about checked all your input fields and read above points. </p>
          <a className="report-issue-link" target="_blank" href="https://forms.gle/c1earJr733WtUm4j8">Report Issue</a>
          <h1 style={{marginTop:20, paddingTop:20, paddingLeft: 20}}>Developer</h1>
          <p style={{marginTop:0, paddingLeft:20, paddingBottom: 40}}>My name is Raj Garg and I am currently pursuing my third year of Bachelor's in Mechanical Engineering from IIT, Tirupati.</p>
        </div>      
      </div>
    );
  }
}

export default About;