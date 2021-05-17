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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker, 
  KeyboardTimePicker,
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
  CustomModalStyle: {
    width:'30% !important',
    backgroundColor:'#ddd',
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
      description:'',
      date:'',
      assigned_to:'',
      tags:'',
      priority:'',
      AddRemainder:'',
      remined_date:'',
      set_reminderto:'',
      reminder_confirmation:''
    }
  }

  componentDidMount() {
  }
  handleSetReminderTo =(Index,Name,Value)=>{
    let newarray = this.state.tranport_expenses;
    newarray[Index][Name] = Value;
    this.setState({tranport_expenses:newarray});
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
    <GridContainer justify="center" alignItems="center">              
      <GridItem xs={12} sm={12} md={12} lg={10} className={classes.inputMargin}>
        <Card style={{marginTop:10}}>
        <CardHeader>
            <div className={classes.buttonGroup} style={{float:'right',marginTop:'10px'}}>
            <MButton  color="primary" size="small" variant="outlined" onClick={()=> this.setState({AddRemainder:true}) } className={classes.firstButton}  style={{fontWeight:500}} >
              Add Lead Reminder
            </MButton>
           </div>
           <h4 className={classes.cardIconTitle} style={{marginTop:'0px'}}>Reminders</h4>
        </CardHeader>
          <CardBody>
            <ReactTable
              data={
              this.state.tableData.map((original,key) => {
                return ({
                  slno: key+1,
                  description:<div style={{textAlign:'left'}}>Task1</div>,
                  date:<Tooltip title={Moment(original.created_date).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(original.created_date)}</div></Tooltip>,
                  remind:<div></div>,
                  is_notified:<div></div>,
                
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
                Header: "Description",
                accessor: "description",
                className: "center", 
                // width: getColumnWidth(this.state.tableData, 'lead_name', 'Lead Name'),
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search description" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Date",
                accessor: "date",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search status" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Remind",
                accessor: "remind",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search remind" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
              {
                Header: "Is notified?",
                accessor: "is_notified",
                className: "center",
                  Filter: ({filter, onChange}) => (
                    <input type='text' style={{textAlign:'center'}} placeholder="Search" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                  )
              },
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
                className={classes.CustomModalStyle}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.AddRemainder }
                title="Add lead reminder"
                onRequestClose={ () => {
                  this.setState({ AddRemainder: false});
                }}>
              <div> 
                  <Card>
                    <CardBody>
                      <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
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
                              KeyboardButtonProps={{
                              'aria-label': 'change date', 
                              }} 
                              />
                            </MuiPickersUtilsProvider>                  
                          </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12} lg={12} className={classes.inputMargin}>
                          <FormControl fullWidth >
                              <TextField
                              className="m-2"
                              id="outlined-select-currency"
                              select
                              label="Set Reminder To"
                              options={this.set_reminderto}
                              onChange={(event) => this.setPostData("set_reminderto",event.target.value)}
                              variant="outlined">
                              <MenuItem value='Transpotation'>Karthick</MenuItem>
                              <MenuItem value='Other1'>Vikram</MenuItem>
                          </TextField>
                          </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12} lg={12}  className={classes.inputMargin} >
                            <FormControl fullWidth>
                            <TextField 
                            disabled={false} 
                            multiline="true"
                            id="document-type"
                            type="search"
                            variant="outlined"
                            label="Descriptions" />               
                            </FormControl>
                          </GridItem> 
                        </GridContainer>
                        <GridContainer>
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                          <FormControlLabel
                          control={
                              <Checkbox
                              value={this.reminder_confirmation}
                              onChange={(event) => this.handleTaskVisibility("public",'yes')}
                              color="primary"
                              />
                          }
                          label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Send also an email for this reminder</span>}
                          />
                          </GridItem>
                        </GridContainer> 
                        <GridContainer  justify="center" alignItems="center">    
                          <GridItem xs={12} sm={12} md={12} style={{textAlign:'right',marginTop:20}}>
                            <div>
                              <MButton variant="outlined" size="sm" color="Default" style={{margin:"5px"}}>Close</MButton>
                              <MButton variant="outlined" size="sm" color="Primary" style={{margin:"5px"}}>Save</MButton>
                            </div>
                          </GridItem> 
                       </GridContainer>
                    </CardBody>
                  </Card>
              </div>
    </SlidingPane>  
  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
