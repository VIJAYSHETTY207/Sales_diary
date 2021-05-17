import React from "react";
import 'date-fns';
import ReactTable from "react-table";
//import ReactTable from 'react-table-6'
//import 'react-table-6/react-table.css'
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import MButton from '@material-ui/core/Button';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Link from '@material-ui/core/Link'; 
// core components
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardText from "components/Card/CardText.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import SweetAlert from "react-bootstrap-sweetalert";
import Service from 'Utils/Service';
import LeadInfo from "./LeadInfo.js";
import  "../../../assets/scss/custom.scss";
import Moment from 'moment';
import ReactTableRecordCount from "../../Components/ReactTableRecordCount";
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import { LeakRemoveTwoTone } from "@material-ui/icons";
// import differenceInDays from 'date-fns/difference_in_days';
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
  ModalStyle1: {
    width:'30% !important',
    backgroundColor:'#ddd'
  }, 
  ModalStyle2: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },  
  ModalStyle21: {
    width:'45% !important',
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
  TableCustomStyle :{
    '& .rt-td ':{
      width:"auto"
    },
    '& .rt-noData ':{
      display: "block",
      textAlign: "center",
      position: "relative",
      left: "auto",
      right: "auto",
      transform: "none",
      backgroundColor: "#ffffff"
    }
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
      leadType:'All',
      slideTitle:'Leads',
      editid:'',
      active_id:'',
      edit_status:'',
      leadsinfo:false,
      SelectStatusPanel:false,
      InstituteData:[],
      InstituteDataFilterd:[],
      statusData:[],
      LeadsData:[],
      tableData: [{ id: '',name: '',}],
      slno:1,
    }  
    this.statecreate = {
      isOpen:false
    }
  }

  scrollToTop = (type) => {
    if(type == 'leadsinfo'){
      this.setState({leadsinfo:false});
    }
    const container = document.querySelector('.slide-pane__content');  
    container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }

  LeadsView(client_id,id,trust_name,name) {
   this.setState({active_id:id});
   this.setState({leadsinfo:true});
   this.setState({trust_name:trust_name});
   this.setState({leadType:'leadsinfo'});
   this.setState({lead_id:client_id});
   this.setState({slideTitle:trust_name});
  }
 
  handleStatus(id,value) {
    this.setState({editid:id});
    this.setState({edit_status:value});
  }

  getAllInstituteData() {
    this.setState({InstituteData: []});
    const postData = {
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
    };
    new Service().apiCall('InstituteDetails/GetAllData',postData).then(response =>
    {
      if (response.status === 200 && response.data !='') {
        this.setState({ InstituteData: response.data });      
      }else{
        this.setState({InstituteData: []}); 
      }
    }).catch(error => {
      alert(error.response.data);
    });
  }    
  
  GetDataByStatus(type) {
    this.setState({InstituteData: []}); 
    const postData = {
      institute_status:type,
      id:this.props.data.id,
      user_id:this.props.data.user_id,
      role_id:this.props.data.role_id
    };
    new Service().apiCall('InstituteDetails/GetDataByStatus',postData).then(response =>
    {
      if (response.status === 200 && response.data !='') { 
        this.setState({ InstituteData: response.data }); 
      }else{
        this.setState({InstituteData: []}); 
      }
    }).catch(error => {
      alert(error.response.data); 
    });
  }

  changeStaus = (status,id,index) =>{
    let newarray = this.state.InstituteData;
    newarray[index]['status']=status;
    this.setState({InstituteData:newarray}); 
    const postData = { 
      id: id,
      status: status
    };

    new Service().apiCall('InstituteDetails/UpdateStatus', postData).then(response => 
    { 
      console.log(response); 
      if(response.status === 200){ 
        // this.setState({
        //   updateAlert: (
        //     <Alert severity="success">Sub Module Activated!</Alert>   
        //   ),
        // });
          setTimeout(() => {
               this.getAllInstituteData();
            this.setState({ updateAlert:''});  
          }, 2000)
      }     
    }).catch(error => {
      this.errorAlert('test');
    });
  }

  errorAlert = (modalType) => {
    this.setState({alert: (<SweetAlert danger confirmBtnBsStyle="danger" title="Something bad happened!!!" onConfirm={() => { this.setState({ alert: null });}}> We are regretting for it</SweetAlert>),    
    });
  };

  componentDidMount() {
    this.getAllInstituteData();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }

  datefunction(created_date){
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();
    let start_date = Moment(created_date, 'YYYY-MM-DD');
    let end_date = Moment(new Date(), 'YYYY-MM-DD');
    let duration = Moment.duration(end_date.diff(start_date));
    let days = duration.asDays();     
    let final = round(days, 0);
    if(created_date === '-')
    {
      return "-";
    }
    else if((Moment(new Date()).format("YYYY-MM-DD") === Moment(created_date).format("YYYY-MM-DD"))){
      return "Today";
    }else if((Moment(new Date(y,m,d - 1)).format("YYYY-MM-DD") === Moment(created_date).format("YYYY-MM-DD"))){
      return "Yesterday";
    }else{
      return final+" days ago";
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={1}></GridItem>
          <GridItem xs={12} sm={12} md={10}> 
            <Card> 
              <CardHeader color="warning" text>
                <CardText className='cardHeader' style={{width:'100%',textAlign:'center'}} >
                  <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
                    <MButton variant={this.state.leadType == "All" ?"contained":"outlined"} onClick={() => {this.setState({leadType:'All'});this.getAllInstituteData()}}>All</MButton> 
                    <MButton variant={this.state.leadType == "Lead" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Lead'});this.GetDataByStatus('Lead')}}>Lead</MButton>  
                    <MButton variant={this.state.leadType == "Prospect" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Prospect'});this.GetDataByStatus('Prospect')}}>Prospect</MButton> 
                    <MButton variant={this.state.leadType == "Qualified" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Qualified'});this.GetDataByStatus('Qualified')}}>Qualified</MButton> 
                    <MButton variant={this.state.leadType == "Unqualified" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Unqualified'});this.GetDataByStatus('Unqualified')}}>Unqualified</MButton> 
                    <MButton variant={this.state.leadType == "Committed" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Committed'});this.GetDataByStatus('Committed')}}>Committed</MButton> 
                    <MButton variant={this.state.leadType == "Converted" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Converted'});this.GetDataByStatus('Converted')}}>Converted</MButton>
                    {/*<MButton variant={this.state.leadType == "Deactivated" ?"contained":"outlined"} onClick={() => { this.setState({leadType:'Deactivated'});this.GetDataByStatus('Deactivated')}}>Deactivated</MButton>*/}
                  </ButtonGroup>
                </CardText>
              </CardHeader>
              <CardBody>
                <ReactTable className="TableCustomStyle"
                  data={
                    this.state.InstituteData.map((element,key) => {
                      return ({
                        slno: key+1,
                        institute_name:element.trust_name,
                        lead_status: element.institute_status,
                        created_by:element.created_by,
                        created_on:element.created_date,
                        last_visit:element.institute_last_visit,
                        client_trust_id:element.client_trust_id,
                        id:element.id,
                        trust_name:element.trust_name,
                        institute_name:element.institute_name,
                        status:element.status,
                        index:key

                      })
                    })
                  }
                  filterable
                  minRows={0}
                  columns={[
                    {
                      Header: "S No",
                      accessor: "slno",
                      className: "center",
                      Cell : (row) => {
                        return <div>{( row.page * row.pageSize ) + row.viewIndex + 1}</div>
                      }
                      /* Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search S No" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      ) */
                    }, 
                    {
                      Header: "Institute Name",
                      accessor: "institute_name",
                      className: "left",
                      Cell : id => { return (<Link href="#" onClick={()=> { this.LeadsView(id.original.client_trust_id,id.original.id,id.original.trust_name,id.original.institute_name)}}><div style={{textAlign:'left'}} >{id.original.institute_name}</div></Link>);},
                      width: getColumnWidth(this.state.InstituteData, 'institute_name', 'Institute Name'),
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Company/Institute" value={filter ? filter.value : ''}  onChange={event => onChange(event.target.value)} />
                      )
                    },
                    {
                      Header: "Staus",
                      accessor: "lead_status",
                      className: "center",
                      Cell : id => { return (<Chip style={{color:'purple'}} variant="outlined" size="small" label={id.original.lead_status}  clickable/>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Staus" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                    },
                    {
                      Header: "Lead Owner",
                      accessor: "created_by",
                      className: "left",
                      width: getColumnWidth(this.state.InstituteData, 'created_by', 'Lead Owner'),
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search AP" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                    },
                    {
                      Header: "Last Connect",
                      accessor: "last_visit",
                      className: "center",
                      Cell : id => { return (<Tooltip title={Moment(id.original.last_visit).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(id.original.last_visit )}</div></Tooltip>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Connect" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                    },
                    {
                      Header: "Ageing",
                      accessor: "created_on",
                      className: "center",
                      Cell : id => { return (<Tooltip title={Moment(id.original.created_on).format("DD-MM-YYYY h:m A")} placement="top" arrow><div>{this.datefunction(id.original.created_on )}</div></Tooltip>);},
                      Filter: ({filter, onChange}) => (
                        <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      )
                    }, 
                    {
                      Header: "Action",
                      accessor: "status",
                      className: "center",
                      Cell : id => { return (<Switch
                        color="primary"
                        name="status"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        checked={id.original.status === "1"}
                        onClick={() => this.changeStaus(id.original.status === "1" ? "0" : "1",id.original.id,id.original.index)}
                      />);},
                      // Filter: ({filter, onChange}) => (
                      //   <input type='text' style={{textAlign:'center'}} placeholder="Search Date" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
                      // )
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
                  <MButton variant="outlined" color="primary" >Export</MButton>
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
              isOpen={ this.state.leadsinfo }
              title={this.state.slideTitle}
              onRequestClose={ () => {
                this.setState({ leadsinfo: false, leadType:'All',slideTitle:'Leads' });
            }}>
          <div> 
            {this.state.leadType == "leadsinfo" &&  
              <LeadInfo  handleSelectedButton={this.scrollToTop} {...this.props} lead_id={this.state.lead_id} active_id={this.state.active_id} trust_name={this.state.trust_name} />
            }
          </div>
        </SlidingPane>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));