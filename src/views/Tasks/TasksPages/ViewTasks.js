import React from "react";
import 'date-fns';

// react plugin for creating charts
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import Service from 'Utils/Service';
import Moment from 'moment';

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  inputMargin: {
    marginTop:15
  },
  tabs: {
    borderRight: `1px solid #ddd`, 
  },
};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      activeAccordion:0,
      edit_institute:false,
    }
  }

  componentDidMount() {
  }

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }

  render(){
  const { classes } = this.props;

  return (
      <div> 
        {this.state.alert}
        <GridContainer  justify="center" alignItems="center">              
          <GridItem xs={12} sm={12} md={9}>
            Test
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(pageStyles)(Dashboard)
