import React from "react";
import 'date-fns';

import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"; 
import MailOutline from "@material-ui/icons/MailOutline";
import FormControl from "@material-ui/core/FormControl";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Chip from '@material-ui/core/Chip';
import Checkbox from "@material-ui/core/Checkbox";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DoneIcon from '@material-ui/icons/Done';
import 'date-fns';
import Add from "@material-ui/icons/Add";  
import Edit from "@material-ui/icons/Create";  
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
import FormLabel from "@material-ui/core/FormLabel";
import Moment from 'moment';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import SlidingPane from 'react-sliding-pane';
import Button from "components/CustomButtons/Button.js";
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import CustomSnackbarContent from "components/Snackbar/CustomSnackbarContent.js";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker, 
  KeyboardTimePicker,
} from '@material-ui/pickers';  
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
const panelStyles = {
  panelClass: {
    zIndex:999
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
  inputMarginadd: {
    marginTop:15
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
      edit_schedule:false, 
      addclientcontactperson:false, 
      agenda_status:'', 
      meeting_description:'', 

      today:Moment(new Date()).format("YYYY-MM-DD"), 
      meetingDate:Moment(new Date()).format("YYYY-MM-DD"), 
      attended_meeting_date:Moment(new Date()).format("YYYY-MM-DD"), 
      next_meetingDate:Moment(new Date()).format("YYYY-MM-DD"), 
      reschedule_meetingDate:Moment(new Date()).format("YYYY-MM-DD"), 

      meetingTime:Moment(new Date()).format("YYYY-MM-DD hh:mm A"), 
      attended_meeting_time:Moment(new Date()).format("YYYY-MM-DD hh:mm A"), 
      next_meetingTime:Moment(new Date()).format("YYYY-MM-DD hh:mm A"), 
      reschedule_meetingTime:Moment(new Date()).format("YYYY-MM-DD hh:mm A"), 

      EgeniusContactPerson:[],     
      InstituteContactPerson:[],        
      ScheduleInstituteContactPerson: [],
      ScheduleEgeniusContactPerson: [],
      MinutesMeetingCP: [],
      MinutesMeetingEP: [],
      NextMeetingCP: [],
      NextMeetingEP: [],
      RescheduleMeetingCP: [],
      RescheduleMeetingEP: [],
      meetingstatus:'',
      agenda_type:'Same',
      meeting_status:'Close',
      next_meeting_schedule:'Yes',
      statusData:[],
      mom_type:'',
      mom_date:'',
      mom_time:'',
      attended_minutes_meeting:'',
      attended_egenius_contact_person:[],     
      attended_institute_contact_person:[],  
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
      reschedule_meeting_description:'',
      reason_reschedule:'',
      next_meeting_type:'',
      next_meeting_description:'',
      created_by_id:this.props.data.user_id,     
      created_by:this.props.data.name,   
      buttonName:'Finish',
      buttonDisabled:false,
      instituteStatusFrom:'',
      institute_status_from:'',
      institute_status_to:''
    }
  }

  handleDateChange = (date) => {
    this.setState({meetingDate:Moment(date).format("YYYY-MM-DD")});
  }; 

  handleTimeChange = (date) => {
    this.setState({meetingTime:Moment(date).format("YYYY-MM-DD hh:mm A")});
  }; 
    
  handleMOMTDateChange = (date) => {
    this.setState({attended_meeting_date:Moment(date).format("YYYY-MM-DD")});
  }; 
  
  handleMOMTimeChange = (date) => {
    this.setState({attended_meeting_time:Moment(date).format("YYYY-MM-DD hh:mm A")});
  }; 

  handleNMDateChange = (date) => {
    this.setState({next_meetingDate:Moment(date).format("YYYY-MM-DD")});
  }; 

  handleNMTimeChange = (date) => {
    this.setState({next_meetingTime:Moment(date).format("YYYY-MM-DD hh:mm A")});
  }; 
  
  handleRescheduleDateChange = (date) => {
    this.setState({reschedule_meetingDate:Moment(date).format("YYYY-MM-DD")});
  }; 

  handleRescheduleTimeChange = (date) => {
    this.setState({reschedule_meetingTime:Moment(date).format("YYYY-MM-DD hh:mm A")});
  };

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

  getLeadStatusData() {
    const postData = {  };
    new Service().apiCall('Status/GetAllData',postData).then(response =>
    {
      if (response.status === 200 && response.data !='') {
        this.setState({statusData: response.data });
      }else{
        this.setState({statusData: []}); 
      }
    }).catch(error => {
      alert(error.response.data);
    });
  } 

  GetDataByInstituteID(id,institute_id) {  
    const postData = { id:id,institute_id:institute_id };
    new Service().apiCall('SchedulePlanner/GetDataByInstituteID',postData).then(response =>
    {
      if (response.data!='') 
      {              
        this.setState({trust_id:response.data[0].trust_id});
        this.setState({trust_name:response.data[0].trust_name});
        this.setState({institute_id:response.data[0].institute_id});
        this.setState({institute_name:response.data[0].institute_name});
        this.setState({meeting_type:response.data[0].meeting_type});
        this.setState({attended_meeting_type:response.data[0].meeting_type});
        this.setState({reschedule_meeting_type:response.data[0].meeting_type});
        this.setState({meetingDate:response.data[0].meeting_date});
        this.setState({attended_meeting_date:response.data[0].meeting_date});
        this.setState({meetingTime:response.data[0].meeting_time});
        this.setState({attended_meeting_time:response.data[0].meeting_time});
        this.setState({meeting_time_formated:response.data[0].meeting_time_formated});
        this.setState({meeting_description:response.data[0].meeting_description});
        this.setState({reschedule_meeting_description:response.data[0].meeting_description});
        this.setState({meeting_status:response.data[0].meeting_status});
        if(response.data[0].egenius_contact_person != ''){
          this.setState({ScheduleEgeniusContactPerson:JSON.parse(response.data[0].egenius_contact_person)}); 
        } 
        if(response.data[0].institute_contact_person != ''){
          this.setState({ScheduleInstituteContactPerson:JSON.parse(response.data[0].institute_contact_person)});  
        }

        this.setState({mom_type:response.data[0].attended_meeting_type});
        this.setState({mom_date:response.data[0].attended_meeting_date});
        this.setState({mom_time:response.data[0].attended_meeting_time});
        this.setState({attended_minutes_meeting:response.data[0].attended_minutes_meeting});
        this.setState({institute_status_from:response.data[0].institute_status_from});
        this.setState({institute_status_to:response.data[0].institute_status_to});
        this.setState({schedule_type:response.data[0].schedule_type});
        if(response.data[0].attended_egenius_contact_person != ''){
          this.setState({attended_egenius_contact_person:JSON.parse(response.data[0].attended_egenius_contact_person)}); 
        } 
        if(response.data[0].attended_institute_contact_person != ''){
          this.setState({attended_institute_contact_person:JSON.parse(response.data[0].attended_institute_contact_person)});  
        }
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }   
  
  GetDataByScheduleID(id) {  
    const postData = { id:id };
    new Service().apiCall('SchedulePlanner/GetDataByScheduleID',postData).then(response =>
    {
      if (response.data!='') 
      {      
        this.setState({trust_id:response.data[0].trust_id});
        this.setState({trust_name:response.data[0].trust_name});
        this.setState({institute_id:response.data[0].institute_id});
        this.setState({institute_name:response.data[0].institute_name});
        this.setState({meeting_type:response.data[0].meeting_type});
        this.setState({attended_meeting_type:response.data[0].meeting_type});
        this.setState({reschedule_meeting_type:response.data[0].meeting_type});
        this.setState({meetingDate:response.data[0].meeting_date});
        this.setState({attended_meeting_date:response.data[0].meeting_date});
        this.setState({meetingTime:response.data[0].meeting_time});
        this.setState({attended_meeting_time:response.data[0].meeting_time});
        this.setState({meeting_time_formated:response.data[0].meeting_time_formated});
        this.setState({meeting_description:response.data[0].meeting_description});
        this.setState({reschedule_meeting_description:response.data[0].meeting_description});
        this.setState({meeting_status:response.data[0].meeting_status});
        if(response.data[0].egenius_contact_person != ''){
          this.setState({ScheduleEgeniusContactPerson:JSON.parse(response.data[0].egenius_contact_person)}); 
        } 
        if(response.data[0].institute_contact_person != ''){
          this.setState({ScheduleInstituteContactPerson:JSON.parse(response.data[0].institute_contact_person)});  
        }

        this.setState({mom_type:response.data[0].attended_meeting_type});
        this.setState({mom_date:response.data[0].attended_meeting_date});
        this.setState({mom_time:response.data[0].attended_meeting_time});
        this.setState({attended_minutes_meeting:response.data[0].attended_minutes_meeting});
        this.setState({institute_status_from:response.data[0].institute_status_from});
        this.setState({institute_status_to:response.data[0].institute_status_to});
        this.setState({schedule_type:response.data[0].schedule_type});
        if(response.data[0].attended_egenius_contact_person != ''){
          this.setState({attended_egenius_contact_person:JSON.parse(response.data[0].attended_egenius_contact_person)}); 
        } 
        if(response.data[0].attended_institute_contact_person != ''){
          this.setState({attended_institute_contact_person:JSON.parse(response.data[0].attended_institute_contact_person)});  
        }
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }  

  getInstituteData(){
    const postData = { id:this.props.institute_id };
    this.setState({InstituteContactPerson:[]}); 
    new Service().apiCall('InstituteDetails/GetInstituteDataById',postData).then(response =>
    {
      if (response.status==200 && response.data!='') 
      {
        const arraystart = JSON.parse(response.data[0].institute_contact_details);
        const nerarray = arraystart.map(v => ({...v,color:'', edit:true}));
        const newArradded = nerarray.map((v,index) => { 
          if(this.state.ScheduleInstituteContactPerson.includes(this.state.ScheduleInstituteContactPerson[index]) && this.state.ScheduleInstituteContactPerson[index].color == 'primary' ){
            nerarray[index].color='primary';
          }else{
            nerarray[index].color='';   
          }
        });   

        this.setState({InstituteContactPerson:nerarray}); 
        this.setState({MinutesMeetingCP:nerarray.map(v => ({...v,min:''}))}); 
        this.setState({NextMeetingCP:nerarray.map(v => ({...v,next:''}))}); 
        this.setState({RescheduleMeetingCP:nerarray.map(v => ({...v,resc:''}))}); 

        this.setState({edit_status:response.data[0].institute_status}); 
        this.setState({instituteStatusFrom:response.data[0].institute_status}); 
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
        const nerarray = response.data.map(v => ({...v, selected: '',color:'white',edit:true}));
        const newArradded = nerarray.map((v,index) => { 
            if(this.state.ScheduleEgeniusContactPerson.includes(this.state.ScheduleEgeniusContactPerson[index]) && this.state.ScheduleEgeniusContactPerson[index].color == 'primary' ){
              nerarray[index].color='primary';
            }else{
              nerarray[index].color='';   
            }
        }); 
        this.setState({MinutesMeetingEP:nerarray.map(v => ({...v,min:''}))}); 
        this.setState({NextMeetingEP:nerarray.map(v => ({...v,next:''}))}); 
        this.setState({RescheduleMeetingEP:nerarray.map(v => ({...v,resc:''}))});        
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }  

  componentDidMount() {
    if(this.props.schedule_id !== '' && this.props.schedule_id !== undefined){
      this.GetDataByScheduleID(this.props.schedule_id,this.props.institute_id);
    }else{
      this.GetDataByInstituteID(this.props.schedule_id,this.props.institute_id);
    }
      this.getInstituteData();
      this.getEmployeeData();
      this.getLeadStatusData();
      this.setState({meeting_status:this.props.meeting_status});
  }

  handlescheduleupdate()
  {
    if(this.state.attended_meeting_type !== '' && this.state.attended_minutes_meeting !== '' && this.state.attended_meeting_date !== '' && this.state.attended_meeting_date !== 'Invalid date' && this.state.attended_meeting_time !== '' && this.state.attended_meeting_time !== 'Invalid date' && ((this.state.next_meeting_schedule === "Yes" && this.state.next_meeting_type !== '' && this.state.next_meetingDate !== '' && this.state.next_meetingDate !== 'Invalid date' && this.state.next_meetingTime !== '' && this.state.next_meetingTime !== 'Invalid date'&& this.state.next_meeting_description !== '') || (this.state.next_meeting_schedule === "No")))
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});

      let formData = new FormData();
      formData.append('id',this.props.schedule_id);
      formData.append('attended_meeting_type',this.state.attended_meeting_type);
      formData.append('attended_meeting_date',this.state.attended_meeting_date);
      formData.append('attended_meeting_time',this.state.attended_meeting_time);
      formData.append('attended_meeting_time_formated',Moment(this.state.attended_meeting_time).format("hh:mm A"));
      formData.append('attended_minutes_meeting',this.state.attended_minutes_meeting);
      formData.append('meeting_status','Close');
      formData.append('attended_institute_contact_person',JSON.stringify(this.state.MinutesMeetingCP));
      formData.append('attended_egenius_contact_person',JSON.stringify(this.state.MinutesMeetingEP));
      formData.append('institute_id',this.props.institute_id);
      formData.append('institute_name',this.state.institute_name);
      formData.append('meeting_type',this.state.next_meeting_type);
      formData.append('meetingDate',this.state.next_meetingDate);
      formData.append('meetingTime',this.state.next_meetingTime);
      formData.append('meeting_time_formated',Moment(this.state.next_meetingTime).format("hh:mm A"));
      formData.append('meeting_description',this.state.next_meeting_description);
      formData.append('created_by_id',this.state.created_by_id);
      formData.append('created_by',this.state.created_by);
      formData.append('institute_contact_person',JSON.stringify(this.state.NextMeetingCP));
      formData.append('egenius_contact_person',JSON.stringify(this.state.NextMeetingEP));
      formData.append('institute_status_from',this.state.instituteStatusFrom);
      formData.append('edit_status',this.state.edit_status);
      formData.append('next_meeting_schedule',this.state.next_meeting_schedule);

      new Service().apiCall('SchedulePlanner/MeetingUpdate', formData).then(response => 
      { 
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            alert: (
              <SweetAlert
                success
                confirmBtnBsStyle="success"
                title="MOM Updated Successfully!"
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
        this.props.raiseLoginSignupErrorAlert('error');
        this.setState({buttonName:'Finish',buttonDisabled:false});
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

  handleschedulereschedule()
  {
    if(this.state.reschedule_meeting_type !== '' && this.state.reason_reschedule !== '' && this.state.reschedule_meetingDate !== '' && this.state.reschedule_meetingDate !== 'Invalid date' && this.state.reschedule_meetingTime !== '' && this.state.reschedule_meetingTime !== 'Invalid date' && ((this.state.reschedule_meeting_description !== '' && this.state.agenda_type === 'Change') || (this.state.agenda_type === 'Same')))
    {
      this.setState({buttonName:'Submitting',buttonDisabled:true});

      let formData = new FormData();
      formData.append('id',this.props.schedule_id);
      formData.append('meeting_status','Close');
      formData.append('institute_id',this.props.institute_id);
      formData.append('institute_name',this.state.institute_name);
      formData.append('meeting_type',this.state.reschedule_meeting_type);
      formData.append('meetingDate',this.state.reschedule_meetingDate);
      formData.append('meetingTime',this.state.reschedule_meetingTime);
      formData.append('meeting_time_formated',Moment(this.state.reschedule_meetingTime).format("hh:mm A"));
      formData.append('meeting_description',this.state.reschedule_meeting_description);
      formData.append('reschedule_reason',this.state.reason_reschedule);
      formData.append('created_by_id',this.state.created_by_id);
      formData.append('created_by',this.state.created_by);
      formData.append('institute_contact_person',JSON.stringify(this.state.RescheduleMeetingCP));
      formData.append('egenius_contact_person',JSON.stringify(this.state.RescheduleMeetingEP));

      new Service().apiCall('SchedulePlanner/MeetingReschedule', formData).then(response => 
      { 
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            alert: (
              <SweetAlert
                success
                confirmBtnBsStyle="success"
                title="Meeting Rescheduled Successfully!"
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
        this.props.raiseLoginSignupErrorAlert('error');
        this.setState({buttonName:'Finish',buttonDisabled:false});
      });
    }
    else
    {
      alert('Please fill all the details');
    }
  }

  createMarkup = (value) => {
    return { __html: value };
  }

  ineditfunction = () =>{
    const newArradded = this.state.MinutesMeetingCP.map(v => ({...v,edit:false}));
    this.setState({MinutesMeetingCP:newArradded});   
  } 

  egeeditfunction = () =>{
    const newArradded = this.state.MinutesMeetingEP.map(v => ({...v,edit:false}));
    this.setState({MinutesMeetingEP:newArradded});   
  }

  
  handleEgeniusPersonValue = (type,Index,inputName,Value) => {
    let lcontact_person;
    if(type === 'nextmeeting'){
      lcontact_person = this.state.NextMeetingEP;
      lcontact_person[Index][inputName] = Value;
      this.setState({NextMeetingEP:lcontact_person});
    }else if(type == 'minutesmeeting'){
      lcontact_person = this.state.MinutesMeetingEP;
      lcontact_person[Index][inputName] = Value;
      this.setState({MinutesMeetingEP:lcontact_person});
    }else{
      lcontact_person = this.state.RescheduleMeetingEP;
      lcontact_person[Index][inputName] = Value;
      this.setState({RescheduleMeetingEP:lcontact_person});
    }
  } 

  handleInstitutePersonValuenext = (Index,Value) => {
    let lcontact_personnext = this.state.NextMeetingCP;
    lcontact_personnext[Index].color = Value;
    this.setState({NextMeetingCP:lcontact_personnext});
  }  
  
  handleInstitutePersonValueminutes = (Index,Value) => {
    let lcontact_person = this.state.MinutesMeetingCP;
    lcontact_person[Index].color = Value;
    this.setState({MinutesMeetingCP:lcontact_person});
  } 
  
  handleInstitutePersonValuereschedule = (Index,Value) => {
    let lcontact_person = this.state.RescheduleMeetingCP;
    lcontact_person[Index].color = Value;
    this.setState({RescheduleMeetingCP:lcontact_person});
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
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose"><MailOutline/></CardIcon><h4 className={classes.cardIconTitle}>Schedule Updation</h4>
            </CardHeader>
            <CardBody>
              <div>
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel value="in_person" disabled={true} control={<Radio color="primary" checked={this.state.meeting_type === "In Person"} onChange={()=> this.setState({meeting_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In Person</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel value="telephonic" disabled={true} control={<Radio color="primary" checked={this.state.meeting_type === "Telephonic"} onChange={()=> this.setState({meeting_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>} />
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
                          disabled={true}
                          id="date-picker-dialog"
                          label="Date of Meeting"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          onChange={this.handleDateChange}  
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
                          disabled={true}
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
                    <GridItem xs={12} sm={12} md={6} >
                      <Card>
                        <CardBody>                              
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Agenda</h5>
                              <div><span style={{fontWeight:400}} dangerouslySetInnerHTML={this.createMarkup(this.state.meeting_description)} className='editor'></span></div>
                            </GridItem>
                          </GridContainer>                                                         
                        </CardBody>
                      </Card>
                    </GridItem>    
                    <GridItem xs={12} sm={12} md={6} >
                      <Card>
                        <CardBody>                              
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Client Participants</h5>
                            </GridItem>
                            {this.state.ScheduleInstituteContactPerson.map((element, index) => ( element.person_name !== '' && element.color == "primary" &&
                              <GridItem xs={12} sm={12} md={12} >                                                                           
                              <h5>{index+1 +" . "+element.person_name} </h5>
                              </GridItem>                    
                            ))}
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>eGenius Participants</h5>
                            </GridItem>
                            {this.state.ScheduleEgeniusContactPerson.map((element, index) => ( element.color == "primary" &&
                              <GridItem xs={12} sm={12} md={12}>                                                                         
                              <h5>{index+1 +" . "+element.person_name} </h5>
                              </GridItem>                     
                            ))}
                          </GridContainer>                                                         
                        </CardBody>
                      </Card>
                    </GridItem>                                     
                  </GridContainer>
                  {this.state.mom_type !== '' &&<GridContainer> 
                    <GridItem xs={12} sm={12} md={12} className={classes.inputMarginadd}>
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Minutes of Meeting Details</h5>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel value="in_person" disabled={true} control={<Radio color="primary" checked={this.state.mom_type === "In Person"} onChange={()=> this.setState({mom_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In Person</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel value="telephonic" disabled={true} control={<Radio color="primary" checked={this.state.mom_type === "Telephonic"} onChange={()=> this.setState({mom_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} >
                      <FormControl fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                          margin="normal"
                          autoOk={true}
                          value={this.state.mom_date}
                          shrink={true}
                          disabled={true}
                          id="date-picker-dialog"
                          label="Date of Meeting"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          onChange={this.handleDateChange}  
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
                          value={this.state.mom_time}
                          shrink={true}
                          disabled={true}
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
                    <GridItem xs={12} sm={12} md={6} >
                      <Card>
                        <CardBody>                              
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Minutes of Meeting</h5>
                              <div><span style={{fontWeight:400}} dangerouslySetInnerHTML={this.createMarkup(this.state.attended_minutes_meeting)} className='editor'></span></div>
                            </GridItem>
                          </GridContainer>                                                         
                        </CardBody>
                      </Card>
                    </GridItem>    
                    <GridItem xs={12} sm={12} md={6} >
                      <Card>
                        <CardBody>                              
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Client Participants</h5>
                            </GridItem>
                            {this.state.attended_institute_contact_person.map((element, index) => ( element.person_name !== '' && element.color == "primary" &&
                              <GridItem xs={12} sm={12} md={12} >                                                                           
                              <h5>{index+1 +" . "+element.person_name} </h5>
                              </GridItem>                    
                            ))}
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>eGenius Participants</h5>
                            </GridItem>
                            {this.state.attended_egenius_contact_person.map((element, index) => ( element.color == "primary" &&
                              <GridItem xs={12} sm={12} md={12}>                                                                         
                              <h5>{index+1 +" . "+element.person_name} </h5>
                              </GridItem>                     
                            ))}
                          </GridContainer>                                                         
                        </CardBody>
                      </Card>
                    </GridItem>                                     
                  </GridContainer>}
                  <GridContainer> 
                    { this.state.schedule_type !== 'Rescheduled' && this.state.institute_status_to !== ''  && <GridItem xs={12} sm={12} md={12} className={classes.inputMarginadd}>
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Institute Status : {this.state.institute_status_to}</h5>
                    </GridItem>}
                    { this.state.institute_status_from !== '' && this.state.institute_status_to !== '' &&  this.state.institute_status_from !== this.state.institute_status_to && <GridItem xs={12} sm={12} md={12} >
                      <Card>
                        <CardBody>                              
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} > 
                              <h5  className="headingStyle" style={{marginTop:0,fontWeight:400}}>Status changed from <b>{this.state.institute_status_from}</b> to <b>{this.state.institute_status_to}</b></h5>
                            </GridItem>
                          </GridContainer>                                                         
                        </CardBody>
                      </Card>
                    </GridItem>}                                    
                  </GridContainer>
                </CardBody>
              </Card>
          
              {this.state.meeting_status !== 'Close' && 
              <Card className="outlinedInput">
                <CardBody>
                  <GridContainer  justify="center" alignItems="center"> 
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMarginadd}>
                    <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Meeting Updation:</h5>
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMarginadd}>
                      <FormControlLabel
                        control={<Checkbox onChange={ ()=> this.setState({meetingstatus:'update'})} checked={this.state.meetingstatus == 'update'} />}
                        label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Update minutes of meeting</span>}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.inputMarginadd}>
                      <FormControlLabel
                        control={<Checkbox onChange={ ()=> this.setState({meetingstatus:'reschedule'})} checked={this.state.meetingstatus == 'reschedule'}  />}
                        label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Reschedule</span>}
                      />
                    </GridItem>
                  </GridContainer>

                  {this.state.meetingstatus == 'update' && <div>
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel  value="in_person" control={<Radio color="primary" checked={this.state.attended_meeting_type === "In Person"} onChange={()=> this.setState({attended_meeting_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In Person</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel  value="telephonic" control={<Radio color="primary" checked={this.state.attended_meeting_type === "Telephonic"} onChange={()=> this.setState({attended_meeting_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} >
                      <FormControl fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker 
                            disabled={true}
                            margin="normal"
                            autoOk={true}
                            value={this.state.attended_meeting_date}
                            shrink={true}
                            id="date-picker-dialog"
                            label="Date of Meeting"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            onChange={this.handleMOMTDateChange}   
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
                          value={this.state.attended_meeting_time}
                          shrink={true}
                          id="time-picker"
                          label="Time of Meeting"
                          inputVariant="outlined"
                          onChange={this.handleMOMTimeChange}   
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
                          config={{placeholder: "Minutes of meetings details"}}  
                          data=""
                          onInit={ editor => {                          
                              // You can store the "editor" and use when it is needed.
                              console.log( 'Minutes of meetings details!', editor ); 
                          } }
                          onChange={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ attended_minutes_meeting: data });
                          } }
                          onBlur={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({ attended_minutes_meeting: data });
                          } }
                          onFocus={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({ attended_minutes_meeting: data });
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
                            {this.state.MinutesMeetingCP.map((element, index) => ( element.person_name !== '' &&                                                                         
                              <Chip
                                style={{marginRight:10,marginTop:5}}
                                label={element.person_name}
                                clickable
                                color={element.color}                                
                                onClick={()=> {if(element.color == 'primary' ){this.handleInstitutePersonValueminutes(index,)}else{this.handleInstitutePersonValueminutes(index,'primary')}}}                               
                                disabled={element.edit}
                              /> ))} 
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{marginTop:5}} style={{textAlign:'right'}}>  
                              <Chip 
                                style={{marginTop:5}}
                                icon={<Edit style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon}  />}
                                label="Edit"
                                clickable
                                color=""
                                onClick={this.ineditfunction}
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
                            {this.state.MinutesMeetingEP.map((element, index) => (                                                                       
                              <Chip
                                style={{marginRight:10,marginTop:5}}
                                label={element.name}
                                clickable                                        
                                color={element.color}
                                onClick={()=> {if(element.color == 'primary' ){this.handleEgeniusPersonValue('minutesmeeting',index,'color',)}else{this.handleEgeniusPersonValue('minutesmeeting',index,'color','primary')}}}
                                deleteIcon={<DoneIcon />}
                                disabled={element.edit}
                              />))}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{marginTop:5}} style={{textAlign:'right'}}>  
                              <Chip 
                                style={{marginTop:5}}
                                icon={<Edit style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon}  />}
                                label="Edit"
                                clickable
                                color=""
                                onClick={this.egeeditfunction}
                                variant="outlined"
                              /> 
                            </GridItem>
                          </GridContainer> 
                        </CardBody>
                      </Card>
                    </GridItem>                                 
                  </GridContainer>

                  <GridContainer  justify="center" alignItems="center" className={classes.inputMarginadd}>                   
                    <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} >
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Institute Status</h5>
                    </GridItem> 
                  </GridContainer>

                  <GridContainer  justify="center" alignItems="center"> 
                    <GridItem xs={12} sm={12} md={10} container alignItems="center" justify="center" >
                      {this.state.statusData.length > 0 && this.state.statusData.map((element, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox                                      
                              onChange={(event)=> this.setState({edit_status:element.lead_status}) }
                              checked={element.lead_status === this.state.edit_status ? true : false} 
                              color="primary"
                            /> }
                          label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>{element.lead_status}</span>}
                        />
                      ))}  
                    </GridItem>
                  </GridContainer></div>}

                  {this.state.meetingstatus == 'reschedule' && <div> 
                    <GridContainer>  
                      <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel control={<Radio color="primary" checked={this.state.reschedule_meeting_type === "In Person"} onChange={()=> this.setState({reschedule_meeting_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In person</span>}/>
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel control={<Radio color="primary" checked={this.state.reschedule_meeting_type === "Telephonic"} onChange={()=> this.setState({reschedule_meeting_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>}/>
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3} >
                        <FormControl fullWidth>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              autoOk={true}
                              value={this.state.reschedule_meetingDate}
                              shrink={true}
                              id="date-picker-dialog"
                              label="Date of Meeting"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              onChange={this.handleRescheduleDateChange}  
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
                              value={this.state.reschedule_meetingTime}
                              shrink={true}
                              id="time-picker"
                              label="Time of Meeting"
                              inputVariant="outlined"
                              onChange={this.handleRescheduleTimeChange}   
                              KeyboardButtonProps={{
                              'aria-label': 'change time', 
                              }} 
                            />
                          </MuiPickersUtilsProvider>                  
                        </FormControl>
                      </GridItem>
                    </GridContainer>  
                    <GridContainer> 
                      <GridItem xs={12} sm={12} md={12} >
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{placeholder: "Enter reason for reschedule here"}} 
                            data=""
                            onInit={ editor => {                          
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Meetings Details!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ reason_reschedule: data });
                            } }
                            onBlur={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ reason_reschedule: data });
                            } }
                            onFocus={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ reason_reschedule: data });
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
                              {this.state.RescheduleMeetingCP.map((element, index) => ( element.person_name !== '' &&                                                                        
                                <Chip                                
                                  style={{marginRight:10,marginTop:5}}
                                  label={element.person_name}
                                  clickable
                                  color={element.color}                                  
                                  onClick={()=> {if(element.color == 'primary' ){this.handleInstitutePersonValuereschedule(index,)}else{this.handleInstitutePersonValuereschedule(index,'primary')}}}
                                  deleteIcon={<DoneIcon />}
                                  variant={element.variant}
                                />  ))}
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12} style={{marginTop:5}} style={{textAlign:'right'}}>  
                                <Chip 
                                  style={{marginTop:5}}
                                  icon={<Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon}  />}
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
                              {this.state.RescheduleMeetingEP.map((element, index) => (                                                                          
                                <Chip
                                  style={{marginRight:10,marginTop:5}}
                                  label={element.name}
                                  clickable
                                  color={element.color}
                                  onClick={()=> {if(element.color == 'primary' ){this.handleEgeniusPersonValue('reschedulemeeting',index,'color',)}else{this.handleEgeniusPersonValue('reschedulemeeting',index,'color','primary')}}}
                                  deleteIcon={<DoneIcon />}
                                  variant={element.variant}
                                /> ))}                                   
                              </GridItem>
                            </GridContainer> 
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>   
                    <GridContainer justify="center" alignItems="center">
                      <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel control={<Radio color="primary" checked={this.state.agenda_type === "Same"} onChange={()=> {this.setState({agenda_type: 'Same',reschedule_meeting_description: this.state.meeting_description })}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Same Agenda</span>} />
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="position" name="position">
                            <FormControlLabel control={<Radio color="primary" checked={this.state.agenda_type === "Change"} onChange={()=> this.setState({agenda_type: 'Change'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Change Agenda</span>}/>
                          </RadioGroup>
                        </FormControl>  
                      </GridItem>  
                      {this.state.agenda_type == 'Change' &&
                      <GridItem xs={12} sm={12} md={12} >
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{placeholder: "Enter change ageda here"}} 
                            data=""
                            onInit={ editor => {                          
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Meetings Details!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({ reschedule_meeting_description: data });
                            } }
                            onBlur={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ reschedule_meeting_description: data });
                            } }
                            onFocus={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ reschedule_meeting_description: data });
                            } }                           
                        /> 
                      </GridItem>}  
                    </GridContainer>  </div>} 

                </CardBody>
              </Card>}

              {this.state.meetingstatus == 'update' && <div>
              <Card className="outlinedInput">
                <CardBody>     
                  <GridContainer  justify="center" alignItems="center" className={classes.inputMarginadd}>                   
                    <GridItem xs={12} sm={12} md={12} style={{textAlign:'left'}} >
                      <h5  className="headingStyle" style={{marginTop:0,fontWeight:500}}>Next Meeting Schedule</h5>
                    </GridItem> 
                  </GridContainer>
                  <GridContainer justify="center" alignItems="center"> 
                    <GridItem xs={6} sm={6} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel control={<Radio color="primary" checked={this.state.next_meeting_schedule === "Yes"} onChange={()=> this.setState({next_meeting_schedule: 'Yes'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Schedule</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={6} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel control={<Radio color="primary" checked={this.state.next_meeting_schedule === "No"} onChange={()=> this.setState({next_meeting_schedule: 'No'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Not Schedule</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                  </GridContainer>
                  {this.state.next_meeting_schedule === "Yes" && <div><GridContainer>  
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel control={<Radio color="primary" checked={this.state.next_meeting_type === "In Person"} onChange={()=> this.setState({next_meeting_type: 'In Person'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>In person</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} className={classes.inputMarginadd}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position">
                          <FormControlLabel control={<Radio color="primary" checked={this.state.next_meeting_type === "Telephonic"} onChange={()=> this.setState({next_meeting_type: 'Telephonic'})} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Telephonic</span>} />
                        </RadioGroup>
                      </FormControl>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} >
                      <FormControl fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            autoOk={true}
                            value={this.state.next_meetingDate}
                            shrink={true}
                            id="date-picker-dialog"
                            label="Date of Meeting"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            onChange={this.handleNMDateChange}   
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
                            value={this.state.next_meetingTime}
                            shrink={true}
                            id="time-picker"
                            label="Time of Meeting"
                            inputVariant="outlined"
                            onChange={this.handleNMTimeChange}   
                            KeyboardButtonProps={{
                            'aria-label': 'change time', 
                            }} 
                          />
                        </MuiPickersUtilsProvider>                  
                      </FormControl>
                    </GridItem>
                  </GridContainer>  
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={12} >
                      <CKEditor
                          editor={ ClassicEditor }
                          config={{placeholder: "Enter next meeting agenda here"}} 
                          data=""
                          onInit={ editor => {                          
                              // You can store the "editor" and use when it is needed.
                              console.log( 'Meetings Details!', editor );
                          } }
                          onChange={ ( event, editor ) => {
                              const data = editor.getData();
                              this.setState({ next_meeting_description: data });
                          } }
                          onBlur={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({ next_meeting_description: data });
                          } }
                          onFocus={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({ next_meeting_description: data });
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
                            {this.state.NextMeetingCP.map((element, index) => (  element.person_name !== '' &&                                                                       
                              <Chip
                                style={{marginRight:10,marginTop:5}}
                                label={element.person_name}
                                clickable
                                color={element.color}
                                onClick={()=> {if(element.color == 'primary' ){this.handleInstitutePersonValuenext(index,)}else{this.handleInstitutePersonValuenext(index,'primary')}}}
                                deleteIcon={<DoneIcon />}
                                variant={element.variant}
                              />  ))}                              
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{marginTop:5}} style={{textAlign:'right'}}>  
                              <Chip 
                                style={{marginTop:5}}
                                icon={<Add style={{color:'rgb(76, 175, 80)', cursor:'pointer'}} className={classes.icon}  />}
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
                            {this.state.NextMeetingEP.map((element, index) => (                                                                       
                              <Chip                                
                                style={{marginRight:10,marginTop:5}}
                                label={element.name}
                                clickable
                                color={element.color}
                                onClick={()=> {if(element.color == 'primary' ){this.handleEgeniusPersonValue('nextmeeting',index,'color',)}else{this.handleEgeniusPersonValue('nextmeeting',index,'color','primary')}}}
                                deleteIcon={<DoneIcon />}
                                // onDelete={()=> this.handleEgeniusPersonValue(index,'variant','outlined')}
                                variant={element.variant}
                              />     ))} 
                            </GridItem>
                          </GridContainer> 
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer></div>}   
                </CardBody>
              </Card>
              </div>}  

              {this.state.meetingstatus != '' && <div>
              <GridContainer style={{marginTop:10}} > 
                <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}} >  
                {this.state.meetingstatus == 'update' && 
                  <MButton  type="submit" color="rose" disabled={this.state.buttonDisabled} onClick={this.handlescheduleupdate.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
                }
                {this.state.meetingstatus == 'reschedule' && 
                  <MButton  type="submit" color="rose" disabled={this.state.buttonDisabled} onClick={this.handleschedulereschedule.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
                }
                </GridItem>
              </GridContainer> 
              </div>}  
               
              <SlidingPane
                closeIcon={<div>   
                  <Button justIcon round color="white" style={{color:'black'}} >
                  <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
                  </Button></div>}  
                    className={classes.ModalStyle5}
                    overlayClassName={classes.panelClass}
                    isOpen={ this.state.addclientcontactperson}
                    title="Add Client Contact"
                    onRequestClose={ () => {
                      this.setState({ addclientcontactperson: false });
                  }}>
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
                          {/*<MButton  style={{marginRight:'2px'}}  onClick={()=> this.formreset} variant="outlined" color="primary">Reset</MButton> */}
                          <MButton  type="submit" color="rose" disabled={this.state.buttonDisabled} onClick={this.addcontact.bind(this)} variant="outlined" color="primary">{this.state.buttonName}</MButton>
                        </GridItem>
                      </GridContainer> 
                    </CardContent>
                  </Card>
                </div>
              </SlidingPane>

            </div>
            </CardBody>
          </Card> 
        </GridItem>       
      </GridContainer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard)); 