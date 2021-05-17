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
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import CloudDownload from "@material-ui/icons/CloudDownload";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Book from '@material-ui/icons/Book';
import ViewIcon from "@material-ui/icons/Visibility";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Menu from '@material-ui/core/Menu';
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
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DoneIcon from '@material-ui/icons/Done';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Print from "@material-ui/icons/Print";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
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
    menuopen:false,
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
    selectType:'createlead',
    ProposalType:'Proposal',
  }
  
  this.statecreate = {
    isOpen:false
  }
  this.statecreate = {
    menuopen:false
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

ProposalsView = () => 
{
  this.props.history.push({pathname:'/admin/ProposalsView', state:{'action':'view'}})
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

openmenu = () => {
  this.statecreate = {
    menuopen:true
  }
};

closemenu = () => {
  this.statecreate = {
    menuopen:false
  }
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
            title="Proposal View(AMS Test Institute)"
            onRequestClose={ () => {
                // triggered on "<" on left top click or on outside click
                this.ProposalsView();
            } }>
            <div> 			
              <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                      <GridItem xs={12} sm={12} md={10}> 
                        <Card> 
                          <CardHeader color="warning" text>
                            <CardText className='cardHeader' style={{width:'100%',textAlign:'center'}} >
                              <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                                <MButton variant={this.state.ProposalType == "Proposal" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Proposal'})}>Proposal</MButton> 
                                <MButton variant={this.state.ProposalType == "Comments" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Comments'})}>Comments</MButton> 
                                <MButton variant={this.state.ProposalType == "Reminders" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Reminders'})}>Reminders</MButton> 
                                <MButton variant={this.state.ProposalType == "Tasks" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Tasks'})}>Tasks</MButton> 
                                <MButton variant={this.state.ProposalType == "Notes" ?"contained":"outlined"} onClick={() => this.setState({ProposalType:'Notes'})}>Notes</MButton> 
                              </ButtonGroup>
                            </CardText>
                          </CardHeader>
                          
                        <GridContainer >
                          <GridItem  xs={12} sm={12} md={2} style={{marginTop:'15px'}}></GridItem>
                          <GridItem  xs={12} sm={12} md={4} style={{marginTop:'15px'}}>
                            <Chip label="Open" style={{backgroundColor:'purple',color:'white'}} size="small" clickable variant="outlined"/>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4} style={{marginTop:'15px',textAlign:'right'}}> 
                            <div>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <Edit />
                            </IconButton> 
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <Print />
                            </IconButton>  
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <CloudDownload />
                            </IconButton>     
                            </div> 
                          </GridItem>
                        </GridContainer>
                          {this.state.ProposalType == "Proposal" && <div>
                            <CardBody>
                              <div class="invoice-box">    
                                <table style={{fontSize:'12px'}}>
                                  <tr className="information">
                                    <td  colspan="2">
                                      <table>
                                        <tr>
                                          <td>
                                            <strong><Link href="#" onClick={()=> this.ProposalsViewIndividual()}>PRO-000011</Link></strong><br />
                                            <strong><Link href="#" onClick={()=> this.ProposalsViewIndividual()}>AMS Test Proposal</Link></strong><br />                                          
                                          </td>                                                
                                          <td>
                                            <strong>To</strong><br />
                                            <strong>Vidhya Vahini School</strong><br />
                                            <strong>Krishnarajapuram</strong><br />                           
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr className="information">
                                    <td  colspan="2">
                                      <table>
                                        <tr>
                                          <td>
                                            <strong>eReleGo Digi Media Pvt Ltd</strong><br />
                                            <strong>3rd Floor, 2Y/40, 20th Main, 3rd Block,</strong><br />
                                            <strong>Bhashyam Circle, Rajajinagar</strong><br />
                                            <strong>Bangalore Karnataka</strong><br />                                          
                                            <strong>India 560010</strong><br />                                          
                                            <strong>GSTIN: 29AADCE5442N1Z8</strong><br />                                          
                                          </td>                                                
                                          <td>
                                            <strong>IN</strong><br />
                                            <strong>9036909066</strong><br />
                                            <strong>karthick.r@erelego.com</strong><br />                            
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr className="">
                                    <td  colspan="4" style={{padding:0}}>
                                      <table>
                                        <tr className="heading">
                                          <td style={{textAlign:"center",width:"50px"}}>
                                            S No
                                          </td>
                                          <td style={{textAlign:"left"}}>
                                            Particulars
                                          </td>                                          
                                          <td style={{width:"150px"}}>
                                            No of Sheets
                                          </td>
                                          <td style={{width:"150px"}}>
                                            Unique No.
                                          </td>
                                        </tr>
                                        <tr className="item">
                                          <td style={{textAlign:"center",width:"50px"}}>
                                            1
                                          </td>
                                          <td style={{textAlign:"left"}}>
                                            SSLC Mark Sheet
                                          </td>
                                          <td style={{width:"150px"}}>1</td>
                                          <td style={{width:"150px"}}>769786</td>
                                        </tr>
                                        <tr className="item">
                                          <td style={{textAlign:"center",width:"50px"}}>
                                            2
                                          </td>
                                          <td style={{textAlign:"left"}}>
                                            SSLC Mark Sheet
                                          </td>
                                            <td style={{width:"150px"}}>1</td>
                                            <td style={{width:"150px"}}>453453</td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr className="item">
                                      <td colspan="1" style={{textAlign:'center'}}>
                                        <strong>We confirm the above mentioned documents are in our custody.</strong>
                                      </td>
                                  </tr>
                                  <br /><br />
                                  <tr>
                                    <td  colspan="1">
                                      <table>
                                        <tr>
                                          <td style={{textAlign:"right",padding:"0 !important"}}>
                                            <strong>Authorized Signatory</strong>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>                                      
                                </table>
                              </div>
                            </CardBody>
                          </div>}  

                          {this.state.ProposalType == "Comments" && <div>
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={1} className="outlinedInput" style={{textAlign:'center'}} > </GridItem>
                                <GridItem xs={12} sm={12} md={10} className="outlinedInput"> 
                                  <TextField
                                  style={{width:'100%'}}
                                    inputProps={{
                                      autoComplete: 'off'
                                      }}
                                    id="standard-textarea"
                                    label="Type your comment here."
                                    placeholder="Type your comment here."
                                    onChange={(event) => this.setMessage(event.target.value)}
                                    variant="outlined"
                                    multiline
                                    />
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={1} className="outlinedInput" style={{textAlign:'center'}} ></GridItem>
                                <GridItem xs={12} sm={12} md={10} style={{textAlign:'right',marginTop:'15px'}} >
                                  <MButton variant="outlined" color="primary">Add Comment</MButton> 
                                </GridItem>
                              </GridContainer> 
                            </CardBody>
                          </div>}
                           {this.state.ProposalType == "Notes" && <div>
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={1} className="outlinedInput" style={{textAlign:'center'}} > </GridItem>
                                <GridItem xs={12} sm={12} md={10} className="outlinedInput" style={{textAlign:'center'}} > 
                                  <TextField
                                  style={{width:'100%'}}
                                    inputProps={{
                                      autoComplete: 'off'
                                      }}
                                    id="standard-textarea"
                                    label="Type your notes here."
                                    placeholder="Type your notes here."
                                    onChange={(event) => this.setMessage(event.target.value)}
                                    variant="outlined"
                                    multiline
                                    />
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={2} className="outlinedInput" style={{textAlign:'center'}} > </GridItem>
                                <GridItem xs={12} sm={12} md={10} style={{textAlign:'right',marginTop:'15px'}} >
                                  <MButton variant="outlined" color="primary">Add Notes</MButton> 
                                </GridItem>
                              </GridContainer>
                            </CardBody>
                          </div>}
                          {this.state.ProposalType == "Reminders" && <div> 
                          <GridContainer >
                            <GridItem xs={12} sm={12} md={12} style={{marginTop:'15px',textAlign:'right'}}> 
                              <div>
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <Add />Set Reminder
                              </IconButton>   
                              </div> 
                            </GridItem>
                          </GridContainer>
                          <CardBody>
                          <ReactTable
                            data={
                            this.state.tableData.map((original,key) => {
                            return ({
                              slno: key+1,
                              id:original.UID,
                              institute_name:<Link href="#" onClick={()=> this.LeadsView()}>AMS Test Institution</Link>,
                              institute_status: <Chip 
                                                  style={{backgroundColor:'purple',color:'white'}}
                                                  size="small"
                                                  label="Coverted" 
                                                  clickable
                                                />,
                              sales_person:"Karthick",
                              last_visit:"20-10-2020"
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
                            Header: "Company/Institute Name",
                            accessor: "institute_name",
                            className: "center",
                              Filter: ({filter, onChange}) => (
                                <input type='text' style={{textAlign:'center'}} placeholder="Search Company/Institute" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                              )
                            },
                          {
                            Header: "Lead Staus",
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
                        
                        {this.state.ProposalType == "Tasks" && <div>
                          <CardBody>
                          <ReactTable
                            data={
                            this.state.tableData.map((original,key) => {
                            return ({
                              slno: key+1,
                              id:original.UID,
                              institute_name:<Link href="#" onClick={()=> this.LeadsView()}>AMS Test Institution</Link>,
                              institute_status: <Chip 
                                                  style={{backgroundColor:'purple',color:'white'}}
                                                  size="small"
                                                  label="Coverted" 
                                                  clickable
                                                />,
                              sales_person:"Karthick",
                              last_visit:"20-10-2020"
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
                            Header: "Company/Institute Name",
                            accessor: "institute_name",
                            className: "center",
                              Filter: ({filter, onChange}) => (
                                <input type='text' style={{textAlign:'center'}} placeholder="Search Company/Institute" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                              )
                            },
                          {
                            Header: "Lead Staus",
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
          </SlidingPane>     

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
