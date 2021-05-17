import React from "react";
import 'date-fns';

// react plugin for creating charts
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import Service from 'Utils/Service';
import SlidingPane from 'react-sliding-pane';
import NumberFormat from 'react-number-format';
import Meetingupdation from '../../../SchedulePlanner/scheduleplannerpages/Meetingupdation.js';
import Moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";
import Assigni from 'assets/img/faces/marc.jpg'
import Book from '@material-ui/icons/Book';
import CardIcon from "components/Card/CardIcon.js";
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
    borderRight:'1px solid #ddd', 
  },
  AssignStyle:{
   
  '& img' :{
    width:"33px",
    borderRadius:"50px"
  }
  }, 
  imageinput: {
    display: 'none',
  },
  imageButton: {
    padding: '5px 15px !important',
  },
  imageButton:{
    
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
class Dashboard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      activeAccordion:0,
      edit_institute:false,
      tableData: [{}],
      task_name:'',
      status:'',
      start_date:'',
      due_date:'',
      assigned_to:'',
      tags:'',
      priority:'',
  
    }
  }
  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }
  componentDidMount() {
  }

  setPostData = (name,value) => {
    this.setState({ [name]: value, formChanged:true });
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
    {this.state.alert}
    <GridContainer justify="center" alignItems="center">              
      <GridItem xs={12} sm={12} md={12} lg={10} className={classes.inputMargin}>
        <Card style={{marginTop:10}}>
          <CardHeader>
            <div className={classes.buttonGroup} style={{float:'right',marginTop:'10px'}}>
            <MButton  color="primary" size="small" variant="outlined" className={classes.firstButton}  style={{fontWeight:'500',float:'right'}} >
              New Task
            </MButton>
           </div>
           <h4 className={classes.cardIconTitle} style={{marginTop:'0px'}}>Task List</h4>
        </CardHeader>
          <CardBody>
            <ReactTable
              data={
              this.state.tableData.map((original,key) => {
                return ({
                  slno: key+1,
                  task_name:<div style={{textAlign:'left'}}>Task1</div>,
                  status: <Chip style={{color:'purple'}} variant="outlined" size="small" label="In Progress"  clickable/>,
                  start_date:<Tooltip title={Moment(original.created_date).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(original.created_date)}</div></Tooltip>,
                  due_date:<Tooltip title={Moment(original.created_date).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(original.created_date)}</div></Tooltip>,
                  assigned_to:<div className={classes.AssignStyle}><img src={require('assets/img/faces/marc.jpg')}></img></div>,
                  tags:<div style={{textAlign:'left'}}></div>,
                  priority:<div>High</div>
                }) 
              })}
              filterable
              minRows={0}
              columns={[
              {
                Header: "S No",
                accessor: "slno",
                width: 70,
                className: "center"
              },
              {
                Header: "Name",
                accessor: "task_name",
                className: "center", 
                // width: getColumnWidth(this.state.tableData, 'lead_name', 'Lead Name'),
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search Name" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Status",
                accessor: "status",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Start Date",
                accessor: "start_date",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Due Date",
                accessor: "due_date",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Assigned to",
                accessor: "assigned_to",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search Person" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Tags",
                accessor: "tags",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search tags" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Priority",
                accessor: "priority",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search priority" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
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
              <MButton variant="outlined" color="primary" >Export</MButton>
            </div>
          </CardFooter>
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
  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
