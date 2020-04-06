
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const CustomExpansionSummary = withStyles(theme => ({
  root: {
    backgroundColor: '#69f0ae',
    borderTop: '1px solid #26a69a',
    borderRadius: '6px'
  }
}))(ExpansionPanelSummary);

export default CustomExpansionSummary;