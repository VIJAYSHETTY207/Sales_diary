import React from "react";
import 'date-fns';
import axios from 'axios';
// react plugin for creating charts
import SweetAlert from "react-bootstrap-sweetalert";
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MButton from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";


const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

const divStyle = {
  display: 'flex',  justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle2 = {
  marginTop:'10px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const divStyle3 = {
  marginTop:'15px',marginBottom:'10px',display: 'flex',justifyContent:'center', alignItems:'center' // 'ms' is the only lowercase vendor prefix
};
const align = {
  display: 'flex',  justifyContent:'right', alignItems:'right' // 'ms' is the only lowercase vendor prefix
};

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
  inputMargin: {
    marginTop:15
  }
};
const divStyle1 = {
  marginTop:'10px' // 'ms' is the only lowercase vendor prefix
};

// handlePreviouStudied = (value) => {
//   this.setState({ previouslyStudied: value });  
// }

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
  constructor(props) {
  super(props);
  this.state = {
    parametercount:0,
    viewleads:false,
    createlead:false,
    leadprofile:false,
    institutecheckbox:false,
    Approver:false, 
    activeTabIndex:0,
    leadType:'All',
    DecisionMaker:false, 
    Influencer:false,
    selectedTab:'profile',
    activeAccordion:'',
    EvaluatorRecommender:false,
    GatekeeperBlocker:false,
    Users:false,
    Champion:false,
    authorHolders:[{name:'',description:''}],
    insauthorHolders:[{name:'',description:''}],
    Mentor:false,
    previouslyStudied:'',
    activeStep:0,
    steps:[1,2,3,4],
    reason:false, 
    dateOfBirth: new Date(),
    tableData: [{
      id: '1', 
      name: '',
    }],
    selectType: 'createlead',
  }
  
  this.statecreate = {
    isOpen:false
  }
}

handleTabChange = (event, newValue) => {
  this.setState({activeTabIndex: newValue});
};

scrollToTop() {
  const container = document.querySelector('.slide-pane__content');  
  container.scrollTo({top: 0, left: 0, behavior: 'smooth' });
}


handleChangeInstitute = (idx,value) => {
  let lsiblingata = this.state.siblingHolders;
  lsiblingata.map((siblings,id)=>{ 
    if(idx==id){
      siblings.checked=value;
    } 
  });
    this.setState({ siblingHolders: lsiblingata });  
};

removeAuthortHolder(i) {
  const { authorHolders } = this.state;
  this.setState({
    authorHolders: authorHolders.filter((author, index) => index !== i),
  });
}

handleAddAuthorholder = () => {
  let lauthorHolders = this.state.authorHolders;
  let lAuthor = {};
  lAuthor.name = '';
  lAuthor.description = '';
  lauthorHolders.push(lAuthor);
  this.setState({authorHolders:lauthorHolders});
}

removeInsAuthortHolder(i) {
  const { insauthorHolders } = this.state;
  this.setState({
    insauthorHolders: insauthorHolders.filter((author, index) => index !== i),
  });
}

handleInsAddAuthorholder = () => {
  let lauthorHolders = this.state.insauthorHolders;
  let lAuthor = {};
  lAuthor.name = '';
  lAuthor.description = '';
  lauthorHolders.push(lAuthor);
  this.setState({insauthorHolders:lauthorHolders});
}



ProposalsView = () => 
{
  this.props.history.push('/admin/ProposalsView')
} 

ProposalsCreate = () => 
{
  this.props.history.push('/admin/ProposalsCreate')
}

ProposalsStandardTemplate = () => 
{
  this.props.history.push('/admin/ProposalsStandardTemplate')
} 

handleDateOfBirth = (dob) => {
  this.setState({ dateOfBirth: dob })
};

handleStep = (index) => {
  this.setState({activeStep:index});
}

handleClickyes = () => {
  this.setState({parametercount: this.state.parametercount+1})
}
handleClickno = () => {
  if(this.state.parametercount > 0){
    this.setState({parametercount: this.state.parametercount-1})
  }
  else{
    this.setState({parametercount: 0})
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
// start of submit form function
handleStudent = () => {  

  const lUserData = this.props.data; 
  const postData = {
  trust_congregation:this.state.trust_congregation,
  pincode:this.state.pincode,
  address_line_1:this.state.address_line_1,
  address_line_2:this.state.address_line_2,
  post_office:this.state.post_office,
  taluk:this.state.taluk,
  district:this.state.district,
  state:this.state.state,
  contact_number_1:this.state.contact_number_1,
  contact_number_2:this.state.contact_number_2,
  email:this.state.email,
  created_by:this.state.created_by,
  last_visit:this.state.last_visit,
  }; 
 
  axios({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'http://35.154.17.76/server_salesdairy/public/leads/insert_leads',
    data: postData
  }).then(response => {
    console.log(response);
    if (response.status==200 && response.data!='') {
      this.setState({
        alert: (
          <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Student Added!"
          showConfirm={false}
        >
        </SweetAlert>
          
        ),
      });
      setTimeout(() => {
         this.props.history.push({
        pathname: '/admin/student'})
      }, 2000)
     
    } else {
      this.raiseLoginSignupErrorAlert("signup");
    }
  }).catch(error => {
    this.raiseLoginSignupErrorAlert("signup");

  });
}
checkAccess = () => {
  return (
  <CheckAccess {...this.props} />
  )
}

renderHeader = () => {
  return (
    <GridContainer>
    <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
    <div>Leads</div>
    </GridItem> 
    <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
    <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
    <MButton variant={this.state.selectType == "createlead" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createlead'})}>Create</MButton> 
    <MButton variant={this.state.selectType == "viewleads" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewleads'})}>View</MButton>
    </ButtonGroup>
    </GridItem>
    </GridContainer>
  )
}


render(){
const { classes } = this.props;

return (
  <div>
    <GridContainer>	 
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Proposals</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem> 
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Accepted</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Query</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardBody>
            <div className={classes.center} style={divStyle}>
            <a style={{color:'#000',cursor:'pointer'}}>  <h4>Open Query</h4>
              <h3 style={divStyle2}>0</h3>
            </a>
            </div> 
          </CardBody>
        </Card>
      </GridItem>	
      <GridItem xs={12} sm={12} md={12} lg={4}>   
        <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.ProposalsCreate()}>Create Proposals</button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={4}>   
        <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.ProposalsView()}>View Proposals</button>
      </GridItem> 
      <GridItem xs={12} sm={12} md={12} lg={4}>   
        <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.1rem'}} type="submit" class="btn btn-warning" onClick={() => this.ProposalsStandardTemplate()}>Standard Templates</button>
      </GridItem> 
    </GridContainer>	

                  	
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  