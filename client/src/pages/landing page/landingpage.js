import React from 'react';
import './landingpage.css';

import TopNavBar from '../../components/topnavbar/topnavbar.component';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleClick = () => {
    localStorage.removeItem("rsoft-resume");
    // let path = `/resume`;
    // window.location.href=path
  }

  render() {
    return (
      <div className="landingpage">
        <Helmet>
          <title>RSOFT</title>
        </Helmet>
        <TopNavBar />
        <div className="landingpage-content">
          <div className="rsoft-heading-box">
            <div className="rsoft-heading">
              RSOFT
            </div>
          </div>
          <div className="rsoft-details-box">
            <div className="rsoft-details">
              RSOFT is a <i className="rsoft-latex-word">LaTex</i> based software to generate resume automatically.
            </div>
          </div>
          <div className="landingpage-buttons">
            <div>
            <Link to="/resume"><button className="rsoft-button">Continue Session</button></Link>
            </div>
            <div>
            <Link to="/resume"><button className="rsoft-button" onClick={this.handleClick}> Make New Resume</button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;