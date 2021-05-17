import React from "react";
import 'date-fns';

// react plugin for creating charts
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import MButton from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import ReactTableRecordCount from "../../../Components/ReactTableRecordCount";
import Service from 'Utils/Service';
import SlidingPane from 'react-sliding-pane';
import NumberFormat from 'react-number-format';
import Meetingupdation from '../../../SchedulePlanner/scheduleplannerpages/Meetingupdation.js';
import Moment from 'moment';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  inputMargin: {
    marginTop:15
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
      meeting_status:'',
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
  
  GetDataByInstituteIDAll(institute_id) {    
    this.setState({tableData:[]});
    const postData = { institute_id:institute_id };
    new Service().apiCall('SchedulePlanner/GetDataByInstituteIDAll',postData).then(response =>
    {
      if (response.data!='') 
      {                
        this.setState({tableData:response.data});
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }  
  
  componentDidMount() {
    this.GetDataByInstituteIDAll(this.props.institute_id);
  }

  viewScheduleDetails(id,InstituteID,InstituteName,meeting_status) {
    this.setState({Meetingupdation:true});
    this.setState({schedule_id:id});
    this.setState({institute_id:InstituteID});
    this.setState({institute_name:InstituteName});
    this.setState({meeting_status:meeting_status});
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
            <Card style={{marginTop:10}}>
              <CardHeader color="primary" icon>
                <h4 className={classes.cardIconTitle}>Meetings List</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={
                  this.state.tableData.map((original,key) => {
                    return ({
                      slno: key+1,
                      lead_name: <Link href="#" onClick={()=> this.viewScheduleDetails(original.id,original.institute_id,'Schedule',original.institute_name,original.meeting_status)}><div style={{textAlign:'left'}}>{original.institute_name}</div></Link>,
                      person_mat:original.created_by,
                      meeting_type:original.meeting_type,
                      meeting_time:original.meeting_time,
                      meeting_date:original.meeting_date,
                      meeting_time_formated:original.meeting_time_formated,
                      meeting_status:original.meeting_status
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
                    },
                    // Filter: ({filter, onChange}) => (
                    //   <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                    // )
                  },
                  {
                    Header: "Lead Name",
                    accessor: "lead_name",
                    className: "center", 
                    // width: getColumnWidth(this.state.tableData, 'lead_name', 'Lead Name'),
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
                    accessor: "meeting_time",
                    className: "center",
                    Cell : id => { return (<Tooltip title={Moment(id.original.meeting_time).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(id.original.meeting_date,id.original.meeting_time_formated )}</div></Tooltip>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                  },
                  {
                    Header: "Status",
                    accessor: "meeting_status",
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
                  <a style={{color:'#000',fontSize:'14px',cursor:'pointer'}}> Showing 10 of 20 entries</a>
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
            <Meetingupdation meeting_status={this.state.meeting_status} handleMeetingSelectedPage={this.scrollToTop} {...this.props} schedule_id={this.state.schedule_id} institute_id={this.state.institute_id} />
          </div>
        </SlidingPane> 
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
