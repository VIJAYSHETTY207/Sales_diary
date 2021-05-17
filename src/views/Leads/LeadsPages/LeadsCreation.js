import React from "react";
import 'date-fns';

import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import SweetAlert from "react-bootstrap-sweetalert";
import InputAdornment from '@material-ui/core/InputAdornment';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Chip from '@material-ui/core/Chip';
import CustomSnackbarContent from "components/Snackbar/CustomSnackbarContent.js";
// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Avatar from '@material-ui/core/Avatar';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MenuItem from '@material-ui/core/MenuItem';

// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Service from 'Utils/Service';
import DateFnsUtils from '@date-io/date-fns';
import "assets/External-Css/leads.css";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
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
  inputText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '28px',
    textAlign: 'center',
},
nonecapitalize:{
  '& .MuiOutlinedInput-input':{
    textTransform: 'lowercase !important'
  }
}

};

const pageStyles = {...styles, ...panelStyles }
const useStyles = makeStyles(pageStyles);

class Dashboard extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      institute_month_closure: new Date(),
      parametercount:0,
      post_office:'', 
      taluk:'', 
      district:'', 
      state:'', 
      
      trust_name:'',
      institute_name:'', 
      institute_type:'',
      institute_pincode:'', 
      address_line_1:'',
      address_line_2:'',
      lead_contact_number_one:'',
      lead_contact_number_two:'',
      lead_mail_id:'',
      institute_address_line_1:'', 
      institute_address_line_2:'', 
      institute_post_office:'', 
      institute_taluk:'', 
      institute_district:'', 
      institute_state:'', 
      institute_contact_number_one:'', 
      institute_contact_number_two:'', 
      institute_mail_id:'', 
      institute_average_fees:'',
      institute_teaching_staff_count:'',
      institute_non_teaching_staff_count:'',
      institute_guest_lecture_count:'',
      institute_student_count:'',
      institute_buses_owned_count:'',
      institute_classrooms_count:'',
      institute_digital_classrooms_count:'',
      institute_website:'',
      institute_website_type:'',
      institute_website_company_name:'',
      institute_website_company_url:'',
      institute_website_contact_number:'',
      institute_parent_app:'',
      institute_parent_app_name:'',
      institute_managementsystem:'',
      institute_managementsystem_name:'',
      institute_managementsystem_place:'',
      institute_managementsystem_type:'',
      institute_managementsystem_price:'',
      institute_managementsystem_price_yearly:'',
      institute_proposed_rates:'',
      institute_negotiable_rates:'',
      institute_proposed_cost:'',
      institute_negotiable_cost:'',
      institute_advance_expected:'',
      institute_comment:'',
      lead_contact_person:[{ person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],
      Institute_contact_person:[{ person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],    
      activeStep:0,
      steps:[1,2,3,4],
      parameterarray:[],
      pincodesArr:[],
      dateOfBirth: new Date(),
      institute_same_trust: 'no',
      addressType: '',
      client_id: '',
      created_by_id: this.props.data.user_id,
      created_by: this.props.data.name,
      alert: null,
      buttonName:'Finish',
      buttonDisabled:false
    }
  }
 
  handleEYear = (date) => {
    this.setState({ institute_month_closure: date, formChanged:true })
  };

  scrollToTop() {
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }
  
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
    this.setState({Institute_contact_person:lauthorHolders});
  }

  handleStep = (index) => {
    this.setState({activeStep:index});
  }

  //start of error display function
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
// end of error display function
 
  handleleadcreation = () => {
    if(this.state.trust_name !== '' && this.state.institute_name !== '' && this.state.institute_student_count !== '')
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});
      
      let formData = new FormData();
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
      formData.append('created_by_id',this.state.created_by_id);   
      formData.append('institute_same_trust',this.state.institute_same_trust);   
      formData.append('institute_name',this.state.institute_name);   
      formData.append('institute_type',this.state.institute_type);   
      formData.append('institute_pincode',this.state.institute_pincode);   
      formData.append('institute_address_line_1',this.state.institute_address_line_1);   
      formData.append('institute_address_line_2',this.state.institute_address_line_2);   
      formData.append('institute_post_office',this.state.institute_post_office);   
      formData.append('institute_taluk',this.state.institute_taluk);   
      formData.append('institute_district',this.state.institute_district);   
      formData.append('institute_state',this.state.institute_state);   
      formData.append('institute_contact_number_one',this.state.institute_contact_number_one);   
      formData.append('institute_contact_number_two',this.state.institute_contact_number_two);    
      formData.append('institute_mail_id',this.state.institute_mail_id);  
      formData.append('lead_contact_person',JSON.stringify(this.state.lead_contact_person));
      formData.append('Institute_contact_person',JSON.stringify(this.state.Institute_contact_person));
      
      formData.append('institute_average_fees',this.state.institute_average_fees);   
      formData.append('institute_teaching_staff_count',this.state.institute_teaching_staff_count);    
      formData.append('institute_non_teaching_staff_count',this.state.institute_non_teaching_staff_count);  
      formData.append('institute_guest_lecture_count',this.state.institute_guest_lecture_count);
      formData.append('institute_student_count',this.state.institute_student_count);
      formData.append('institute_buses_owned_count',this.state.institute_buses_owned_count);
      formData.append('institute_classrooms_count',this.state.institute_classrooms_count);
      formData.append('institute_digital_classrooms_count',this.state.institute_digital_classrooms_count);
      formData.append('institute_card_status',this.state.institute_cardissued);
      formData.append('institute_website',this.state.institute_website);
      formData.append('institute_website_type',this.state.institute_website_type);
      formData.append('institute_website_company_name',this.state.institute_website_company_name);
      formData.append('institute_website_company_url',this.state.institute_website_company_url);
      formData.append('institute_website_contact_number',this.state.institute_website_contact_number);
      formData.append('institute_parent_app',this.state.institute_parent_app);
      formData.append('institute_parent_app_name',this.state.institute_parent_app_name);
      formData.append('institute_managementsystem',this.state.institute_managementsystem);
      formData.append('institute_managementsystem_name',this.state.institute_managementsystem_name);
      formData.append('institute_managementsystem_place',this.state.institute_managementsystem_place);
      formData.append('institute_managementsystem_type',this.state.institute_managementsystem_type);
      formData.append('institute_managementsystem_price',this.state.institute_managementsystem_price);
      formData.append('institute_managementsystem_price_yearly',this.state.institute_managementsystem_price_yearly);
      formData.append('institute_proposed_rates',this.state.institute_proposed_rates);
      formData.append('institute_negotiable_rates',this.state.institute_negotiable_rates);
      formData.append('institute_proposed_cost',this.state.institute_proposed_cost);
      formData.append('institute_negotiable_cost',this.state.institute_negotiable_cost);
      formData.append('institute_advance_expected',this.state.institute_advance_expected);
      formData.append('institute_month_closure',this.state.institute_month_closure);
      formData.append('institute_comment',this.state.institute_comment);
      formData.append('parameters_1',this.state.para_1);
      formData.append('parameters_2',this.state.para_2);
      formData.append('parameters_3',this.state.para_3);
      formData.append('parameters_4',this.state.para_4);
      formData.append('parameters_5',this.state.para_5);
      formData.append('parameters_6',this.state.para_6);
      formData.append('parameters_7',this.state.para_7);
      formData.append('parameters_8',this.state.para_8);
      formData.append('parameters_9',this.state.para_9);
      formData.append('parameters_10',this.state.para_10);
      formData.append('parameters_11',this.state.para_11);
      formData.append('parameters_12',this.state.para_12);
      formData.append('parameters_score',this.state.parametercount);
      formData.append('created_by',this.state.created_by); 

      new Service().apiCall('Leads/InsertUpdateData', formData).then(response => 
      {   
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            alert: (
              <SweetAlert
                success
                // style={{ display: "block", marginTop: "-100px" }} 
                confirmBtnBsStyle="success"
                title="Lead Created Successfully!"
                showConfirm={false}
              >Now you can access all support of this leads
              </SweetAlert>    
            ),
          });
          setTimeout(() => {
            this.setState({ alert:null,buttonName:'Finish',buttonDisabled:false});
            this.props.handleSelectedButton('close');
          }, 2000)
        } 
        else 
        {
          this.raiseLoginSignupErrorAlert('test');
          this.setState({ buttonName:'Finish',buttonDisabled:false});
        }
      }).catch(error => {
        this.raiseLoginSignupErrorAlert('test');
        this.setState({ buttonName:'Finish',buttonDisabled:false});
      });
    }
    else
    {
      alert('Please Enter Trust name, Institution Name and No of Students');
    }
  }

  getAddressInfo = (pincode, type) => {
    if(pincode && pincode.length == 6){
      const postData = {
        pincode:pincode
      };
      new Service().apiCall('Pincode/GetPincode',postData).then(response =>
      {
        if (response.data!='') 
        {      
          let newArr = response.data.filter(v=>v.delivery == "Delivery");
          
          this.setState({pincodesArr:newArr, selectPOPanel:true, addressType:type})
        }
        else{
          this.setState({pincodesArr:[]})
        }
      }).catch(error => {
        alert(error.response.data);
      });
    }
  }

  fillAddress = (po,taluk,district,state) => {
    if(this.state.addressType == "pincode"){
      this.setState({post_office:po,taluk:taluk,district:district,state:state, selectPOPanel:false});
    }
    else{
      this.setState({institute_post_office:po,institute_taluk:taluk,institute_district:district,institute_state:state, selectPOPanel:false});
    }
  }

  replaceText = (str) => {
    let string = str.replace(" B.O","");
    string = string.replace(" S.O","");
    string = string.replace(" H.O","");
    return string;
  }

  componentDidMount() {  
    this.getAddressInfo();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }; 
  
  institute_trust = (value) => {
    if(value === 'yes' && this.state.institute_same_trust === 'yes'){
      this.setState({institute_same_trust:'no'});
      this.setState({institute_name:''});   
      this.setState({institute_type:''});   
      this.setState({institute_pincode:''});   
      this.setState({institute_address_line_1:''});   
      this.setState({institute_address_line_2:''});   
      this.setState({institute_post_office:''});   
      this.setState({institute_taluk:''});   
      this.setState({institute_district:''});   
      this.setState({institute_state:''});   
      this.setState({institute_contact_number_one:''});   
      this.setState({institute_contact_number_two:''});    
      this.setState({institute_mail_id:''});
    }else{
      this.setState({institute_same_trust:'yes'});
      this.setState({institute_name:this.state.trust_name});   
      this.setState({institute_type:this.state.institute_type});   
      this.setState({institute_pincode:this.state.pincode});   
      this.setState({institute_address_line_1:this.state.address_line_1});   
      this.setState({institute_address_line_2:this.state.address_line_2});   
      this.setState({institute_post_office:this.state.post_office});   
      this.setState({institute_taluk:this.state.taluk});   
      this.setState({institute_district:this.state.district});   
      this.setState({institute_state:this.state.state});   
      this.setState({institute_contact_number_one:this.state.lead_contact_number_one});   
      this.setState({institute_contact_number_two:this.state.lead_contact_number_two});    
      this.setState({institute_mail_id:this.state.lead_mail_id});
    }
  };

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });

     // alert(this.state.institute_student_count); 
          
  }

  setAndCalculateStudentPrice = (name,value) =>{
    let proposedRates = this.state.institute_proposed_rates;
    let negotiableRates = this.state.institute_negotiable_rates;
    let totalValue = proposedRates*value;
    let negotiableValue = negotiableRates*value;

    this.setState({[name]:value});

    if(proposedRates > 0)
    {
      this.setState({institute_proposed_cost:totalValue});  
    }
    
    if(negotiableRates > 0)
    {
      this.setState({institute_negotiable_cost:negotiableValue}); 
    }
  }

  setAndCalculateProposedValue = (name,value) =>{
    let studentCount = this.state.institute_student_count;
    let totalValue = studentCount*value;
    if(studentCount > 0)
    {
      this.setState({institute_proposed_cost:totalValue,[name]:value}); 
    }
  }
  
  setAndCalculateNegotiableValue = (name,value) =>{
    let studentCount = this.state.institute_student_count;
    let totalValue = studentCount*value;

    if(studentCount > 0)
    {
      this.setState({institute_negotiable_cost:totalValue,[name]:value});  
    }
  }

  //checkValue = () =>{
    //if(this.state.institute_student_count !== 0 && this.state.institute_student_count !== '')
   // {
     // alert(this.state.institute_student_count);
    //} 
 // }

  gridsize(idx){
    let length = this.state.lead_contact_person.length;
    if(idx == 0){
      return 5;
    } else if(idx == length-1){
      return 4;
    } else if(length > 1){
      return 4;
    }else{ 
      return 5;
    }    
  }

  gridsizeins(idx){
    let length = this.state.Institute_contact_person.length;
    if(idx == 0){
      return 5;
    } else if(idx == length-1){
      return 4;
    } else if(length > 1){
      return 4;
    }else{ 
      return 5;
    }    
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
        <GridContainer  justify="center" alignItems="center"  className={classes.LeadCreationGrid}>              
          <GridItem xs={12} sm={12} md={9}>
            <Stepper style={{backgroundColor:'#dddddd'}} nonLinear activeStep={this.state.activeStep}>
              {this.state.steps.map((label,index) => (
                <Step key={label}> <StepButton style={{backgroundColor:'#dddddd'}} onClick={()=> this.handleStep(index)}> </StepButton> </Step>
              ))}
            </Stepper>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose"><span class="material-icons">note_add</span></CardIcon>
                <h4 className={classes.cardIconTitle}>Lead Creation</h4>
              </CardHeader>
              <CardBody>
              {this.state.activeStep == 0 && 
              <div>
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer>
                    <GridItem>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Trust / Congregation Details</h5>
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
                            autoComplete: 'off',maxLength:6
                          }}
                          id="document-type"   
                          value={this.state.pincode}
                          label="Pincode" 
                          type="search" 
                          onChange={(event) => { this.setPostData("pincode",event.target.value); this.getAddressInfo(event.target.value,"pincode"); }}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
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
                          inputProps={{
                            autoComplete: 'off',maxLength:10
                          }}                
                          id="document-type"   
                          value={this.state.lead_contact_number_one}
                          label="Contact Number 1" 
                          type="search" 
                          onChange={(event) => this.setPostData("lead_contact_number_one", event.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                          inputRef={this.textInput} 
                          variant="outlined" />
                      </FormControl>
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                      <FormControl fullWidth>                 
                        <TextField 
                          inputProps={{
                            autoComplete: 'off',maxLength:10
                          }}                
                          id="document-type"   
                          value={this.state.lead_contact_number_two}
                          label="Contact Number 2" 
                          type="search" 
                          onChange={(event) => this.setPostData("lead_contact_number_two", event.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          inputRef={this.textInput} 
                          variant="outlined" />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                      <FormControl fullWidth className={classes.nonecapitalize} >                 
                        <TextField 
                                     
                          id="outlined-basic"                             
                          value={this.state.lead_mail_id}
                          label="Email ID" 
                          type="email" 
                          onChange={(event) => this.setPostData("lead_mail_id", event.target.value.replace(' ',''))}
                          variant="outlined" />
                      </FormControl>
                    </GridItem>
                  </GridContainer>  
                </CardBody>
              </Card>                                     
            
            {this.state.lead_contact_person.map((author, idx) => (
              <div>
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer>
                    <GridItem>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Contact Person - {idx+1}</h5>
                    </GridItem>
                  </GridContainer>
                    <div> 
                  <GridContainer>             
                  <GridItem xs={12} sm={12} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                    <FormControl fullWidth>
                      <TextField 
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                      InputProps={classes.inputText} 
                      readOnly={true}   
                      value={idx+1}
                      labelPlacement="start"
                      label="S No." 
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
                      value={author.person_name}
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
                        inputProps={{
                        autoComplete: 'off'
                        }}
                      id="document-type"   
                      value={author.designation}
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
                          value={author.approver}
                          onChange={(event) => this.handleLeadPersonValue(idx,"approver",'yes')}
                          color="primary"
                          checked={author.approver === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Approver</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.decision_maker}
                          onChange={(event) => this.handleLeadPersonValue(idx,"decision_maker",'yes')}
                          name="DecisionMaker"
                          color="primary"
                          checked={author.decision_maker === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Decision Maker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.influencer}
                          onChange={(event) => this.handleLeadPersonValue(idx,"influencer",'yes')}
                          color="primary"
                          checked={author.influencer === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Influencer</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.evaluator_recommender}
                          onChange={(event) => this.handleLeadPersonValue(idx,"evaluator_recommender",'yes')}
                          color="primary"
                          checked={author.evaluator_recommender === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Evaluator/Recommender</span>}
                    />						  
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        value={author.gatekeeper_blocker}
                        onChange={(event) => this.handleLeadPersonValue(idx,"gatekeeper_blocker",'yes')}
                        color="primary"
                        checked={author.gatekeeper_blocker === "yes" ? true : false}
                      />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Gatekeeper/Blocker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.users}
                          onChange={(event) => this.handleLeadPersonValue(idx,"users",'yes')}
                          color="primary"
                          checked={author.users === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Users</span>}
                    />
                  </GridItem> 
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.champion}
                          onChange={(event) => this.handleLeadPersonValue(idx,"champion",'yes')}
                          color="primary"
                          checked={author.champion === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Champion</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.mentor}
                          onChange={(event) => this.handleLeadPersonValue(idx,"mentor",'yes')}
                          color="primary"
                          checked={author.mentor === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Mentor</span>}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',
                          maxLength: 10
                        }}                
                        id="document-type"   
                        value={author.contact_number_one}
                        label="Contact Number 1" 
                        type="search" 
                        onChange={
                          (event) => this.handleLeadPersonValue(idx,'contact_number_one',event.target.value)
                        }
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',
                          maxLength: 10
                        }}                
                        id="document-type"   
                        value={author.contact_number_two}
                        label="Contact Number 2" 
                        type="search" 
                        onChange={(event) => this.handleLeadPersonValue(idx,"contact_number_two",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={this.gridsize(idx)} className={classes.inputMargin}>
                    <FormControl fullWidth  className={classes.nonecapitalize}>                 
                      <TextField 
                        inputProps={{ 
                        autoComplete: 'off'
                        }}                
                        id="document-type"   
                        value={author.mail_id}
                        label="Email" 
                        type="search" 
                        onChange={(event) => this.handleLeadPersonValue(idx,'mail_id',event.target.value.replace(' ',''))}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>

                  {(this.state.lead_contact_person.length - 1) == 0 ?  
                    <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                        <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                      onClick={()=>{this.handleAddLeadPerson()}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      : ((this.state.lead_contact_person.length - 1) > 0 && idx == 0) ?   
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                      onClick={()=>{this.handleAddLeadPerson();}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      :
                      <>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
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
                      onClick={()=>{this.handleAddLeadPerson()}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
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
                      onClick={()=>{this.removeLeadPerson(idx);}}
                      variant="outlined" />

                      </FormControl></div> 
                      </GridItem>    
                    </>
                  }
                </GridContainer>
                </div>                
              </CardBody>
            </Card>
            </div>  
            ))}
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
                  <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Institute Details</h5>
                  </GridItem>
                </GridContainer> 
                <GridContainer>
                  <GridItem  xs={12} sm={12} md={12} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={()=>this.institute_trust('yes')}
                          name="Institutecheckbox"
                          color="primary"
                          checked={this.state.institute_same_trust === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Institute details are same as congregation details.</span>}
                    />
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
                        value={this.state.institute_name}
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
                        value={this.state.institute_type}
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
                          autoComplete: 'off',maxLength:6
                        }}
                        id="document-type"   
                        value={this.state.institute_pincode}
                        label="Pincode" 
                        type="search" 
                        onChange={(event) => {this.setPostData("institute_pincode",event.target.value); this.getAddressInfo(event.target.value,"institute_pincode")}} 
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_address_line_1}
                        label="Address Line 1" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_address_line_1",event.target.value)}
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
                        value={this.state.institute_address_line_2}
                        label="Address Line 2" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_address_line_2",event.target.value)}
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
                        value={this.state.institute_post_office}
                        label="Post Office" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_post_office",event.target.value)}
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
                        value={this.state.institute_taluk}
                        label="Taluk" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_taluk",event.target.value)}
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
                        value={this.state.institute_district}
                        label="District" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_district",event.target.value)}
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
                        value={this.state.institute_state}
                        label="State" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_state",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                        autoComplete: 'off',maxLength:10
                        }}                
                        id="document-type"   
                        value={this.state.institute_contact_number_one}
                        label="Contact Number 1" 
                        type="search" 
                        onChange={(event) => this.setState({'institute_contact_number_one': event.target.value})}                       
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                        autoComplete: 'off',maxLength:10
                        }}                
                        id="document-type"   
                        value={this.state.institute_contact_number_two}
                        label="Contact Number 2" 
                        type="search" 
                        onChange={(event) => this.setState({'institute_contact_number_two': event.target.value})}                        
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth  className={classes.nonecapitalize}>                 
                      <TextField 
                        inputProps={{
                        autoComplete: 'off'
                        }}                
                        id="document-type"   
                        value={this.state.institute_mail_id}
                        label="Email" 
                        type="search" 
                        onChange={(event) => this.setState({'institute_mail_id': event.target.value.replace(' ','')})}
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
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Institute Contact Person - {idx+1}</h5>
                    </GridItem>
                  </GridContainer>
                    <div> 
                  <GridContainer>             
                  <GridItem xs={12} sm={12} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                    <FormControl fullWidth>
                      <TextField 
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                      InputProps={classes.inputText} 
                      readOnly={true}   
                      value={idx+1}
                      labelPlacement="start"
                      label="S No." 
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
                          value={author.approver}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"approver",'yes')}
                          color="primary"
                          checked={author.approver === "yes" ? true : false} 
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Approver</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.decision_maker}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"decision_maker",'yes')}
                          name="DecisionMaker"
                          color="primary"
                          checked={author.decision_maker === "yes" ? true : false} 
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Decision Maker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.influencer}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"influencer",'yes')}
                          color="primary"
                          checked={author.influencer === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Influencer</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.evaluator_recommender}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"evaluator_recommender",'yes')}
                          color="primary"
                          checked={author.evaluator_recommender === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Evaluator/Recommender</span>}
                    />						  
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        value={author.gatekeeper_blocker}
                        onChange={(event) => this.handleInstitutePersonValue(idx,"gatekeeper_blocker",'yes')}
                        color="primary"
                        checked={author.gatekeeper_blocker === "yes" ? true : false}
                      />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Gatekeeper/Blocker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.users}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"users",'yes')}
                          color="primary"
                          checked={author.users === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Users</span>}
                    />
                  </GridItem> 
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.champion}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"champion",'yes')}
                          color="primary"
                          checked={author.champion === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Champion</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={author.mentor}
                          onChange={(event) => this.handleInstitutePersonValue(idx,"mentor",'yes')}
                          color="primary"
                          checked={author.mentor === "yes" ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Mentor</span>}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
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
                        inputProps={{
                          autoComplete: 'off',
                          maxLength:10
                        }}                
                        id="document-type"   
                        value={author.contact_number_two}
                        label="Contact Number 2" 
                        type="search" 
                        onChange={(event) => this.handleInstitutePersonValue(idx,'contact_number_two',event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={this.gridsizeins(idx)} className={classes.inputMargin}>
                    <FormControl fullWidth  className={classes.nonecapitalize}>                 
                      <TextField 
                        inputProps={{ 
                        autoComplete: 'off'
                        }}                
                        id="document-type"   
                        value={author.mail_id}
                        label="Email" 
                        type="search" 
                        onChange={(event) => this.handleInstitutePersonValue(idx,'mail_id',event.target.value.replace(' ',''))}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  
                  {(this.state.Institute_contact_person.length - 1) == 0 ?  
                    <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                        <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                      </GridItem>
                      : ((this.state.Institute_contact_person.length - 1) > 0 && idx == 0) ?   
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                      </GridItem>
                      :
                      <>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
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
                      </GridItem>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
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
                      </GridItem>    
                    </>
                  }
                  </GridContainer>
                </div>                
              </CardBody>
            </Card>
            </div>  
            ))}
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
                  label="Institute Profiling"
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
                  <GridItem>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Institute Profiling</h5>
                  </GridItem>
                </GridContainer>
                <GridContainer>   
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_average_fees}
                        label="Average Fees" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_average_fees",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
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
                      value={this.state.institute_teaching_staff_count}
                      label="No of Teaching Staff" 
                      type="search" 
                      onChange={(event) => this.setPostData("institute_teaching_staff_count",event.target.value)}
                      onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
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
                        value={this.state.institute_non_teaching_staff_count}
                        label="No of Non-teaching Staff" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_non_teaching_staff_count",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_guest_lecture_count}
                        label="No of Guest Lecture" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_guest_lecture_count",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_student_count}
                        label="No of Students" 
                        type="search"  
                        onChange={(event) => this.setAndCalculateStudentPrice("institute_student_count",event.target.value)} 
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
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
                        value={this.state.institute_buses_owned_count}
                        label="Owned Buses Count" 
                        type="search"   
                        onChange={(event) => this.setPostData("institute_buses_owned_count",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_classrooms_count}
                        label="No of Classrooms" 
                        type="search"  
                        onChange={(event) => this.setPostData("institute_classrooms_count",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_digital_classrooms_count}
                        label="No of Digital Classrooms" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_digital_classrooms_count",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>    
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                    <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position">
                    <strong style={{margin:'auto',  paddingRight:15}}>ID-Card issued? </strong>   
                    <FormControlLabel control={<Radio color="primary" checked={this.state.institute_cardissued === "Issued"} onChange={()=> this.setState({institute_cardissued: 'Issued'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>}/>
                    <FormControlLabel control={<Radio color="primary" checked={this.state.institute_cardissued === "Not Issued"} onChange={()=> this.setState({institute_cardissued: 'Not Issued'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
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
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Website Details</h5>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                    <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position">
                    <strong style={{margin:'auto',  paddingRight:15}}>Is Website Available?</strong>   
                    <FormControlLabel value="active" control={<Radio color="primary" checked={this.state.institute_website === "active"} onChange={()=> this.setState({institute_website: 'active'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                    <FormControlLabel value="inactive" control={<Radio color="primary" checked={this.state.institute_website === "inactive"} onChange={()=> this.setState({institute_website: 'inactive'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                    </RadioGroup>
                    </FormControl>  
                  </GridItem>  
                  {this.state.institute_website === 'active' &&
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                    <FormControl className={classes.margin} fullWidth>
                        <TextField
                        className="m-2"
                        id="outlined-select-currency"
                        select
                        label="Website Type (Basic/Dynamic)"
                        options={this.state.institute_website_type}
                        onChange={(event) => this.setPostData("institute_website_type",event.target.value)}
                        variant="outlined">
                        <MenuItem value='Basic'>Basic</MenuItem>
                        <MenuItem value='Dynamic'>Dynamic</MenuItem>
                      
                    </TextField>
                    </FormControl>
                    {/*<FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_website_type}
                        label="Website Type (Basic/Dynamic)" 
                        type="search"    
                        onChange={(event) => this.setPostData("institute_website_type",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>*/}
                  </GridItem>}
                </GridContainer>
                {this.state.institute_website === 'active' &&
                <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth className={classes.nonecapitalize}>
                      <TextField 
                        inputProps={{
                        autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_website_company_url}
                        label="Website URL" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_website_company_url",event.target.value)}
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
                      value={this.state.institute_website_company_name}
                      label="Website Provider Name" 
                      type="search" 
                      onChange={(event) => this.setPostData("institute_website_company_name",event.target.value)}
                      inputRef={this.textInput} 
                      variant="outlined" />                   
                    </FormControl>
                  </GridItem>   
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',maxLength:10
                        }}
                        id="document-type"   
                        value={this.state.institute_website_contact_number}
                        label="Website Provider Contact Number" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_website_contact_number",event.target.value)}
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
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>ERP Details</h5>
                  </GridItem>
                </GridContainer>
                <GridContainer> 
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                    <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position">
                    <strong style={{margin:'auto',  paddingRight:15}}>Is ERP System Implemented?</strong>   
                    <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.institute_managementsystem === "yes"} onChange={()=> this.setState({institute_managementsystem: 'yes'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                    <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.institute_managementsystem === "no"} onChange={()=> this.setState({institute_managementsystem: 'no'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                    </RadioGroup>
                    </FormControl>  
                  </GridItem>   
                  {this.state.institute_managementsystem == 'yes' &&
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_managementsystem_name}
                        label="Name of Service Provider" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_managementsystem_name",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>}
                  </GridContainer>
                  {this.state.institute_managementsystem == 'yes' && <div>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_managementsystem_place}
                        label="Place" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_managementsystem_place",event.target.value)}
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
                      value={this.state.institute_managementsystem_type}
                      label="Type" 
                      type="search" 
                      onChange={(event) => this.setPostData("institute_managementsystem_type",event.target.value)}
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
                        value={this.state.institute_managementsystem_price}
                        label="Price per student" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_managementsystem_price",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        label="Yearly Cost" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_managementsystem_price_yearly",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                </GridContainer>
                </div>}                     
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                    <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position">
                    <strong style={{margin:'auto',  paddingRight:15}}>Parent App Available? </strong>   
                    <FormControlLabel control={<Radio color="primary" checked={this.state.institute_parent_app === "yes"} onChange={()=> this.setState({institute_parent_app: 'yes'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                    <FormControlLabel control={<Radio color="primary" checked={this.state.institute_parent_app === "no"} onChange={()=> this.setState({institute_parent_app: 'no'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                    </RadioGroup>
                    </FormControl>  
                  </GridItem>   
                  {this.state.institute_parent_app == 'yes' &&  
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                    <FormControl fullWidth> 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        id="document-type"   
                        value={this.state.institute_parent_app_name}
                        label="App Name/Link" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_parent_app_name",event.target.value)}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>}                                                       
                </GridContainer> 
              </CardBody>
            </Card>

            <Card className="outlinedInput">
              <CardBody>
                <GridContainer>
                  <GridItem>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>eGenius CAAS Potential</h5>
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
                        value={this.state.institute_proposed_rates}
                        label="Proposed price per student" 
                        type="search"  
                        onChange={(event) => this.setAndCalculateProposedValue("institute_proposed_rates",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_negotiable_rates}
                        label="Negotiable price per student" 
                        type="search" 
                        onChange={(event) => this.setAndCalculateNegotiableValue("institute_negotiable_rates",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        
                        }}
                        id="document-type"   
                        value={this.state.institute_proposed_cost}
                        label="Proposed total cost" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_proposed_cost",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        id="document-type"   
                        value={this.state.institute_negotiable_cost}
                        label="Negotiable total cost" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_negotiable_cost",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
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
                        value={this.state.institute_advance_expected}
                        label="Advance Expected" 
                        type="search" 
                        onChange={(event) => this.setPostData("institute_advance_expected",event.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker  
                          margin="normal"
                          autoOk={true}
                          id="date-picker-dialog"
                          inputVariant="outlined"
                          label="Expected date of closure"
                          format="dd-MM-yyyy"
                          value={this.state.institute_month_closure}
                          onChange={this.handleEYear}   
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
                        inputProps={{
                        autoComplete: 'off'
                        }}
                      id="document-type"   
                      value={this.state.institute_comment}
                      label="Comments if any," 
                      type="search" 
                      onChange={(event) => this.setPostData("institute_comment",event.target.value)}
                      inputRef={this.textInput} 
                      variant="outlined" />                   
                    </FormControl>
                  </GridItem>                       
                </GridContainer>  
              </CardBody>
            </Card>                   
                <GridContainer> 
                  <GridItem xs={12} sm={12} md={6} >                  
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
                  <Chip onClick={()=>{this.setState({activeStep:3}); this.scrollToTop()}}
                    avatar={<Avatar>4</Avatar>}
                    label="Parameters"
                    clickable
                    color="primary"
                    onDelete={()=>{this.setState({activeStep:3}); this.scrollToTop()}}
                    deleteIcon={<KeyboardArrowRight />}
                    variant="outlined"
                  />
                  </GridItem>                     
                </GridContainer> 
            </div>                  
          } 
          { this.state.activeStep == 3 && 
          <div>
            <Card className="outlinedInput rowsize">
              <CardBody className={classes.customCardContentClass}>
                <GridItem xs={12} sm={12} md={12} >
                  <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Parameters</h5>
                </GridItem>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan="2">S No.</TableCell>
                      <TableCell align="center">Parameters</TableCell>
                      <TableCell align="center">Yes/No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody showRowHover={true}>
                    <TableRow>
                      <TableCell colSpan="2">1.</TableCell>
                      <TableCell align="left">Met the right customer and done the KYC</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_1 === 'checked' ? true : false}  onClick={(event)=>{ if(this.state.para_1 === 'checked'){ } else { this.setState({'para_1':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_1 === 'unchecked' ? true : false}  onClick={(event)=>{ if(this.state.para_1 === 'unchecked'){ } else { this.setState({'para_1':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell colSpan="2">2.</TableCell>
                      <TableCell align="left">Done with competition and gap analysis</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_2 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_2 === 'checked'){ } else { this.setState({'para_2':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_2 === 'unchecked' ? true : false}  onClick={(event)=>{ if(this.state.para_2 === 'unchecked'){ } else { this.setState({'para_2':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell colSpan="2">3.</TableCell>
                      <TableCell align="left">Institution has understood & showed interest in adopting next generation software</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_3 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_3 === 'checked'){ } else { this.setState({'para_3':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_3 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_3 === 'unchecked'){ } else { this.setState({'para_3':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow>  
                    <TableRow style={{paddingTop:'8px !important',paddingBottom:'8px !important'}}>
                      <TableCell align="left" colSpan="2" style={{paddingTop:'8px !important',paddingBottom:'8px !important'}} className={"cellpadding"} >4</TableCell>
                      <TableCell align="left" style={{paddingTop:'10px !important',paddingBottom:'10px !important'}}>You must have been met all below stakeholders</TableCell>
                      <TableCell align="left" style={{paddingTop:'10px !important',paddingBottom:'10px !important'}}></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center" >4.1.</TableCell>
                      <TableCell align="left">Initiators who suggest purchasing a product or service</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_4 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_4 === 'checked'){ } else { this.setState({'para_4':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_4 === 'unchecked' ? true : false}  onClick={(event)=>{ if(this.state.para_4 === 'unchecked'){ } else { this.setState({'para_4':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>}/>
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center">4.2.</TableCell>
                      <TableCell align="left">Influencers who try to affect the outcome</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_5 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_5 === 'checked'){ } else { this.setState({'para_5':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_5 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_5 === 'unchecked'){ } else { this.setState({'para_5':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center">4.3.</TableCell>
                      <TableCell align="left">Deciders who have the final decision</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_6 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_6 === 'checked'){ } else { this.setState({'para_6':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_6 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_6 === 'unchecked'){ } else { this.setState({'para_6':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center">4.4.</TableCell>
                      <TableCell align="left">Buyers who are responsible for the contract</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_7 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_7 === 'checked'){ } else { this.setState({'para_7':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_7 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_7 === 'unchecked'){ } else { this.setState({'para_7':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center">4.5.</TableCell>
                      <TableCell align="left">End users of the item being purchased</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_8 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_8 === 'checked'){ } else { this.setState({'para_8':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_8 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_8 === 'unchecked'){ } else { this.setState({'para_8':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell >{' '}</TableCell>
                      <TableCell align="center">4.6.</TableCell>
                      <TableCell align="left">Gatekeepers who control the flow of information</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_9 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_9 === 'checked'){ } else { this.setState({'para_9':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_9 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_9 === 'unchecked'){ } else { this.setState({'para_9':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell colSpan='2'>5.</TableCell>
                      <TableCell align="left">Full pledge Web/App demo has given to decision maker</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_10 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_10 === 'checked'){ } else { this.setState({'para_10':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_10 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_10 === 'unchecked'){ } else { this.setState({'para_10':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />}label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell colSpan='2'>6.</TableCell>
                      <TableCell align="left">Has reached the negotiation level.</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_11 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_11 === 'checked'){ } else { this.setState({'para_11':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_11 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_11 === 'unchecked'){ } else { this.setState({'para_11':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>}/>
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow>  
                    <TableRow>
                      <TableCell colSpan='2'>7.</TableCell>
                      <TableCell align="left">Ready to sign the MOU</TableCell>
                      <TableCell align="center"><FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">                               
                        <FormControlLabel value="yes" control={<Radio color="primary" checked={this.state.para_12 === 'checked' ? true : false} onClick={(event)=>{ if(this.state.para_12 === 'checked'){ } else { this.setState({'para_12':'checked'});this.setState({parametercount:this.state.parametercount+1})}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                        <FormControlLabel value="no" control={<Radio color="primary" checked={this.state.para_12 === 'unchecked' ? true : false} onClick={(event)=>{ if(this.state.para_12 === 'unchecked'){ } else { this.setState({'para_12':'unchecked'});if(this.state.parametercount > 0 ) { this.setState({parametercount:this.state.parametercount-1})} else{this.setState({parametercount:this.state.parametercount})} }}} />} 
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                        </RadioGroup>
                      </FormControl></TableCell>
                    </TableRow> 
                    <TableRow>
                      <TableCell colSpan='2'></TableCell>
                      <TableCell align="left"><div className={classes.cardContentRight}>
                                      {(this.state.parametercount == 10 || this.state.parametercount > 10) && <Button color="success" round className={classes.marginRight}>High Potential Qualified Prospects</Button>}
                                      {(this.state.parametercount == 8 || this.state.parametercount == 9)  && <Button color="info" round className={classes.marginRight}>Medium Qualified Prospects</Button>}
                                      {(this.state.parametercount == 6 || this.state.parametercount == 7) && <Button color="primary" round className={classes.marginRight}>Low Qualified Prospects</Button>}
                                      {(this.state.parametercount == 4 || this.state.parametercount == 5) && <Button color="warning" round className={classes.marginRight}>Workable Qualified Prospects</Button>}
                                      {this.state.parametercount < 4 && this.state.parametercount != 0 && <Button color="danger" round className={classes.marginRight}>Serious Gaps in Prospects Identification</Button>}
                                      </div></TableCell>
                      <TableCell align="left"><div>{this.state.parametercount >= 1 && <p style={{fontSize:'20px',marginTop:'15px'}}>Score : <b>{this.state.parametercount}</b></p>}</div></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>               
              </CardBody>    
            </Card>   
            <GridContainer> 
              <GridItem xs={12} sm={12} md={6}>
              <Chip onClick={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                  icon={<KeyboardArrowLeft />}
                  label="Institute Profiling"
                  clickable
                  color="primary"
                  onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                  deleteIcon={<Avatar style={{width:22,height:22,backgroundColor:'#303f9f',color:'#fff', fontSize:'0.75rem'}}>3</Avatar>}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >
                <MButton  type="submit" color="rose" disabled={this.state.buttonDisabled} onClick={this.handleleadcreation.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
              </GridItem>
            </GridContainer> 
            </div>
          } 
          </CardBody>
        </Card>
      </GridItem>       
    </GridContainer>
    <SlidingPane 
      closeIcon={<div>   
        <Button
          justIcon
          round
          color="white"
          type="custom"
          style={{color:'black'}}
        ><KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
        </Button></div>} 
          className={classes.ModalStyle2} 
          overlayClassName={classes.panelClass}
          isOpen={ this.state.selectPOPanel }
          title='Select Address'
          onRequestClose={ () => {
              this.setState({ selectPOPanel:false });
          } }>
          <div> 
            {this.state.pincodesArr.length > 0 && this.state.pincodesArr.map((element, index) => (
                <CustomSnackbarContent style={{padding:5}}
                message={
                  <div><h5 style={{marginTop:0, fontWeight:700, fontSize:'1.2em'}} className="headingStyle">{this.replaceText(element.office)}</h5><span>{"Taluk: "+element.taluk+"    District: "+element.district+"    State: "+element.circle}</span></div>
                }
                type="custom"
                close
                closeNotification={() => this.fillAddress(this.replaceText(element.office),element.taluk,element.district,element.circle)}
                color="white"  
              />
            ))}
          </div>
      </SlidingPane>                 	
    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
