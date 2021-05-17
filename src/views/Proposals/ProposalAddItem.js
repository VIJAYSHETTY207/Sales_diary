import React from "react";
import 'date-fns';

import axios from 'axios';
// react plugin for creating charts
import SweetAlert from "react-bootstrap-sweetalert";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { withStyles } from '@material-ui/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from '@material-ui/core/Link';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  },

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: '1px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

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
    selectType: 'leadsProposalAddItem',
  }
  
  this.statecreate = {
    isOpen:false
  }
}

ProposalsCreate= () => 
{
  this.props.history.push({pathname:'/admin/ProposalsCreate', state:{'action':'view'}})
}

handleTabChange = (event, newValue) => {
  this.setState({activeTabIndex: newValue});
};
checkAccess = () => {
  return (
  <CheckAccess {...this.props} />
  )
}

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


handleDateOfBirth = (dob) => {
  this.setState({ dateOfBirth: dob })
};


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

renderHeader = () => {
  return (
    <GridContainer>
    <GridItem xs={12} sm={10} md={6} style={{margin:'auto'}}>
    <div>Lead Proposal(Add Item)</div>
    </GridItem> 
    <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
    {/* <ButtonGroup  color="secondary" aria-label="outlined secondary button group" className="buttonGroup">
    <MButton variant={this.state.selectType == "createlead" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'createlead'})}>Create</MButton> 
    <MButton variant={this.state.selectType == "viewleads" ?"contained":"outlined"} onClick={()=>this.setState({selectType:'viewleads'})}>View</MButton>
    </ButtonGroup> */}
    </GridItem>
    </GridContainer>
  )
}

componentDidMount() {
  console.log(this.props.history.location.state);
if(this.props.history.location.state === undefined){
 //alert(123);
}
else{
  this.setState({selectType:'leadsProposal', viewleads:true});
  this.props.history.push({state:undefined})
}
}

render(){
const { classes } = this.props;

return (
  <div>	
      <SlidingPane
        closeIcon={<div>   
          <Button justIcon round color="white" style={{color:'black'}} >
          <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
          </Button></div>}  
          className={classes.ModalStyle}
          overlayClassName={classes.panelClass}
          isOpen={ true }
          title="Leads"
          title={this.renderHeader()}
          onRequestClose={ () => {
              // triggered on "<" on left top click or on outside click
              this.ProposalsCreate();
          } }>
          <div> 
            {this.state.selectType == "leadsProposalAddItem" &&             
            <GridContainer  justify="center" alignItems="center">              
            <GridItem xs={12} sm={12} md={9}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose"><MailOutline/></CardIcon>
                    <h4 className={classes.cardIconTitle}>Add New Item</h4>
                  </CardHeader>
                  <CardBody>
                    <form>
                    <div>
                    <Card className="outlinedInput">
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                          <h5  className="headingStyle" style={{marginTop:0,fontWeight: "bold"}}>Item details</h5>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>             
                          <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.trust_name}
                              label="Description" 
                              type="search" 
                              onChange={(event) => this.setPostData("trust_name",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={12} className={classes.inputMargin}>
                            <CKEditor
                                editor={ ClassicEditor }
                                config={{placeholder: "Long description here"}} 
                                data=""
                                onInit={ editor => {
                                  
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Meetings Details!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    this.setState({ circular_description: data });
                                } }
                                onBlur={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ circular_description: data });
                                } }
                                onFocus={ ( event, editor ) => {
                                  const data = editor.getData();
                                  this.setState({ circular_description: data });
                                } }
                                
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Rate - INR (Base Currency)" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_1",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Rate - USD" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_2",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Rate - EUR" 
                              type="search" 
                              onChange={(event) => this.setPostData("address_line_2",event.target.value)}
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
                              value={this.state.father_name}
                              label="GST 1" 
                              type="search" 
                              onChange={(event) => this.setPostData("post_office",event.target.value)}
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
                              value={this.state.father_name}
                              label="GST 2" 
                              type="search" 
                              onChange={(event) => this.setPostData("taluk",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem> 
                          <GridItem xs={12} sm={12} md={4} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Unit" 
                              type="search" 
                              onChange={(event) => this.setPostData("address",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8} className={classes.inputMargin}>
                            <FormControl fullWidth>
                              <TextField 
                                inputProps={{
                                autoComplete: 'off'
                                }}
                              id="document-type"   
                              value={this.state.father_name}
                              label="Item Group" 
                              type="search" 
                              onChange={(event) => this.setPostData("address",event.target.value)}
                              inputRef={this.textInput} 
                              variant="outlined" />                   
                            </FormControl>
                          </GridItem>
                        </GridContainer>  
                      </CardBody>
                    </Card>                                                      
                  
                  <GridContainer> 
                    <GridItem xs={12} sm={12} md={6}>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{textAlign:'right'}} >
                      <MButton  type="submit" color="rose" onClick={this.handleStudent.bind(this)}variant="outlined" color="primary">Save</MButton>
                    </GridItem>
                  </GridContainer> 
                  </div>
              
                    </form>
                  </CardBody>
                </Card>
              </GridItem>       
            </GridContainer>
            }
          </div>
        </SlidingPane>                 	
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(pageStyles)(Dashboard));  
