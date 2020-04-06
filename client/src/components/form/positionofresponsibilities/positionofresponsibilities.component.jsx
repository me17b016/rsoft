import React, { Fragment, useState, useEffect } from 'react'
import './positionofresponsibilities.styles.css';

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


const PositionOfResponsibilites = props => {
  
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const nFields = props.fields.length;
    let fieldArray = [];
    for (let i = 0; i < nFields; i++) {
      fieldArray.push({
        id: i + 1,
        value: {
          position: props.fields[i].position,
          duration: props.fields[i].duration,
          description: props.fields[i].description,
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
    props.stateChange("positionOfResponsibilities", fieldsWithoutId);
  }

  const add = () => {
    const newFields = []
    const newField = {
      id: numberOfFields + 1, 
      value: {
        position: "",
        duration: "",
        description: "",
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
          <title>Position of Responsibilites</title>
        </Helmet>
        <SortableContainer  
          items={fields} 
          useDragHandle lockAxis="y" 
          onSortEnd={onSortEnd}
          delete={Delete}
          stateChange={stateChange}
        />
        <div className="positionofresponsibilities-add-button">
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
            <div className="positionofresponsibilities-fields">
              <TextField className="positionofresponsibilities-position" label="Position" variant="outlined" value={props.value.value.position}
                onChange={(e) => stateChange(props.value.id, "position", e.target.value)}/>
              <TextField className="positionofresponsibilities-duration" label="Duration" variant="outlined" value={props.value.value.duration}
                onChange={(e) => stateChange(props.value.id, "duration", e.target.value)}/>
              <TextField className="positionofresponsibilities-description" label="Description" multiline variant="outlined" value={props.value.value.description}
                onChange={(e) => stateChange(props.value.id, "description", e.target.value)}/>
              <div className="positionofresponsibilities-delete">
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


export default PositionOfResponsibilites;
