import React from "react";
import 'date-fns';

// react plugin for creating charts
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Chip from '@material-ui/core/Chip';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import StepButton from '@material-ui/core/StepButton';
import CustomSnackbarContent from "components/Snackbar/CustomSnackbarContent.js";
import Service from 'Utils/Service';
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
const panelStyles = {
  panelClass: {
    zIndex:999
  },
  notificationModalStyle: {
    width:'40% !important',
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
  constructor(props) 
  {
    super(props);
    this.state = {
      institute_name:'',
      activeAccordion:'', 
      activeStep:0,
      edit_institute:this.props.add_more_institute,
      institute_month_closure: new Date(),
      parametercount:0,
      InstituteDetails:[{id:'',institute_type:'',institute_pincode:'',institute_address_line_1:'',institute_address_line_2:'',institute_post_office:'',institute_taluk:'', institute_district:'',institute_state:'',institute_contact_number_one:'',institute_contact_number_two:'',institute_mail_id:'',institute_average_fees:'',institute_teaching_staff_count:'',institute_non_teaching_staff_count:'',institute_guest_lecture_count:'',institute_student_count:'',institute_buses_owned_count:'',institute_classrooms_count:'',institute_digital_classrooms_count:'',institute_website_type:'',institute_website_company_name:'',institute_website_company_url:'',institute_website_contact_number:'',institute_parent_app_name:'',institute_managementsystem_name:'',institute_managementsystem_place:'',institute_managementsystem_type:'',institute_managementsystem_price:'',institute_managementsystem_price_yearly:'',institute_proposed_rates:'',institute_negotiable_rates:'',institute_proposed_cost:'',institute_negotiable_cost:'',institute_advance_expected:'',institute_comment:'',parameters_score:0,institute_month_closure: new Date()}], 
      Institute_contact_person:[{ person_name:'', designation:'', approver:'', decision_maker:'', influencer:'', evaluator_recommender:'', gatekeeper_blocker:'', users:'', champion:'', mentor:'', contact_number_one:'', contact_number_two:'', mail_id:''}],      
      pincodesArr:[],
      steps:[1,2,3],
      edit_ins_id: '',
      client_id: '',
      created_by_id: this.props.data.user_id,
      created_by: this.props.data.name,
      alert: null,
      buttonName:'Submit',
      buttonDisabled:false
    }
  }

  handleStep = (index) => {
    this.setState({activeStep:index});
  }

  scrollToTop() {
    window.scrollTo(0, 0);
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
    this.handleInstituteValue(0,"institute_post_office",po);
    this.handleInstituteValue(0,"institute_taluk",taluk);
    this.handleInstituteValue(0,"institute_district",district);
    this.handleInstituteValue(0,"institute_state",state);
    this.setState({selectPOPanel:false});
  }

  replaceText = (str) => {
    let string = str.replace(" B.O","");
    string = string.replace(" S.O","");
    string = string.replace(" H.O","");
    return string;
  }

  handleEYear = (date) => {
    this.setState({ month_closure: date, formChanged:true })
  };

  removeInstitutePerson(i) {
    const { Institute_contact_person } = this.state;
    this.setState({
      Institute_contact_person: Institute_contact_person.filter((author, index) => index !== i),
    });
  }
  
  handleInstitutePersonValue = (Index,inputName,Value) => {
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
    NewLeadContactPerson.contact_number_one='';
    NewLeadContactPerson.contact_number_two='';
    NewLeadContactPerson.mail_id='';
    lauthorHolders.push(NewLeadContactPerson);
    this.setState({Institute_contact_person:lauthorHolders});
  }

  
  handleEditInstitute()
  {
    let narray = this.state.InstituteDetails;
    let newarray = narray[0];
    if(newarray.institute_name !== "" && newarray.institute_student_count !== '') 
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});

      let formData = new FormData();
      formData.append('id',newarray.id);
      formData.append('client_trust_id',this.props.lead_id);   
      formData.append('trust_name',this.props.trust_name);   
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
      formData.append('institute_website_company_url',newarray.institute_website_company_url);
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
      formData.append('created_by_id',this.state.created_by_id); 
      formData.append('created_by',this.state.created_by); 
      formData.append('Institute_contact_person',JSON.stringify(this.state.Institute_contact_person));

      new Service().apiCall('InstituteDetails/InsertUpdateData', formData).then(response => 
      { 
        if (response.status === 200 && response.data !== '') 
        {
          this.props.handleNotificationButton('success','Institute Updated Successfully!');
          this.setState({buttonName:'Submit',buttonDisabled:false});
        } 
        else 
        {
          this.props.handleNotificationButton('danger','Somthing Went Wrong');
          this.setState({buttonName:'Submit',buttonDisabled:false});
        }
      }).catch(error => {
        this.props.handleNotificationButton('danger','Somthing Went Wrong');
        this.setState({buttonName:'Submit',buttonDisabled:false}); 
      });
    }
    else
    {
      alert("Please Enter Institution Name and No of Students");
    }
  }

  getInstituteData(id){
    this.setState({Institute_contact_person:[]});
    this.setState({InstituteDetails:[]});
    const postData = {
      id:id
    };
    new Service().apiCall('InstituteDetails/GetInstituteDataById',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({InstituteDetails:response.data});
        this.setState({Institute_contact_person:JSON.parse(response.data[0].institute_contact_details)});
      }
      else{
        this.setState({InstituteDetails:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  handleInstituteValue = (Index,inputName,Value) => {
    let lInstituteDetails = this.state.InstituteDetails;
    lInstituteDetails[Index][inputName] = Value;
    if(inputName === "institute_proposed_rates" || inputName === "institute_negotiable_rates" || inputName === "institute_student_count"){
      let proposedRates = lInstituteDetails[Index]['institute_proposed_rates'];
      let negotiableRates = lInstituteDetails[Index]['institute_negotiable_rates'];
      let student_count = lInstituteDetails[Index]['institute_student_count'];
      let totalValue = proposedRates*student_count;
      let negotiableValue = negotiableRates*student_count;

      if(proposedRates > 0)
      {
        lInstituteDetails[Index]['institute_proposed_cost'] = totalValue;
      }

      if(negotiableRates > 0)
      {
        lInstituteDetails[Index]['institute_negotiable_cost'] = negotiableValue;
      }
    }

    this.setState({InstituteDetails:lInstituteDetails});
  }

  componentDidMount() {
    if(this.props.ins_id !== ''){
      this.getInstituteData(this.props.ins_id);
    }

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }


  gridsize(idx){
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
        <GridContainer  justify="center" alignItems="center">             
          <GridItem xs={12} sm={12} md={9}>
            <Stepper style={{backgroundColor:'#dddddd'}} nonLinear activeStep={this.state.activeStep}>
              {this.state.steps.map((label,index) => (
                <Step key={label}> <StepButton style={{backgroundColor:'#dddddd'}} onClick={()=> this.handleStep(index)}> </StepButton> </Step>
              ))}
            </Stepper>
            { this.state.InstituteDetails.length > 0 && this.state.InstituteDetails.map((institute, index) => (<div>
            <Card> 
              <CardHeader color="rose" icon>
                <CardIcon color="rose"><span class="material-icons">note_add</span></CardIcon>
                <h4 className={classes.cardIconTitle}>Lead Creation</h4>
              </CardHeader>
              <CardBody>
              {this.state.activeStep == 0 && <div>
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer>
                    <GridItem>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Institute Details</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                        inputProps={{
                          autoComplete: 'off', maxLength:6, readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_pincode}
                        label="Pincode" 
                        type="search" 
                        onChange={(event) => {this.handleInstituteValue(index,"institute_pincode",event.target.value);this.getAddressInfo(event.target.value,"pincode")}}                   
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_address_line_2}
                        label="Address Line 2" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_address_line_2",event.target.value)} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>  
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField                                 
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_post_office}
                        label="Post Office" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_post_office",event.target.value)} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>  
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_taluk}
                        label="Taluk" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_taluk",event.target.value)} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_district}
                        label="District" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_district",event.target.value)} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        id="document-type"   
                        value={institute.institute_state}
                        label="State" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_state",event.target.value)} 
                        inputRef={this.textInput} 
                        variant="outlined" />                   
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                         inputProps={{
                          autoComplete: 'off',maxLength:10,readOnly:this.state.edit_institute
                        }}              
                        id="document-type"   
                        value={institute.institute_contact_number_one} 
                        label="Contact Number 1" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_contact_number_one",event.target.value)}                        
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',maxLength:10,readOnly:this.state.edit_institute
                        }}               
                        id="document-type"   
                        value={institute.institute_contact_number_two}
                        label="Contact Number 2" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_contact_number_two",event.target.value)}                   
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth className={classes.nonecapitalize}>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}             
                        id="document-type"   
                        value={institute.institute_mail_id}
                        label="Email" 
                        type="search" 
                        onChange={(event) => this.handleInstituteValue(index,"institute_mail_id",event.target.value.replace(' ',''))} 
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                </GridContainer>  
              </CardBody>
            </Card>

            {this.state.Institute_contact_person.map((author, idx) => (<div>
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
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.approver == 'yes') { this.handleInstitutePersonValue(idx,"approver",'no')} else { this.handleInstitutePersonValue(idx,"approver",'yes')}}}                                    
                          checked={author.approver === 'yes' ? true : false}
                          color="primary"
                        />
                      }                 
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Approver</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.decision_maker == 'yes') { this.handleInstitutePersonValue(idx,"decision_maker",'no')} else { this.handleInstitutePersonValue(idx,"decision_maker",'yes')}}}                                    
                          checked={author.decision_maker === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Decision Maker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.influencer == 'yes') { this.handleInstitutePersonValue(idx,"influencer",'no')} else { this.handleInstitutePersonValue(idx,"influencer",'yes')}}}                                    
                          checked={author.influencer === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Influencer</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox  
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.evaluator_recommender == 'yes') { this.handleInstitutePersonValue(idx,"evaluator_recommender",'no')} else { this.handleInstitutePersonValue(idx,"evaluator_recommender",'yes')}}}                                    
                          checked={author.evaluator_recommender === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Evaluator/Recommender</span>}
                    />						  
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.gatekeeper_blocker == 'yes') { this.handleInstitutePersonValue(idx,"gatekeeper_blocker",'no')} else { this.handleInstitutePersonValue(idx,"gatekeeper_blocker",'yes')}}}                                    
                          checked={author.gatekeeper_blocker === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Gatekeeper/Blocker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.users == 'yes') { this.handleInstitutePersonValue(idx,"users",'no')} else { this.handleInstitutePersonValue(idx,"users",'yes')}}}                                    
                          checked={author.users === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Users</span>}
                    />
                  </GridItem> 
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.champion == 'yes') { this.handleInstitutePersonValue(idx,"champion",'no')} else { this.handleInstitutePersonValue(idx,"champion",'yes')}}}                                    
                          checked={author.champion === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Champion</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={this.state.edit_institute ? true : false} 
                          onChange={(event)=> { if( author.mentor == 'yes') { this.handleInstitutePersonValue(idx,"mentor",'no')} else { this.handleInstitutePersonValue(idx,"mentor",'yes')}}}                                    
                          checked={author.mentor === 'yes' ? true : false}
                          color="primary"
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Mentor</span>}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                         inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute,maxLength:10
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
                          autoComplete: 'off', readOnly:this.state.edit_institute,maxLength:10
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
                  <GridItem xs={12} sm={12} md={this.gridsize(idx)}  className={classes.inputMargin}>
                    <FormControl fullWidth className={classes.nonecapitalize}>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                      disabled={this.state.edit_trust} 
                      id="document-type"   
                      InputProps={{
                      autoComplete: 'off', 
                      readOnly: true,
                      startAdornment: (
                      <InputAdornment position="start" disabled={this.state.edit_institute}>
                      <Add disabled={this.state.edit_institute}  style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                      </InputAdornment>
                      ),
                      }}
                      label="Add" 
                      onClick={this.state.edit_institute ? '' :()=>{this.handleAddInstitutePerson()}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      : ((this.state.Institute_contact_person.length - 1) > 0 && idx == 0) ?   
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
                      <TextField 
                      disabled={this.state.edit_institute} 
                      id="document-type"   
                      InputProps={{
                      autoComplete: 'off',
                      readOnly: true,
                      startAdornment: (
                      <InputAdornment position="start" disabled={this.state.edit_institute}>
                      <Add disabled={this.state.edit_institute}  style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                      </InputAdornment>
                      ),
                      }}
                      label="Add" 
                      onClick={this.state.edit_institute ? '' :()=>{this.handleAddInstitutePerson()}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      :
                      <>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
                      <TextField 
                      disabled={this.state.edit_institute} 
                      id="document-type"   
                      InputProps={{
                      autoComplete: 'off', 
                      readOnly: true,
                      startAdornment: (
                      <InputAdornment position="start" disabled={this.state.edit_institute}>
                      <Add disabled={this.state.edit_institute}  style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />
                      </InputAdornment>
                      ),
                      }}
                      label="Add" 
                      onClick={this.state.edit_institute ? '' : ()=>{this.handleAddInstitutePerson()}}
                      variant="outlined" />
                      </FormControl></div>
                      </GridItem>
                      <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                      <div className="removeHolderStyle inputMargin"> <FormControl fullWidth> 

                      <TextField 
                      disabled={this.state.edit_trust} 
                      id="document-type"   
                      InputProps={{
                      autoComplete: 'off',
                      readOnly: true,
                      startAdornment: (
                      <InputAdornment position="start" disabled={this.state.edit_trust}>
                      <Remove disabled={this.state.edit_trust} style={{color:'rgb(220, 53, 69)', cursor:'pointer'}} className={classes.icon} />
                      </InputAdornment>
                      ),
                      }}
                      label="Del" 
                      onClick={this.state.edit_trust ? '' : ()=>{this.removeInstitutePerson(idx);}}
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
                  { this.state.edit_institute &&   <MButton   variant="outlined" onClick={()=>{this.setState({edit_institute:false});this.setState({activeStep:0}); this.scrollToTop()}} color="primary"> Edit </MButton>}
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >                                    
                <Chip onClick={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                  avatar={<Avatar>2</Avatar>}
                  label="Institute Profiling"
                  clickable
                  color="primary"
                  onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                  deleteIcon={<KeyboardArrowRight />}
                  variant="outlined"
                  />
                </GridItem>
            </GridContainer></div> } 
           

            {this.state.activeStep == 1 &&  <div>   
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
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }} 
                          id="document-type"   
                          value={institute.institute_student_count}
                          label="No of Students" 
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.institute_card_status === "Issued"} onChange={(event) => this.handleInstituteValue(index,'institute_card_status','Issued')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.institute_card_status === "Not Issued"} onChange={(event) => this.handleInstituteValue(index,'institute_card_status','Not Issued')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
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
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} value="active" control={<Radio color="primary" checked={institute.institute_website === "active"} onChange={(event) => this.handleInstituteValue(index,'institute_website','active')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                      <FormControlLabel disabled={this.state.edit_institute ? true : false}  value="inactive" control={<Radio color="primary" checked={institute.institute_website === "inactive"}  onChange={(event) => this.handleInstituteValue(index,'institute_website','inactive')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                      </RadioGroup>
                      </FormControl>  
                    </GridItem>  
                    {institute.institute_website === 'active' &&
                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                      {/*<FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_website_type}
                          label="Website Type" 
                          type="search"    
                          onChange={(event) => this.handleInstituteValue(index,"institute_website_type",event.target.value)}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                        </FormControl>*/}
                      <FormControl className={classes.margin} fullWidth>
                        <TextField
                        inputProps={{
                          autoComplete: 'off', readOnly:this.state.edit_institute
                        }}
                        className="m-2"
                        id="outlined-select-currency"
                        select
                        label="Website Type (Basic/Dynamic)"
                        options={institute.institute_website_type}
                        value={institute.institute_website_type}
                        onChange={(event) => this.handleInstituteValue(index,"institute_website_type",event.target.value)}
                        variant="outlined">
                        <MenuItem value='Basic'>Basic</MenuItem>
                        <MenuItem value='Dynamic'>Dynamic</MenuItem>
                      
                    </TextField>
                    </FormControl>
                    </GridItem>} 
                  </GridContainer>
                  {institute.institute_website === 'active' &&
                  <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                      <FormControl fullWidth className={classes.nonecapitalize}>
                        <TextField  
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                          inputProps={{
                            autoComplete: 'off',maxLength:10, readOnly:this.state.edit_institute
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
                  </div>}        
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
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} value="yes" control={<Radio color="primary" checked={institute.institute_managementsystem === "yes"} onChange={()=> this.handleInstituteValue(index,"institute_managementsystem",'yes')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} value="no" control={<Radio color="primary" checked={institute.institute_managementsystem === "no"} onChange={()=> this.handleInstituteValue(index,"institute_managementsystem",'no')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                      </RadioGroup>
                      </FormControl>  
                    </GridItem>  
                    {institute.institute_managementsystem == 'yes' &&
                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_managementsystem_name}
                          label="Name" 
                          type="search" 
                          onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_name",event.target.value)}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                      </FormControl>
                    </GridItem>}
                  </GridContainer>   
                  {institute.institute_managementsystem == 'yes' &&  <div>
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField  
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_managementsystem_place}
                          label="Place" 
                          type="search" 
                          onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_place",event.target.value)}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                      </FormControl>
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField  
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_managementsystem_price}
                          label="Price" 
                          type="search" 
                          onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_price",event.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                      </FormControl>
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_managementsystem_price_yearly}
                          label="Yearly Cost" 
                          type="search" 
                          onChange={(event) => this.handleInstituteValue(index,"institute_managementsystem_price_yearly",event.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          inputRef={this.textInput} 
                          variant="outlined" />                   
                      </FormControl>
                    </GridItem> 
                  </GridContainer> </div> }  
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>                       
                      <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position">
                      <strong style={{margin:'auto',  paddingRight:15}}>Parent App Available? </strong>   
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} value="yes" control={<Radio color="primary" checked={institute.institute_parent_app === "yes"} onChange={(event) => this.handleInstituteValue(index,"institute_parent_app",'yes')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                      <FormControlLabel disabled={this.state.edit_institute ? true : false} value="no" control={<Radio color="primary" checked={institute.institute_parent_app === "no"} onChange={(event) => this.handleInstituteValue(index,"institute_parent_app",'no')} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                      </RadioGroup>
                      </FormControl>  
                    </GridItem>   
                    {institute.institute_parent_app == 'yes' &&  
                    <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                      <FormControl fullWidth> 
                        <TextField 
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_parent_app_name}
                          label="App Name/Link" 
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
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>eGenius CAAS</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>              
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                      <FormControl fullWidth>
                        <TextField  
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_proposed_rates}
                          label="Proposed price per student" 
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_negotiable_rates}
                          label="Negotiable price per student" 
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_proposed_cost}
                          label="Proposed total cost" 
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_negotiable_cost}
                          label="Negotiable total cost" 
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
                          inputProps={{
                            autoComplete: 'off', readOnly:this.state.edit_institute
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
                            inputProps={{
                              readOnly:this.state.edit_institute
                            }}
                            margin="normal"
                            id="date-picker-dialog"
                            inputVariant="outlined"
                            label="Expected date of closure"
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
                          inputProps={{
                            readOnly:this.state.edit_institute
                          }}
                          id="document-type"   
                          value={institute.institute_comment}
                          label="Comments if any," 
                          type="search" 
                          onChange={(event) => this.handleInstituteValue(index,"institute_comment",event.target.value)}
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
                    label="Institute Profiling"
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
                  label="Institute Parameters"
                  clickable
                  color="primary"
                  onDelete={()=>{this.setState({activeStep:2}); this.scrollToTop()}}
                  deleteIcon={<KeyboardArrowRight />}
                  variant="outlined"
                />
                </GridItem>                     
              </GridContainer> 
            </div>} 
            { this.state.activeStep == 2 && 
          <div>
              <Card className="outlinedInput rowsize">
                <CardBody className={classes.customCardContentClass}>
                  <GridItem xs={12} sm={12} md={12} >
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight: 500}}>Parameters</h5>
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
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_1 === "checked"}  onClick={(event)=>{ if(institute.parameters_1 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_1','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_1 === "unchecked"} onClick={(event)=>{ if(institute.parameters_1 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_1','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell colSpan="2">2.</TableCell>
                        <TableCell align="left">Done with competition and gap analysis</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_2 === "checked"}  onClick={(event)=>{ if(institute.parameters_2 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_2','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_2 === "unchecked"} onClick={(event)=>{ if(institute.parameters_2 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_2','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell colSpan="2">3.</TableCell>
                        <TableCell align="left">Institution has understood & showed interest in adopting next generation software</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_3 === "checked"}  onClick={(event)=>{ if(institute.parameters_3 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_3','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_3 === "unchecked"} onClick={(event)=>{ if(institute.parameters_3 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_3','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
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
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_4 === "checked"}  onClick={(event)=>{ if(institute.parameters_4 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_4','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>}/>
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_4 === "unchecked"} onClick={(event)=>{ if(institute.parameters_4 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_4','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell >{' '}</TableCell>
                        <TableCell align="center">4.2.</TableCell>
                        <TableCell align="left">Influencers who try to affect the outcome</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_5 === "checked"}  onClick={(event)=>{ if(institute.parameters_5 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_5','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_5 === "unchecked"} onClick={(event)=>{ if(institute.parameters_5 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_5','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell >{' '}</TableCell>
                        <TableCell align="center">4.3.</TableCell>
                        <TableCell align="left">Deciders who have the final decision</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_6 === "checked"}  onClick={(event)=>{ if(institute.parameters_6 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_6','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_6 === "unchecked"} onClick={(event)=>{ if(institute.parameters_6 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_6','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell >{' '}</TableCell>
                        <TableCell align="center">4.4.</TableCell>
                        <TableCell align="left">Buyers who are responsible for the contract</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_7 === "checked"}  onClick={(event)=>{ if(institute.parameters_7 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_7','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>}  />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_7 === "unchecked"} onClick={(event)=>{ if(institute.parameters_7 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_7','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell >{' '}</TableCell>
                        <TableCell align="center">4.5.</TableCell>
                        <TableCell align="left">End users of the item being purchased</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_8 === "checked"}  onClick={(event)=>{ if(institute.parameters_8 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_8','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_8 === "unchecked"} onClick={(event)=>{ if(institute.parameters_8 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_8','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell >{' '}</TableCell>
                        <TableCell align="center">4.6.</TableCell>
                        <TableCell align="left">Gatekeepers who control the flow of information</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_9 === "checked"}  onClick={(event)=>{ if(institute.parameters_9 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_9','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>}/>
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_9 === "unchecked"} onClick={(event)=>{ if(institute.parameters_9 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_9','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell colSpan='2'>5.</TableCell>
                        <TableCell align="left">Full pledge Web/App demo has given to decision maker</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_10 === "checked"}  onClick={(event)=>{ if(institute.parameters_10 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_10','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_10 === "unchecked"} onClick={(event)=>{ if(institute.parameters_10 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_10','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                      <TableRow>
                        <TableCell colSpan='2'>6.</TableCell>
                        <TableCell align="left">Has reached the negotiation level.</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_11 === "checked"}  onClick={(event)=>{ if(institute.parameters_11 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_11','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_11 === "unchecked"} onClick={(event)=>{ if(institute.parameters_11 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_11','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow>  
                      <TableRow>
                        <TableCell colSpan='2'>7.</TableCell>
                        <TableCell align="left">Ready to sign the MOU</TableCell>
                        <TableCell align="center"><FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">                               
                          <FormControlLabel value="yes" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_12 === "checked"}  onClick={(event)=>{ if(institute.parameters_12 === 'checked'){ } else { this.handleInstituteValue(index,'parameters_12','checked');this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)+1)}}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel value="no" disabled={this.state.edit_institute ? true : false} control={<Radio color="primary" checked={institute.parameters_12 === "unchecked"} onClick={(event)=>{ if(institute.parameters_12 === 'unchecked'){ } else { this.handleInstituteValue(index,'parameters_12','unchecked');if(parseInt(institute.parameters_score) > 0 ) { this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score)-1)} else{this.handleInstituteValue(index,'parameters_score',parseInt(institute.parameters_score))} }}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} />
                          </RadioGroup>
                        </FormControl></TableCell>
                      </TableRow> 
                    </TableBody>
                  </Table> 
                  <GridContainer style={{marginTop:20}}>
                    <GridItem xs={12} sm={12} md={12} >
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Parameters</h5>
                    </GridItem>                         
                    <GridItem xs={12} sm={12} md={9} >
                      {(institute.parameters_score == 10 || institute.parameters_score > 10) && <Chip style={{color:'#4caf50',border:'1px solid #4caf50'}} label="High Potential Qualified Prospects" variant="outlined"/>}
                      {(institute.parameters_score == 8 || institute.parameters_score == 9) && <Chip style={{color:'#00acc1',border:'1px solid #00acc1'}} label="Medium Qualified Prospects" variant="outlined"/>}
                      {(institute.parameters_score == 6 || institute.parameters_score == 7) && <Chip color='secondary' label="Low Qualified Prospects" variant="outlined"/>}
                      {(institute.parameters_score == 4 || institute.parameters_score == 5) && <Chip style={{color:'#ff9800',border:'1px solid #ff9800'}} label="Workable Qualified Prospects" variant="outlined"/>}
                      {institute.parameters_score < 4 &&  institute.parameters_score != 0 && <Chip style={{color:'#f44336',border:'1px solid #f44336'}} label="Serious Gaps in Prospects Identification" variant="outlined"/>}
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={3} >
                      <div>{institute.parameters_score >= 1 && <span style={{fontSize:'20px'}}>Score : <b>{institute.parameters_score}</b></span>}</div>                          
                    </GridItem> 
                  </GridContainer>
                </CardBody>    
              </Card>
              <GridContainer> 
              <GridItem xs={12} sm={12} md={6}>
              <Chip onClick={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                  icon={<KeyboardArrowLeft />}
                  label="Institute Profiling"
                  clickable
                  color="primary"
                  onDelete={()=>{this.setState({activeStep:1}); this.scrollToTop()}}
                  deleteIcon={<Avatar style={{width:22,height:22,backgroundColor:'#303f9f',color:'#fff', fontSize:'0.75rem'}}>3</Avatar>}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}}>
                { this.state.edit_institute &&   <MButton   variant="outlined" onClick={()=>{this.setState({edit_institute:false});this.setState({activeStep:0}); this.scrollToTop()}} color="primary"> Edit </MButton>}
                { !this.state.edit_institute  && <div> <MButton variant="outlined" className="warningBtnOutline" disabled={this.state.buttonDisabled} style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({edit_institute:true})}>Cancel</MButton>
                <MButton variant="outlined" disabled={this.state.buttonDisabled} size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={this.handleEditInstitute.bind(this)}>{this.state.buttonName}</MButton></div>}
              </GridItem>
            </GridContainer> 
              
              </div>}
              
              </CardBody>    
            </Card></div>))}
              
             
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
