import React from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import {Animated} from "react-animated-css";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import SlidingPane from 'react-sliding-pane';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import LeftAorrow from '@material-ui/icons/KeyboardArrowLeft';
import CardBody from "components/Card/CardBody.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyleNew.js";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import 'date-fns';
import Moment from 'moment';
import Service from 'Utils/Service';


import FormControl from "@material-ui/core/FormControl";
import NavigateNext from "@material-ui/icons/NavigateNext";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import PriceingUpdatedHistory from "./PriceingUpdatedHistory";
import ButtonGroup from '@material-ui/core/ButtonGroup';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class AdminDashboard extends React.Component  { 

  constructor(props) 
  {
    super(props);
    this.state = { 
        UpdatedHistory: [], 
    }
  }

  scrollToTop = (type) => {
    if(type == 'close'){      
      this.setState({DetailsNewUpdation:false});
      this.setState({DetailsUpdatedHistory:false});
      this.GetAllData();
    }
  }; 

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:(isExpanded ? panel : false)});
  };

  GetAllData(type) {    
    this.setState({UpdatedHistory:[]});
    const postData = { status:type };
    new Service().apiCall('PricingHistory/GetAllData',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({UpdatedHistory:response.data});
      }
    }).catch(error => {
      this.setState({UpdatedHistory:[]});
    });
  }  

  componentDidMount() {
    this.GetAllData();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  render()
  { 
    const { classes } = this.props;
    return (
      <div>
          <GridContainer justify="center">
              <GridItem lg={8} md={8} sm={12} xs={12}>
                    <Card>
                        <CardBody>
                        <GridContainer>
                            <GridItem lg={12} md={12} sm={12} xs={12}>
                                {this.state.UpdatedHistory.length > 0 && this.state.UpdatedHistory.map((item, index) => (
                                <Card onClick={()=> {this.setState({selected_id:item.id});this.setState({selected_date:item.pricing_date,selected_min_value:item.min_signup_value});this.setState({DetailsUpdatedHistory:true})}} className={classes.CustomCard} style={{cursor:'pointer'}}>
                                <CardBody className={classes.CustomCardBody}>
                                    <GridContainer>
                                    <GridItem xs={6} md={2} lg={2}>
                                        <h4 className={classes.CardHeadingUpdate}>{Moment(item.pricing_date).format("DD-MM-YYYY")}</h4> 
                                        <h4 className={classes.SmallTextUpdate}>Updated Date</h4>
                                    </GridItem>
                                    <GridItem xs={6} md={3} lg={3}>
                                        <h4 className={classes.CardHeadingUpdate}>{item.minmum_student}</h4> 
                                        <h4 className={classes.SmallTextUpdate}>Minimum Student</h4>
                                    </GridItem>
                                    <GridItem xs={6} md={3} lg={3}>
                                        <h4 className={classes.CardHeadingUpdate}>{item.maximum_student}</h4> 
                                        <h4 className={classes.SmallTextUpdate}>Maximum Student</h4>
                                    </GridItem> 
                                    <GridItem xs={6} md={3} lg={3}>
                                        <h4 className={classes.CardHeadingUpdate}>{item.min_signup_value}</h4> 
                                        <h4 className={classes.SmallTextUpdate}>Min Signup Value</h4>
                                    </GridItem>                            
                                    <GridItem xs={6} md={1} lg={1} style={{textAlign:'right',margin:'auto'}}>    
                                        <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                                        <NavigateNext />
                                        </Avatar>
                                    </GridItem>
                                    </GridContainer>
                                </CardBody>
                                </Card>))} 
                                {this.state.UpdatedHistory.length === 0 && 
                                <Card className={classes.CustomCard} style={{cursor:'pointer'}}>
                                <CardBody className={classes.CustomCardBody}>
                                    <GridContainer>
                                    <GridItem xs={6} md={11} lg={11}>
                                        <h4 className={classes.CardHeading}>No Pricing History</h4> 
                                    </GridItem>                          
                                    <GridItem xs={6} md={1} lg={1} style={{textAlign:'right',margin:'auto'}}>    
                                        <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                                        <NavigateNext />
                                        </Avatar>
                                    </GridItem>
                                    </GridContainer>
                                </CardBody>
                                </Card>}

                                <Dialog fullScreen open={this.state.DetailsUpdatedHistory} onClose={()=>this.setState({DetailsUpdatedHistory:false})} TransitionComponent={Transition} className={classes.Overlay}>
                                <AppBar className={classes.CustomappBar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={()=>this.setState({DetailsUpdatedHistory:false})}  aria-label="close" className={classes.CloseButton}>
                                        <LeftAorrow />
                                        </IconButton>
                                        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
                                        <h4 className={classes.SliderTitle}>{Moment(this.state.selected_date).format("DD-MM-YYYY")} Pricing Details</h4> 
                                        </GridItem> 
                                        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
                                        <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup" style={{border:'1px solid #3c4858'}}>
                                        <h4 className={classes.SliderTitleright}>Minimum Signup Value {this.state.selected_min_value}</h4>
                                        </ButtonGroup>
                                        </GridItem>
                                       
                                          
                                    </Toolbar>
                                </AppBar>                      
                                <PriceingUpdatedHistory  handlePricingPage={this.scrollToTop} {...this.props} selected_id={this.state.selected_id} />
                                </Dialog>

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
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard)); 