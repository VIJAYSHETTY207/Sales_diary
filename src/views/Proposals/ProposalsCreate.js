import React from "react";
import 'date-fns';

import axios from 'axios';
// react plugin for creating charts
import SweetAlert from "react-bootstrap-sweetalert";
import ChartistGraph from "react-chartist";
import ReactTable from "react-table";
import Slider from "nouislider";
import Datetime from "react-datetime";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from "@material-ui/core/Switch";
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Chip from '@material-ui/core/Chip';

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Book from '@material-ui/icons/Book';
import ViewIcon from "@material-ui/icons/Visibility";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MenuItem from "@material-ui/core/MenuItem";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange"; 
import LocalOffer from "@material-ui/icons/LocalOffer";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit"; 
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Assignment from "@material-ui/icons/Assignment";
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DoneIcon from '@material-ui/icons/Done';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardText from "components/Card/CardText.js";
import CardAvatar from "components/Card/CardAvatar.js";

// @material-ui/core components
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { dataTable } from "variables/general.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from '@material-ui/core/Link';

import Badge from '@material-ui/core/Badge';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

const divStyle = {
  display: 'flex',  justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle2 = {
  marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle3 = {
  marginTop:'15px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const align = {
  display: 'flex',  justifyContent:'right', alignItems:'right' // 'ms' is the only lowercase vendor prefix
};

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  notificationModalStyle: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle2: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle3: {
    width:'60% !important',
    backgroundColor:'#ddd'
  },
  inputMargin: {
    marginTop:15
  },

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: '1px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

};
const divStyle1 = {
  marginTop:'10px' // 'ms' is the only lowercase vendor prefix
};

// handlePreviouStudied = (value) => {
//   this.setState({ previouslyStudied: value });  
// }

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

function filterCaseInsensitive(filter, row) 
{
  const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
        return (
          row[id] !== undefined ?
            String(row[id].toString().toLowerCase())
            .includes(filter.value.toString().toLowerCase()):true
        );
    }
}


class Dashboard extends React.Component 
{
  constructor(props) {
  super(props);
  this.state = {
    parametercount:0,
    viewleads:false,
    createlead:false,
    leadprofile:false,
    institutecheckbox:false,
    Approver:false, 
    activeTabIndex:0,
    leadType:'All',
    DecisionMaker:false, 
    Influencer:false,
    selectedTab:'profile',
    activeAccordion:'',
    EvaluatorRecommender:false,
    GatekeeperBlocker:false,
    Users:false,
    Champion:false,
    authorHolders:[{name:'',description:''}],
    insauthorHolders:[{name:'',description:''}],
    Mentor:false,
    previouslyStudied:'',
    activeStep:0,
    steps:[1,2,3,4],
    reason:false, 
    dateOfBirth: new Date(),
    tableData: [{
      id: '1', 
      name: '',
    }],
    Proposals: 'create',
  }
  
  this.statecreate = {
    isOpen:false
  }
}

Proposals = () => 
{
  this.props.history.push({pathname:'/admin/Proposals'})
}

ProposalsView = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsView'})
}

ProposalsStandardTemplate = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsStandardTemplate'})
}

AddProposalItem = () => 
{
  this.props.history.push('/admin/ProposalAddItem')
} 

handleTabChange = (event, newValue) => {
  this.setState({activeTabIndex: newValue});
};

scrollToTop() {
  const container = document.querySelector('.slide-pane__content');  
  container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
}


handleChangeInstitute = (idx,value) => {
  let lsiblingata = this.state.siblingHolders;
  lsiblingata.map((siblings,id)=>{ 
    if(idx==id){
      siblings.checked=value;
    } 
  });
    this.setState({ siblingHolders: lsiblingata });  
};

removeAuthortHolder(i) {
  const { authorHolders } = this.state;
  this.setState({
    authorHolders: authorHolders.filter((author, index) => index !== i),
  });
}

handleAddAuthorholder = () => {
  let lauthorHolders = this.state.authorHolders;
  let lAuthor = {};
  lAuthor.name = '';
  lAuthor.description = '';
  lauthorHolders.push(lAuthor);
  this.setState({authorHolders:lauthorHolders});
}

removeInsAuthortHolder(i) {
  const { insauthorHolders } = this.state;
  this.setState({
    insauthorHolders: insauthorHolders.filter((author, index) => index !== i),
  });
}

handleInsAddAuthorholder = () => {
  let lauthorHolders = this.state.insauthorHolders;
  let lAuthor = {};
  lAuthor.name = '';
  lAuthor.description = '';
  lauthorHolders.push(lAuthor);
  this.setState({insauthorHolders:lauthorHolders});
}


handleDateOfBirth = (dob) => {
  this.setState({ dateOfBirth: dob })
};

handleStep = (index) => {
  this.setState({activeStep:index});
}

handleClickyes = () => {
  this.setState({parametercount: this.state.parametercount+1})
}
handleClickno = () => {
  if(this.state.parametercount > 0){
    this.setState({parametercount: this.state.parametercount-1})
  }
  else{
    this.setState({parametercount: 0})
  }
 
}


handleChangeAccordion = (value) => {
  if(this.state.activeAccordion == value){
    this.setState({activeAccordion:""});
  }
  else{
    this.setState({activeAccordion:value});
  }
}

// start of submit form function
handleStudent = () => {  

  const lUserData = this.props.data; 
  const postData = {
  trust_congregation:this.state.trust_congregation,
  pincode:this.state.pincode,
  address_line_1:this.state.address_line_1,
  address_line_2:this.state.address_line_2,
  post_office:this.state.post_office,
  taluk:this.state.taluk,
  district:this.state.district,
  state:this.state.state,
  contact_number_1:this.state.contact_number_1,
  contact_number_2:this.state.contact_number_2,
  email:this.state.email,
  created_by:this.state.created_by,
  last_visit:this.state.last_visit,
  }; 
 
  axios({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'http://35.154.17.76/server_salesdairy/public/leads/insert_leads',
    data: postData
  }).then(response => {
    console.log(response);
    if (response.status==200 && response.data!='') {
      this.setState({
        alert: (
          <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Student Added!"
          showConfirm={false}
        >
        </SweetAlert>
          
        ),
      });
      setTimeout(() => {
         this.props.history.push({
        pathname: '/admin/student'})
      }, 2000)
     
    } else {
      this.raiseLoginSignupErrorAlert("signup");
    }
  }).catch(error => {
    this.raiseLoginSignupErrorAlert("signup");

  });
}

renderHeader = () => {
  return (
    <GridContainer>
    <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
    <div>Lead Proposal Create(AMS Test Institute)</div>
    </GridItem> 
    <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
    <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
    <MButton variant={this.state.Proposals == "create" ?"contained":"outlined"} onClick={()=>this.setState({Proposals:'create'})}>Create</MButton> 
    <MButton onClick={()=>this.ProposalsView()}>View</MButton>
    <MButton onClick={()=>this.ProposalsStandardTemplate()}>Template</MButton> 
    </ButtonGroup> 
    </GridItem>
    </GridContainer>
  )
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
      <SlidingPane
        closeIcon={<div>   
          <Button justIcon round color="white" style={{color:'black'}} >
          <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
          </Button></div>}  
          className={classes.ModalStyle}
          overlayClassName={classes.panelClass}
          isOpen={ true }
          title={this.renderHeader()}
          onRequestClose={ () => {
              // triggered on "<" on left top click or on outside click
              this.Proposals();
          } }>
          <div> 
            {this.state.Proposals == "create" &&             
            <GridContainer  justify="center" alignItems="center">              
            <GridItem xs={12} sm={12} md={9}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose"><MailOutline/></CardIcon>
                    <h4 className={classes.cardIconTitle}>Lead Proposal</h4>
                  </CardHeader>
                  <CardBody>
                    <form>
                    <div>
                    <Card className="outlinedInput">
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Proposal details</h5>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>             
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.trust_name}
                              label="Subject" 
                              type="search" 
                              onChange={(event) => this.setPostData("trust_name",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Status" 
                              type="search" 
                              onChange={(event) => this.setPostData("pincode",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Assigned" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_1",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Related" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_2",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>  
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="To" 
                              type="search" 
                              onChange={(event) => this.setPostData("post_office",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>  
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Lead" 
                              type="search" 
                              onChange={(event) => this.setPostData("taluk",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Address" 
                              type="search" 
                              onChange={(event) => this.setPostData("address",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3} >
                            <FormControl fullWidth>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                autoOk={true}
                                value={this.state.meetingDate}
                                shrink={true}
                                id="date-picker-dialog"
                                label="Date"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                onChange={this.handleMeetingDate}   
                                KeyboardButtonProps={{
                                'aria-label': 'change date', 
                                }} 
                                />
                              </MuiPickersUtilsProvider>                  
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} >
                            <FormControl fullWidth>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                autoOk={true}
                                value={this.state.meetingDate}
                                shrink={true}
                                id="date-picker-dialog"
                                label="Open Till"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                onChange={this.handleMeetingDate}   
                                KeyboardButtonProps={{
                                'aria-label': 'change date', 
                                }} 
                                />
                              </MuiPickersUtilsProvider>                  
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="District" 
                              type="search" 
                              onChange={(event) => this.setPostData("district",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="State" 
                              type="search" 
                              onChange={(event) => this.setPostData("state",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Currency" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem>  
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Discount Type" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Pincode" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem>
                           <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Email" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Tag's" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControlLabel
                              control={<Switch  />}
                              label="Allow Comments"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Contact Number 1" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                            <FormControl fullWidth>                 
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}                
                                id="document-type"   
                                value={this.state.name}
                                label="Contact Number 2" 
                                type="search" 
                                onChange={(event) => this.setState({name: event.target.value})}
                                inputRef={this.textInput} 
                                variant="outlined" />
                            </FormControl>
                          </GridItem>
                        </GridContainer>  
                      </CardBody>
                    </Card>                                     
                 
                  {this.state.authorHolders.map((author, idx) => (
                    <div>
                    <Card className="outlinedInput">
                      <CardBody>
                        <GridContainer>
                          <GridItem  xs={12} sm={12} md={6}>
                            <Paper component="form" className={classes.root}>
                              <InputBase
                                className={classes.input}
                                placeholder="Add Item"
                                inputProps={{ 'aria-label': 'Add Item' }}
                              />
                              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                              </IconButton>
                              <Divider className={classes.divider} orientation="vertical" />
                              <IconButton color="primary" className={classes.iconButton}  onClick={()=> this.AddProposalItem()}aria-label="add">
                                <Add />
                              </IconButton>
                            </Paper>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>                       
                            <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position">
                            <strong style={{margin:'auto',  paddingRight:15}}>Show quantity as:</strong>   
                            <FormControlLabel value="qty" control={<Radio color="primary" checked={this.state.cardIssued === "qty"} onChange={()=> this.setState({cardIssued: 'qty'})} />} label="Qty" />
                            <FormControlLabel value="hours" control={<Radio color="primary" checked={this.state.cardIssued === "hours"} onChange={()=> this.setState({cardIssued: 'hours'})} />} label="Hours" />
                            <FormControlLabel value="qty_hours" control={<Radio color="primary" checked={this.state.cardIssued === "qty_hours"} onChange={()=> this.setState({cardIssued: 'qty_hours'})} />} label="Qty/Hours" />
                            </RadioGroup>
                            </FormControl>  
                          </GridItem>
                        
                          <GridItem xs={12} sm={12} md={12} >                       
                            <CardBody>
                              <Table
                                tableHeaderColor="primary"
                                tableHead={["Item", "Description", "Unit", "Rate", "GST", "Amount", <span class="material-icons">build</span>]}
                                tableData={[
                                  [<TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />,
                                  <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />,                                   
                                  <TextField id="outlined-basic" type="number" label="Unit" variant="outlined" />, 
                                  <TextField id="outlined-basic" type="number" label="Rate" variant="outlined" />, 
                                  <TextField id="outlined-basic" label="GST" variant="outlined" />,                                 
                                  "$36,738",
                                  <span class="material-icons">add</span>],
                                  ["","","","","","Sub Total :","0.00"],                                
                                  ["","","","","Discount",<TextField id="outlined-basic" label="Dis" variant="outlined" />, "0.00"],                        
                                  ["","","","","Adjustment",<TextField id="outlined-basic" label="Adg" variant="outlined" />, "0.00"],                        
                                  ["","","","","","Total :","0.00"]                       
                                ]}
                                coloredColls={[3]}
                                colorsColls={["primary"]}
                              />
                            </CardBody> 
                          </GridItem>
                        </GridContainer>                      
                    </CardBody>
                  </Card>
                  </div>  
                  ))}

                  
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={6}>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >
                      <MButton  style={{marginRight:'2px'}}  variant="outlined" color="primary">Save & Send</MButton> 
                      <MButton  type="submit" color="rose" onClick={this.handleStudent.bind(this)}variant="outlined" color="primary">Save</MButton>
                    </GridItem>
                  </GridContainer> 
                  </div>
              
                    </form>
                  </CardBody>
                </Card>
              </GridItem>       
            </GridContainer>
            }
          </div>
        </SlidingPane>                 	
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
