import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './sidenavbar.styles.css';
import FacebookProgress from '../spinnerbutton/spinnerbutton.component';

const SideNav = props => {

  const [items] = useState(['Basic Details', 'Education Details', 'Areas of Interest', 'Technical Proficiencies', 'Publications',
  'Experiences', 'Projects', 'Relevant Courses', 'Achievements', 'Position of Responsibility', 'Extra Curricular Activities', 'Hobbies and Interests'])
  const [routes] = useState(['basicdetails', 'educationdetails', 'areasofinterest', 'technicalproficiencies', 'publications',
  'experiences', 'projects', 'relevantcourses', 'achievements', 'positionofresponsibilities', 'extracurricularactivities', 'hobbiesorinterests']);
  
  return (
    <div className="side-nav">
      <div className="side-nav-links"> 
        {
          routes.map((route, index) => 
            <div className="side-nav-link" key={`${index}`}>
              <NavLink activeClassName="side-nav-link-navlink" to={`/resume/${route}`}> {items[index]} </NavLink>
            </div>
          )
        }
      </div>
      <div className="side-nav-extras">
      { props.generateButtonStatus === 'generate' ? <button form="resumeform" className="side-nav-savemake"> GENERATE </button> : <FacebookProgress />}
      </div>
    </div>
  );
}

export default SideNav;