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
import Chip from '@material-ui/core/Chip';
import Moment from 'moment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
//redux functions
import CheckAccess from "components/CheckAccess.js";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js'
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
  ModalStyle4: {
    width:'50% !important',
    backgroundColor:'#ddd',
    '& .MuiInputBase-root .Mui-disabled ' :{
      color:' rgb(0 0 0 / 85%)',
      cursor: 'default'
    },
    '& .MuiFormLabel-root.Mui-disabled ' :{
      color:' rgb(0 0 0 / 85%)',
    },
   
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
    ApprovedOverview:false,
    PendingOverview:false,
    RejectedOverview:false,
    PaidOverview:false,
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
    Proposals:'view',
    ProposalType:'All',
  }
  
  this.statecreate = {
    isOpen:false
  }
}

renderHeader = () => {
  return (
    <GridContainer>
        {this.state.ProposalType == 'All' && <>
      <GridItem xs={12} sm={10} md={6}>
      <div>{this.state.expenseStatus} Expenses</div>
       </GridItem> 
        </>} 
      {this.state.ProposalType == 'Approved' && <>
      <GridItem xs={12} sm={10} md={6}>
      <div>Approved Expenses</div>
       </GridItem> 
        </>} 
        {this.state.ProposalType == 'Pending' && <>
        <GridItem xs={12} sm={10} md={6}>
        <div>Pending Expenses</div>
       </GridItem> 
        </>}
        {this.state.ProposalType == 'Rejected' && <>
        <GridItem xs={12} sm={10} md={6}>
        <div>Rejected Expenses</div>
       </GridItem> 
        </>}
        {this.state.ProposalType == 'Paid' && <>
        <GridItem xs={12} sm={10} md={6}>
        <div>Paid Expenses</div>
       </GridItem> 
        </>}
    </GridContainer>
  )
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

ProposalsViewIndividual = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsViewIndividual'})
}

ProposalsCreate = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsCreate'})
}

ProposalsStandardTemplate = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsStandardTemplate'})
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


render(){
const { classes } = this.props;


return (
        <div>
      
            <div> 			
              <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                      <GridItem xs={12} sm={12} md={10}> 
                        <Card> 
                          <CardHeader color="warning" text>
                            <CardText className='cardHeader' style={{width:'100%',textAlign:'center'}} >
                              <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                                <MButton variant={this.state.ProposalType == "All" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'All'})}>All</MButton> 
                                <MButton variant={this.state.ProposalType == "Pending" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Pending'})}>Pending</MButton> 
                                <MButton variant={this.state.ProposalType == "Approved" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Approved'})}>Approved</MButton> 
                                <MButton variant={this.state.ProposalType == "Rejected" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Rejected'})}>Rejected</MButton> 
                                <MButton variant={this.state.ProposalType == "Paid" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Paid'})}>Paid</MButton> 
                              </ButtonGroup>
                            </CardText>
                          </CardHeader>
                          {this.state.ProposalType == "All" && <div>
                          <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                  slno: key+1,
                                  id:original.UID,
                                  client_name:"Client Name",
                                  location_from:"Location 1",
                                  location_to:"Locatoin 2",
                                  expenses_type:"Trasportation",
                                  kms:"10",
                                  amount:"₹ 100",
                                  arststus: <Chip label="Approved" style={{backgroundColor:'green',color:'white'}} onClick={()=> this.setState({ApprovedOverview:true, expenseStatus:"Approved"}) } size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Expenses",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Client Name",
                                accessor: "client_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "From",
                                accessor: "location_from",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "To",
                                accessor: "location_to",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Type",
                                accessor: "expenses_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Kms",
                                accessor: "kms",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Kms" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Amount",
                                accessor: "amount",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                            
                              {
                                Header: "Status",
                                accessor: "arststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
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
                            </CardFooter></div>} 
                            {this.state.ProposalType == "Pending" && <div>
                            <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                    slno: key+1,
                                    id:original.UID,
                                    client_name:"Client Name",
                                    location_from:"Location 1",
                                    location_to:"Locatoin 2",
                                    expenses_type:"Other",
                                    kms:"5",
                                    amount:"₹ 50",
                                  arststus: <Chip label="Pending" onClick={()=> this.setState({PendingOverview:true}) } style={{backgroundColor:'#F29339',color:'white'}} size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Expenses",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Client Name",
                                accessor: "client_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "From",
                                accessor: "location_from",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "To",
                                accessor: "location_to",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Type",
                                accessor: "expenses_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Kms",
                                accessor: "kms",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Kms" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Amount",
                                accessor: "amount",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                             
                              {
                                Header: "Status",
                                accessor: "arststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
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
                          </div>}  

                            {this.state.ProposalType == "Approved" && <div>
                            <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                    slno: key+1,
                                    id:original.UID,
                                    client_name:"Client Name",
                                    location_from:"Location 1",
                                    location_to:"Locatoin 2",
                                    expenses_type:"Other",
                                    kms:"5",
                                    amount:"₹ 50",
                                  arststus: <Chip label="Approved" onClick={()=> this.setState({ApprovedOverview:true}) } style={{backgroundColor:'green',color:'white'}} size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Expenses",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Client Name",
                                accessor: "client_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "From",
                                accessor: "location_from",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "To",
                                accessor: "location_to",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Type",
                                accessor: "expenses_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Kms",
                                accessor: "kms",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Kms" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Amount",
                                accessor: "amount",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                             
                              {
                                Header: "Status",
                                accessor: "arststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
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
                          </div>}  

                          {this.state.ProposalType == "Rejected" && <div>
                          <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                    slno: key+1,
                                    id:original.UID,
                                    client_name:"Client Name",
                                    location_from:"Location 1",
                                    location_to:"Locatoin 2",
                                    expenses_type:"Other",
                                    kms:"10",
                                    amount:"₹ 100",
                                  arststus: <Chip label="Rejected" onClick={()=> this.setState({RejectedOverview:true}) } style={{backgroundColor:'red',color:'white'}} size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Expenses",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Client Name",
                                accessor: "client_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "From",
                                accessor: "location_from",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "To",
                                accessor: "location_to",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Type",
                                accessor: "expenses_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Kms",
                                accessor: "kms",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Kms" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Amount",
                                accessor: "amount",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Status",
                                accessor: "arststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
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
                            </CardFooter></div>} 

                            {this.state.ProposalType == "Paid" && <div>
                          <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                    slno: key+1,
                                    id:original.UID,
                                    client_name:"Client Name",
                                    location_from:"Location 1",
                                    location_to:"Locatoin 2",
                                    expenses_type:"Transportation",
                                    kms:"10",
                                    amount:"₹ 100",
                                  arststus: <Chip label="Paid" onClick={()=> this.setState({PaidOverview:true}) } style={{backgroundColor:'blue',color:'white'}} size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Expenses",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Client Name",
                                accessor: "client_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "From",
                                accessor: "location_from",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "To",
                                accessor: "location_to",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Location" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Type",
                                accessor: "expenses_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Kms",
                                accessor: "kms",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Kms" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Amount",
                                accessor: "amount",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Amount" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Status",
                                accessor: "arststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
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
                            </CardFooter></div>} 
                      </Card>
                    </GridItem>
                  </GridContainer>
            </div>
            <SlidingPane
              closeIcon={<div>   
                <Button justIcon round color="white" style={{color:'black'}} >
                <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                </Button></div>}  
                className={classes.ModalStyle4}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.ApprovedOverview }
                title="Expenses"
                title={this.renderHeader()}
                onRequestClose={ () => {
                  this.setState({ ApprovedOverview: false});
                }}>
              <div> 
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Client 1"
                                label="Client Name" 
                                type="search" 
                                onChange={(event) => this.setPostData("client_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value={Moment().format("DD-MM-YYYY h:m A")}
                                label="Submitted On" 
                                type="search" 
                                onChange={(event) => this.setPostData("submitted_on",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Transpotation"
                                label="Expenses Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Own Vehicle"
                                label="Transportation Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 1"
                                label="Location from" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 2"
                                label="Location To" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="100"
                                label="Kilometers" 
                                type="search" 
                                onChange={(event) => this.setPostData("kms",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                           <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Amount" 
                                type="search" 
                                onChange={(event) => this.setPostData("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Approved Amount" 
                                type="search" 
                                onChange={(event) => this.setSate("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                            <TextField 
                            disabled={true} 
                            multiline="true"
                            id="document-type"
                            type="search"
                            variant="outlined"
                            label="Descriptions" />               
                            </FormControl>
                          </GridItem> 
                        </GridContainer> 
                        <GridContainer  justify="center" alignItems="center">    
                          <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:20}}>
                            <div>
                              <MButton variant="outlined" size="sm" style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'white',marginRight:'10px'}}>Approve</MButton>
                              <MButton variant="outlined" size="sm" style={{color:'#FF0000',border:'1px solid #FF0000',backgroundColor:'white'}}>Reject</MButton>
                            </div>
                          </GridItem> 
                       </GridContainer>
                    </CardBody>
                  </Card>
              </div>
            </SlidingPane>
            <SlidingPane
              closeIcon={<div>   
                <Button justIcon round color="white" style={{color:'black'}} >
                <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                </Button></div>}  
                className={classes.ModalStyle4}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.PendingOverview }
                title={this.renderHeader()}
                onRequestClose={ () => {
                  this.setState({ PendingOverview: false});
                }}>
              <div> 
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Client 1"
                                label="Client Name" 
                                type="search" 
                                onChange={(event) => this.setPostData("client_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value={Moment().format("DD-MM-YYYY h:m A")}
                                label="Submitted On" 
                                type="search" 
                                onChange={(event) => this.setPostData("submitted_on",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Transpotation"
                                label="Expenses Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Own Vehicle"
                                label="Transportation Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 1"
                                label="Location from" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 2"
                                label="Location To" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="100"
                                label="Kilometers" 
                                type="search" 
                                onChange={(event) => this.setPostData("kms",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                           <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Amount" 
                                type="search" 
                                onChange={(event) => this.setPostData("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={false} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Approved Amount" 
                                type="search" 
                                onChange={(event) => this.setSate("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                            <TextField
                             disabled={false} 
                            multiline="true"
                            id="document-type"
                            type="search"
                            variant="outlined"
                            label="Descriptions" />               
                            </FormControl>
                          </GridItem> 
                        </GridContainer> 
                        <GridContainer  justify="center" alignItems="center">    
                          <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:20}}>
                            <div>
                              <MButton variant="outlined" size="sm" style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'white',marginRight:'10px'}}>Approve</MButton>
                              <MButton variant="outlined" size="sm" style={{color:'#FF0000',border:'1px solid #FF0000',backgroundColor:'white'}}>Reject</MButton>
                            </div>
                          </GridItem> 
                       </GridContainer>
                    </CardBody>
                  </Card>
              </div>
            </SlidingPane>
            <SlidingPane
              closeIcon={<div>   
                <Button justIcon round color="white" style={{color:'black'}} >
                <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                </Button></div>}  
                className={classes.ModalStyle4}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.RejectedOverview }
                title={this.renderHeader()}
                onRequestClose={ () => {
                  this.setState({ RejectedOverview: false});
                }}>
              <div> 
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Client 1"
                                label="Client Name" 
                                type="search" 
                                onChange={(event) => this.setPostData("client_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value={Moment().format("DD-MM-YYYY h:m A")}
                                label="Submitted On" 
                                type="search" 
                                onChange={(event) => this.setPostData("submitted_on",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Own Vehicle"
                                label="Transportation Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 1"
                                label="Location from" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 2"
                                label="Location To" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="100"
                                label="Kilometers" 
                                type="search" 
                                onChange={(event) => this.setPostData("kms",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                           <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Amount" 
                                type="search" 
                                onChange={(event) => this.setPostData("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Approved Amount" 
                                type="search" 
                                onChange={(event) => this.setSate("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                            <TextField 
                            disabled={true} 
                            multiline="true"
                            id="document-type"
                            type="search"
                            variant="outlined"
                            label="Descriptions" />               
                            </FormControl>
                          </GridItem> 
                        </GridContainer> 
                        <GridContainer  justify="center" alignItems="center">    
                          <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:20}}>
                            <div>
                              <MButton variant="outlined" size="sm" style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'white',marginRight:'10px'}}>Approve</MButton>
                              <MButton variant="outlined" size="sm" style={{color:'#FF0000',border:'1px solid #FF0000',backgroundColor:'white'}}>Reject</MButton>
                            </div>
                          </GridItem> 
                       </GridContainer>
                    </CardBody>
                  </Card>
              </div>
            </SlidingPane>
            <SlidingPane
              closeIcon={<div>   
                <Button justIcon round color="white" style={{color:'black'}} >
                <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                </Button></div>}  
                className={classes.ModalStyle4}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.PaidOverview }
                title={this.renderHeader()}
                onRequestClose={ () => {
                  this.setState({ PaidOverview: false});
                }}>
              <div> 
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Client 1"
                                label="Client Name" 
                                type="search" 
                                onChange={(event) => this.setPostData("client_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value={Moment().format("DD-MM-YYYY h:m A")}
                                label="Submitted On" 
                                type="search" 
                                onChange={(event) => this.setPostData("submitted_on",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={6}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Transpotation"
                                label="Expenses Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Own Vehicle"
                                label="Transportation Type" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 1"
                                label="Location from" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="Location 2"
                                label="Location To" 
                                type="search" 
                                onChange={(event) => this.setPostData("emp_name",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="100"
                                label="Kilometers" 
                                type="search" 
                                onChange={(event) => this.setPostData("kms",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                           <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Amount" 
                                type="search" 
                                onChange={(event) => this.setPostData("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                              <TextField 
                                disabled={true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value="10"
                                label="Approved Amount" 
                                type="search" 
                                onChange={(event) => this.setSate("amount",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                            <TextField 
                            disabled={true}
                            multiline="true"
                            id="document-type"
                            type="search"
                            variant="outlined"
                            label="Descriptions" />               
                            </FormControl>
                          </GridItem> 
                        </GridContainer> 
                        <GridContainer  justify="center" alignItems="center">    
                          <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:20}}>
                            <div>
                              <MButton variant="outlined" size="sm" style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'white',marginRight:'10px'}}>Approve</MButton>
                              <MButton variant="outlined" size="sm" style={{color:'#FF0000',border:'1px solid #FF0000',backgroundColor:'white'}}>Reject</MButton>
                            </div>
                          </GridItem> 
                       </GridContainer>
                    </CardBody>
                  </Card>
              </div>
            </SlidingPane>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));