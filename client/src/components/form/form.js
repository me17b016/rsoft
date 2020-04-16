import React from 'react';

import  BasicDetails from './basicdetails/basicdetails.component';
import EducationDetails from './educationdetails/educationdetails.component';
import AreasOfInterest from './areasofinterest/areasofinterest.component';
import TechnicalProficiencies from './technicalproficiencies/technicalproficiencies.component';
import Publications from './publications/publications.component';
import Projects from './projects/projects.component';
import Experiences from './experiences/experiences.component';
import RelevantCourses from './relevantcourses/relevantcourses.component';
import Achievements from './achievements/achievements.component';
import PositionOfResponsiblities from './positionofresponsibilities/positionofresponsibilities.component'
import ExtraCurricularActivities from './extracurricularactivities/extracurricularactivities.component';
import HobbiesOrInterests from './hobbiesorinterests/hobbiesorinterests.component';
import Pdf from '../../assests/noprofileimage.png';
import { Route, Switch, Redirect } from 'react-router-dom';

import axios from 'axios';
class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      basicDetails : {
        image: Pdf,
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
      hobbiesOrInterests: []
    }
  }

  componentDidMount() {
    const we = JSON.parse(localStorage.getItem('rsoft-resume'))
    //console.log(we)
    //we.basicDetails.image = localStorage.getItem('rsoft-image');
    if (localStorage.getItem('rsoft-resume')) {
      this.setState({...we})
    }
  }
  stateChange = (fieldName, stateField) => {
    //const currentState = this.state;
    this.setState({
      [fieldName] : stateField
    }, () => localStorage.setItem('rsoft-resume', JSON.stringify(this.state)));
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.changeGenerateButtonStatus('generating');
    const config = {
      responseType: "blob", //Force to receive data in a Blob Format
      headers : {
        'Content-Type' : 'application/json',
        responseType : "blob"
      }
    }
    // try {
    //   const res = await axios.post('http://localhost:4000', JSON.stringify(this.state), config);
    //   const file = new Blob([res.data], {
    //     type: "application/pdf"
    //   });
    //   const fileURL = URL.createObjectURL(file);
    //   console.log(fileURL);
    //   //localStorage.setItem('qw', fileURL);
    //   window.open(fileURL);
    // } catch (err) {
    //   console.log(err);
    // }
    //let body = { educationDetails: this.state.educationDetails, areaOfInterest: this.state.areaOfInterest};
    axios.post('/api/generate', JSON.stringify(this.state), config)
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        //Build a URL from the file
        //console.log(response.data.size)
        this.props.changeGenerateButtonStatus('generate');
        if (response.data.size === 0) {alert("Some error occurred, Check you input text or Report issue.")}
        else {
          const fileURL = URL.createObjectURL(file);
          this.props.changeURl(fileURL);
          //localStorage.setItem('rsoft-image', this.state.basicDetails.image);
          // localStorage.setItem('rsoft-resume', JSON.stringify(this.state))
        }
      })
      .catch(error => {
        console.log(error)
        this.props.changeGenerateButtonStatus('generate');
        // alert("Some error occurred, Check you input text")
        //console.log(error);
      });
  }

  render() {
    return (
        <form id="resumeform" onSubmit={this.handleSubmit}>
          <Switch>
            <Route exact path="/resume" 
            render={() => <Redirect to="/resume/basicdetails"/>}/>
            <Route exact path="/resume/basicdetails" >
              <BasicDetails stateChange={this.stateChange} fields={this.state.basicDetails}/>
            </Route>
            <Route exact path="/resume/educationdetails">
              <EducationDetails stateChange={this.stateChange} fields={this.state.educationDetails}/>
            </Route>
            <Route exact path="/resume/areasofinterest">
              <AreasOfInterest stateChange={this.stateChange} fields={this.state.areasOfInterest} />
            </Route>
            <Route exact path="/resume/technicalproficiencies">
              <TechnicalProficiencies stateChange={this.stateChange} fields={this.state.technicalProficiencies} />
            </Route>
            <Route exact path="/resume/publications">
              <Publications stateChange={this.stateChange} fields={this.state.Publications} />
            </Route>
            <Route exact path="/resume/projects">
              <Projects stateChange={this.stateChange} fields={this.state.Projects} />
            </Route>
            <Route exact path="/resume/experiences">
              <Experiences stateChange={this.stateChange} fields={this.state.Experiences} />
            </Route>
            <Route exact path="/resume/relevantcourses">
              <RelevantCourses stateChange={this.stateChange} fields={this.state.relevantCourses} />
            </Route>
            <Route exact path="/resume/achievements">
              <Achievements stateChange={this.stateChange} fields={this.state.Achievements} />
            </Route>
            <Route exact path="/resume/positionofresponsibilities">
              <PositionOfResponsiblities stateChange={this.stateChange} fields={this.state.positionOfResponsibilities} />
            </Route>
            <Route exact path="/resume/extracurricularactivities">
              <ExtraCurricularActivities stateChange={this.stateChange} fields={this.state.extraCurricularActivities} />
            </Route>
            <Route exact path="/resume/hobbiesorinterests">
              <HobbiesOrInterests stateChange={this.stateChange} fields={this.state.hobbiesOrInterests} />
            </Route>
          </Switch>
        </form>
    );
  }
}

export default Form;