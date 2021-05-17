import React from "react";
import 'date-fns';

// react plugin for creating charts
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Chip from '@material-ui/core/Chip';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import Service from 'Utils/Service';
import Moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import NavigateNext from "@material-ui/icons/NavigateNext";
import StarBorder from '@material-ui/icons/StarBorder';
import Proposals from "./LeadsSubPages/Proposals.js";
import Tasks from "./LeadsSubPages/Tasks.js";
import Reminders from "./LeadsSubPages/Reminders.js";
import ActivityLogs from "./LeadsSubPages/ActivityLogs.js";
import MeetingUpdates from "./LeadsSubPages/MeetingUpdates.js";
import LeadsInstituteEdit from "./LeadsInstituteEdit.js";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
const panelStyles = {
  panelClass: {
    zIndex:999
  },
  inputMargin: {
    marginTop:15
  },
  tabs: {
    borderRight:' 1px solid #ddd', 
  },
  CardButton:{
    fontSize:"14px"
  },
  CustomCardBody :{
    flex: "1 1 auto",
    padding: "0px 10px",
    position: "relative"
  },
  CardButton:{
    border: "1px solid #3f51b5",
   
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
      activeAccordion:0,
      edit_institute:false,
      pages:false,
      institute_id:'',
      pagestype:'',
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
      client_id: '',
      created_by: '1',
      alert: null,
      add_more_institute:false
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

  handleEYear = (date) => {
    this.setState({ month_closure: date, formChanged:true })
  };

  scrollToTop = (type,title)=> {
    if(type !== ''){
      this.setState({ leadsInstituteEdit: false }); 
      this.getInstituteData(this.props.lead_id);
      this.raiseAlert(type,title);
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }

  raiseAlert = (type,title) => {
    this.setState({
      alert: (
        <SweetAlert
          type
          confirmBtnBsStyle={type}
          title={title}         
          showConfirm={false}
        > We are regretting for it
        </SweetAlert> 
      ),
    });
    setTimeout(() => {
      this.setState({ alert:null});
   }, 2000)
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

  handleleadupdate()
  {
    if(this.state.trust_name !== '')
    {
      let formData = new FormData();
      formData.append('id',this.props.lead_id);
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
              this.getLeadsData(this.props.lead_id);
            }, 2000)
            this.setState({edit_trust:false}); 
          } 
          else 
          {
            this.raiseAlert('danger','Somthing Went Wrong');
          }
      }).catch(error => {
        this.raiseAlert('danger','Somthing Went Wrong');
      });
    }
    else
    {
      alert("Please Enter Trust Name");
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
        this.setState({lead_contact_person:JSON.parse(response.data[0].lead_contact_details)});
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
    new Service().apiCall('InstituteDetails/GetInstituteDataByTrustId',postData).then(response =>
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

  componentDidMount() {
    this.getLeadsData(this.props.lead_id);
    this.getInstituteData(this.props.lead_id);
    // this.setState({activeAccordion:this.props.active_id});

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
  }
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
              <div className={classes.accordionRoot+" AccordionDiv"}>    
                <Accordion expanded={this.state.activeAccordion == "trust_details" ? true : false} onChange={()=>this.handleChangeAccordion("trust_details")}>
                  <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                    <GridItem xs={12} sm={12} md={12} style={{marginTop:'0px'}}>
                      <Typography className={classes.secondaryHeading}>                          
                        Trust / Congregation Details
                      </Typography>
                    </GridItem>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Card className="outlinedInput">
                        <CardBody>
                          <GridContainer>
                            <GridItem>
                            <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Trust / Congregation Details</h5>
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
                                    autoComplete: 'off',maxLength:6
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
                                    autoComplete: 'off',maxLength:10
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
                                    autoComplete: 'off',maxLength:10
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
                              <FormControl fullWidth  className={classes.nonecapitalize}>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{
                                    autoComplete: 'off'
                                    }}                 
                                  id="document-type"   
                                  value={this.state.lead_mail_id}
                                  label="Email" 
                                  type="search" 
                                  onChange={(event) => this.setPostData('lead_mail_id',event.target.value.replace(' ',''))}
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
                            <GridItem xs={12} sm={12} md={this.gridsize(idx)} className={classes.inputMargin}>
                              <FormControl fullWidth  className={classes.nonecapitalize}>                 
                                <TextField 
                                  disabled={this.state.edit_trust ? false : true} 
                                  inputProps={{ 
                                    autoComplete: 'off'
                                  }}                
                                  id="document-type"   
                                  value={person.mail_id}
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
                              onClick={this.state.edit_trust ? ()=>{this.handleAddLeadPerson()} : ''}
                              variant="outlined" />
                              </FormControl></div>
                              </GridItem>
                              : ((this.state.lead_contact_person.length - 1) > 0 && idx == 0) ?   
                              <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              <div  className="addHolderStyle inputMargin"><FormControl fullWidth >
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
                              onClick={this.state.edit_trust ? ()=>{this.handleAddLeadPerson()} : ''}
                              variant="outlined" />
                              </FormControl></div>
                              </GridItem>
                              :
                              <>
                              <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
                              <div className="removeHolderStyle inputMargin"> <FormControl fullWidth>
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
                              onClick={this.state.edit_trust ? ()=>{this.handleAddLeadPerson()} : ''}
                              variant="outlined" />
                              </FormControl></div>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={1} className={classes.inputMargin} style={{textAlign:'center'}}>
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
                              onClick={this.state.edit_trust ? ()=>{this.removeLeadPerson(idx);} : ''}
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
                    <GridContainer style={{marginTop:20}}>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                        { !this.state.edit_trust &&   <MButton   variant="outlined" onClick={()=>this.setState({edit_trust:true})} color="primary"> Edit </MButton>}
                        { this.state.edit_trust  && <div> <MButton variant="outlined" className="warningBtnOutline"  style={{color:'#000000',border:'1px solid #ffc107',marginRight:'2px'}} onClick={()=>this.setState({edit_trust:false})}>Cancel</MButton>
                        <MButton variant="outlined" size="sm" className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50'}} onClick={this.handleleadupdate.bind(this)}>Submit</MButton></div>}
                      </GridItem>
                    </GridContainer>
                  </div>
                </AccordionDetails>
              </Accordion></div>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center" style={{marginTop:'20px'}}>              
          <GridItem xs={12} sm={12} md={9}>
            <div className={classes.accordionRoot+" AccordionDiv"} fullWidth> 
              {this.state.InstituteDetails.length > 0 && this.state.InstituteDetails.map((element, index) => (
              <Accordion expanded={this.state.activeAccordion === element.id ? true : false} onChange={()=>this.handleChangeAccordion(element.id)}>
                <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel2bh-content" id="panel2bh-header">
                  <GridItem xs={12} sm={12} md={9} style={{marginTop:'0px'}}>
                    <Typography className={classes.secondaryHeading}>                          
                      {element.institute_name}
                    </Typography>
                  </GridItem>  
                  <GridItem xs={12} sm={12} md={3} style={{textAlign:'center'}}><Chip style={{color:'purple'}} variant="outlined" size="small" label={element.institute_status}  clickable/></GridItem> 
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{width:'100%'}}>                                     
                    <List component="nav" aria-label="main mailbox folders" > 
                     
                      <GridContainer justify="center" alignItems="center">
                        <GridItem xs={12} sm={12} md={10} lg={10}> 
                          <Card>
                            <CardBody className={classes.CustomCardBody}>
                              <ListItem button onClick={()=>{this.setState({leadsInstituteEdit:true,add_more_institute:true});this.setState({ins_id:element.id})}} > 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Profile" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem> 
                            </CardBody>
                          </Card>
                          <Card>
                            <CardBody>
                              <ListItem button onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Meeting Updates'});this.setState({ins_id:element.id})}}> 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Meeting Updates" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem>
                              {/* <ListItem button onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Proposals'});this.setState({ins_id:element.id})}}> 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Proposals" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem> 
                              <ListItem button onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Tasks'});this.setState({ins_id:element.id})}}> 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Tasks" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem>
                              <ListItem button onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Reminders'});this.setState({ins_id:element.id})}}> 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Reminders" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem>
                              <ListItem button onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Activity Log'});this.setState({ins_id:element.id})}}> 
                                <ListItemIcon><StarBorder /></ListItemIcon>
                                <ListItemText primary="Activity Log" />
                                <GridItem  className="pickerGrid" style={{textAlign:'right'}}>   
                                  <Avatar variant="outlined"  style={{float:'right',marginRight:10}}><NavigateNext /></Avatar>                             
                                </GridItem>
                              </ListItem>*/}
                            </CardBody>
                          </Card> 
                        </GridItem>
                      </GridContainer>
                      {/*<GridContainer justify="center"> 
                      <GridItem xs={12} sm={12} md={2} lg={2}>
                        <button style={{width:"100%"}} className={classes.CardButton} onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Meeting Updates'});this.setState({ins_id:element.id})}}>
                        <Typography style={{paddingTop:"10px",fontSize:"14px"}}>  Meeting Updates</Typography>
                        <NavigateNext />
                        </button>
                      </GridItem> 
                      <GridItem xs={12} sm={12} md={2} lg={2}>
                        <button className={classes.CardButton} style={{width:"100%"}} onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Proposals'});this.setState({ins_id:element.id})}} >
                          <Typography style={{paddingTop:"10px",fontSize:"14px"}}>Proposals</Typography>
                            <NavigateNext />
                        </button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2} lg={2}>
                        <button className={classes.CardButton} style={{width:"100%"}} onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Tasks'});this.setState({ins_id:element.id})}}>
                          <Typography style={{paddingTop:"10px",fontSize:"14px"}}>Tasks</Typography>
                            <NavigateNext />
                        </button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2} lg={2}>
                        <button className={classes.CardButton} style={{width:"100%"}} onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Reminders'});this.setState({ins_id:element.id})}} >
                              <Typography style={{paddingTop:"10px",fontSize:"14px"}}>Reminder</Typography>
                                <NavigateNext />
                        </button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2} lg={2}>
                        <button  onClick={()=>{this.setState({pages:true});this.setState({pagestype:'Activity Log'});this.setState({ins_id:element.id})}} className={classes.CardButton} style={{width:"100%"}}>
                          <Typography style={{paddingTop:"10px",fontSize:"14px"}}>Activity Log</Typography>
                            <NavigateNext />
                        </button>
                      </GridItem>
                      </GridContainer>*/}
                    </List>
                  </div>
                </AccordionDetails>
              </Accordion>))}
            </div>
          </GridItem>
        </GridContainer>
        
        <GridContainer  justify="center" alignItems="center">    
          <GridItem xs={12} sm={12} md={9} style={{textAlign:'right',marginTop:20}}>
            <div><MButton variant="outlined" size="sm" onClick={()=>{this.setState({leadsInstituteEdit:true,add_more_institute:false});this.setState({ins_id:''});this.setState({lead_id:this.props.lead_id});this.setState({trust_name:this.props.trust_name})}} className="successBtnOutline" style={{color:'#4caf50',border:'1px solid #4caf50',backgroundColor:'white'}}>Add More Institute</MButton></div>
          </GridItem>
        </GridContainer>

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.leadsInstituteEdit }
              title="Add/Edit Lead Institute"
              onRequestClose={ () => {
                this.setState({ leadsInstituteEdit: false });
            }}>
          <div>  
              <LeadsInstituteEdit  handleNotificationButton={this.scrollToTop} {...this.props} ins_id={this.state.ins_id} add_more_institute={this.state.add_more_institute} />
          </div>
        </SlidingPane>   
        
        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.pages }
              title={this.state.pagestype}
              onRequestClose={ () => {
                this.setState({ pages: false });
            }}>
          <div>  
            {this.state.pagestype === 'Proposals' &&
              <Proposals  handleProposalsButton={this.scrollToTop} {...this.props} institute_id={this.state.ins_id} />
            } 
            {this.state.pagestype === 'Tasks' &&
              <Tasks  handleProposalsButton={this.scrollToTop} {...this.props} institute_id={this.state.ins_id} />
            } 
            {this.state.pagestype === 'Reminders' &&
              <Reminders  handleProposalsButton={this.scrollToTop} {...this.props} institute_id={this.state.ins_id} />
            }
            {this.state.pagestype === 'Activity Log' &&
              <ActivityLogs  handleProposalsButton={this.scrollToTop} {...this.props} institute_id={this.state.ins_id} />
            } 
            {this.state.pagestype === 'Meeting Updates' &&
              <MeetingUpdates  handleProposalsButton={this.scrollToTop} {...this.props} institute_id={this.state.ins_id} />
            }
          </div>
        </SlidingPane>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
