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

import Badge from '@material-ui/core/Badge';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
  

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
  }
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
    viewcustomers:false,
    createcustomers:false,
    customersprofile:false,
    institutecheckbox:false,
    Approver:false,
    DecisionMaker:false, 
    Influencer:false,
    selectedTab:'profile',
    activeAccordion:'',
    EvaluatorRecommender:false,
    GatekeeperBlocker:false,
    Users:false,
    Champion:false,
    authorHolders:[{name:'',description:''}],
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
    selectType:'createcustomers',
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

handCustomersdAuthorholder = () => {
  let lauthorHolders = this.state.authorHolders;
  let lAuthor = {};
  lAuthor.name = '';
  lAuthor.description = '';
  lauthorHolders.push(lAuthor);
  this.setState({authorHolders:lauthorHolders});
}

CreateViewCustomers = () => 
{
  this.props.history.push({
    pathname: '/admin/CreateViewCustomers',
  })
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
    url: 'http://35.154.17.76/server_salesdairy/public/customers/insert_customers',
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
    <div>Customers</div>
    </GridItem> 
    <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
    <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
    <MButton variant={this.state.selectType == "createcustomers" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createcustomers'})}>Create</MButton> 
    <MButton variant={this.state.selectType == "viewcustomers" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewcustomers'})}>View</MButton>
    </ButtonGroup>
    </GridItem>
    </GridContainer>
  )
}

render(){
const { classes } = this.props;

return (
  <div>
    <GridContainer>	 
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Customers</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem> 
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Students</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Average Bill Size</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Average Per Student</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem>	
      <GridItem xs={12} sm={12} md={12} lg={3}> </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={3}>   
        <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({viewcustomers:true,selectType:'createcustomers'})}>Create Customers</button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={3}>   
        <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({viewcustomers:true,selectType:'viewcustomers'})}>View Customers</button>
      </GridItem> 
    </GridContainer>	

      <SlidingPane
        closeIcon={<div>   
          <Button justIcon round color="white" style={{color:'black'}} >
          <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
          </Button></div>}  
          className={classes.ModalStyle}
          overlayClassName={classes.panelClass}
          isOpen={ this.state.viewcustomers }
          title="Customers"
          title={this.renderHeader()}
          onRequestClose={ () => {
              // triggered on "<" on left top click or on outside click
              this.setState({ viewcustomers: false, currentForm:'viewcustomers' });
          } }>
          <div> 
            {this.state.selectType == "viewcustomers" &&  <GridContainer>
              <GridItem xs={12} sm={12} md={1}></GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <Card>
                    <CardHeader color="primary" icon>
                      <CardIcon color="primary">
                        <Book />
                      </CardIcon>
                      <div className={classes.buttonGroup} style={{float:'right'}}>
                        <Button  color={this.state.showStatus == "all" ? "info":"default"} size="sm" className={classes.firstButton}  style={{fontWeight:500}} onClick={() => {this.setState({showStatus:'all'}); this.getStudentDetails(this.state.selectedStandardId,this.state.selectedBoard,this.state.selectedAcademicYear)}}>
                          All
                        </Button>
                        <Button color={this.state.showStatus == 1 ? "info":"default"} size="sm" className={classes.middleButton}  style={{fontWeight:500}} onClick={() => {this.setState({showStatus:1}); this.getStudentDetails(this.state.selectedStandardId,this.state.selectedBoard,this.state.selectedAcademicYear)}}>
                          Active
                        </Button>
                        <Button color={this.state.showStatus == 0 ? "info":"default"} size="sm" className={classes.lastButton}  style={{fontWeight:500}} onClick={() => {this.setState({showStatus:0}); this.getStudentDetails(this.state.selectedStandardId,this.state.selectedBoard,this.state.selectedAcademicYear)}}>
                          InActive
                        </Button>
                      </div>
                      <h4 className={classes.cardIconTitle}>Customers List</h4>
                    </CardHeader>
                    <CardBody>
                     <ReactTable
                      data={
                      this.state.tableData.map((original,key) => {
                      return ({
                        slno: key+1,
                        id:original.UID,
                        institute_name: "AMS Test Institution",
                        institute_status:"Committed",
                        sales_person:"Karthick",
                        last_visit:"20-10-2020",
                        actions: (
                        // we've added some custom button actions
                        <div className="grouplist-actions">
                        { /* use this button to add a like kind of action */ }                        
                        <Tooltip
                          id="tooltip-top"
                          title={"View"}
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                          >
                          <Button
                            className={classes.actionButton}
                            simple
                            onClick={()=> this.setState({customersprofile:true})}
                            color="success"
                            className="edit"
                          >
                          <ViewIcon className={classes.icon} />
                          </Button> 
                        </Tooltip>
                        {/* use this button to remove the data row */}
                        <Tooltip
                          id="tooltip-top"
                          title={original.status == 1 ? "Deactivate":"Activate"}
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={original.status == 1 ? true:false}
                                onChange={() => this.handleDeactive(original.id, original.status)}
                                value="checkedA"
                                classes={{
                                  switchBase: classes.switchBase,
                                  checked: classes.switchChecked,
                                  thumb: classes.switchIcon,
                                  track: classes.switchBar
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label=""
                          />
                        </Tooltip>
                        </div>
                      )
                    })
                    })
                    }
                    filterable
                    minRows={0}
                    columns={[
                    {
                      Header: "Sl No",
                      accessor: "slno",
                      width: 90,
                      className: "center",
                        Filter: ({filter, onChange}) => (
                          <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                        )
                      },
                    {
                      Header: "Institute Name",
                      accessor: "institute_name",
                      className: "center",
                        Filter: ({filter, onChange}) => (
                          <input type='text' style={{textAlign:'center'}} placeholder="Search Institute" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                        )
                      },
                    {
                      Header: "Customers Staus",
                      accessor: "institute_status",
                      className: "center",
                        Filter: ({filter, onChange}) => (
                          <input type='text' style={{textAlign:'center'}} placeholder="Search Staus" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                        )
                    },
                    {
                      Header: "Sales Person Name",
                      accessor: "sales_person",
                      className: "center",
                        Filter: ({filter, onChange}) => (
                          <input type='text' style={{textAlign:'center'}} placeholder="Search Person Name" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                        )
                    },
                    {
                      Header: "Last Visit",
                      accessor: "last_visit",
                      className: "center",
                        Filter: ({filter, onChange}) => (
                          <input type='text' style={{textAlign:'center'}} placeholder="Search Visit" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                        )
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      className: "center",
                      sortable: false,
                      filterable: false,
                    }
                      
                    ]}
                    defaultFilterMethod={filterCaseInsensitive}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                    />
                   </CardBody>
                  <CardFooter stats style={{marginTop:0}}>
                    <div className={classes.stats}> 
                      <a style={{color:'#000',fontSize:'14px',cursor:'pointer'}}> Showing 10 of 20 entries</a>
                    </div>
                    <div className={classes.stats}>
                      <MButton   variant="outlined" color="primary" >Export</MButton>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>}

            {this.state.selectType == "createcustomers" &&             
            <GridContainer  justify="center" alignItems="center">              
            <GridItem xs={12} sm={12} md={9}>
              <Stepper nonLinear activeStep={this.state.activeStep}>
                {this.state.steps.map((label,index) => (
                  <Step key={label}> <StepButton onClick={()=> this.handleStep(index)}> </StepButton> </Step>
                ))}
              </Stepper>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose"><MailOutline/></CardIcon>
                    <h4 className={classes.cardIconTitle}>Customers Creation</h4>
                  </CardHeader>
                  <CardBody>
                    <form>
                    {this.state.activeStep == 0 && 
                    <div>
                    <Card className="outlinedInput">
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Trust / Congregation details</h5>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>             
                          <GridItem xs={12} sm={12} md={9} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.trust_name}
                              label="Trust Name" 
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
                              label="Pincode" 
                              type="search" 
                              onChange={(event) => this.setPostData("pincode",event.target.value)}
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
                              label="Address Line 1" 
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
                              label="Address Line 2" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_2",event.target.value)}
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
                              label="Post Office" 
                              type="search" 
                              onChange={(event) => this.setPostData("post_office",event.target.value)}
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
                              label="Taluk" 
                              type="search" 
                              onChange={(event) => this.setPostData("taluk",event.target.value)}
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
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                        </GridContainer>  
                      </CardBody>
                    </Card>                                     
                 
                    <Card className="outlinedInput">
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Contact Persons</h5>
                          </GridItem>
                        </GridContainer>
                        {this.state.authorHolders.map((author, idx) => (
                         <div> 
                        <GridContainer>             
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                            disabled
                              inputProps={{
                              autoComplete: 'off'
                              }}
                              readOnly={true}
                            id="document-type"   
                            value={idx+1}
                            label="Sl No." 
                            type="search" 
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
                            label="Person Name" 
                            type="search" 
                            onChange={(event) => this.setPostData("persons_name",event.target.value)}
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.father_name}
                            label="Designation" 
                            type="search" 
                            onChange={(event) => this.setPostData("designation",event.target.value)}
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>  
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.Approver}
                                onChange={()=> this.setState({Approver:!this.state.Approver})}
                                name="Approver"
                                color="primary"
                              />
                            }
                            label="Approver"
                          />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.DecisionMaker}
                                onChange={()=> this.setState({DecisionMaker:!this.state.DecisionMaker})}
                                name="DecisionMaker"
                                color="primary"
                              />
                            }
                            label="Decision Maker"
                          />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.Influencer}
                                onChange={()=> this.setState({Influencer:!this.state.Influencer})}
                                name="Influencer"
                                color="primary"
                              />
                            }
                            label="Influencer"
                          />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.EvaluatorRecommender}
                                onChange={()=> this.setState({EvaluatorRecommender:!this.state.EvaluatorRecommender})}
                                name="EvaluatorRecommender"
                                color="primary"
                              />
                            }
                            label="Evaluator/Recommender"
                          />						  
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.GatekeeperBlocker}
                                onChange={()=> this.setState({GatekeeperBlocker:!this.state.GatekeeperBlocker})}
                                name="GatekeeperBlocker"
                                color="primary"
                              />
                            }
                            label="Gatekeeper/Blocker"
                          />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.Users}
                                onChange={()=> this.setState({Users:!this.state.Users})}
                                name="Users"
                                color="primary"
                              />
                            }
                            label="Users"
                          />
                        </GridItem> 
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.Champion}
                                onChange={()=> this.setState({Champion:!this.state.Champion})}
                                name="Champion"
                                color="primary"
                              />
                            }
                            label="Champion"
                          />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.Mentor}
                                onChange={()=> this.setState({Mentor:!this.state.Mentor})}
                                name="Mentor"
                                color="primary"
                              />
                            }
                            label="Mentor"
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
                        <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
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
                        <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                          {(this.state.authorHolders.length - 1) == idx ?   <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
                          <TextField 
                          id="document-type"   
                          InputProps={{
                          autoComplete: 'off', 
                          readOnly: true,
                          startAdornment: (
                          <InputAdornment position="start">
                          <Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                          </InputAdornment>
                          ),
                          }}
                          label="Add" 
                          onClick={()=>{this.handCustomersdAuthorholder()}}
                          variant="outlined" />
                          </FormControl></div>
                          :
                          <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
                          <TextField 
                          id="document-type"   
                          InputProps={{
                          autoComplete: 'off',
                          readOnly: true,
                          startAdornment: (
                          <InputAdornment position="start">
                          <Remove style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                          </InputAdornment>
                          ),
                          }}
                          label="Del" 
                          onClick={()=>{this.removeAuthortHolder(idx);}}
                          variant="outlined" />
                          </FormControl></div>  
                          }
                          </GridItem>
                        </GridContainer>
                        </div>
                        ))}
                    </CardBody>
                  </Card>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:'0px'}}>                
                          <Chip onClick={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                            avatar={<Avatar>2</Avatar>}
                            label="Institute details"
                            clickable
                            color="primary"
                            onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                            deleteIcon={<KeyboardArrowRight />}
                            variant="outlined"
                          />
                        </GridItem>
                      </GridContainer>
                      </div>
                }                
                {this.state.activeStep == 1 && 
                <div>
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                        <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute details</h5>
                        </GridItem>
                      </GridContainer> 
                      <GridContainer>
                        <GridItem  xs={12} sm={12} md={12} className={classes.inputMargin}>
                          <FormControlLabel
                            control={
                              <Checkbox
                              checked={this.state.institutecheckbox}
                                onChange={()=> this.setState({institutecheckbox:!this.state.institutecheckbox})}
                                name="Institutecheckbox"
                                color="primary"
                              />
                            }
                            label="Institute details are same as congregation details !"
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>             
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value="1"
                            label="Sl No." 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.trust_name}
                            label="Institute Name" 
                            type="search" 
                            onChange={(event) => this.setPostData("institute_name",event.target.value)}
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
                            label="Institute Type" 
                            type="search" 
                            onChange={(event) => this.setPostData("institute_type",event.target.value)}
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
                            label="Pincode" 
                            type="search" 
                            onChange={(event) => this.setPostData("pincode",event.target.value)}
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
                            label="Address Line 1" 
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
                            label="Address Line 2" 
                            type="search" 
                            onChange={(event) => this.setPostData("address_line_2",event.target.value)}
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
                            label="Post Office" 
                            type="search" 
                            onChange={(event) => this.setPostData("post_office",event.target.value)}
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
                            label="Taluk" 
                            type="search" 
                            onChange={(event) => this.setPostData("taluk",event.target.value)}
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
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
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
                      </GridContainer>  
                    </CardBody>
                  </Card>  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute Profiling</h5>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>   
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Average Fees" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Teaching Staff" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Non-teaching Staff" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Student" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Institution Owned Buses" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Classrooms" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="No of Digital Class Rooms" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                          <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                          <strong style={{margin:'auto',  paddingRight:15}}>Is Identity Card issued? </strong>   
                          <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.cardIssued === "yes"} onChange={()=> this.setState({cardIssued: 'yes'})} />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.cardIssued === "no"} onChange={()=> this.setState({cardIssued: 'no'})} />} label="No" />
                          </RadioGroup>
                          </FormControl>  
                        </GridItem>                      
                      </GridContainer>  
                    </CardBody>
                  </Card> 
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Website Details</h5>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                          <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                          <strong style={{margin:'auto',  paddingRight:15}}>Is Website Active/Inactive?</strong>   
                          <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.Website === "yes"} onChange={()=> this.setState({Website: 'yes'})} />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.Website === "no"} onChange={()=> this.setState({Website: 'no'})} />} label="No" />
                          </RadioGroup>
                          </FormControl>  
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Website Type" 
                            type="search" 
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
                            value={this.state.name}
                            label="Website Service Providing Company" 
                            type="search" 
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
                            value={this.state.name}
                            label="Website Service Providing Company (Place)" 
                            type="search" 
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
                            value={this.state.name}
                            label="Website Service Providing Company (Contact Number)" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>                                                          
                      </GridContainer>  
                    </CardBody>
                  </Card> 
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>App Details</h5>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                          If Parent App available, Own Branded or Management System Service Provider's Name
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                          <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                          <strong style={{margin:'auto',  paddingRight:15}}>Parent App Available? </strong>   
                          <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.Parent === "yes"} onChange={()=> this.setState({Parent: 'yes'})} />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.Parent === "no"} onChange={()=> this.setState({Parent: 'no'})} />} label="No" />
                          </RadioGroup>
                          </FormControl>  
                        </GridItem> 
                        {this.state.Parent == 'yes' &&  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth> 
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                              id="document-type"   
                              value={this.state.name}
                              label="Name" 
                              type="search" 
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                          </FormControl>
                        </GridItem>  }                                                       
                      </GridContainer>  
                    </CardBody>
                  </Card> 
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Existing Management System Service Provider</h5>
                        </GridItem>
                      </GridContainer>
                      <GridContainer> 
                        <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>                       
                          <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                          <strong style={{margin:'auto',  paddingRight:15}}> Is Proper Management System Implemented?</strong>   
                          <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.ManagementSystem === "yes"} onChange={()=> this.setState({ManagementSystem: 'yes'})} />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.ManagementSystem === "no"} onChange={()=> this.setState({ManagementSystem: 'no'})} />} label="No" />
                          </RadioGroup>
                          </FormControl>  
                        </GridItem> 
                      </GridContainer>   
                        {this.state.ManagementSystem == 'yes' &&  <div>
                      <GridContainer> <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Name" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Palce" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Type" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Price" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Cost (Approx. Yearly Cost)" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                            </GridItem> 
                      </GridContainer> </div> }    
                    </CardBody>
                  </Card> <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>eGenius</h5>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>              
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="eGenius-CAAS Proposed Rates" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="eGenius-CAAS Negotiable Rates" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="eGenius-CAAS Proposed Cost" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="eGenius-CAAS Negotiable Cost" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="eGenius-CAAS Advance Expected" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Expected Month of Closure" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                          <FormControl fullWidth>
                            <TextField 
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value={this.state.name}
                            label="Comments, if any" 
                            type="search" 
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem>                       
                      </GridContainer>  
                    </CardBody>
                  </Card>                   
                      <GridContainer> 
                        <GridItem xs={12} sm={12} md={6} >                  
                          <Chip onClick={()=>{this.setState({activeStep:0}); this.scrollToTop()}}
                            icon={<KeyboardArrowLeft />}
                            label="Trust details"
                            clickable
                            color="primary"
                            onDelete={()=>{this.setState({activeStep:0}); this.scrollToTop()}}
                            deleteIcon={<Avatar style={{width:22,height:22,backgroundColor:'#303f9f',color:'#fff', fontSize:'0.75rem'}}>1</Avatar>}
                            variant="outlined"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >                                    
                        <Chip onClick={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                          avatar={<Avatar>3</Avatar>}
                          label="Parameters"
                          clickable
                          color="primary"
                          onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                          deleteIcon={<KeyboardArrowRight />}
                          variant="outlined"
                        />
                        </GridItem>                     
                      </GridContainer> 
                  </div>                  
                } 
                { this.state.activeStep == 2 && 
                <div>
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Parameters</h5>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          Sl No
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Parameters
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                          Yes/No
                        </GridItem>                         
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          1
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Met the right customer and done the KYC
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.kyc === "yes"} onChange={()=> this.setState({kyc: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.kyc === "no"} onChange={()=> this.setState({kyc: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          2
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Done with competition and gap analysis
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.g_analysis === "yes"} onChange={()=> this.setState({g_analysis: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.g_analysis === "no"} onChange={()=> this.setState({g_analysis: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          3
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Institution has understood & showed interest in adopting next generation software
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.g_software === "yes"} onChange={()=> this.setState({g_software: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.g_software === "no"} onChange={()=> this.setState({g_software: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>  
                         <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          You must have been met all below stake holderse
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.1
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Initiators who suggest purchasing a product or service
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.i_service === "yes"} onChange={()=> this.setState({i_service: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.i_service === "no"} onChange={()=> this.setState({i_service: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.2
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Influencers who try to affect the outcome
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.i_outcome === "yes"} onChange={()=> this.setState({i_outcome: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.i_outcome === "no"} onChange={()=> this.setState({i_outcome: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.3
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Deciders who have the final decision
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.f_decision === "yes"} onChange={()=> this.setState({f_decision: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.f_decision === "no"} onChange={()=> this.setState({f_decision: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>    
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.4
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Buyers who are responsible for the contract
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.b_contract === "yes"} onChange={()=> this.setState({b_contract: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.b_contract === "no"} onChange={()=> this.setState({b_contract: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.5
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          End users of the item being purchased
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.e_purch === "yes"} onChange={()=> this.setState({e_purch: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.e_purch === "no"} onChange={()=> this.setState({e_purch: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          4.6
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Gatekeepers who control the flow of information
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.g_info === "yes"} onChange={()=> this.setState({g_info: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.g_info === "no"} onChange={()=> this.setState({g_info: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>   
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          5
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Full pledge Web/App demo has given to decision maker
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.decision_maker === "yes"} onChange={()=> this.setState({decision_maker: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.decision_maker === "no"} onChange={()=> this.setState({decision_maker: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          6
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Has reached the negotiation level.
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.n_level === "yes"} onChange={()=> this.setState({n_level: 'yes'})} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.n_level === "no"} onChange={()=> this.setState({n_level: 'no'})} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                          7
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                          Ready to sign the MOU
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={3} >
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position"> 
                            <FormControlLabel value="yes" control={<Radio color="primary" onClick={()=> this.handleClick()} />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary"  onClick={()=> this.handleClick()} />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={2} className={classes.inputMargin}>                          
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={7} style={{marginTop:'25px'}}>
                          <Badge style={{width:"50%"}} badgeContent={'High Potential Qualified Prospects'} color="secondary"></Badge> 
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={3} className={classes.inputMargin} > 
                          <FormControl fullWidth> 
                            <TextField     
                              inputProps={{
                              autoComplete: 'off'
                              }}
                            id="document-type"   
                            value="10"
                            type="search"  
                            inputRef={this.textInput} 
                            variant="outlined" />                   
                          </FormControl>
                        </GridItem> 
                      </GridContainer>                    
                    </CardBody>  
                  </Card>  
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={6}>
                    <Chip onClick={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                       icon={<KeyboardArrowLeft />}
                       label="Institute details"
                       clickable
                       color="primary"
                       onDelete={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                       deleteIcon={<Avatar style={{width:22,height:22,backgroundColor:'#303f9f',color:'#fff', fontSize:'0.75rem'}}>2</Avatar>}
                       variant="outlined"
                     />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >
                      <MButton  style={{marginRight:'2px'}}  variant="outlined" color="primary">Add</MButton> 
                      <MButton  type="submit" color="rose" onClick={this.handleStudent.bind(this)}variant="outlined" color="primary">Finish</MButton>
                    </GridItem>
                  </GridContainer> 
                  </div>
                } 
                    </form>
                  </CardBody>
                </Card>
              </GridItem>       
            </GridContainer>
            }
          </div>
        </SlidingPane>  
        
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
            isOpen={ this.state.customersprofile }
            title="Customers Profile"
            onRequestClose={ () => {
                // triggered on "<" on left top click or on outside click
                this.setState({ customersprofile: false });
            } }>
            <div>    
            <GridContainer>
                <GridItem xs={12} sm={12} md={1}>
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                    <div className={classes.accordionRoot+" AccordionDiv"}>
                      {this.state.selectedTab == "meeting" && <Accordion expanded={this.state.activeAccordion == "meeting" ? true : false} onChange={()=>this.handleChangeAccordion("meeting")}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                          <Typography className={classes.secondaryHeading}>
                            Meeting Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails> 
                        </AccordionDetails> 
                      </Accordion> } 
                      {this.state.selectedTab == "invoice" && <Accordion expanded={this.state.activeAccordion == "invoice" ? true : false} onChange={()=>this.handleChangeAccordion("invoice")}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                          <Typography className={classes.secondaryHeading}>
                            Invoice Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails> 
                        </AccordionDetails> 
                      </Accordion> }
                          
                      {this.state.selectedTab == "profile" && <Accordion expanded={this.state.activeAccordion == "profile" ? true : false} onChange={()=>this.handleChangeAccordion("profile")}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                          <Typography className={classes.secondaryHeading}>
                            Trust / Congregation details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                            <Card className="outlinedInput">
                              <CardBody>
                                <GridContainer>
                                  <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Trust / Congregation details</h5>
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>             
                                  <GridItem xs={12} sm={12} md={9} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.trust_name}
                                      label="Trust Name" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("trust_name",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem> 
                                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Pincode" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("pincode",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Address Line 1" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("address_line_1",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Address Line 2" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("address_line_2",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>  
                                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Post Office" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("post_office",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>  
                                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }} 
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Taluk" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("taluk",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem> 
                                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
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
                                      disabled={this.state.editStaff ? false : true} 
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
                                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                    <FormControl fullWidth>                 
                                      <TextField 
                                        disabled={this.state.editStaff ? false : true} 
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
                                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                    <FormControl fullWidth>                 
                                      <TextField 
                                        disabled={this.state.editStaff ? false : true} 
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
                                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                    <FormControl fullWidth>                 
                                      <TextField 
                                        disabled={this.state.editStaff ? false : true} 
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
                                </GridContainer>  
                              </CardBody>
                            </Card> 
                              <Card className="outlinedInput">
                                <CardBody>
                                  <GridContainer>
                                    <GridItem>
                                    <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Contact Persons</h5>
                                    </GridItem>
                                  </GridContainer>
                                  {this.state.authorHolders.map((author, idx) => (
                                  <div> 
                                  <GridContainer>             
                                  <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField                                   
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                        autoComplete: 'off'
                                        }}
                                        readOnly={true}
                                      id="document-type"   
                                      value={idx+1}
                                      label="Sl No." 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem> 
                                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField 
                                      disabled={this.state.editStaff ? false : true} 
                                        inputProps={{
                                        autoComplete: 'off'
                                        }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Person Name" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("persons_name",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                                    <FormControl fullWidth>
                                      <TextField                                  
                                      disabled={this.state.editStaff ? false : true}  
                                        inputProps={{
                                        autoComplete: 'off'
                                        }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Designation" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("designation",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                    </FormControl>
                                  </GridItem>  
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.Approver}
                                          onChange={()=> this.setState({Approver:!this.state.Approver})}
                                          name="Approver"
                                          color="primary"
                                        />
                                      }
                                      label="Approver"
                                    />
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.DecisionMaker}
                                          onChange={()=> this.setState({DecisionMaker:!this.state.DecisionMaker})}
                                          name="DecisionMaker"
                                          color="primary"
                                        />
                                      }
                                      label="Decision Maker"
                                    />
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.Influencer}
                                          onChange={()=> this.setState({Influencer:!this.state.Influencer})}
                                          name="Influencer"
                                          color="primary"
                                        />
                                      }
                                      label="Influencer"
                                    />
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.EvaluatorRecommender}
                                          onChange={()=> this.setState({EvaluatorRecommender:!this.state.EvaluatorRecommender})}
                                          name="EvaluatorRecommender"
                                          color="primary"
                                        />
                                      }
                                      label="Evaluator/Recommender"
                                    />						  
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.GatekeeperBlocker}
                                          onChange={()=> this.setState({GatekeeperBlocker:!this.state.GatekeeperBlocker})}
                                          name="GatekeeperBlocker"
                                          color="primary"
                                        />
                                      }
                                      label="Gatekeeper/Blocker"
                                    />
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.Users}
                                          onChange={()=> this.setState({Users:!this.state.Users})}
                                          name="Users"
                                          color="primary"
                                        />
                                      }
                                      label="Users"
                                    />
                                  </GridItem> 
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.Champion}
                                          onChange={()=> this.setState({Champion:!this.state.Champion})}
                                          name="Champion"
                                          color="primary"
                                        />
                                      }
                                      label="Champion"
                                    />
                                  </GridItem>
                                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox                                    
                                          disabled={this.state.editStaff ? false : true} 
                                          checked={this.state.Mentor}
                                          onChange={()=> this.setState({Mentor:!this.state.Mentor})}
                                          name="Mentor"
                                          color="primary"
                                        />
                                      }
                                      label="Mentor"
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                    <FormControl fullWidth>                 
                                      <TextField 
                                        disabled={this.state.editStaff ? false : true} 
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
                                        disabled={this.state.editStaff ? false : true}  
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
                                  <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                                    <FormControl fullWidth>                 
                                      <TextField                                   
                                        disabled={this.state.editStaff ? false : true} 
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
                                  <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                                    {(this.state.authorHolders.length - 1) == idx ?   <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
                                    <TextField                                 
                                    disabled={this.state.editStaff ? false : true} 
                                    id="document-type"   
                                    InputProps={{
                                    autoComplete: 'off', 
                                    readOnly: true,
                                    startAdornment: (
                                    <InputAdornment position="start">
                                    <Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                                    </InputAdornment>
                                    ),
                                    }}
                                    label="Add" 
                                    onClick={()=>{this.handCustomersdAuthorholder()}}
                                    variant="outlined" />
                                    </FormControl></div>
                                    :
                                    <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
                                    <TextField                                 
                                    disabled={this.state.editStaff ? false : true} 
                                    id="document-type"   
                                    InputProps={{
                                    autoComplete: 'off',
                                    readOnly: true,
                                    startAdornment: (
                                    <InputAdornment position="start">
                                    <Remove style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                                    </InputAdornment>
                                    ),
                                    }}
                                    
                                    label="Del" 
                                    onClick={()=>{this.removeAuthortHolder(idx);}}
                                    variant="outlined" />
                                    </FormControl></div>  
                                    }
                                    </GridItem>
                                  </GridContainer>  
                                  <GridContainer style={{marginTop:20}}>
                                    <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                                      { !this.state.editStaff &&   <MButton   variant="outlined" onClick={()=>this.setState({editStaff:true})} color="primary"> Edit </MButton>}
                                      { this.state.editStaff  && <div> <MButton variant="outlined" className="warningBtnOutline"  style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({editStaff:false})}>Cancel</MButton>
                                      <MButton variant="outlined" size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={()=>this.handleUpdate()}>Submit</MButton></div>}
                                    </GridItem>
                                  </GridContainer>
                                  </div>
                                  ))}
                              </CardBody>
                            </Card>
                          </div>
                        </AccordionDetails>
                      </Accordion>}

                          
                      {this.state.selectedTab == "profile" &&<Accordion expanded={this.state.activeAccordion == "invoice" ? true : false} onChange={()=>this.handleChangeAccordion("invoice")}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">                        
                          <Typography className={classes.secondaryHeading}>
                            Institute Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute details</h5>
                                </GridItem>
                              </GridContainer> 
                              <GridContainer>
                                <GridItem  xs={12} sm={12} md={12} className={classes.inputMargin}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                      checked={this.state.institutecheckbox}
                                        onChange={()=> this.setState({institutecheckbox:!this.state.institutecheckbox})}
                                        name="Institutecheckbox"
                                        color="primary"
                                      />
                                    }
                                    label="Institute details are same as congregation details !"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>             
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value="1"
                                      label="Sl No." 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField                                     
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.trust_name}
                                      label="Institute Name" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("institute_name",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Institute Type" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("institute_type",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField                                     
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Pincode" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("pincode",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField                                     
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Address Line 1" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("address_line_1",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField                                     
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Address Line 2" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("address_line_2",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField                                     
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Post Office" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("post_office",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.father_name}
                                      label="Taluk" 
                                      type="search" 
                                      onChange={(event) => this.setPostData("taluk",event.target.value)}
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
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
                                      disabled={this.state.editStaff ? false : true}
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
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>                 
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
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
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>                 
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
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
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>                 
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
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
                              </GridContainer>  
                            </CardBody>
                          </Card>  
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute Profiling</h5>
                                </GridItem>
                              </GridContainer>
                              <GridContainer>   
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Average Fees" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Teaching Staff" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Non-teaching Staff" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Student" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Institution Owned Buses" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Classrooms" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="No of Digital Class Rooms" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                                  <FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">
                                  <strong style={{margin:'auto',  paddingRight:15}}>Is Identity Card issued? </strong>   
                                  <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.cardIssued === "yes"} onChange={()=> this.setState({cardIssued: 'yes'})} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.cardIssued === "no"} onChange={()=> this.setState({cardIssued: 'no'})} />} label="No" />
                                  </RadioGroup>
                                  </FormControl>  
                                </GridItem>                      
                              </GridContainer>  
                            </CardBody>
                          </Card> 
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Website Details</h5>
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                                  <FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">
                                  <strong style={{margin:'auto',  paddingRight:15}}>Is Website Active/Inactive?</strong>   
                                  <FormControlLabel disabled={this.state.editStaff ? false : true} value="yes" control={<Radio color="primary" checked={this.state.Website === "yes"} onChange={()=> this.setState({Website: 'yes'})} />} label="Yes" />
                                  <FormControlLabel disabled={this.state.editStaff ? false : true} value="no" control={<Radio color="primary" checked={this.state.Website === "no"} onChange={()=> this.setState({Website: 'no'})} />} label="No" />
                                  </RadioGroup>
                                  </FormControl>  
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Website Type" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Website Service Providing Company" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Website Service Providing Company (Place)" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Website Service Providing Company (Contact Number)" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>                                                          
                              </GridContainer>  
                            </CardBody>
                          </Card> 
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>App Details</h5>
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                                  If Parent App available, Own Branded or Management System Service Provider's Name
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                                  <FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">
                                  <strong style={{margin:'auto',  paddingRight:15}}>Parent App Available? </strong>   
                                  <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.Parent === "yes"} onChange={()=> this.setState({Parent: 'yes'})} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.Parent === "no"} onChange={()=> this.setState({Parent: 'no'})} />} label="No" />
                                  </RadioGroup>
                                  </FormControl>  
                                </GridItem> 
                                {this.state.Parent == 'yes' &&  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth> 
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Name" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>  }                                                       
                              </GridContainer>  
                            </CardBody>
                          </Card> 
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Existing Management System Service Provider</h5>
                                </GridItem>
                              </GridContainer>
                              <GridContainer> 
                                <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>                       
                                  <FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">
                                  <strong style={{margin:'auto',  paddingRight:15}}> Is Proper Management System Implemented?</strong>   
                                  <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.ManagementSystem === "yes"} onChange={()=> this.setState({ManagementSystem: 'yes'})} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.ManagementSystem === "no"} onChange={()=> this.setState({ManagementSystem: 'no'})} />} label="No" />
                                  </RadioGroup>
                                  </FormControl>  
                                </GridItem> 
                              </GridContainer>   
                                {this.state.ManagementSystem == 'yes' &&  <div>
                              <GridContainer> <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Name" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Palce" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Type" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField
                                      disabled={this.state.editStaff ? false : true} 
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Price" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Cost (Approx. Yearly Cost)" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                              </GridContainer> </div> }    
                            </CardBody>
                          </Card> <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>eGenius</h5>
                                </GridItem>
                              </GridContainer>
                              <GridContainer>              
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="eGenius-CAAS Proposed Rates" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="eGenius-CAAS Negotiable Rates" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="eGenius-CAAS Proposed Cost" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="eGenius-CAAS Negotiable Cost" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="eGenius-CAAS Advance Expected" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Expected Month of Closure" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                                  <FormControl fullWidth>
                                    <TextField 
                                      disabled={this.state.editStaff ? false : true}
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                      id="document-type"   
                                      value={this.state.name}
                                      label="Comments, if any" 
                                      type="search" 
                                      inputRef={this.textInput} 
                                      variant="outlined" />                   
                                  </FormControl>
                                </GridItem>                       
                              </GridContainer>  
                            </CardBody>
                          </Card>                          
                          <Card className="outlinedInput">
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Parameters</h5>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  Sl No
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Parameters
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                                  Yes/No
                                </GridItem> 
                                
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  1
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Met the right customer and done the KYC
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.kyc === "yes"} onChange={()=> this.setState({kyc: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.kyc === "no"} onChange={()=> this.setState({kyc: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  2
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Done with competition and gap analysis
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_analysis === "yes"} onChange={()=> this.setState({g_analysis: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_analysis === "no"} onChange={()=> this.setState({g_analysis: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  3
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Institution has understood & showed interest in adopting next generation software
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_software === "yes"} onChange={()=> this.setState({g_software: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_software === "no"} onChange={()=> this.setState({g_software: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  You must have been met all below stake holderse
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.1
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Initiators who suggest purchasing a product or service
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.i_service === "yes"} onChange={()=> this.setState({i_service: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.i_service === "no"} onChange={()=> this.setState({i_service: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>   <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.2
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Influencers who try to affect the outcome
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.i_outcome === "yes"} onChange={()=> this.setState({i_outcome: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.i_outcome === "no"} onChange={()=> this.setState({i_outcome: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.3
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Deciders who have the final decision
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.f_decision === "yes"} onChange={()=> this.setState({f_decision: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.f_decision === "no"} onChange={()=> this.setState({f_decision: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>    
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.4
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Buyers who are responsible for the contract
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.b_contract === "yes"} onChange={()=> this.setState({b_contract: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.b_contract === "no"} onChange={()=> this.setState({b_contract: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.5
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  End users of the item being purchased
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.e_purch === "yes"} onChange={()=> this.setState({e_purch: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.e_purch === "no"} onChange={()=> this.setState({e_purch: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  4.6
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Gatekeepers who control the flow of information
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_info === "yes"} onChange={()=> this.setState({g_info: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.g_info === "no"} onChange={()=> this.setState({g_info: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  5
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Full pledge Web/App demo has given to decision maker
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.decision_maker === "yes"} onChange={()=> this.setState({decision_maker: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.decision_maker === "no"} onChange={()=> this.setState({decision_maker: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  6
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Has reached the negotiation level.
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.n_level === "yes"} onChange={()=> this.setState({n_level: 'yes'})} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" checked={this.state.n_level === "no"} onChange={()=> this.setState({n_level: 'no'})} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={1} className={classes.inputMargin}>
                                  7
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                                  Ready to sign the MOU
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={3} >
                                  <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="position"> 
                                    <FormControlLabel value="yes" disabled={this.state.editStaff ? false : true} control={<Radio color="primary" onClick={()=> this.handleClick()} />} label="Yes" />
                                    <FormControlLabel value="no" disabled={this.state.editStaff ? false : true} control={<Radio color="primary"  onClick={()=> this.handleClick()} />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={2} className={classes.inputMargin}>                          
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={7} style={{marginTop:'25px'}}>
                                  <Badge style={{width:"50%"}} badgeContent={'High Potential Qualified Prospects'} color="secondary"></Badge> 
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={3} className={classes.inputMargin} > 
                                  <FormControl fullWidth> 
                                    <TextField     
                                      inputProps={{
                                      autoComplete: 'off'
                                      }}
                                    id="document-type"   
                                    value="10"
                                    type="search"  
                                    inputRef={this.textInput} 
                                    variant="outlined" />                   
                                  </FormControl>
                                </GridItem> 
                              </GridContainer>                    
                            </CardBody>  
                          </Card> 
                            <GridContainer style={{marginTop:20}}>
                              <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                                { !this.state.editStaff &&   <MButton   variant="outlined" onClick={()=>this.setState({editStaff:true})} color="primary"> Edit </MButton>}
                                { this.state.editStaff  && <div> <MButton variant="outlined" className="warningBtnOutline"  style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({editStaff:false})}>Cancel</MButton>
                                <MButton variant="outlined" size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={()=>this.handleUpdate()}>Submit</MButton></div>}
                              </GridItem>
                            </GridContainer>       
                          </div>  
                        </AccordionDetails>
                      </Accordion>}
                      </div>
                </GridItem>
              </GridContainer>
 
            </div> 
          </SlidingPane>                          	
      </div>
    );
  }
}
export default withStyles(pageStyles)(Dashboard)
