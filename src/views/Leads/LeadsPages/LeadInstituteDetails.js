import React from "react";
import 'date-fns';

// react plugin for creating charts
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from '@material-ui/core/InputAdornment';
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import Service from 'Utils/Service';
import { TramOutlined } from "@material-ui/icons";
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 

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

  const pageStyles = {...styles, ...panelStyles }
  const useStyles = makeStyles(pageStyles);

  function filterCaseInsensitive(filter, row) 
  {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) 
    {
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
  constructor(props) 
  {
    super(props);
    this.state = {
      activeAccordion:'',
      edit_institute:false,
      institute_month_closure: new Date(),
      parametercount:0,
      post_office:'', 
      taluk:'', 
      district:'', 
      state:'', 
      trust_name:'',
      address_line_1:'',
      address_line_2:'',
      post_office:'',
      pincode:'',
      lead_contact_number_one:'',
      lead_contact_number_two:'',
      lead_mail_id:'',
      lead_status:'',
      InstituteDetailsCount:'0', 
      InstituteDetails:[],
      lead_contact_person:[{ id:'',person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],
      Institute_contact_person:[{ id:'',person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],
      Institute_contact_person_dummy:[{ id:'',person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],
      activeStep:0,
      steps:[1,2,3,4],
      pincodesArr:[],
      dateOfBirth: new Date(),
      institute_same_trust: 'no',
      addressType: '',
      edit_ins_id: '',
      client_id: '',
      created_by: '1',
      alert: null,
      tableData: [{
        id: '1', 
        name: '',
      }],
    }
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }

  handleChangeAccordion = (value) => {
    if(this.state.activeAccordion == value){
      this.setState({activeAccordion:""});
    }
    else{
      this.setState({activeAccordion:value});
    }
  }

  handleEYear = (date) => {
    this.setState({ month_closure: date, formChanged:true })
  };

  handleTabChange = (event, newValue) => {
    this.setState({activeTabIndex: newValue});
  };

  scrollToTop() {
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }

  raiseLoginSignupErrorAlert = (modalType) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          confirmBtnBsStyle="danger"
          title="Something bad happened!!!"
          onConfirm={() => {
            this.setState({ alert: null });
          }}
        > We are regretting for it
        </SweetAlert>
      ),
    });
  };

  removeLeadPerson(i) {
    const { lead_contact_person } = this.state;
    this.setState({
      lead_contact_person: lead_contact_person.filter((author, index) => index !== i),
    });
  }
  
  handleLeadPersonValue = (Index,inputName,Value) => {
    let lEducationHolders = this.state.lead_contact_person;
    lEducationHolders[Index][inputName] = Value;
    this.setState({lead_contact_person:lEducationHolders});
  }

  handleAddLeadPerson = () => {
    let lauthorHolders = this.state.lead_contact_person;
    let NewLeadContactPerson = {};
    NewLeadContactPerson.id='';
    NewLeadContactPerson.person_name='';
    NewLeadContactPerson.designation='';
    NewLeadContactPerson.approver='';
    NewLeadContactPerson.decision_maker='';
    NewLeadContactPerson.influencer='';
    NewLeadContactPerson.evaluator_recommender='';
    NewLeadContactPerson.gatekeeper_blocker='';
    NewLeadContactPerson.users='';
    NewLeadContactPerson.champion='';
    NewLeadContactPerson.mentor='';
    NewLeadContactPerson.contact_number_one='';
    NewLeadContactPerson.contact_number_two='';
    NewLeadContactPerson.mail_id='';
    lauthorHolders.push(NewLeadContactPerson);
    this.setState({lead_contact_person:lauthorHolders});
  } 

  removeInstitutePerson(i) {
    const { Institute_contact_person } = this.state;
    this.setState({
      Institute_contact_person: Institute_contact_person.filter((author, index) => index !== i),
    });
  }
  
  handleInstitutePersonValue = (Index,inputName,Value,Type) => {
    let lEducationHolders = this.state.Institute_contact_person;
    lEducationHolders[Index][inputName] = Value;
    this.setState({Institute_contact_person:lEducationHolders});
  }

  handleAddInstitutePerson = () => {
    let lauthorHolders = this.state.Institute_contact_person;
    let NewLeadContactPerson = {};
    NewLeadContactPerson.id='';
    NewLeadContactPerson.person_name='';
    NewLeadContactPerson.designation='';
    NewLeadContactPerson.approver='';
    NewLeadContactPerson.decision_maker='';
    NewLeadContactPerson.influencer='';
    NewLeadContactPerson.evaluator_recommender='';
    NewLeadContactPerson.gatekeeper_blocker='';
    NewLeadContactPerson.users='';
    NewLeadContactPerson.champion='';
    NewLeadContactPerson.mentor='';
    NewLeadContactPerson.ins_contact_number_one='';
    NewLeadContactPerson.ins_contact_number_two='';
    NewLeadContactPerson.ins_mail_id='';
    lauthorHolders.push(NewLeadContactPerson);
    this.setState({Institute_contact_person:lauthorHolders});
  }

  handleleadupdate()
  {
    let formData = new FormData();
    formData.append('id',this.props.inse_id);
    formData.append('client_id',this.state.client_id);
    formData.append('trust_name',this.state.trust_name);
    formData.append('address_line_1',this.state.address_line_1);
    formData.append('address_line_2',this.state.address_line_2);
    formData.append('post_office',this.state.post_office);
    formData.append('taluk',this.state.taluk);
    formData.append('district',this.state.district);
    formData.append('state',this.state.state);
    formData.append('pincode',this.state.pincode);
    formData.append('lead_contact_number_one',this.state.lead_contact_number_one);
    formData.append('lead_contact_number_two',this.state.lead_contact_number_two);
    formData.append('lead_mail_id',this.state.lead_mail_id);
    formData.append('lead_contact_person',JSON.stringify(this.state.lead_contact_person));

    new Service().apiCall('Leads/InsertUpdateData', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      {
        this.setState({
          alert: (
            <SweetAlert
              success
              confirmBtnBsStyle="success"
              title="Lead Updated Successfully!"
              showConfirm={false}
            >Now you can access all support of this leads
            </SweetAlert>    
          ),
        });
          setTimeout(() => {
            this.setState({ alert:null});
            this.getLeadsData(this.props.inse_id);
          }, 2000)
        } 
        else 
        {
          this.raiseLoginSignupErrorAlert('test');
        }
    }).catch(error => {
      this.raiseLoginSignupErrorAlert('test');
    });
  } 
  
  handleEditInstitute()
  {
    let array = this.state.InstituteDetails;
    let newarray = array[this.state.edit_ins_id];
    let formData = new FormData();
    formData.append('id',newarray.id);
    formData.append('institute_same_trust',newarray.institute_same_trust);   
    formData.append('institute_name',newarray.institute_name);   
    formData.append('institute_type',newarray.institute_type);   
    formData.append('institute_pincode',newarray.institute_pincode);   
    formData.append('institute_address_line_1',newarray.institute_address_line_1);   
    formData.append('institute_address_line_2',newarray.institute_address_line_2);   
    formData.append('institute_post_office',newarray.institute_post_office);   
    formData.append('institute_taluk',newarray.institute_taluk);   
    formData.append('institute_district',newarray.institute_district);   
    formData.append('institute_state',newarray.institute_state);   
    formData.append('institute_contact_number_one',newarray.institute_contact_number_one);   
    formData.append('institute_contact_number_two',newarray.institute_contact_number_two);    
    formData.append('institute_mail_id',newarray.institute_mail_id);      
    formData.append('institute_average_fees',newarray.institute_average_fees);   
    formData.append('institute_teaching_staff_count',newarray.institute_teaching_staff_count);    
    formData.append('institute_non_teaching_staff_count',newarray.institute_non_teaching_staff_count);  
    formData.append('institute_guest_lecture_count',newarray.institute_guest_lecture_count);
    formData.append('institute_student_count',newarray.institute_student_count);
    formData.append('institute_buses_owned_count',newarray.institute_buses_owned_count);
    formData.append('institute_classrooms_count',newarray.institute_classrooms_count);
    formData.append('institute_digital_classrooms_count',newarray.institute_digital_classrooms_count);
    formData.append('institute_website',newarray.institute_website);
    formData.append('institute_website_type',newarray.institute_website_type);
    formData.append('institute_website_company_name',newarray.institute_website_company_name);
    formData.append('institute_website_company_place',newarray.institute_website_company_place);
    formData.append('institute_website_contact_number',newarray.institute_website_contact_number);
    formData.append('institute_parent_app',newarray.institute_parent_app);
    formData.append('institute_parent_app_name',newarray.institute_parent_app_name);
    formData.append('institute_managementsystem',newarray.institute_managementsystem);
    formData.append('institute_managementsystem_name',newarray.institute_managementsystem_name);
    formData.append('institute_managementsystem_place',newarray.institute_managementsystem_place);
    formData.append('institute_managementsystem_type',newarray.institute_managementsystem_type);
    formData.append('institute_managementsystem_price',newarray.institute_managementsystem_price);
    formData.append('institute_managementsystem_price_yearly',newarray.institute_managementsystem_price_yearly);
    formData.append('institute_proposed_rates',newarray.institute_proposed_rates);
    formData.append('institute_negotiable_rates',newarray.institute_negotiable_rates);
    formData.append('institute_proposed_cost',newarray.institute_proposed_cost);
    formData.append('institute_negotiable_cost',newarray.institute_negotiable_cost);
    formData.append('institute_advance_expected',newarray.institute_advance_expected);
    formData.append('institute_month_closure',newarray.institute_month_closure);
    formData.append('institute_comment',newarray.institute_comment);
    formData.append('parameters_1',newarray.parameters_1);
    formData.append('parameters_2',newarray.parameters_2);
    formData.append('parameters_3',newarray.parameters_3);
    formData.append('parameters_4',newarray.parameters_4);
    formData.append('parameters_5',newarray.parameters_5);
    formData.append('parameters_6',newarray.parameters_6);
    formData.append('parameters_7',newarray.parameters_7);
    formData.append('parameters_8',newarray.parameters_8);
    formData.append('parameters_9',newarray.parameters_9);
    formData.append('parameters_10',newarray.parameters_10);
    formData.append('parameters_11',newarray.parameters_11);
    formData.append('parameters_12',newarray.parameters_12);
    formData.append('parameters_score',newarray.parameters_score);
    formData.append('Institute_contact_person',JSON.stringify(this.state.Institute_contact_person));

    console.log(formData);
    new Service().apiCall('InstituteDetails/InsertUpdateData', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      {
        this.setState({
          alert: (
            <SweetAlert
              success
              confirmBtnBsStyle="success"
              title="Institute Updated Successfully!"
              showConfirm={false}
            >Now you can access all support of this leads
            </SweetAlert>    
          ),
        });
        setTimeout(() => {
          this.setState({ alert:null});
          this.getLeadsData(this.props.inse_id);
        }, 2000)
      } 
      else 
      {
        this.raiseLoginSignupErrorAlert('test');
      }
    }).catch(error => {
      this.raiseLoginSignupErrorAlert('test');
    });
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

  getLeadsData(id){
    const postData = {
      id:id
    };
    new Service().apiCall('Leads/GetLeadsDataById',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({ 
          client_id:response.data[0].client_id,
          trust_name:response.data[0].trust_name,
          address_line_1:response.data[0].address_line_1,
          address_line_2:response.data[0].address_line_2,
          post_office:response.data[0].post_office,
          taluk:response.data[0].taluk,
          district:response.data[0].district,
          state:response.data[0].state,
          pincode:response.data[0].pincode,
          lead_contact_number_one:response.data[0].lead_contact_number_one,
          lead_contact_number_two:response.data[0].lead_contact_number_two,
          lead_mail_id:response.data[0].lead_mail_id,
          lead_status:response.data[0].lead_status,
        });
      }
      else{
        this.setState({LeadsData:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  } 

  getInstituteData(id){
    const postData = {
      lead_id:id
    };
    new Service().apiCall('InstituteDetails/GetInstituteDataById',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({InstituteDetails:response.data,});
      }
      else{
        this.setState({InstituteDetails:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  getLeadsContactData(id){
    const postData = {
      id:id,
      type:'Lead'
    };
    new Service().apiCall('ContactDetails/GetConatactDataById',postData).then(response =>
    {
      if (response.data!=''){          
        this.setState({ lead_contact_person:response.data });
      }
      else{
        this.setState({ lead_contact_person:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  } 

  handleInstitutePersonDetails(id,index){
    this.setState({edit_ins_id:index});
    const postData = {
      id:id,
      type:'Institute'
    };
    new Service().apiCall('ContactDetails/GetConatactDataById',postData).then(response =>
    {
      if (response.data!=''){          
        this.setState({ Institute_contact_person:response.data });
      }
      else{
        this.setState({ Institute_contact_person:this.state.Institute_contact_person_dummy})
      }
    }).catch(error => {
      alert("error.response.data.message");
      this.setState({ Institute_contact_person:this.state.Institute_contact_person_dummy})
    });
  }

  handleInstituteValue = (Index,inputName,Value) => {
    let lInstituteDetails = this.state.InstituteDetails;
    lInstituteDetails[Index][inputName] = Value;
    this.setState({InstituteDetails:lInstituteDetails});
  }

  institute_trust  = (Index,inputName,Value) => {
    alert(Value);
    let lInstituteDetails = this.state.InstituteDetails;
    if(Value !== 'yes'){
      lInstituteDetails[Index].institute_name = '';
      lInstituteDetails[Index].institute_type = '';
      lInstituteDetails[Index].institute_pincode = '';
      lInstituteDetails[Index].institute_address_line_1 = '';
      lInstituteDetails[Index].institute_address_line_2 = '';
      lInstituteDetails[Index].institute_post_office = '';
      lInstituteDetails[Index].institute_taluk = '';
      lInstituteDetails[Index].institute_district = '';
      lInstituteDetails[Index].institute_state = '';
      lInstituteDetails[Index].institute_contact_number_one = '';
      lInstituteDetails[Index].institute_contact_number_two = '';
      lInstituteDetails[Index].institute_mail_id = '';
      this.setState({InstituteDetails:lInstituteDetails});
    }else{
      lInstituteDetails[Index].institute_name = this.state.trust_name;
      lInstituteDetails[Index].institute_type = this.state.institute_type;
      lInstituteDetails[Index].institute_pincode = this.state.pincode;
      lInstituteDetails[Index].institute_address_line_1 = this.state.address_line_1;
      lInstituteDetails[Index].institute_address_line_2 = this.state.address_line_2;
      lInstituteDetails[Index].institute_post_office = this.state.post_office;
      lInstituteDetails[Index].institute_taluk = this.state.taluk;
      lInstituteDetails[Index].institute_district = this.state.district;
      lInstituteDetails[Index].institute_state = this.state.state;
      lInstituteDetails[Index].institute_contact_number_one = this.state.lead_contact_number_one;
      lInstituteDetails[Index].institute_contact_number_two = this.state.lead_contact_number_two;
      lInstituteDetails[Index].institute_mail_id = this.state.lead_mail_id;
      this.setState({InstituteDetails:lInstituteDetails});
    }
  };

  componentDidMount() {
    this.getLeadsData(this.props.inse_id);
    this.getLeadsContactData(this.props.inse_id);
    this.getInstituteData(this.props.inse_id);

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
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
              <div className={classes.accordionRoot+" AccordionDiv"}>    
                <Accordion expanded={this.state.activeAccordion == "trust_details" ? true : false} onChange={()=>this.handleChangeAccordion("trust_details")}>
                  <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                    <GridItem xs={12} sm={12} md={6} style={{marginTop:'0px'}}>
                      <Typography className={classes.secondaryHeading}>                          
                        Trust / Congregation details
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{textAlign:'right',marginTop:'0px'}}>  
                      <Chip
                        label={this.state.lead_status}
                        clickable
                        color="primary"
                        variant="outlined"
                      />
                    </GridItem>
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
                                  disabled={this.state.edit_trust ? false : true} 
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
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }} 
                                  id="document-type"                                          
                                  value={this.state.pincode}
                                  label="Pincode" 
                                  type="search" 
                                  onChange={(event) => this.setPostData("pincode",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }} 
                                  id="document-type"                                   
                                  value={this.state.address_line_1}
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
                                disabled={this.state.edit_trust ? false : true} 
                                inputProps={{
                                  autoComplete: 'off'
                                  }} 
                                id="document-type"   
                                value={this.state.address_line_2}
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
                                disabled={this.state.edit_trust ? false : true} 
                                inputProps={{
                                  autoComplete: 'off'
                                  }} 
                                id="document-type"   
                                value={this.state.post_office}
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
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }} 
                                  id="document-type"   
                                  value={this.state.taluk}
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
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }} 
                                  id="document-type"   
                                  value={this.state.district}
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
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }} 
                                  id="document-type"   
                                  value={this.state.state}
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
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }}                 
                                  id="document-type"   
                                  value={this.state.lead_contact_number_one}
                                  label="Contact Number 1" 
                                  type="search" 
                                  onChange={(event) => this.setPostData("lead_contact_number_one",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }}                 
                                  id="document-type"   
                                  value={this.state.lead_contact_number_two}
                                  label="Contact Number 2" 
                                  type="search" 
                                  onChange={(event) => this.setPostData('lead_contact_number_two',event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }}                 
                                  id="document-type"   
                                  value={this.state.lead_mail_id}
                                  label="Email" 
                                  type="search" 
                                  onChange={(event) => this.setPostData('lead_mail_id',event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                          </GridContainer>  
                        </CardBody>
                      </Card>  

                      {this.state.lead_contact_person.map((person, idx) => (
                      <div>
                      <Card className="outlinedInput">
                        <CardBody>
                          <GridContainer>
                            <GridItem>
                            <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Contact Person - {idx+1}</h5>
                            </GridItem>
                          </GridContainer>
                            <div> 
                          <GridContainer>             
                            <GridItem xs={12} sm={12} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                                  InputProps={classes.inputText} 
                                  readOnly={true}   
                                  value={idx+1}
                                  labelPlacement="left"
                                  label="Sl No." 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={person.person_name}
                                  label="Person Name" 
                                  type="search" 
                                  onChange={(event) => this.handleLeadPersonValue(idx,"person_name",event.target.value.charAt(0).toUpperCase()+ event.target.value.slice(1))}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField                                     
                                disabled={this.state.edit_trust ? false : true} 
                                inputProps={{
                                  autoComplete: 'off'
                                }}
                                id="document-type"   
                                value={person.designation}
                                label="Designation" 
                                type="search" 
                                onChange={(event) => this.handleLeadPersonValue(idx,"designation",event.target.value)}
                                inputRef={this.textInput} 
                                variant="outlined" />                   
                              </FormControl>
                            </GridItem>  
                            <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControlLabel
                                control={
                                  <Checkbox                                      
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.approver == 'yes') { this.handleLeadPersonValue(idx,"approver",'no') } else  { this.handleLeadPersonValue(idx,"approver",'yes') }}}
                                    checked={person.approver === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.decision_maker == 'yes') { this.handleLeadPersonValue(idx,"decision_maker",'no') } else  { this.handleLeadPersonValue(idx,"decision_maker",'yes') }}}
                                    checked={person.decision_maker === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.influencer == 'yes') { this.handleLeadPersonValue(idx,"influencer",'no') } else  { this.handleLeadPersonValue(idx,"influencer",'yes') }}}
                                    checked={person.influencer === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.evaluator_recommender == 'yes') { this.handleLeadPersonValue(idx,"evaluator_recommender",'no') } else  { this.handleLeadPersonValue(idx,"evaluator_recommender",'yes') }}}
                                    checked={person.evaluator_recommender === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.gatekeeper_blocker == 'yes') { this.handleLeadPersonValue(idx,"gatekeeper_blocker",'no') } else  { this.handleLeadPersonValue(idx,"gatekeeper_blocker",'yes') }}}
                                    checked={person.gatekeeper_blocker === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.users == 'yes') { this.handleLeadPersonValue(idx,"users",'no') } else  { this.handleLeadPersonValue(idx,"users",'yes') }}}
                                    checked={person.users === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.champion == 'yes') { this.handleLeadPersonValue(idx,"champion",'no') } else  { this.handleLeadPersonValue(idx,"champion",'yes') }}}
                                    checked={person.champion === 'yes' ? true : false} 
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
                                    disabled={this.state.edit_trust ? false : true} 
                                    onChange={(event)=> { if( person.mentor == 'yes') { this.handleLeadPersonValue(idx,"mentor",'no') } else  { this.handleLeadPersonValue(idx,"mentor",'yes') }}}                                    
                                    checked={person.mentor === 'yes' ? true : false} 
                                    color="primary"
                                  />
                                }
                                label="Mentor"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off',
                                    maxLength: 10
                                  }}                
                                  id="document-type"   
                                  value={person.contact_number_one}
                                  label="Contact Number 1" 
                                  type="search" 
                                  onChange={(event) => this.handleLeadPersonValue(idx,'contact_number_one',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off',
                                    maxLength: 10
                                  }}                
                                  id="document-type"   
                                  value={person.contact_number_two}
                                  label="Contact Number 2" 
                                  type="search" 
                                  onChange={(event) => this.handleLeadPersonValue(idx,"contact_number_two",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{ 
                                    autoComplete: 'off'
                                  }}                
                                  id="document-type"   
                                  value={person.mail_id}
                                  label="Email" 
                                  type="search" 
                                  onChange={(event) => this.handleLeadPersonValue(idx,'mail_id',event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              {(this.state.lead_contact_person.length - 1) == idx ?   <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
                              <TextField 
                                disabled={this.state.edit_trust ? false : true} 
                                id="document-type"   
                                InputProps={{
                                autoComplete: 'off', 
                                readOnly: true,
                                startAdornment: (
                                <InputAdornment position="start" disabled={this.state.edit_trust ? false : true}>
                                <Add disabled={this.state.edit_trust ? false : true}  style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                                </InputAdornment>
                                ),
                                }}
                                label="Add" 
                                onClick={()=>{this.handleAddLeadPerson()}}
                                variant="outlined" />
                              </FormControl></div>
                              :
                              <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
                              <TextField 
                                disabled={this.state.edit_trust ? false : true} 
                                id="document-type"   
                                InputProps={{
                                autoComplete: 'off',
                                readOnly: true,
                                startAdornment: (
                                <InputAdornment position="start" disabled={this.state.edit_trust ? false : true}>
                                <Remove disabled={this.state.edit_trust ? false : true} style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                                </InputAdornment>
                                ),
                                }}
                                label="Del" 
                                onClick={()=>{this.removeLeadPerson(idx);}}
                                variant="outlined" />
                              </FormControl></div>  
                              }
                              </GridItem>
                            </GridContainer>
                            </div>                              
                        </CardBody>
                      </Card>
                      </div>  
                      ))}
                    <GridContainer style={{marginTop:20}}>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                        { !this.state.edit_trust &&   <MButton   variant="outlined" onClick={()=>this.setState({edit_trust:true})} color="primary"> Edit </MButton>}
                        { this.state.edit_trust  && <div> <MButton variant="outlined" className="warningBtnOutline"  style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({edit_trust:false})}>Cancel</MButton>
                        <MButton variant="outlined" size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={this.handleleadupdate.bind(this)}>Submit</MButton></div>}
                      </GridItem>
                    </GridContainer>
                  </div>
                </AccordionDetails>
              </Accordion>

              { this.state.InstituteDetails.length > 0 && this.state.InstituteDetails.map((institute, index) => (
              <Accordion expanded={this.state.activeAccordion == institute.id ? true : false} onChange={()=>{this.handleChangeAccordion(institute.id);this.handleInstitutePersonDetails(institute.id,index)}}>
                <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">                        
                  <Typography className={classes.secondaryHeading}>                          
                    <GridItem xs={12} sm={12} md={12} style={{marginTop:'0px'}}>
                      <Typography className={classes.secondaryHeading}>                          
                        {institute.institute_name}
                      </Typography>
                    </GridItem>
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( institute.institute_same_trust == 'yes') { this.handleInstituteValue(index,"institute_same_trust",'no')} else { this.handleInstituteValue(index,"institute_same_trust",'yes')};this.institute_trust(index,"institute_same_trust",institute.institute_same_trust)}}                                    
                                    checked={institute.institute_same_trust === 'yes' ? true : false} 
                                    color="primary"
                                  />
                                }
                                label="Institute details are same as congregation details !"
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_name}
                                  label="Institute Name" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_name",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField                                 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_type}
                                  label="Institute Type" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_type",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_pincode}
                                  label="Pincode" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_pincode",event.target.value)}                   
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_address_line_1}
                                  label="Address Line 1" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)}  
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_address_line_2}
                                  label="Address Line 2" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>  
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField                                 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_post_office}
                                  label="Post Office" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>  
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_taluk}
                                  label="Taluk" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_district}
                                  label="District" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_state}
                                  label="State" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off',maxLength:10
                                  }}                
                                  id="document-type"   
                                  value={institute.institute_contact_number_one}
                                  label="Contact Number 1" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)}                        
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off',maxLength:10
                                  }}                
                                  id="document-type"   
                                  value={institute.institute_contact_number_two}
                                  label="Contact Number 2" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_address_line_1",event.target.value)}                   
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}                
                                  id="document-type"   
                                  value={institute.institute_mail_id}
                                  label="Email" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_mail_id",event.target.value)} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                          </GridContainer>  
                        </CardBody>
                      </Card>     
                      {this.state.Institute_contact_person.map((author, idx) => (
                        <div>
                        <Card className="outlinedInput">
                          <CardBody>
                            <GridContainer>
                              <GridItem>
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute Contact Person - {idx+1}</h5>
                              </GridItem>
                            </GridContainer>
                              <div> 
                            <GridContainer>             
                            <GridItem xs={12} sm={12} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                                  InputProps={classes.inputText} 
                                  readOnly={true}   
                                  value={idx+1}
                                  labelPlacement="start"
                                  label="Sl No." 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={author.person_name}
                                  label="Person Name" 
                                  type="search" 
                                  onChange={(event) => this.handleInstitutePersonValue(idx,"person_name",event.target.value.charAt(0).toUpperCase()+ event.target.value.slice(1))}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={author.designation}
                                  label="Designation" 
                                  type="search" 
                                  onChange={(event) => this.handleInstitutePersonValue(idx,"designation",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>  
                            <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.approver == 'yes') { this.handleInstitutePersonValue(idx,"approver",'no')} else { this.handleInstitutePersonValue(idx,"approver",'yes')}}}                                    
                                    checked={author.approver === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.decision_maker == 'yes') { this.handleInstitutePersonValue(idx,"decision_maker",'no')} else { this.handleInstitutePersonValue(idx,"decision_maker",'yes')}}}                                    
                                    checked={author.decision_maker === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.influencer == 'yes') { this.handleInstitutePersonValue(idx,"influencer",'no')} else { this.handleInstitutePersonValue(idx,"influencer",'yes')}}}                                    
                                    checked={author.influencer === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.evaluator_recommender == 'yes') { this.handleInstitutePersonValue(idx,"evaluator_recommender",'no')} else { this.handleInstitutePersonValue(idx,"evaluator_recommender",'yes')}}}                                    
                                    checked={author.evaluator_recommender === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.gatekeeper_blocker == 'yes') { this.handleInstitutePersonValue(idx,"gatekeeper_blocker",'no')} else { this.handleInstitutePersonValue(idx,"gatekeeper_blocker",'yes')}}}                                    
                                    checked={author.gatekeeper_blocker === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.users == 'yes') { this.handleInstitutePersonValue(idx,"users",'no')} else { this.handleInstitutePersonValue(idx,"users",'yes')}}}                                    
                                    checked={author.users === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.champion == 'yes') { this.handleInstitutePersonValue(idx,"champion",'no')} else { this.handleInstitutePersonValue(idx,"champion",'yes')}}}                                    
                                    checked={author.champion === 'yes' ? true : false}
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
                                    disabled={this.state.edit_institute ? false : true} 
                                    onChange={(event)=> { if( author.mentor == 'yes') { this.handleInstitutePersonValue(idx,"mentor",'no')} else { this.handleInstitutePersonValue(idx,"mentor",'yes')}}}                                    
                                    checked={author.mentor === 'yes' ? true : false}
                                    color="primary"
                                  />
                                }
                                label="Mentor"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true}
                                  inputProps={{
                                    autoComplete: 'off',
                                    maxLength:10
                                  }}                
                                  id="document-type"   
                                  value={author.contact_number_one}
                                  label="Contact Number 1" 
                                  type="search" 
                                  onChange={(event) => this.handleInstitutePersonValue(idx,'contact_number_one',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true}
                                  inputProps={{
                                    autoComplete: 'off',
                                    maxLength:10
                                  }}                
                                  id="document-type"   
                                  value={author.contact_number_two}
                                  label="Contact Number 2" 
                                  type="search" 
                                  onChange={(event) => this.handleInstitutePersonValue(idx,'contact_number_two',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5} className={classes.inputMargin}>
                              <FormControl fullWidth>                 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true}
                                  inputProps={{ 
                                  autoComplete: 'off'
                                  }}                
                                  id="document-type"   
                                  value={author.mail_id}
                                  label="Email" 
                                  type="search" 
                                  onChange={(event) => this.handleInstitutePersonValue(idx,'mail_id',event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              {(this.state.Institute_contact_person.length - 1) == idx ?   <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                              onClick={()=>{this.handleAddInstitutePerson()}}
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
                              onClick={()=>{this.removeInstitutePerson(idx);}}
                              variant="outlined" />
                              </FormControl></div>  
                              }
                              </GridItem>
                            </GridContainer>
                            </div>
                          
                        </CardBody>
                      </Card>
                      </div>  
                      ))}
                      <Card className="outlinedInput">
                        <CardBody>
                          <GridContainer>
                            <GridItem>
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute Profiling</h5>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>   
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_average_fees}
                                  label="Average Fees" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_average_fees",event.target.value)} 
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField
                                  disabled={this.state.edit_institute ? false : true}  
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_teaching_staff_count}
                                  label="No of Teaching Staff" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,'institute_teaching_staff_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_non_teaching_staff_count}
                                  label="No of Non-teaching Staff" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,'institute_non_teaching_staff_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>   
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_guest_lecture_count}
                                  label="No of Guest Lecture" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,'institute_guest_lecture_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_student_count}
                                  label="No of Student" 
                                  type="search"  
                                  onChange={(event) => this.handleInstituteValue(index,'institute_student_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_buses_owned_count}
                                  label="Owned Buses Count" 
                                  type="search"   
                                  onChange={(event) => this.handleInstituteValue(index,'institute_buses_owned_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>  
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_classrooms_count}
                                  label="No of Classrooms" 
                                  type="search"  
                                  onChange={(event) => this.handleInstituteValue(index,'institute_classrooms_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>   
                            <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_digital_classrooms_count}
                                  label="No of Digital Classrooms" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,'institute_digital_classrooms_count',event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>    
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                              <FormControl component="fieldset">
                              <RadioGroup row aria-label="position" name="position">
                              <strong style={{margin:'auto',  paddingRight:15}}>ID-Card issued? </strong>   
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="yes" control={<Radio color="primary" checked={institute.institute_card_status === "yes"} onChange={(event) => this.handleInstituteValue(index,'institute_card_status','yes')} />} label="Yes" />
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="no" control={<Radio color="primary" checked={institute.institute_card_status === "no"} onChange={(event) => this.handleInstituteValue(index,'institute_card_status','no')} />} label="No" />
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
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="active" control={<Radio color="primary" checked={institute.institute_website === "active"} onChange={(event) => this.handleInstituteValue(index,'institute_website','active')} />} label="Yes" />
                              <FormControlLabel disabled={this.state.edit_institute ? false : true}  value="inactive" control={<Radio color="primary" checked={institute.institute_website === "inactive"}  onChange={(event) => this.handleInstituteValue(index,'institute_website','inactive')} />} label="No" />
                              </RadioGroup>
                              </FormControl>  
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                            </GridItem> 
                          </GridContainer>
                          {institute.institute_website === 'active' &&
                          <div>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_website_type}
                                  label="Website Type" 
                                  type="search"    
                                  onChange={(event) => this.handleInstituteValue(index,"institute_website_type",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_website_company_name}
                                  label="Website Provider Name" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_website_company_name",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>   
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField  
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                  autoComplete: 'off'
                                  }}  
                                  id="document-type"   
                                  value={institute.institute_website_company_url}
                                  label="Website URL" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_website_company_url",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl> 
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_website_contact_number}
                                  label="Website Provider Contact Number" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_website_contact_number",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>                                                  
                          </GridContainer> 
                          </div> }        
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
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="yes" control={<Radio color="primary" checked={institute.institute_parent_app === "yes"} onChange={(event) => this.handleInstituteValue(index,"institute_parent_app",'yes')} />} label="Yes" />
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="no" control={<Radio color="primary" checked={institute.institute_parent_app === "no"} onChange={(event) => this.handleInstituteValue(index,"institute_parent_app",'no')} />} label="No" />
                              </RadioGroup>
                              </FormControl>  
                            </GridItem>   
                            <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}></GridItem> 
                            {institute.institute_parent_app == 'yes' &&  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth> 
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_parent_app_name}
                                  label="App Name" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_parent_app_name",event.target.value)}
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
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="yes" control={<Radio color="primary" checked={institute.institute_managementsystem === "yes"} onChange={()=> this.handleInstituteValue(index,"institute_managementsystem",'yes')} />} label="Yes" />
                              <FormControlLabel disabled={this.state.edit_institute ? false : true} value="no" control={<Radio color="primary" checked={institute.institute_managementsystem === "no"} onChange={()=> this.handleInstituteValue(index,"institute_managementsystem",'no')} />} label="No" />
                              </RadioGroup>
                              </FormControl>  
                            </GridItem> 
                          </GridContainer>   
                          {institute.institute_managementsystem == 'yes' &&  <div>
                          <GridContainer> <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_managementsystem_name}
                                  label="Name" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_name",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField  
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_managementsystem_place}
                                  label="Palce" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_place",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_managementsystem_type}
                                  label="Type" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_type",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>   
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField  
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_managementsystem_price}
                                  label="Price" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_price",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                  autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_managementsystem_price_yearly}
                                  label="Cost (Approx. Yearly Cost)" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_price_yearly",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                          </GridContainer> </div> }    
                        </CardBody>
                      </Card>
                        <Card className="outlinedInput">
                        <CardBody>
                          <GridContainer>
                            <GridItem>
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>eGenius CAAS</h5>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>              
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField  
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_proposed_rates}
                                  label="Proposed Rates" 
                                  type="search"  
                                  onChange={(event) => this.handleInstituteValue(index,"institute_proposed_rates",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_negotiable_rates}
                                  label="Negotiable Rates" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_negotiable_rates",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField
                                  disabled={this.state.edit_institute ? false : true}  
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_proposed_cost}
                                  label="Proposed Cost" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_proposed_cost",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_negotiable_cost}
                                  label="Negotiable Cost" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_negotiable_cost",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_advance_expected}
                                  label="Advance Expected" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_advance_expected",event.target.value)}
                                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControl fullWidth>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker 
                                    disabled={this.state.edit_institute ? false : true}  
                                    margin="normal"
                                    id="date-picker-dialog"
                                    inputVariant="outlined"
                                    label="Month of closure"
                                    format="dd-MM-yyyy"
                                    value={institute.institute_month_closure} 
                                    onChange={(event) => {this.handleInstituteValue(index,"institute_month_closure",event.target.value);this.handleEYear()}}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date', 
                                    }} 
                                  />
                                </MuiPickersUtilsProvider>                   
                              </FormControl>
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                              <FormControl fullWidth>
                                <TextField 
                                  disabled={this.state.edit_institute ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                  }}
                                  id="document-type"   
                                  value={institute.institute_comment}
                                  label="Comments, if any" 
                                  type="search" 
                                  onChange={(event) => this.handleInstituteValue(index,"institute_comment",event.target.value)}
                                  inputRef={this.textInput} 
                                  variant="outlined" />                   
                              </FormControl>
                            </GridItem>                       
                          </GridContainer>  
                        </CardBody>
                      </Card>           
                      <Card className="outlinedInput rowsize">
                        <CardBody className={classes.customCardContentClass}>
                          <GridItem xs={12} sm={12} md={12} >
                            <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Parameters</h5>
                          </GridItem>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell colSpan="2">Sl No.</TableCell>
                                <TableCell align="left">Parameters</TableCell>
                                <TableCell align="left">Yes/No</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody showRowHover={true}>
                              <TableRow>
                                <TableCell colSpan="2">1.</TableCell>
                                <TableCell align="left">Met the right customer and done the KYC</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_1 === "checked"}  onClick={(event)=>{ if(institute.parameters_1 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_1','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_1 === "unchecked"} onClick={(event)=>{ if(institute.parameters_1 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_1','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell colSpan="2">2.</TableCell>
                                <TableCell align="left">Done with competition and gap analysis</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_2 === "checked"}  onClick={(event)=>{ if(institute.parameters_2 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_2','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_2 === "unchecked"} onClick={(event)=>{ if(institute.parameters_2 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_2','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell colSpan="2">3.</TableCell>
                                <TableCell align="left">Institution has understood & showed interest in adopting next generation software</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_3 === "checked"}  onClick={(event)=>{ if(institute.parameters_3 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_3','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_3 === "unchecked"} onClick={(event)=>{ if(institute.parameters_3 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_3','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow>  
                              <TableRow style={{paddingTop:'8px !important',paddingBottom:'8px !important'}}>
                                <TableCell align="left" colSpan="2" style={{paddingTop:'8px !important',paddingBottom:'8px !important'}} className={"cellpadding"} >4</TableCell>
                                <TableCell align="left" style={{paddingTop:'10px !important',paddingBottom:'10px !important'}}>You must have been met all below stake holderse</TableCell>
                                <TableCell align="left" style={{paddingTop:'10px !important',paddingBottom:'10px !important'}}></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center" >4.1.</TableCell>
                                <TableCell align="left">Initiators who suggest purchasing a product or service</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_4 === "checked"}  onClick={(event)=>{ if(institute.parameters_4 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_4','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_4 === "unchecked"} onClick={(event)=>{ if(institute.parameters_4 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_4','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center">4.2.</TableCell>
                                <TableCell align="left">Influencers who try to affect the outcome</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_5 === "checked"}  onClick={(event)=>{ if(institute.parameters_5 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_5','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_5 === "unchecked"} onClick={(event)=>{ if(institute.parameters_5 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_5','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center">4.3.</TableCell>
                                <TableCell align="left">Deciders who have the final decision</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_6 === "checked"}  onClick={(event)=>{ if(institute.parameters_6 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_6','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_6 === "unchecked"} onClick={(event)=>{ if(institute.parameters_6 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_6','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center">4.4.</TableCell>
                                <TableCell align="left">Buyers who are responsible for the contract</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_7 === "checked"}  onClick={(event)=>{ if(institute.parameters_7 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_7','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_7 === "unchecked"} onClick={(event)=>{ if(institute.parameters_7 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_7','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center">4.5.</TableCell>
                                <TableCell align="left">End users of the item being purchased</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_8 === "checked"}  onClick={(event)=>{ if(institute.parameters_8 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_8','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_8 === "unchecked"} onClick={(event)=>{ if(institute.parameters_8 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_8','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell >{' '}</TableCell>
                                <TableCell align="center">4.6.</TableCell>
                                <TableCell align="left">Gatekeepers who control the flow of information</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_9 === "checked"}  onClick={(event)=>{ if(institute.parameters_9 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_9','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_9 === "unchecked"} onClick={(event)=>{ if(institute.parameters_9 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_9','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell colSpan='2'>5.</TableCell>
                                <TableCell align="left">Full pledge Web/App demo has given to decision maker</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_10 === "checked"}  onClick={(event)=>{ if(institute.parameters_10 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_10','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_10 === "unchecked"} onClick={(event)=>{ if(institute.parameters_10 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_10','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell colSpan='2'>6.</TableCell>
                                <TableCell align="left">Has reached the negotiation level.</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_11 === "checked"}  onClick={(event)=>{ if(institute.parameters_11 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_11','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_11 === "unchecked"} onClick={(event)=>{ if(institute.parameters_11 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_11','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow>  
                              <TableRow>
                                <TableCell colSpan='2'>7.</TableCell>
                                <TableCell align="left">Ready to sign the MOU</TableCell>
                                <TableCell align="left"><FormControl component="fieldset">
                                  <RadioGroup row aria-label="position" name="position">                               
                                  <FormControlLabel value="yes" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_12 === "checked"}  onClick={(event)=>{ if(institute.parameters_12 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_12','checked');this.handleInstituteValue(index,'parameters_score',institute.parameters_score+1)}}} />} label="Yes" />
                                  <FormControlLabel value="no" disabled={this.state.edit_institute ? false : true} control={<Radio color="primary" checked={institute.parameters_12 === "unchecked"} onClick={(event)=>{ if(institute.parameters_12 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_12','unchecked');if(institute.parameters_score > 0 ) { this.handleInstituteValue(index,'parameters_score',institute.parameters_score-1)} else{this.handleInstituteValue(index,'parameters_score',institute.parameters_score)} }}} />} label="No" />
                                  </RadioGroup>
                                </FormControl></TableCell>
                              </TableRow> 
                              <TableRow>
                                <TableCell colSpan='2'></TableCell>
                                <TableCell align="left"><div className={classes.cardContentRight}>
                                                {(institute.parameters_score == 10 || institute.parameters_score > 10) && <Button color="success" round className={classes.marginRight}>High Potential Qualified Prospects</Button>}
                                                {(institute.parameters_score == 8 || institute.parameters_score == 9)  && <Button color="info" round className={classes.marginRight}>Medium Qualified Prospects</Button>}
                                                {(institute.parameters_score == 6 || institute.parameters_score == 7) && <Button color="primary" round className={classes.marginRight}>Low Qualified Prospects</Button>}
                                                {(institute.parameters_score == 4 || institute.parameters_score == 5) && <Button color="warning" round className={classes.marginRight}>Workable Qualified Prospects</Button>}
                                                {institute.parameters_score < 4 && institute.parameters_score != 0 && <Button color="danger" round className={classes.marginRight}>Serious Gaps in Prospects Identification</Button>}
                                                </div></TableCell>
                                <TableCell align="left"><div>{institute.parameters_score >= 1 && <p style={{fontSize:'20px',marginTop:'15px'}}>Score : <b>{institute.parameters_score}</b></p>}</div></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table> 
                        </CardBody>    
                      </Card>  

                      <GridContainer style={{marginTop:20}}>
                        <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                          { !this.state.edit_institute &&   <MButton   variant="outlined" onClick={()=>this.setState({edit_institute:true})} color="primary"> Edit </MButton>}
                          { this.state.edit_institute  && <div> <MButton variant="outlined" className="warningBtnOutline"  style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({edit_institute:false})}>Cancel</MButton>
                          <MButton variant="outlined" size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={this.handleEditInstitute.bind(this)}>Submit</MButton></div>}
                        </GridItem>
                      </GridContainer>       
                    </div>  
                  </AccordionDetails>
                </Accordion>
                ))}
              </div>
          </GridItem>
        </GridContainer>

              <GridContainer style={{marginTop:'20px'}}>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                  <div className={classes.root}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={this.state.activeTabIndex}
                      onChange={this.handleTabChange}
                      aria-label="Vertical tabs example"
                      className={classes.tabs}
                    >        
                      <Tab label="Proposals" {...a11yProps(0)} />
                      <Tab label="Tasks" {...a11yProps(1)} />
                      <Tab label="Attachments" {...a11yProps(2)} />
                      <Tab label="Reminders" {...a11yProps(3)} />
                      <Tab label="Notes" {...a11yProps(4)} />
                      <Tab label="Activity Log" {...a11yProps(5)} />
                      <Tab label="Meeting Update's test" {...a11yProps(6)} />
                    </Tabs>
                    <TabPanel value={this.state.activeTabIndex} index={0}>
                      <GridContainer >
                          <GridItem xs={12} sm={12} md={12}>
                            <Card style={{marginTop:10}}>
                              <CardHeader color="primary" icon>
                                <div className={classes.buttonGroup} style={{float:'right'}}> 
                                  <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                                    <MButton variant={this.state.selectType == "createlead" ?"contained":"outlined"} onClick={()=>this.addproposal()}>New Proposal</MButton> 
                                 </ButtonGroup>
                                </div>
                                <h4 className={classes.cardIconTitle}>Proposals List</h4>
                              </CardHeader>
                              <CardBody>
                              <ReactTable
                                data={
                                this.state.tableData.map((original,key) => {
                                return ({
                                  slno: key+1,
                                  id:original.UID,
                                  lead_name:<Link href="#" onClick={()=> this.LeadsProposalView()}>AMS Test Proposal</Link>,
                                  person_mat:"₹ 50,478.88",
                                  meeting_type:"27.10.2020",
                                  meeting_date:"20-10-2020",
                                  meeting_time:"27.10.2020 12:45 PM",
                                  ststus: <Chip label="Open" style={{backgroundColor:'purple',color:'white'}} size="small"clickable variant="outlined"/>,
                              })
                              })
                              }
                              filterable
                              minRows={0}
                              columns={[
                              {
                                Header: "Proposal",
                                accessor: "slno",
                                width: 90,
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Subject",
                                accessor: "lead_name",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Lead" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                                  )
                                },
                              {
                                Header: "Total",
                                accessor: "person_mat",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Person" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Date",
                                accessor: "meeting_type",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Meeting Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Open Till",
                                accessor: "meeting_date",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              }, 
                              {
                                Header: "Date Created",
                                accessor: "meeting_time",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Time" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                                  )
                              },
                              {
                                Header: "Status",
                                accessor: "ststus",
                                className: "center",
                                  Filter: ({filter, onChange}) => (
                                    <input type='text' style={{textAlign:'center'}} placeholder="Search Time" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
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
                          </Card>
                        </GridItem>
                      </GridContainer>

                    </TabPanel> 
                    <TabPanel value={this.state.activeTabIndex} index={1}>
                      Tasks
                    </TabPanel>
                    <TabPanel value={this.state.activeTabIndex} index={2}>
                      Attachments
                    </TabPanel>
                    <TabPanel value={this.state.activeTabIndex} index={3}>
                      Reminders
                    </TabPanel>
                    <TabPanel value={this.state.activeTabIndex} index={4}>
                      Notes
                    </TabPanel>
                    <TabPanel value={this.state.activeTabIndex} index={5}>
                      Activity Log
                    </TabPanel>
                    <TabPanel value={this.state.activeTabIndex} index={6}>
                      Meeting Update's
                    </TabPanel>
                    </div>
                </GridItem>
              </GridContainer>

            </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
