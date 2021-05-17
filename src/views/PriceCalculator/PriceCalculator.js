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
import Service from 'Utils/Service';

import PriceingForm from "./PriceingPages/PriceingForm.js";
import ModuleSetting from "./PriceingPages/ModuleSetting.js";
import UpdatedHistoryPage from "./PriceingPages/UpdatedHistroy";
import DiscountSettingPage from "./PriceingPages/DiscountSetting.js";
import PriceingUpdatedHistory from "./PriceingPages/PriceingUpdatedHistory.js";
import FormControl from "@material-ui/core/FormControl";
import NavigateNext from "@material-ui/icons/NavigateNext";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class AdminDashboard extends React.Component  { 
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      priceingform:false,
      expanded:false,
      selected_id:'',
      selected_date:'',
      selected_min_value:'',
      ModuleSetting:false,
      UpdatedHistoryPage:false,
      DetailsUpdatedHistory:false,
      DetailsNewUpdation:false,
      DiscountSettingPage:false,
      date_effect:new Date(),
      countData:[],
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

  render(){ 
    const {classes} = this.props;
  return (
      <div className={classes.Accordianinput}>
        <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" >  

          <GridContainer justify="center" alignItems="center" className={classes.MarginTop}>
              <GridItem lg={8} md={8} sm={12} xs={12}>
                <button className={classes.CardButton} onClick={()=>this.setState({ModuleSetting:true})}>
                <GridContainer>
                  <GridItem xs={10} sm={10} md={10} lg={10}><Typography className={classes.heading} style={{paddingTop:"7px"}}>Module Setting</Typography></GridItem> 
                  <GridItem  className=""  xs={2} sm={2} md={2} lg={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer></button>
              </GridItem>
          </GridContainer>
          <GridContainer justify="center" alignItems="center" style={{marginTop:'10px'}} >
              <GridItem lg={8} md={8} sm={12} xs={12}>
                <button className={classes.CardButton} onClick={()=>this.setState({DiscountSettingPage:true})}>
                <GridContainer>
                  <GridItem xs={10} sm={10} md={10} lg={10}><Typography className={classes.heading} style={{paddingTop:"7px"}}>Discount/Offer Setting</Typography></GridItem> 
                  <GridItem  className=""  xs={2} sm={2} md={2} lg={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer></button>
              </GridItem>
          </GridContainer>
          <GridContainer justify="center" alignItems="center" style={{marginTop:'10px'}} >
              <GridItem lg={8} md={8} sm={12} xs={12}>
                <button className={classes.CardButton} onClick={()=>this.setState({UpdatedHistoryPage:true})}>
                <GridContainer>
                  <GridItem xs={10} sm={10} md={10} lg={10}><Typography className={classes.heading} style={{paddingTop:"7px"}}>Updated History</Typography></GridItem> 
                  <GridItem  className=""  xs={2} sm={2} md={2} lg={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer></button>
              </GridItem>
          </GridContainer>
         {/* <GridContainer justify="center" alignItems="center" style={{marginTop:'10px'}} >
            <GridItem lg={8} md={8} sm={12} xs={12}>
              <Accordion expanded={this.expanded} onChange={this.handleChange()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}> Updated History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <GridContainer>
                    <GridItem lg={12} md={12} sm={12} xs={12}>
                      {this.state.UpdatedHistory.length > 0 && this.state.UpdatedHistory.map((item, index) => (
                      <Card onClick={()=> {this.setState({selected_id:item.id});this.setState({selected_date:item.pricing_date,selected_min_value:item.min_signup_value});this.setState({DetailsUpdatedHistory:true})}} className={classes.CustomCard} style={{cursor:'pointer'}}>
                        <CardBody className={classes.CustomCardBody}>
                          <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                              <h4 className={classes.CardHeading}>{item.pricing_date}</h4> 
                              <h4 className={classes.SmallText}>Updated Date</h4>
                            </GridItem>
                            <GridItem xs={6} md={3} lg={3}>
                              <h4 className={classes.CardHeading}>{item.minmum_student}</h4> 
                              <h4 className={classes.SmallText}>Minimum Student</h4>
                            </GridItem>
                            <GridItem xs={6} md={3} lg={3}>
                              <h4 className={classes.CardHeading}>{item.maximum_student}</h4> 
                              <h4 className={classes.SmallText}>Maximum Student</h4>
                            </GridItem> 
                            <GridItem xs={6} md={3} lg={3}>
                              <h4 className={classes.CardHeading}>{item.min_signup_value}</h4> 
                              <h4 className={classes.SmallText}>Min Signup Value</h4>
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
                              <h4 className={classes.SliderTitle}>{this.state.selected_date} Pricing Details</h4> 
                              <h4 className={classes.SliderTitle}>Minimum Signup Value {this.state.selected_min_value}</h4>  
                            </Toolbar>
                        </AppBar>                      
                        <PriceingUpdatedHistory  handlePricingPage={this.scrollToTop} {...this.props} selected_id={this.state.selected_id} />
                      </Dialog>

                    </GridItem>
                  </GridContainer>
                </AccordionDetails>
              </Accordion>
            </GridItem>
          </GridContainer>*/}

          <GridContainer justify="center" alignItems="center"  style={{marginTop:'10px'}}>
              <GridItem lg={8} md={8} sm={12} xs={12}>
                <button className={classes.CardButton} onClick={()=>this.setState({DetailsNewUpdation:true})}>
                <GridContainer>
                  <GridItem xs={10} sm={10} md={10} lg={10}><Typography className={classes.heading} style={{paddingTop:"7px"}}>New Updation of Pricing </Typography></GridItem> 
                  <GridItem  className=""  xs={2} sm={2} md={2} lg={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10,backgroundColor:'#39bdd6 !important'}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer></button>
                <Dialog fullScreen open={this.state.DetailsNewUpdation} onClose={()=>this.setState({DetailsNewUpdation:false})} TransitionComponent={Transition} className={classes.Overlay}>
                  <AppBar className={classes.CustomappBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={()=>this.setState({DetailsNewUpdation:false})} aria-label="close" className={classes.CloseButton}>
                        <LeftAorrow />
                        </IconButton>
                        <h4 className={classes.SliderTitleNewUpdate}>
                          New Updation of Pricing
                        </h4>  
                    </Toolbar>
                  </AppBar> 
                    <PriceingForm  handlePricingPage={this.scrollToTop} {...this.props} />
                </Dialog>
              </GridItem>
          </GridContainer>
        </Animated>

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={this.state.ModuleSetting}
              title="Add/Edit/View Module List"
              onRequestClose={ () => {
                this.setState({ ModuleSetting: false });
            }}>
          <div>  
            <ModuleSetting  handlePricingPage={this.scrollToTop} {...this.props} />
          </div>
        </SlidingPane>
        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={this.state.UpdatedHistoryPage}
              title="Updated History"
              onRequestClose={ () => {
                this.setState({ UpdatedHistoryPage: false });
            }}>
          <div>  
            <UpdatedHistoryPage  handlePricingPage={this.scrollToTop} {...this.props} />
          </div>
        </SlidingPane>
        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={this.state.DiscountSettingPage}
              title="Discount/Offer Setting"
              onRequestClose={ () => {
                this.setState({ DiscountSettingPage: false });
            }}>
          <div>   
            <DiscountSettingPage  handlePricingPage={this.scrollToTop} {...this.props} />
          </div>
        </SlidingPane>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard));  