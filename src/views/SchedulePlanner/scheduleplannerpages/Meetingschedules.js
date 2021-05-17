import React from "react";
import 'date-fns';

import ReactTable from "react-table";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CardText from "components/Card/CardText.js";
import ReactTableRecordCount from "../../Components/ReactTableRecordCount";
import Service from 'Utils/Service';
import Moment from 'moment';
import Meetingupdation from './Meetingupdation.js';
import AddSchedules from './AddSchedules.js';
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
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
    width:'50% !important',
    backgroundColor:'#ddd'
  }, 
  ModalStyle4: {
    width:'60% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle5: {
    width:'70% !important',
    backgroundColor:'#ddd'
  }, 
  ModalStyle6: {
    width:'80% !important',
    backgroundColor:'#ddd'
  },
  ModalStyle7: {
    width:'90% !important',
    backgroundColor:'#ddd'
  },
  inputMargin: {
    marginTop:5
  }
};

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

const getColumnWidth = (rows, accessor, headerText) => {
  const maxWidth = 400
  const magicSpacing = 10
  const cellLength = Math.max(
    ...rows.map(row => (`${row[accessor]}` || '').length),
    headerText.length,
  )
  return Math.min(maxWidth, cellLength * magicSpacing)
}

class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      scheduleType:'All',
      Meetingupdation:false,
      AddSchedules:false,
      InstituteDetails:[],
      institute_name:'',
      institute_id:'',
      schedule_id:'',
      tableData: [{ id: '1', name: '',}],
    }
  }

  scrollToTop = (type) => {
    if(type == 'close'){      
      this.setState({Meetingupdation:false});
      this.setState({AddSchedules:false});
      this.GetDataByStatus('All');
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }; 
  
  GetDataByStatus(type) {    
    this.setState({tableData:[]});
    const postData = { 
      status:type,
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
      alert(error.response.data);
    });
  }  

  getInstituteData(){
    const postData = { 
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id 
    };
    new Service().apiCall('InstituteDetails/GetAllData',postData).then(response =>
    {
      if (response.data!='') 
      {           
        this.setState({InstituteDetails:response.data,});
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }

  handleScheduleDetails(value,InstituteName) {
    
    this.setState({institute_id:value});
    this.setState({institute_name:InstituteName});
    const postData = { institute_id:value };
    new Service().apiCall('SchedulePlanner/GetDataByInstituteID',postData).then(response =>
    {
      if (response.data!='') 
      {          
        this.setState({Meetingupdation:true});
        this.setState({schedule_id:response.data[0].id});
        this.setState({institute_id:response.data[0].institute_id});
        this.setState({institute_name:response.data[0].institute_name});
      }
      else{
        this.setState({AddSchedules:true});
      }
    }).catch(error => {
      this.setState({AddSchedules:true});
    });
  } 
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  componentDidMount() {
    this.GetDataByStatus('All');
    this.getInstituteData();
  }

  viewScheduleDetails(id,InstituteID,InstituteName) {
    this.setState({Meetingupdation:true});
    this.setState({schedule_id:id});
    this.setState({institute_id:InstituteID});
    this.setState({institute_name:InstituteName});
   }

   datefunction(created_date,time){       
      var today = new Date();
      var y = today.getFullYear();
      var m = today.getMonth();
      var d = today.getDate();
      var todatdate = Moment(new Date()).format("YYYY-MM-DD")
      if (Moment(new Date()).format("YYYY-MM-DD") === Moment(created_date).format("YYYY-MM-DD")) {
        return (
          <div style={{fontWeight:'500'}} >Today {time}</div>
        )
      } else if (Moment(new Date(y,m,d + 1)).format("YYYY-MM-DD") === Moment(created_date).format("YYYY-MM-DD"))  {
        return (
          <div style={{fontWeight:'500'}} >Tomorrow {time}</div>
        )
      } else if (Moment(new Date(y,m,d - 1)).format("YYYY-MM-DD") === Moment(created_date).format("YYYY-MM-DD"))  {
        return (
          <div style={{fontWeight:'500'}} >Yesterday {time}</div>
        )
      } 
      else{
        return (
          <div style={{fontWeight:'500'}} >{Moment(created_date).format("MMM DD") +", "+time}</div>
        )
      } 
  }

  render(){
  const { classes } = this.props;
    return (
      <div>       
        <GridContainer  justify="center" alignItems="center">   
          <GridItem xs={12} sm={12} md={6}>
            <Card className="outlinedInput">     
              <CardBody>   
                <GridItem xs={12} sm={12} md={12} >
                  <FormControl fullWidth >
                    <Autocomplete
                      freeSolo
                      id="InstituteDetails_value"  
                      options={this.state.InstituteDetails}
                      onChange={(event, value) => { if(value) {this.handleScheduleDetails(value.id,value.institute_name)}}}
                      getOptionLabel={(option) => option.institute_name}
                      renderInput={(params) => <TextField {...params} label="Search Existing Schedule/Create Schedule" variant="outlined" />} 
                    />  
                  </FormControl>
                </GridItem>
              </CardBody>  
            </Card>
          </GridItem>
            <GridItem xs={12} sm={12} md={10}>
              <Card>
              <CardHeader color="warning" text>
                <CardText className='cardHeader' style={{width:'100%',textAlign:'center'}} >
                  <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                    <MButton variant={this.state.scheduleType == "All" ?"contained":"outlined"} onClick={() => { this.setState({scheduleType:'All'});this.GetDataByStatus('All')}}>All</MButton> 
                    <MButton variant={this.state.scheduleType == "Todays" ?"contained":"outlined"} onClick={() => { this.setState({scheduleType:'Todays'});this.GetDataByStatus('Todays')}}>Todays</MButton>  
                    <MButton variant={this.state.scheduleType == "Past Schedules" ?"contained":"outlined"} onClick={() => { this.setState({scheduleType:'Past Schedules'});this.GetDataByStatus('Past Schedules')}}>Past Schedules</MButton> 
                    <MButton variant={this.state.scheduleType == "Future Schedules" ?"contained":"outlined"} onClick={() => { this.setState({scheduleType:'Future Schedules'});this.GetDataByStatus('Future Schedules')}}>Future Schedules</MButton> 
                  </ButtonGroup>
                </CardText>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={
                  this.state.tableData.map((original,key) => {
                    return ({
                      slno: key+1,
                      //lead_name: <Link href="#" onClick={()=> this.viewScheduleDetails(original.id,original.institute_id,original.institute_name)}><div style={{textAlign:'left'}}>{original.institute_name}</div></Link>,
                      lead_name: original.institute_name,
                      person_mat:original.created_by,
                      meeting_type:original.meeting_type,
                      meeting_date:original.meeting_date,
                      id:original.id,
                      institute_id:original.institute_id,
                      meeting_time_formated:original.meeting_time_formated
                    })
                  })}
                  filterable
                  minRows={0}
                  columns={[
                  {
                    Header: "S No",
                    accessor: "slno",
                    width: 70,
                    className: "center",
                    Cell : (row) => {
                      return <div>{( row.page * row.pageSize ) + row.viewIndex + 1}</div>
                    }
                    // Filter: ({filter, onChange}) => (
                    //   <input type='text' style={{textAlign:'center'}} placeholder="S No" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                    // )
                  },
                  {
                    Header: "Lead Name",
                    accessor: "lead_name",
                    className: "center", 
                    Cell : id => { return (<Link href="#" onClick={()=> this.viewScheduleDetails(id.original.id,id.original.institute_id,id.original.lead_name)}><div style={{textAlign:'left'}}>{id.original.lead_name}</div></Link>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Lead" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "AP",
                    accessor: "person_mat",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search AP" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Type",
                    accessor: "meeting_type",
                    className: "center",
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Type" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Date & Time",
                    accessor: "meeting_date",
                    className: "center",
                    Cell : id => { return (<div>{this.datefunction(id.original.meeting_date,id.original.meeting_time_formated)}</div>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  }
                  ]}
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                  >{(state, makeTable) => { 
                    return (
                      <ReactTableRecordCount
                        state={state}
                        makeTable={makeTable}
                        totalRecords={state.sortedData.length ? state.sortedData.length : state.resolvedData.length   }
                      />
                    ); 
                  }}</ReactTable> 
              </CardBody>
              {/*<CardFooter stats style={{marginTop:0}}>
                <div className={classes.stats}> 
                  <a style={{color:'#000',fontSize:'14px',cursor:'pointer'}}>Showing 10 of 20 entries</a>
                </div>
                <div className={classes.stats}>
                  <MButton   variant="outlined" color="primary" >Export</MButton>
                </div>
              </CardFooter>*/}
            </Card>
          </GridItem>
        </GridContainer>    

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
        
        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle}
              overlayClassName={classes.panelClass}
              isOpen={ this.state.AddSchedules}
              title={"New Schedule - "+ this.state.institute_name}
              onRequestClose={ () => {
                this.setState({ AddSchedules: false});
                this.getInstituteData();
            }}>
          <div> 
            <AddSchedules handleMeetingSelectedPage={this.scrollToTop} {...this.props} institute_id={this.state.institute_id} />
          </div>
        </SlidingPane> 
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard)); 
