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
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card.js";
import Link from '@material-ui/core/Link';
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import MButton from '@material-ui/core/Button';
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import History from '@material-ui/icons/History';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
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
  ProfileDiv:{ 
    padding:"5px",
  '& img':{
    width:"20px",
    borderRadius:"30px"
  }
  },
  TimelineHead :{
    fontSize:"14px",
    fontWeight:"500",
    padding:"2px",
    '& span' :{
      borderBottom:"1px dashed gray",
    }
  },
  TimelineItem :{
    fontSize:"13px",
    paddingLeft:"10px"
  },
  TimelineClass :{
    '& .MuiTimelineItem-missingOppositeContent:before' :{
      flex:"none !important",
      padding:"0px"
    }
  }
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
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  render(){
  const { classes } = this.props;

  return (
      <div> 
        {this.state.alert}
        <GridContainer  justify="center" alignItems="center">              
            <GridItem xs={12} sm={12} md={8} lg={8}>
              <Card>
                <CardHeader icon  color="rose">
                <CardIcon  color="rose">
                  <History />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Activity Log</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem lg={12} md={12} sm={12} xs={12}>
                  <Timeline className={classes.TimelineClass}>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <GridContainer>
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                            <Typography className={classes.TimelineHead}><span>ONE YEAR AGO</span></Typography>
                            <div className={classes.ProfileDiv}>
                              <img src={require('assets/img/faces/marc.jpg')} />
                              <span className={classes.TimelineItem}>Ramamurthy T - created lead</span>
                            </div>
                          </GridItem>
                        </GridContainer>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                      <GridContainer>
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                            <Typography className={classes.TimelineHead}><span>3 MONTHS AGO</span></Typography>
                            <div className={classes.ProfileDiv}>
                              <img src={require('assets/img/faces/marc.jpg')} />
                              <span className={classes.TimelineItem}>Karthick R - Created new proposal - Test New Proposal</span>
                            </div>
                          </GridItem>
                        </GridContainer>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                  </GridItem>
                  </GridContainer>
                  <GridContainer>
                      <GridItem lg={12} md={12} sm={12} xs={12}>
                        <FormControl fullWidth>
                          <TextField 
                              disabled={true}
                              multiline="true"
                              id="document-type"
                              type="search"
                              variant="outlined"
                              label="Enter Activity" />               
                        </FormControl>
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                      <GridItem lg={12} md={12} sm={12} xs={12} align="right" className={classes.inputMargin}>
                        <MButton variant="outlined" color="primary" >Save</MButton>
                      </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
