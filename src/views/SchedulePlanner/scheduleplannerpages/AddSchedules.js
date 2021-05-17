import React from "react";
import 'date-fns';

import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Remove from "@material-ui/icons/Remove";  
import Add from "@material-ui/icons/Add";  
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Checkbox from "@material-ui/core/Checkbox";
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailOutline from "@material-ui/icons/MailOutline";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Button from "components/CustomButtons/Button.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomSnackbarContent from "components/Snackbar/CustomSnackbarContent.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import 'date-fns';
// @material-ui/core components
import MButton from '@material-ui/core/Button';
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Service from 'Utils/Service';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import SweetAlert from "react-bootstrap-sweetalert";

import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker, 
  KeyboardTimePicker,
} from '@material-ui/pickers'; 
// import "assets/External-Cssjs/scheduleplanner.css";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
const divStyle = {
  display: 'flex',  justifyContent:'left', alignItems:'left' // 'ms' is the only lowercase vendor prefix
};

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  inputMarginadd: {
    marginTop:15
  },
  root: {
    maxWidth: 345,
    flexBasis: 'auto',
    position: 'relative',
    flexgrow: '1',
    flex: '0 1 auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
      meeting_description:'', 
      today:Moment(new Date()).format("YYYY-MM-DD"), 
      meetingDate:Moment(new Date()).format("YYYY-MM-DD"), 
      meetingTime:Moment(new Date()).format("YYYY-MM-DD hh:mm A"), 
      meeting_type:'In Person', 
      EgeniusContactPerson:[],     
      InstituteContactPerson:[],     
      created_by_id: this.props.data.user_id,     
      created_by: this.props.data.name,     
      addclientcontactperson:false,     
      person_name:'',
      designation:'',
      approver:'',
      decision_maker:'',
      influencer:'',
      evaluator_recommender:'',
      gatekeeper_blocker:'',
      users:'',
      champion:'',
      mentor:'',
      contact_number_one:'',
      contact_number_two:'',
      mail_id:'',
      institute_name:'',
      buttonName:'Finish',
      buttonDisabled:false
    }
  }

  handleEgeniusPersonValue = (Index,inputName,Value) => {
    let lcontact_person = this.state.EgeniusContactPerson;
    lcontact_person[Index][inputName] = Value;
    this.setState({EgeniusContactPerson:lcontact_person});
  } 
  handleInstitutePersonValue = (Index,inputName,Value) => {
    let lcontact_person = this.state.InstituteContactPerson;
    lcontact_person[Index][inputName] = Value;
    this.setState({InstituteContactPerson:lcontact_person});
  }

  handleDateChange = (date) => {
    this.setState({meetingDate:Moment(date).format("YYYY-MM-DD")});
  }; 
  
  handleTimeChange = (date) => {
    this.setState({meetingTime:Moment(date).format("YYYY-MM-DD hh:mm A")});
  };

  getInstituteData(id){
    const postData = { id:id };
    new Service().apiCall('InstituteDetails/GetInstituteDataById',postData).then(response =>
    {
      if (response.status==200 && response.data!='') 
      {
        this.setState({institute_name:response.data[0].institute_name});
        this.setState({trust_name:response.data[0].trust_name});
        const newArr = JSON.parse(response.data[0].institute_contact_details);
        const newArradded = newArr.map(v => ({...v, selected: '', color:'white',variant:'outlined'}));
        this.setState({InstituteContactPerson:newArradded});   
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }  
  
  getEmployeeData(){
    const postData = {  };
    new Service().apiCall('EmployeeDetails/GetAllData',postData).then(response =>
    {
      if (response.status==200 && response.data!='') {
        const newArradded = response.data.map(v => ({...v, selected: '',color:'white',variant:'outlined'}));
        this.setState({EgeniusContactPerson:newArradded});         
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }  

  componentDidMount() {
    this.getInstituteData(this.props.institute_id);
    this.getEmployeeData();
  } 
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
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

  handleSchudleCreation()
  {
    if(this.state.meeting_type !== '' && this.state.meeting_description !== '' && this.state.InstituteContactPerson !== '' && this.state.meetingDate !== '' && this.state.meetingDate !== 'Invalid date' && this.state.meetingTime !== '' && this.state.meetingTime !== 'Invalid date')
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});

      let formData = new FormData();
      formData.append('institute_id',this.props.institute_id);
      formData.append('institute_name',this.state.institute_name);
      formData.append('meeting_type',this.state.meeting_type);
      formData.append('meetingDate',this.state.meetingDate);
      formData.append('meetingTime',this.state.meetingTime);
      formData.append('meeting_time_formated',Moment(this.state.meetingTime).format("hh:mm A"));
      formData.append('meeting_description',this.state.meeting_description);
      formData.append('created_by_id',this.state.created_by_id);
      formData.append('created_by',this.state.created_by);
      formData.append('institute_contact_person',JSON.stringify(this.state.InstituteContactPerson));
      formData.append('egenius_contact_person',JSON.stringify(this.state.EgeniusContactPerson));

      new Service().apiCall('SchedulePlanner/InsertUpdateData', formData).then(response => 
      { 
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            alert: (
              <SweetAlert
                success
                confirmBtnBsStyle="success"
                title="Scheduled Successfully!"
                showConfirm={false}
              >Now you can access all support of this leads
              </SweetAlert>    
            ),
          });
          setTimeout(() => {
            this.setState({ alert:null,buttonName:'Finish',buttonDisabled:false});
            this.props.handleMeetingSelectedPage('close');
          }, 2000)
        } 
      }).catch(error => {
        this.raiseLoginSignupErrorAlert('test');
        this.setState({ buttonName:'Finish',buttonDisabled:false});
      });
    }
    else
    {
      alert('Please fill all the details');
    }
  }

  addcontact()
  {
    if(this.state.person_name !== '' && (this.state.contact_number_one !== '' || this.state.contact_number_two !== ''))
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});

      this.setState({ addclientcontactperson:false});
      let lauthorHolders = this.state.InstituteContactPerson;
      let NewLeadContactPerson = {};
      NewLeadContactPerson.person_name=this.state.person_name;
      NewLeadContactPerson.designation=this.state.designation;
      NewLeadContactPerson.approver=this.state.approver;
      NewLeadContactPerson.decision_maker=this.state.decision_maker;
      NewLeadContactPerson.influencer=this.state.influencer;
      NewLeadContactPerson.evaluator_recommender=this.state.evaluator_recommender;
      NewLeadContactPerson.gatekeeper_blocker=this.state.gatekeeper_blocker;
      NewLeadContactPerson.users=this.state.users;
      NewLeadContactPerson.champion=this.state.champion;
      NewLeadContactPerson.mentor=this.state.mentor;
      NewLeadContactPerson.contact_number_one=this.state.contact_number_one;
      NewLeadContactPerson.contact_number_two=this.state.contact_number_two;
      NewLeadContactPerson.mail_id=this.state.mail_id;
      NewLeadContactPerson.variant='outlined';
      lauthorHolders.push(NewLeadContactPerson);
      this.setState({InstituteContactPerson:lauthorHolders});
      
      let formData = new FormData();
      formData.append('institute_id',this.props.institute_id);
      formData.append('institute_contact_person',JSON.stringify(this.state.InstituteContactPerson));
      new Service().apiCall('InstituteDetails/AddInstituteContact', formData).then(response => 
      { 
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            alert: (
              <SweetAlert
                success
                confirmBtnBsStyle="success"
                title="Contact Created Successfully!"
                showConfirm={false}
              >Now you can access all support of this leads
              </SweetAlert>    
            ),
          });
            setTimeout(() => {
              this.setState({ alert:null,buttonName:'Finish',buttonDisabled:false});  
              this.formreset();
            }, 2000)
        } 
        else 
        {
          this.raiseLoginSignupErrorAlert('test');
          this.setState({buttonName:'Finish',buttonDisabled:false}); 
        }
      }).catch(error => {
        this.raiseLoginSignupErrorAlert('test');
        this.setState({buttonName:'Finish',buttonDisabled:false}); 
      });
    }
    else
    {
      alert('Please add person name and contact Number');
    }
  } 

  formreset = () =>{
    this.setState({person_name:''});
    this.setState({designation:''});
    this.setState({approver:''});
    this.setState({decision_maker:''});
    this.setState({influencer:''});
    this.setState({evaluator_recommender:''});
    this.setState({gatekeeper_blocker:''});
    this.setState({users:''});
    this.setState({champion:''});
    this.setState({mentor:''});
    this.setState({contact_number_one:''});
    this.setState({contact_number_two:''});
    this.setState({mail_id:''});
  }

  render(){
  const { classes } = this.props;

  return (
    <div>
      {this.state.alert}
        <GridContainer  justify="center" alignItems="center">              
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose"><MailOutline/></CardIcon>
                <h4 className={classes.cardIconTitle}>Schedule Creation</h4>
              </CardHeader>
              <CardBody>
                <div>
                  <Card className="outlinedInput">
                    <CardBody>
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position">
                              <FormControlLabel value="in_person" control={<Radio color="primary" checked={this.state.meeting_type === "In Person"} onChange={()=> this.setState({meeting_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In Person</span>} />
                            </RadioGroup>
                          </FormControl>  
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                          <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position">
                              <FormControlLabel value="telephonic" control={<Radio color="primary" checked={this.state.meeting_type === "Telephonic"} onChange={()=> this.setState({meeting_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>} />
                            </RadioGroup>
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
                              label="Date of Meeting"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              onChange={this.handleDateChange}   
                              minDate={this.state.today}
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
                              <KeyboardTimePicker
                              margin="normal"
                              autoOk={true}
                              value={this.state.meetingTime}
                              shrink={true}
                              id="time-picker"
                              label="Time of Meeting"
                              inputVariant="outlined"
                              onChange={this.handleTimeChange}   
                              KeyboardButtonProps={{
                              'aria-label': 'change time', 
                              }} 
                              />
                            </MuiPickersUtilsProvider>                  
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} >
                          <CKEditor
                              editor={ ClassicEditor }
                              config={{placeholder: "Enter agenda here"}} 
                              data=""
                              onInit={ editor => {                          
                                  // You can store the "editor" and use when it is needed.
                                  console.log( 'Meetings Details!', editor );
                              } }
                              onChange={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ meeting_description: data.charAt(0).toUpperCase()+ data.slice(1)});
                              } }
                              onBlur={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ meeting_description: data.charAt(0).toUpperCase()+ data.slice(1)});
                              } }
                              onFocus={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ meeting_description: data.charAt(0).toUpperCase()+ data.slice(1)});
                              } }                           
                          />
                        </GridItem>  
                        <GridItem xs={12} sm={12} md={6} style={{textAlign:'center'}} > 
                          <Card>
                            <CardBody>                              
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Client Participants</h5>
                                </GridItem>
                              </GridContainer> 
                              <GridContainer  alignItems="center">
                                <GridItem style={{marginTop:5}}>  
                                {this.state.InstituteContactPerson.map((element, index) => ( element.person_name !== ''  &&                                                                      
                                  <Chip
                                    style={{marginRight:10,marginTop:5}}
                                    label={element.person_name}
                                    clickable
                                    color={element.color}
                                    onClick={()=> {if(element.color == 'primary' ){this.handleInstitutePersonValue(index,'color',);this.handleInstitutePersonValue(index,'variant','outlined')}else{this.handleInstitutePersonValue(index,'color','primary');this.handleInstitutePersonValue(index,'variant',)}}}
                                    deleteIcon={<DoneIcon />}
                                    variant={element.variant}
                                  /> ))}
                                </GridItem>  
                                <GridItem xs={12} sm={12} md={12} style={{marginTop:5}} style={{textAlign:'right'}}>  
                                  <Chip 
                                    style={{marginTop:5}}
                                    icon={<Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon} />}
                                    label="Add"
                                    clickable
                                    color=""
                                    onClick={()=> this.setState({ addclientcontactperson:true })}
                                    variant="outlined"
                                  /> 
                                </GridItem>
                              </GridContainer>                                                           
                            </CardBody>
                          </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} style={{textAlign:'center'}} > 
                          <Card>
                            <CardBody>                              
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                                  <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>eReleGo Participants</h5>
                                </GridItem>
                              </GridContainer>   
                              <GridContainer  alignItems="center">
                                <GridItem style={{marginTop:5}}> 
                                {this.state.EgeniusContactPerson.map((element, index) => (                                                                         
                                  <Chip
                                  style={{marginRight:10,marginTop:5}}
                                    label={element.name}
                                    clickable
                                    color={element.color}
                                    onClick={()=> {if(element.color == 'primary' ){this.handleEgeniusPersonValue(index,'color',);this.handleEgeniusPersonValue(index,'variant','outlined')}else{this.handleEgeniusPersonValue(index,'color','primary');this.handleEgeniusPersonValue(index,'variant',)}}}
                                    deleteIcon={<DoneIcon />}
                                    variant={element.variant}
                                  />))}
                                </GridItem> 
                              </GridContainer> 
                            </CardBody>
                          </Card>
                        </GridItem>                 
                      </GridContainer>  
                    </CardBody>
                  </Card> 
                  
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}} >
                      {/*<MButton  style={{marginRight:'2px'}}  variant="outlined" color="primary">Reset</MButton>*/} 
                      <MButton  type="submit" disabled={this.state.buttonDisabled} color="rose" onClick={this.handleSchudleCreation.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
                    </GridItem>
                  </GridContainer> 
                </div>
              </CardBody>
            </Card> 
            
          </GridItem>       
        </GridContainer>

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle5}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.addclientcontactperson}
              title="Add Client Contact"
              onRequestClose={ () => this.setState({ addclientcontactperson: false }) }>
          <div> 
            <Card className="outlinedInput">
              <CardContent> 
                <GridContainer>   
                  <GridItem xs={12} sm={12} md={6} className={classes.inputMargin}>
                    <FormControl fullWidth>
                      <TextField 
                        inputProps={{
                        autoComplete: 'off'
                        }}
                      id="document-type"   
                      value={this.state.person_name}
                      label="Person Name" 
                      type="search" 
                      onChange={(event) => this.setState({person_name:event.target.value.charAt(0).toUpperCase()+ event.target.value.slice(1)})}
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
                      value={this.state.designation}
                      label="Designation" 
                      type="search" 
                      onChange={(event) => this.setState({designation:event.target.value.charAt(0).toUpperCase()+ event.target.value.slice(1)})}
                      inputRef={this.textInput} 
                      variant="outlined" />                   
                    </FormControl>
                  </GridItem>  
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.approver}
                          onChange={(event) => this.setState({approver:'yes'})}
                          color="primary"
                          checked={this.state.approver === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Approver</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.decision_maker}
                          onChange={(event) => this.setState({decision_maker:'yes'})}
                          name="DecisionMaker"
                          color="primary"
                          checked={this.state.decision_maker === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Decision Maker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.influencer}
                          onChange={(event) => this.setState({influencer:'yes'})}
                          color="primary"
                          checked={this.state.influencer === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Influencer</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.evaluator_recommender}
                          onChange={(event) => this.setState({evaluator_recommender:'yes'})}
                          color="primary"
                          checked={this.state.evaluator_recommender === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Evaluator/Recommender</span>}
                    />						  
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        value={this.state.gatekeeper_blocker}
                        onChange={(event) => this.setState({gatekeeper_blocker:'yes'})}
                        color="primary"
                        checked={this.state.gatekeeper_blocker === 'yes' ? true : false}
                      />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Gatekeeper/Blocker</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.users}
                          onChange={(event) => this.setState({users:'yes'})}
                          color="primary"
                          checked={this.state.users === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Users</span>}
                    />
                  </GridItem> 
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.champion}
                          onChange={(event) => this.setState({champion:'yes'})}
                          color="primary"
                          checked={this.state.champion === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Champion</span>}
                    />
                  </GridItem>
                  <GridItem  xs={12} sm={12} md={3} className={classes.inputMargin}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={this.state.mentor}
                          onChange={(event) => this.setState({mentor:'yes'})}
                          color="primary"
                          checked={this.state.mentor === 'yes' ? true : false}
                        />
                      }
                      label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Mentor</span>}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth>                 
                      <TextField 
                        inputProps={{
                          autoComplete: 'off',
                          maxLength: 10
                        }}                
                        id="document-type"   
                        value={this.state.contact_number_one}
                        label="Contact Number 1" 
                        type="search" 
                        onChange={(event) => this.setState({contact_number_one:event.target.value})}
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
                          maxLength: 10
                        }}                
                        id="document-type"   
                        value={this.state.contact_number_two}
                        label="Contact Number 2" 
                        type="search" 
                        onChange={(event) => this.setState({contact_number_two:event.target.value})}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                    <FormControl fullWidth className={classes.nonecapitalize} >                 
                      <TextField 
                        inputProps={{ 
                        autoComplete: 'off'
                        }}                
                        id="document-type"   
                        value={this.state.mail_id}
                        label="Email" 
                        type="search" 
                        onChange={(event) => this.setState({mail_id:event.target.value.replace(' ','')})}
                        inputRef={this.textInput} 
                        variant="outlined" />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer style={{marginTop:10}} > 
                  <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}} >
                    {/*<MButton  style={{marginRight:'2px'}}  onClick={()=> this.formreset()} variant="outlined" color="primary">Reset</MButton>*/}
                    <MButton  type="submit" color="rose" disabled={this.state.buttonDisabled} onClick={this.addcontact.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
                  </GridItem>
                </GridContainer> 
              </CardContent>
            </Card>
          </div>
        </SlidingPane> 
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  