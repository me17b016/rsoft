import React, { Fragment, useState, useEffect } from 'react'
import './educationdetails.styles.css';

import { Helmet } from 'react-helmet';
import CustomButton from '../../custombutton/custombutton.component';

import {
  sortableContainer,
  sortableElement,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragHandle from '../../draghandle/draghandle.component';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import CustomExpansionSummary from '../../expansionpanelsummary/expansionpanelsummary.component';


const EducationDetails = props => {
  
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const nFields = props.fields.length;
    let fieldArray = [];
    for (let i = 0; i < nFields; i++) {
      fieldArray.push({
        id: i + 1,
        value: {
          programme: props.fields[i].programme,
          institute: props.fields[i].institute,
          year: props.fields[i].year,
          marks: props.fields[i].marks
        }
      })
    }
    setNumberOfFields(nFields);
    setFields(fieldArray)
  }, [props])

  const fieldReturn = Fields => {
    let fieldsWithoutId = [];
    for (let i = 0; i < Fields.length; i++) {
      fieldsWithoutId.push(Fields[i].value);
    }
    // console.log(fieldsWithoutId) ;
    props.stateChange("educationDetails", fieldsWithoutId);
  }

  const add = () => {
    const newFields = []
    const newField = {
      id: numberOfFields + 1, 
      value: {
        programme: "",
        institute: "",
        year: "",
        marks: ""
      }
    }

    for (let i = 0; i < fields.length; i++) {
      const field = {id : i + 1, value : fields[i].value}
      newFields.push(field)
    }
    newFields.push(newField);
    setNumberOfFields(numberOfFields + 1);
    setFields(newFields);
    fieldReturn(newFields);
  }

  const Delete = id => {
    const newFields = fields.filter(field => field.id !== id);
    setNumberOfFields(numberOfFields - 1);
    setFields(newFields);
    fieldReturn(newFields);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const Fields = arrayMove(fields, oldIndex, newIndex);
    setFields(Fields);
    fieldReturn(Fields);
  }

  const stateChange = (id, name, value) => {
   const Fields = [...fields];
    for (let i = 0; i < Fields.length; i++) {
      if (Fields[i].id === id) {
        Fields[i].value[name] = value;
        break;
      }
    }
    setFields(Fields);
    fieldReturn(Fields);
  }
  
    return (
      <Fragment>
        <Helmet>
          <title>Education Details</title>
        </Helmet>
        <SortableContainer  
          items={fields} 
          useDragHandle lockAxis="y" 
          onSortEnd={onSortEnd}
          delete={Delete}
          stateChange={stateChange}
        />
        <div className="education-add-button">
          <CustomButton name={"ADD"} onClick={add} color={'green'}/>
        </div>
      </Fragment>
    );
}




const SortableItem = sortableElement( props => {
  const stateChange = props.stateChange;

  return (
    <div className="item">
      <ExpansionPanel >
          <CustomExpansionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <DragHandle />
          </CustomExpansionSummary>
        
          <ExpansionPanelDetails>
            <div className="education-details-fields">
              <TextField className="education-programme" label="Programme" variant="outlined" value={props.value.value.programme}
                onChange={(e) => stateChange(props.value.id, "programme", e.target.value)}/>
              <TextField className="education-institute" label="Institute" variant="outlined" value={props.value.value.institute}
                onChange={(e) => stateChange(props.value.id, "institute", e.target.value)}/>
              <TextField className="education-year" label="Year" variant="outlined" value={props.value.value.year}
                onChange={(e) => stateChange(props.value.id, "year", e.target.value)}/>
              <TextField className="education-marks" label="Marks" variant="outlined" value={props.value.value.marks}
                onChange={(e) => stateChange(props.value.id, "marks", e.target.value)}/>
              <div className="education-delete">
                <CustomButton onClick={props.delete} id={props.value.id} name={"DELETE"} color={'red'} />
              </div>
            </div>  
          </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
})



const SortableContainer = sortableContainer( props => {
  const { items } = props;

  return (
    <div className="list">
      { 
        items.map((value, index) => 
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            delete={props.delete}
            stateChange={props.stateChange}
          />
        )
      }
    </div>
  )
})


export default EducationDetails;
