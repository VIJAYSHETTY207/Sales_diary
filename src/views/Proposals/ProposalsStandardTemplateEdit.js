import React from "react";
import 'date-fns';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
import PropTypes from 'prop-types';
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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import CloudDownload from "@material-ui/icons/CloudDownload";
import Send from "@material-ui/icons/Send";
import Chip from '@material-ui/core/Chip';
import Print from "@material-ui/icons/Print";

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
import Save from "@material-ui/icons/Save"; 
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Assignment from "@material-ui/icons/Assignment";
import Avatar from '@material-ui/core/Avatar';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';

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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
 

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js"; 

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
    flexGrow: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid #ddd`,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div style={{width:'100%'}}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


class Dashboard extends React.Component 
{
  constructor(props) {
  super(props);
  this.state = {
    parametercount:0,
    viewleads:false,
    createlead:false,
    selectedTab:'profile',
    activeAccordion:'',
    institutecheckbox:false,
    activeTabIndex:0,
    Approver:false,
    DecisionMaker:false, 
    Influencer:false,
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
      id: '',
      name: '',
    }],
    Proposals:'Template',
    ProposalType:'t1',
  }
  
  this.statecreate = {
    isOpen:false
  }
}



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

Proposals = () => 
{
  this.props.history.push({pathname:'/admin/Proposals'})
}

ProposalsCreate = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsCreate'})
}

ProposalsView = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsView'})
}

addproposal = () => 
{
  this.props.history.push({pathname:'/admin/LeadsProposal', state:{'action':'view'}})
} 

handleDateOfBirth = (dob) => { 
  this.setState({ dateOfBirth: dob })
};

handleStep = (index) => {
  this.setState({activeStep:index});
}

handleClick = () => {
  alert(123)
}

handleChangeAccordion = (value) => {
  if(this.state.activeAccordion == value){
    this.setState({activeAccordion:""});
  }
  else{
    this.setState({activeAccordion:value});
  }
}

handleTabChange = (event, newValue) => {
  this.setState({activeTabIndex: newValue});
};

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
checkAccess = () => {
  return (
  <CheckAccess {...this.props} />
  )
}

componentDidMount() {
  console.log(this.props.history.location.state);
  if(this.props.history.location.state === undefined){
  //alert(123);
  }
  else{
    this.setState({selectType:'viewleads', viewleads:true});
    this.props.history.push({state:undefined})
  }
}


renderHeader = () => {
  return (
    <GridContainer>
    <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
    <div>Lead Proposal Standard Templates Edit</div>
    </GridItem> 
    <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
    <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
    <MButton onClick={()=>this.ProposalsCreate()}>Create</MButton> 
    <MButton onClick={()=>this.ProposalsView()}>View</MButton> 
    <MButton variant={this.state.Proposals == "Template" ?"contained":"outlined"} onClick={()=>this.setState({Proposals:'Template'})}>Template</MButton> 
    </ButtonGroup> 
    </GridItem>
    </GridContainer>
  )
}

render(){
const { classes } = this.props;


return (
        <div>
          <SlidingPane
            closeIcon={<div>   <Button
            justIcon
            round
            color="white"
            style={{color:'black'}}
            >
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                <GridItem xs={12} sm={12} md={10}> 
                  <Card> 
                    <CardHeader color="warning" text>
                    <CardText className='cardHeader' style={{width:'100%',textAlign:'center'}} >
                              <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                                <MButton variant={this.state.ProposalType == "t1" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'t1'})}>Template I</MButton> 
                                <MButton variant={this.state.ProposalType == "t2" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'t2'})}>Template II</MButton> 
                                <MButton variant={this.state.ProposalType == "t3" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'t3'})}>Template III</MButton> 
                                <MButton variant={this.state.ProposalType == "t4" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'t4'})}>Template IV</MButton> 
                              </ButtonGroup>
                            </CardText>
                          </CardHeader>
                          {this.state.ProposalType == "t1" && 
                          <div>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={1} > </GridItem>
                        <GridItem xs={12} sm={12} md={10}>
                        <GridItem xs={12} sm={12} md={12} style={{width:'100%',textAlign:'center',marginTop:'10px'}}> 
                          Scholarship Module Template
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CardBody> 
                            <CKEditor 
                              editor={ ClassicEditor }
                              config={{placeholder: "Long description here"}} 
                              data="<div class='ck ck-editor__main' role='presentation'>
                              <div class='ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred' lang='en' dir='ltr' role='textbox' aria-label='Rich Text Editor, main' contenteditable='true'>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>To,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;September 21, 2020</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sub: Proposal for eGenius – Scholarship Module</strong></p>
                              <p>Dear Sir/Ma’am,</p>
                              <p>We take this opportunity to introduce Scholarship Module in Web &amp; Mobile application that allows applicants to apply through online and your institute can process the application conveniently through cloud-based ERP solutions</p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong>Specifications of Scholarship Module:</strong></p>
                              <ul>
                              <li>Unlimited upload of Applications.</li>
                              <li>Online application of Scholarship for students with attachment option.</li>
                              <li>Capturing all fields in Application form and publishing in institution website.</li>
                              <li>Separate dropdowns for SSLC, PUC &amp; Degree Pass outs to fill the form.</li>
                              <li>Option for crosschecking the actual marks with entered marks/uploaded records</li>
                              <li>Report for selected and rejected applications with area/zone-wise segregation.</li>
                              <li>Detailed report on data entered in application form.</li>
                              <li>Publishing selected students for scholarship.</li>
                              <li>Email integration and sending SMS to selected applicants.</li>
                              <li>Payment Gateway integration for online scholarship amount payment directly to student’s bank account.</li>
                              <li>Approval &amp; Rejection of application with option for Auto approval/rejection based on set criteria.</li>
                              <li>Data Security with OTP based secured login.</li>
                              <li>Export/Download of uploaded applications in Excel &amp; PDF formats</li>
                              <li>Data Managed through Secured Platform (AWS Cloud) and role-based login credentials</li>
                              </ul>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'>
                              <svg class='ck ck-icon' viewBox='0 0 16 16'><path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg>
                              </div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Mobile App &amp; Web application</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>2</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Integration with existing ERP/Website, if any</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>3</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Unlimited application processing with application fee collection, &amp; payment gateway integration, if requires</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>4</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Assessment/ review and approval mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>5</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>One-Click report generation with consolidated report option</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>6</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Archive of application, tracking mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__fake-caret'></div>
                              </div>
                              </figure>
                              <p><strong>Commercials:</strong></p>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'><svg class='ck ck-icon' viewBox='0 0 16 16'>
                              <path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg></div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Particulars</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>No. of Applicants</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Software as a Service (S-a-a-S) Basis &nbsp;(in INR)</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Scholarship Module</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>XXXX</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>TBA</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true' colspan='3'><span style='display:inline-block;'><br><br><br data-cke-filler='true'></span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>GST as Applicable</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__fake-caret'></div></div></figure>
                              <p>We hope that the above product specifications &amp; commercials suffice your requirement and place your valuable order with us.</p><p>We are looking ahead to hear from you.</p>
                              <p><br data-cke-filler='true'></p>
                              <p>Thanking You.<br>For eReleGo Technologies Pvt. Ltd</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>Sudeer Shetty</p>
                              <p>ED &amp; CBO | +91 9986 994 328 | sudeer@erelego.com</p>
                              <p><br data-cke-filler='true'></p>
                              <h4><br data-cke-filler='true'></h4></div></div>"
                              onInit={ editor => {
                                
                                  // You can store the "editor" and use when it is needed.
                                  console.log( 'Meetings Details!', editor );
                              } }
                              onChange={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ circular_description: data });
                              } }
                              onBlur={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              onFocus={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              
                            />
                        </CardBody>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                        <div className={classes.stats}> 
                          <button class="btn btn-danger" onClick={()=>this.ProposalsStandardTemplateEdit()} style={{margin:'10px'}}>
                            <KeyboardArrowLeft class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Back
                          </button>
                          <button class="btn btn-success" style={{margin:'10px'}}>
                            <Save class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Save
                          </button>
                        </div>    
                      </GridItem>
                    </GridItem>
                   </GridContainer>
                    </div>}    
                    {this.state.ProposalType == "t2" && <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={1} > </GridItem>
                        <GridItem xs={12} sm={12} md={10}>
                        <GridItem xs={12} sm={12} md={12} style={{width:'100%',textAlign:'center',marginTop:'10px'}}> 
                          eGenius Online Examination Proposal
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CardBody> 
                            <CKEditor 
                              editor={ ClassicEditor }
                              config={{placeholder: "Long description here"}} 
                              data="<div class='ck ck-editor__main' role='presentation'>
                              <div class='ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred' lang='en' dir='ltr' role='textbox' aria-label='Rich Text Editor, main' contenteditable='true'>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>To,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;September 21, 2020</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sub: Proposal for eGenius – Online Examination Module</strong></p>
                              <p>Dear Sir/Ma’am,</p>
                              <p>We take this opportunity to introduce Scholarship Module in Web &amp; Mobile application that allows applicants to apply through online and your institute can process the application conveniently through cloud-based ERP solutions</p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong>Specifications of Scholarship Module:</strong></p>
                              <ul>
                              <li>Unlimited upload of Applications.</li>
                              <li>Online application of Scholarship for students with attachment option.</li>
                              <li>Capturing all fields in Application form and publishing in institution website.</li>
                              <li>Separate dropdowns for SSLC, PUC &amp; Degree Pass outs to fill the form.</li>
                              <li>Option for crosschecking the actual marks with entered marks/uploaded records</li>
                              <li>Report for selected and rejected applications with area/zone-wise segregation.</li>
                              <li>Detailed report on data entered in application form.</li>
                              <li>Publishing selected students for scholarship.</li>
                              <li>Email integration and sending SMS to selected applicants.</li>
                              <li>Payment Gateway integration for online scholarship amount payment directly to student’s bank account.</li>
                              <li>Approval &amp; Rejection of application with option for Auto approval/rejection based on set criteria.</li>
                              <li>Data Security with OTP based secured login.</li>
                              <li>Export/Download of uploaded applications in Excel &amp; PDF formats</li>
                              <li>Data Managed through Secured Platform (AWS Cloud) and role-based login credentials</li>
                              </ul>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'>
                              <svg class='ck ck-icon' viewBox='0 0 16 16'><path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg>
                              </div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Mobile App &amp; Web application</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>2</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Integration with existing ERP/Website, if any</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>3</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Unlimited application processing with application fee collection, &amp; payment gateway integration, if requires</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>4</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Assessment/ review and approval mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>5</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>One-Click report generation with consolidated report option</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>6</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Archive of application, tracking mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__fake-caret'></div>
                              </div>
                              </figure>
                              <p><strong>Commercials:</strong></p>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'><svg class='ck ck-icon' viewBox='0 0 16 16'>
                              <path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg></div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Particulars</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>No. of Applicants</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Software as a Service (S-a-a-S) Basis &nbsp;(in INR)</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Scholarship Module</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>XXXX</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>TBA</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true' colspan='3'><span style='display:inline-block;'><br><br><br data-cke-filler='true'></span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>GST as Applicable</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__fake-caret'></div></div></figure>
                              <p>We hope that the above product specifications &amp; commercials suffice your requirement and place your valuable order with us.</p><p>We are looking ahead to hear from you.</p>
                              <p><br data-cke-filler='true'></p>
                              <p>Thanking You.<br>For eReleGo Technologies Pvt. Ltd</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>Sudeer Shetty</p>
                              <p>ED &amp; CBO | +91 9986 994 328 | sudeer@erelego.com</p>
                              <p><br data-cke-filler='true'></p>
                              <h4><br data-cke-filler='true'></h4></div></div>"
                              onInit={ editor => {
                                
                                  // You can store the "editor" and use when it is needed.
                                  console.log( 'Meetings Details!', editor );
                              } }
                              onChange={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ circular_description: data });
                              } }
                              onBlur={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              onFocus={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              
                            />
                        </CardBody>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                        <div className={classes.stats}> 
                          <button class="btn btn-danger" onClick={()=>this.ProposalsStandardTemplateEdit()} style={{margin:'10px'}}>
                            <KeyboardArrowLeft class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Back
                          </button>
                          <button class="btn btn-success" style={{margin:'10px'}}>
                            <Save class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Save
                          </button>
                        </div>    
                      </GridItem>
                    </GridItem>
                   </GridContainer>
                  </div>}
                  {this.state.ProposalType == "t3" && <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={1} > </GridItem>
                        <GridItem xs={12} sm={12} md={10}>
                        <GridItem xs={12} sm={12} md={12} style={{width:'100%',textAlign:'center',marginTop:'10px'}}> 
                          eGenius Digital Class Proposal
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CardBody> 
                            <CKEditor 
                              editor={ ClassicEditor }
                              config={{placeholder: "Long description here"}} 
                              data="<div class='ck ck-editor__main' role='presentation'>
                              <div class='ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred' lang='en' dir='ltr' role='textbox' aria-label='Rich Text Editor, main' contenteditable='true'>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>To,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;September 21, 2020</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sub: Proposal for eGenius - Learning Management System (LMS) integrated with &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Digital/Video Class platform.</strong></p>
                              <p><br data-cke-filler='true'></p>
                              <p>Dear Sir/Ma’am,</p>
                              <p>We take this opportunity to introduce Scholarship Module in Web &amp; Mobile application that allows applicants to apply through online and your institute can process the application conveniently through cloud-based ERP solutions</p>
                              <p><br data-cke-filler='true'></p>
                              <p><strong>Specifications of Scholarship Module:</strong></p>
                              <ul>
                              <li>Unlimited upload of Applications.</li>
                              <li>Online application of Scholarship for students with attachment option.</li>
                              <li>Capturing all fields in Application form and publishing in institution website.</li>
                              <li>Separate dropdowns for SSLC, PUC &amp; Degree Pass outs to fill the form.</li>
                              <li>Option for crosschecking the actual marks with entered marks/uploaded records</li>
                              <li>Report for selected and rejected applications with area/zone-wise segregation.</li>
                              <li>Detailed report on data entered in application form.</li>
                              <li>Publishing selected students for scholarship.</li>
                              <li>Email integration and sending SMS to selected applicants.</li>
                              <li>Payment Gateway integration for online scholarship amount payment directly to student’s bank account.</li>
                              <li>Approval &amp; Rejection of application with option for Auto approval/rejection based on set criteria.</li>
                              <li>Data Security with OTP based secured login.</li>
                              <li>Export/Download of uploaded applications in Excel &amp; PDF formats</li>
                              <li>Data Managed through Secured Platform (AWS Cloud) and role-based login credentials</li>
                              </ul>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'>
                              <svg class='ck ck-icon' viewBox='0 0 16 16'><path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg>
                              </div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl No</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Description</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes/No</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Mobile App &amp; Web application</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>2</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Integration with existing ERP/Website, if any</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>3</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Unlimited application processing with application fee collection, &amp; payment gateway integration, if requires</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>4</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Assessment/ review and approval mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>5</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>One-Click report generation with consolidated report option</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>6</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Archive of application, tracking mechanism</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Yes</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                                <div class='ck ck-widget__type-around__fake-caret'></div>
                              </div>
                              </figure>
                              <p><strong>Commercials:</strong></p>
                              <figure class='table ck-widget ck-widget_with-selection-handle' contenteditable='false'>
                              <div class='ck ck-widget__selection-handle'><svg class='ck ck-icon' viewBox='0 0 16 16'>
                              <path d='M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z'></path><path fill-opacity='.256' d='M1 1h14v14H1z'></path><g class='ck-icon__selected-indicator'><path d='M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z'></path><path fill-opacity='.254' d='M1 1h14v14H1z'></path></g></svg></div>
                              <table><tbody><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Sl. No.</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Particulars</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>No. of Applicants</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Software as a Service (S-a-a-S) Basis &nbsp;(in INR)</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>1</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>Online Scholarship Module</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>XXXX</span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>TBA</span></td></tr><tr><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true' colspan='3'><span style='display:inline-block;'><br><br><br data-cke-filler='true'></span></td><td class='ck-editor__editable ck-editor__nested-editable' contenteditable='true'><span style='display:inline-block;'>GST as Applicable</span></td></tr></tbody></table>
                              <div class='ck ck-reset_all ck-widget__type-around'>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_before' title='Insert paragraph before block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__button ck-widget__type-around__button_after' title='Insert paragraph after block'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'><polyline points='8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914' transform='translate(1,0)'></polyline><line x1='0' y1='4.21581031' x2='2' y2='2.17810059' transform='translate(1, 0)'></line><line x1='0' y1='6.21581031' x2='2' y2='4.17810059' transform='translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)'></line></svg></div>
                              <div class='ck ck-widget__type-around__fake-caret'></div></div></figure>
                              <p>We hope that the above product specifications &amp; commercials suffice your requirement and place your valuable order with us.</p><p>We are looking ahead to hear from you.</p>
                              <p><br data-cke-filler='true'></p>
                              <p>Thanking You.<br>For eReleGo Technologies Pvt. Ltd</p>
                              <p><br data-cke-filler='true'></p>
                              <p><br data-cke-filler='true'></p>
                              <p>Sudeer Shetty</p>
                              <p>ED &amp; CBO | +91 9986 994 328 | sudeer@erelego.com</p>
                              <p><br data-cke-filler='true'></p>
                              <h4><br data-cke-filler='true'></h4></div></div>"
                              onInit={ editor => {
                                
                                  // You can store the "editor" and use when it is needed.
                                  console.log( 'Meetings Details!', editor );
                              } }
                              onChange={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ circular_description: data });
                              } }
                              onBlur={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              onFocus={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ circular_description: data });
                              } }
                              
                            />
                        </CardBody>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                        <div className={classes.stats}> 
                          <button class="btn btn-danger" onClick={()=>this.ProposalsStandardTemplateEdit()} style={{margin:'10px'}}>
                            <KeyboardArrowLeft class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Back
                          </button>
                          <button class="btn btn-success" style={{margin:'10px'}}>
                            <Save class="DocumentManagement-stats-442 svg MuiSvgIcon-root" /> Save
                          </button>
                        </div>    
                      </GridItem>
                    </GridItem>
                   </GridContainer>
                  </div>}

                  </Card>
                </GridItem>
              </GridContainer>
            </div>

          </SlidingPane>     
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  

