import React from 'react';
import './custombutton.styles.css';

const CustomButton = props => 
  <button type="button" className={`custom-button-${props.color}`} onClick={() => props.onClick(props.id)}> {props.name} </button>

export default CustomButton;