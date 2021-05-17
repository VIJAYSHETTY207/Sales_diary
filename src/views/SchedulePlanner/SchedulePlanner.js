import React from "react";
import 'date-fns';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {Animated} from "react-animated-css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ButtonGroup from '@material-ui/core/ButtonGroup';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Service from 'Utils/Service';
import Avatar from '@material-ui/core/Avatar';
import NavigateNext from "@material-ui/icons/NavigateNext";
import Meetingschedules from './scheduleplannerpages/Meetingschedules.js';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import Meetingupdation from './scheduleplannerpages/Meetingupdation.js';

const divStyle = {
  display: 'flex',  justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle2 = {
  marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd'
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
      selectType:'',
      Meetingschedules:false,
      Meetingupdation:false,
      createschedule:false, 
      tableData: [],
      NoDatatableData: [],
      todays_schedule_count:0,
      upcoming_schedule_count:0,
      present_week_met_count:0,
      present_week_rescheduled_count:0
    } 
  }

  scrollToTop(type) {
    if(type === 'close'){
      this.setState({Meetingupdation:false});
      this.setState({ viewschedule: false });
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }; 

  getLeadDashboardData() {
    const postData = {
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
    };
    new Service().apiCall('Dashboards/get_dashboard_data',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({todays_schedule_count:response.data.todays_schedule_count});
        this.setState({upcoming_schedule_count:response.data.upcoming_schedule_count});
        this.setState({present_week_met_count:response.data.present_week_met_count});
        this.setState({present_week_rescheduled_count:response.data.present_week_rescheduled_count});
      }
      else{
        this.setState({countData:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }

  getSchedulePlannerData() {
    const postData = {
      status:'Todays',
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
    };
    new Service().apiCall('SchedulePlanner/GetScheduleDataByStatus',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({tableData:response.data});
      }
    }).catch(error => {
      this.setState({NoDatatableData: [{ id: '1', name: '',}]})
    });
  }   
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }

  viewScheduleDetails(id,InstituteID,InstituteName) {
    this.setState({Meetingupdation:true});
    this.setState({schedule_id:id});
    this.setState({institute_id:InstituteID});
    this.setState({institute_name:InstituteName});
   }

  componentDidMount() {
    this.getLeadDashboardData(); 
    this.getSchedulePlannerData();
  }

  renderHeader = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
          <div>Schedule</div>
        </GridItem> 
        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
          <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
          <MButton variant={this.state.selectType == "createschedule" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createschedule'})}>Create</MButton> 
          <MButton variant={this.state.selectType == "viewschedule" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewschedule'})}>View</MButton>
          </ButtonGroup>
        </GridItem>
      </GridContainer>
    )
  }

  render(){
  const { classes } = this.props;

  return (
    <div>
      <Animated  className="Animated" animationIn="slideInRight" animationOut="slideOutLeft" > 
        <GridContainer>	 
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center} style={divStyle}>
                <a style={{color:'#000',cursor:'pointer'}}>  <h4>Todays Meeting</h4>
                  <h3 style={divStyle2}>{this.state.todays_schedule_count}</h3>
                </a>
                </div>
              </CardBody>
            </Card>
          </GridItem> 
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center} style={divStyle}>
                <a style={{color:'#000',cursor:'pointer'}}>  <h4>This Week Planned</h4>
                  <h3 style={divStyle2}>{this.state.upcoming_schedule_count}</h3>
                </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center} style={divStyle}>
                <a style={{color:'#000',cursor:'pointer'}}>  <h4>This Week Met</h4>
                  <h3 style={divStyle2}>{this.state.present_week_met_count}</h3> 
                </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardBody>
                <div className={classes.center} style={divStyle}>
                <a style={{color:'#000',cursor:'pointer'}}>  <h4>This Week Rescheduled</h4>
                  <h3 style={divStyle2}>{this.state.present_week_rescheduled_count}</h3>
                </a>
                </div>
              </CardBody>
            </Card>
          </GridItem>	  
        </GridContainer>

        <GridContainer  justify="center" alignItems="center"> 
          <GridItem xs={12} sm={12} md={12} lg={4}>   
            <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.setState({Meetingschedules:true})}>Meeting Schedules/Updation</button>
          </GridItem>           
        </GridContainer>  

        <GridContainer  justify="center" alignItems="center" style={{marginTop:'20px'}}>              
          <GridItem xs={12} sm={12} md={8}>  
            {this.state.tableData.length > 0 && this.state.tableData.map((element, index) => (
            <Card style={{marginTop:0,marginBottom:'10px'}} className="cardBackgroundTransparent">
              <CardBody style={{padding:'5px'}}>
              <div style={{display:'block',cursor:'pointer'}}>
                <GridContainer onClick={()=> this.viewScheduleDetails(element.id,element.institute_id,element.institute_name)} > 
                  <GridItem xs={12} sm={12} md={10}> <Button style={{fontSize:'20px'}} color="transparent">{element.institute_name} - Today - {element.meeting_time_formated} - {element.meeting_type}</Button></GridItem> 
                  <GridItem  className="pickerGrid"  xs={12} sm={12} md={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10}}>
                      <NavigateNext /> 
                    </Avatar>
                  </GridItem>
                </GridContainer>
              </div>
              </CardBody>
            </Card>    
            ))} 
            {this.state.NoDatatableData.length > 0 &&
            <Card style={{marginTop:0,marginBottom:'10px'}} className="cardBackgroundTransparent">
              <CardBody style={{padding:'5px'}}>
              <div style={{display:'block',cursor:'pointer'}}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}> <Button style={{float:'center',fontSize:'20px'}} color="transparent">No meeting today</Button></GridItem> 
                  <GridItem  className="pickerGrid"  xs={12} sm={12} md={2} style={{textAlign:'right',margin:'auto'}}>    
                    <Avatar style={{float:'right',marginRight:10}}>
                      <NavigateNext />
                    </Avatar>
                  </GridItem>
                </GridContainer>
              </div>
              </CardBody>
            </Card>}
          </GridItem>
        </GridContainer>

      </Animated>	 

      <SlidingPane
        closeIcon={<div>   
          <Button justIcon round color="white" style={{color:'black'}} >
          <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
          </Button></div>}  
          className={classes.ModalStyle}
          overlayClassName={classes.panelClass}
          isOpen={ this.state.Meetingschedules }
          // title={this.renderHeader()}
          title="Meeting Schedules/Updation"
          onRequestClose={ () => {this.setState({ Meetingschedules: false });this.getLeadDashboardData();this.getSchedulePlannerData();}}>
          <div>  
            <Meetingschedules handleSelectedButton={this.scrollToTop} {...this.props} />
          </div> 
      </SlidingPane>   

      <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.Meetingupdation }
              title={"Meeting Updation - "+ this.state.institute_name}
              onRequestClose={ () => {
                this.setState({ Meetingupdation: false });
            }}>
          <div> 
            <Meetingupdation handleMeetingSelectedPage={this.scrollToTop} {...this.props} schedule_id={this.state.schedule_id} institute_id={this.state.institute_id} />
          </div>
        </SlidingPane> 

    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard)); 
