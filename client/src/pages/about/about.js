import React from 'react';
import './about.css';

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
        <TopNavBar />        
      </div>
    );
  }
}

export default About;