import React, { Fragment, useState, useEffect } from 'react'
import './hobbiesorinterests.styles.css';

import CustomButton from '../../custombutton/custombutton.component';

import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

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
import { Helmet } from 'react-helmet';


const HobbiesOrInterests = props => {
  
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const nFields = props.fields.length;
    let fieldArray = [];
    let ok = false;
    for (let i = 0; i < nFields; i++) {
      if (props.fields[i].appear == null) ok = true
      fieldArray.push({
        id: i + 1,
        value: {
          appear : (props.fields[i].appear == null ? true : props.fields[i].appear),
          hobbyorinterest: props.fields[i].hobbyorinterest
        }
      })
    }
    if (ok) {
      fieldReturn(fieldArray);
    }
    else {
      setNumberOfFields(nFields);
      setFields(fieldArray)
    }
  }, [props])

  const fieldReturn = Fields => {
    let fieldsWithoutId = [];
    for (let i = 0; i < Fields.length; i++) {
      fieldsWithoutId.push(Fields[i].value);
    }
    // console.log(fieldsWithoutId) ;
    props.stateChange("hobbiesOrInterests", fieldsWithoutId);
  }

  const add = () => {
    const newFields = []
    const newField = {
      id: numberOfFields + 1, 
      value: {
        appear : true,
        hobbyorinterest: ""
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
    toggleGrabCursor();
  }

  // for checkbox
  const checkChange = (id, event) => {
    const Fields = [...fields];
    for (let i = 0; i < Fields.length; i++) {
      if (Fields[i].id === id) {
        Fields[i].value["appear"] = event.target.checked;
        break;
      }
    }
    setFields(Fields);
    fieldReturn(Fields);
  }
  
  // for other fields
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
  
  const onSortStart = () => {
    toggleGrabCursor()
  }
  const toggleGrabCursor = () => {
    document.body && document.body.classList.toggle('grabbing')
  }

  return (
    <Fragment>
      <Helmet>
        <title>Hobbies or Interests </title>
      </Helmet>
      <SortableContainer  
        items={fields} 
        useDragHandle lockAxis="y" 
        onSortStart={onSortStart}
        onSortEnd={onSortEnd}
        delete={Delete}
        stateChange={stateChange}
        checkChange={checkChange}
      />
      <div className="hobbiesorinterests-add-button">
        <CustomButton name={"ADD"} onClick={add} color={'green'}/>
      </div>
    </Fragment>
  );
}

const GreenCheckbox = withStyles({
  root: {
    color: "#69f0ae",
    '&$checked': {
      color: "#69f0ae",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const SortableItem = sortableElement( props => {
  const stateChange = props.stateChange;
  const checkChange = props.checkChange;

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
            <div className="hobbiesorinterests-fields">
            <GreenCheckbox checked={props.value.value.appear} onChange={e => checkChange(props.value.id, e)}/> In resume
              <TextField className="hobbiesorinterests-hobbyorinterest" label="Hobby or Interest(s)" variant="outlined" value={props.value.value.hobbyorinterest}
                onChange={(e) => stateChange(props.value.id, "hobbyorinterest", e.target.value)}/>
              <div className="hobbiesorinterests-delete">
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
            checkChange={props.checkChange}
          />
        )
      }
    </div>
  )
})


export default HobbiesOrInterests
