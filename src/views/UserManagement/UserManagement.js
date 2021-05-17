import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import ReactTable from "react-table";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import CheckAccess from "components/CheckAccess.js";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import NavigateNext from "@material-ui/icons/NavigateNext";
import Slide from "@material-ui/core/Slide";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Animated} from "react-animated-css";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MaterialButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import sharedStyles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
//redux functions
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js'
// end of redux function
import Service from 'Utils/Service';
import { trueDependencies } from "mathjs";

const panelStyles = {

  panelClass: {
    zIndex:999
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd',
    '& .MuiFormControlLabel-label' :{
      color: '#000000e8',
      cursor: 'pointer',
      display: 'inlineFlex',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.428571429',
      paddingLeft: '0'
    }
    
  },
  chooseModalStyle: {
    width:'40% !important',
    backgroundColor:'#ddd'
  }, 
  confirmModalStyle: {
    width:'50% !important',
    backgroundColor:'#ddd'
  },
};

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const tableStyles = {...styles,  ...sharedStyles, ...panelStyles }
const useStyles = makeStyles(tableStyles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function filterCaseInsensitive(filter, row) {
  const id = filter.pivotId || filter.id;
  if (row[id] !== null) {
      return (
          row[id] !== undefined ?
              String(row[id].toString().toLowerCase())
                  .includes(filter.value.toString().toLowerCase())
          :
              true
      );
  }
}

class MessageCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      total_roles:0,
      total_modules:0,
      total_employees:0,
      total_mapped:0,
      showNextBtn:false,
      role_name:'',
      expanded: '',
      viewUpdatePermissionCount:0,
      showPermissions:false,
      roles:[],
      viewPermissionCount:0,
      create_role_permissions:[],
      view_role_permissions:[],
      tableData: [{
        id: '',
        name: 'Assignment',
        subject: '',
        status: '',
      },
      {
        id: '',
        name: 'Circular',
        subject: '',
        status: '',
      }],
      userData: [{
        id: '',
        name: 'Vikram',
        subject: '',
        status: '',
      },
     ],
    role_permission:[],
    searchtableData:[],
    studentsData: [],
    tags: [],
    suggestions:[],
    };

  }


  getDashboardInfo = () => {

    new Service().apiCall('Roles/getUserManagementDashboardDetails').then(response => {
      if (response.status==200 && response.data!='') {
      this.setState({ total_roles: response.data.roles, total_modules: response.data.modules, total_employees: response.data.employees, total_mapped: response.data.mapped }); 
      }
    }).catch(error => {
      alert(error);
    });
  }

  savePermissions = () => {
    const postData = {
      name:this.state.role_name,
      permissionData: this.state.create_role_permissions
    };
 
    new Service().apiCall('Roles/insertRole',postData).then(response => {
      if (response.status==200 && response.data!='') {
        this.setState({
          alert: (
            <SweetAlert
            style={{ display: "block", marginTop: "-100px",zIndex:999999 }}
            title="Permissions Added Successfully!"
            showConfirm={false}
          >
          </SweetAlert>
          ),
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000) 
      }
    }).catch(error => {
      alert(error);
    });
  } 

  updatePermissions = () => {
    const postData = {
      name:this.state.selectedRoleName,
      permissionData: this.state.view_role_permissions,
      id: this.state.selectedRoleId
    };
    new Service().apiCall('Roles/updateRole',postData).then(response => {
      console.log(response);
      if (response.status==200 && response.data!='') {
        this.setState({
          alert: (
            <SweetAlert
            style={{ display: "block", marginTop: "-100px",zIndex:999999 }}
            title="Permissions Updated Successfully!"
            showConfirm={false}
          >
          </SweetAlert>
          ),
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000) 
      }
    }).catch(error => {
      alert(error);
    });
  } 

  getAllPermissions = () => {
    const postData = {
      id_user: this.props.data.UID,
      actiondata:"create"
    };
    new Service().apiCall('Roles/getPermissionData',postData).then(response => {
      console.log(response);
      if (response.status==200 && response.data!='') {
      this.setState({ create_role_permissions: response.data }); 
      }
    }).catch(error => {
      alert(error);
    });
  }

  viewRolePermissions = (role_id) => {
    const postData = {
      id:role_id
    };
    new Service().apiCall('Roles/getPermissionData',postData).then(response => {
      console.log(response);
      if (response.status==200 && response.data!='') {
        console.log(response.data);
      this.setState({ view_role_permissions: response.data[0].permissions }); 
      this.updateViewPermissionCount();
      }
    }).catch(error => {
      alert(error);
    });
  }

  getRolesList = () => {
    
    new Service().apiCall('Roles/getData').then(response => {
      if (response.status==200 && response.data!='') {
      this.setState({ roles: response.data }); 
      }
    }).catch(error => {
      alert(error);
    });
  }

  handleChangeParent = (rindex, status) => {
    let permissions_data = this.state.create_role_permissions;
    let checkedStatus = 0;
    if(status == 1){
      checkedStatus = 0;
    }
    else{
      checkedStatus = 1;
    }
        permissions_data[rindex].can_view = checkedStatus;
        permissions_data[rindex].can_view_own = checkedStatus;
        permissions_data[rindex].can_create= checkedStatus;
        permissions_data[rindex].can_edit = checkedStatus;
        permissions_data[rindex].can_export = checkedStatus;
        permissions_data[rindex].can_delete = checkedStatus;
        permissions_data[rindex].can_expand = checkedStatus;
        if(permissions_data[rindex].child){
          permissions_data[rindex].child.map((child,cindex)=>{
            permissions_data[rindex].child[cindex].can_view = checkedStatus;
            permissions_data[rindex].child[cindex].can_view_own = checkedStatus;
            permissions_data[rindex].child[cindex].can_create= checkedStatus;
            permissions_data[rindex].child[cindex].can_edit = checkedStatus;
            permissions_data[rindex].child[cindex].can_export = checkedStatus;
            permissions_data[rindex].child[cindex].can_delete = checkedStatus;
            permissions_data[rindex].child[cindex].can_expand = checkedStatus;
          });
        }
    this.setState({create_role_permissions: permissions_data});
    this.getViewPermissionCount();
  };

  handleUpdateParent = (rindex, status) => {
    let permissions_data = this.state.view_role_permissions;
    let checkedStatus = 0;
    if(status == 1){
      checkedStatus = 0;
    }
    else{
      checkedStatus = 1;
    }
        permissions_data[rindex].can_view = checkedStatus;
        permissions_data[rindex].can_view_own = checkedStatus;
        permissions_data[rindex].can_create= checkedStatus;
        permissions_data[rindex].can_edit = checkedStatus;
        permissions_data[rindex].can_export = checkedStatus;
        permissions_data[rindex].can_delete = checkedStatus;
        permissions_data[rindex].can_expand = checkedStatus;
        if(permissions_data[rindex].child){
          permissions_data[rindex].child.map((child,cindex)=>{
            permissions_data[rindex].child[cindex].can_view = checkedStatus;
            permissions_data[rindex].child[cindex].can_view_own = checkedStatus;
            permissions_data[rindex].child[cindex].can_create= checkedStatus;
            permissions_data[rindex].child[cindex].can_edit = checkedStatus;
            permissions_data[rindex].child[cindex].can_export = checkedStatus;
            permissions_data[rindex].child[cindex].can_delete = checkedStatus;
            permissions_data[rindex].child[cindex].can_expand = checkedStatus;
          });
        }
    this.setState({view_role_permissions: permissions_data});
    this.updateViewPermissionCount();
  };


  handleChangeAll = (rindex,perm, status) => {
    let permissions_data = this.state.create_role_permissions;
      if(status == 1){
        permissions_data[rindex][perm] = 0;
        permissions_data[rindex].child.map((child,cindex)=>{
          permissions_data[rindex].child[cindex][perm] = 0;
        });
      }
      else{
        permissions_data[rindex][perm] = 1;
        permissions_data[rindex].child.map((child,cindex)=>{
          permissions_data[rindex].child[cindex][perm] = 1;
        });
      }
    this.setState({create_role_permissions: permissions_data});
    this.getViewPermissionCount();
  };

  handleUpdateAll = (rindex,perm, status) => {
    let permissions_data = this.state.view_role_permissions;
      if(status == 1){
        permissions_data[rindex][perm] = 0;
        permissions_data[rindex].child.map((child,cindex)=>{
          permissions_data[rindex].child[cindex][perm] = 0;
        });
      }
      else{
        permissions_data[rindex][perm] = 1;
        permissions_data[rindex].child.map((child,cindex)=>{
          permissions_data[rindex].child[cindex][perm] = 1;
        });
      }
    this.setState({view_role_permissions: permissions_data});
    this.updateViewPermissionCount();
  };

  handleChange = (rindex,index,perm, status) => {
    let permissions_data = this.state.create_role_permissions;
      if(status == 1){
        permissions_data[rindex].child[index][perm] = 0;
      }
      else{
        permissions_data[rindex].child[index][perm] = 1;
      }
    this.setState({create_role_permissions: permissions_data});
    this.getViewPermissionCount();
  };

  handleUpdateChange = (rindex,index,perm, status) => {
    let permissions_data = this.state.view_role_permissions;
      if(status == 1){
        permissions_data[rindex].child[index][perm] = 0;
      }
      else{
        permissions_data[rindex].child[index][perm] = 1;
      }
    this.setState({view_role_permissions: permissions_data});
    this.updateViewPermissionCount();
  };


  setError = (value) => {
    this.setState({ error: value });
  }

  getViewPermissionCount =()=>{
    let permissions_data = this.state.create_role_permissions;
    let viewParentCount = 0;
    let viewChildCount = 0;
    permissions_data.map((parent,rindex)=>{
      if(parent.can_view == 1){
        viewParentCount = viewParentCount+1;
        if(permissions_data[rindex].child){
          permissions_data[rindex].child.map((child,cindex)=>{
              if(permissions_data[rindex].child[cindex].can_view == 1){
                viewChildCount = viewChildCount + 1;
              }
          });
        }
      }
    });
    let totalViewed = viewParentCount;
    this.setState({ viewPermissionCount: totalViewed });
  };

  updateViewPermissionCount =()=>{
    let permissions_data = this.state.view_role_permissions;
    let viewParentCount = 0;
    let viewChildCount = 0;
    permissions_data.map((parent,rindex)=>{
      if(parent.can_view == 1){
        viewParentCount = viewParentCount+1;
        if(permissions_data[rindex].child){
          permissions_data[rindex].child.map((child,cindex)=>{
              if(permissions_data[rindex].child[cindex].can_view == 1){
                viewChildCount = viewChildCount + 1;
              }
          });
        }
      }
    });
    let totalViewed = viewParentCount;
    this.setState({ viewUpdatePermissionCount: totalViewed });
  };

//start of error display function
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
        >
          We are regretting for it
        </SweetAlert>
      ),
    });
  };

  checkInputkFilled = ()=> { 
    if(this.state.role_name == ""){
      this.setState({
        alert: (
          <SweetAlert
          style={{ display: "block", marginTop: "-100px",zIndex:999999 }}
          title="Enter Role Name"
          showConfirm={false}
          
        >
        </SweetAlert>
        ),
      });
      setTimeout(() => {
        this.setState({ alert:null});
      }, 2000) 
    }
    else{
      this.setState({showPermissions:true})
    }
  
  }

  checkAccess = () => {
    return (
    <CheckAccess {...this.props} />
    )
  }

  // end of edit function 
  componentDidMount() {
    this.getDashboardInfo();
    this.getRolesList();
    this.getAllPermissions();
   // this.getStudentDetailsData();
    Modal.setAppElement(this.el);
  }

  render() {
    console.log(this.state.tags);
    const { classes } = this.props;
    const { tableData } = this.state;
    // getting user data
    const lUserData = this.props.data;
    // getting page size
    let pgSize1 = (tableData.length > 8) ? 8 : tableData.length;
    // if(!this.checkAccess()){
    //   return true;
    // }
    // else{
    //   return (
    //     <GridContainer justify="center">
    //       <GridItem xs={12} sm={12} md={6}>
    //           <span style={{fontSize:20}}><strong>You don't have permission to view this page</strong></span>
    //       </GridItem>
    //     </GridContainer>
    //     );
    // }
    return (
      <div>
        {this.state.alert}
        {/*table part start */}
      
        <Animated  animationIn="slideInRight" animationOut="slideOutLeft" animationInDelay="100"> 
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={3}>
          <Card style={{textAlign:'center'}}>
            <CardBody>
              <div className={classes.center}>
              <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Roles</h4>
                <h3 style={{marginTop:'10px',marginBottom:'10px'}}>{this.state.total_roles}</h3>
                </a>
              </div>
            </CardBody>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
          <Card style={{textAlign:'center'}}>
            <CardBody>
              <div className={classes.center}>
              <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Modules</h4>
              <h3 style={{marginTop:'10px',marginBottom:'10px'}}>{this.state.total_modules}</h3>
                </a>
              </div>
            </CardBody>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
          <Card style={{textAlign:'center'}}>
            <CardBody>
              <div className={classes.center}>
              <a style={{color:'#000',cursor:'pointer'}}>  <h4>Total Employees</h4>
              <h3 style={{marginTop:'10px',marginBottom:'10px'}}>{this.state.total_employees}</h3>
                </a>
              </div>
            </CardBody>
          </Card>
          </GridItem>
      
        </GridContainer>

        <GridContainer  style={{marginBottom:'30px'}}>
        <GridItem xs={12} sm={12} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <button style={{width:'100%',padding:'.5rem 1rem',fontSize: '1.25rem'}} type="submit" className="btn btn-warning" onClick={() => this.setState({createRolePanel:true})}>Create Role</button>
          </GridItem>
         
          <GridItem xs={12} sm={12} md={4}></GridItem> 
        </GridContainer>

        <GridContainer>
        <GridItem xs={12} sm={12} md={2}></GridItem>
        <GridItem xs={12} sm={12} md={8}>
        {this.state.roles.length > 0 && this.state.roles.map(roledata =>   
        <Card>
                  <CardBody>
                     <GridContainer style={{textAlign:'center'}}>
                       <GridItem xs={12} sm={12} md={4}>
                       <h5 style={{marginTop:'10px',marginBottom:'10px'}}>{roledata.name}</h5>
                        <div className="slide-pane__subtitle">role</div>
                       </GridItem>
                       <GridItem xs={12} sm={12} md={4}>
                       <h5 style={{marginTop:'10px',marginBottom:'10px'}}>{roledata.mappedcount}</h5>
                        <div className="slide-pane__subtitle">modules mapped</div>
                       </GridItem>
                        <GridItem  className="pickerGrid"  xs={12} sm={12} md={4} style={{textAlign:'right',margin:'auto'}} onClick={()=>{this.viewRolePermissions(roledata.id); this.setState({editRolePanel:true, selectedRoleId: roledata.id, selectedRoleName:roledata.name})}}>    
                              <Avatar style={{float:'right'}}>
                              <Edit />
                              </Avatar>
                        </GridItem>
                     </GridContainer>
                  </CardBody>
                </Card>
          )}    
            </GridItem>
          </GridContainer>
          </Animated>
      <SlidingPane
                className={classes.ModalStyle}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.createRolePanel }
                title="Create Role"
                subtitle='create role and assign permission' 
                onRequestClose={ () => {
                    this.setState({ createRolePanel: false});
                }}>
                <div> 
                <Animated  animationIn="slideInRight" animationOut="slideOutLeft" animationInDelay="100"> 
                <GridContainer>
          <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <DirectionsRunIcon />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Create Role</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={3}></GridItem>
                  <GridItem xs={12} sm={12} md={5}  className="outlinedInput">
                  <FormControl fullWidth>
               <TextField 
               id="document-type"   
               label="Role Name" 
               type="search" 
               onChange={(event) => this.setState({role_name:event.target.value, showNextBtn: event.target.value.length >= 5 ? true: false})}
               variant="outlined" 
               inputProps={{ minLength: 5 }}
               />
               
               </FormControl>
                  </GridItem>
               {this.state.showNextBtn && <GridItem xs={12} sm={12} md={1} className="pickerGrid"> <Avatar onClick={()=>this.checkInputkFilled()}>
                <NavigateNext />
                </Avatar>
                </GridItem>}
                <GridItem xs={12} sm={12} md={3}></GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>       
      {this.state.showPermissions && <GridContainer>
        <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8} className="ModulesListGrid">
                <div className={classes.accordionRoot+" AccordionDiv"} >
                  <div className="MuiPaper-rounded">
       {this.state.create_role_permissions.length > 0 && this.state.create_role_permissions.map((roledata,rindex) =>      
            <Card style={{marginTop:15,marginBottom:15}}>
            <CardBody>      
       <div style={{width:'100%'}}>
       <div className="MuiAccordionSummary-root">
             <FormControlLabel style={{marginLeft:0}}
                    control={
                      <Switch
                        checked={roledata.can_view  ? true : false}
                        onChange={() => this.handleChangeParent(rindex,roledata.can_view)}
                        value="checkedA"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          thumb: classes.switchIcon,
                          track: classes.switchBar
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label={roledata.name}
                  />
        </div>
        <div className="MuiCollapse-container MuiCollapse-entered">
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        {roledata.child &&   
        <ReactTable
                    data={this.state.create_role_permissions[rindex].child}
                    minRows={0}
                    columns={[
                      {
                        Header: "Permission",
                        accessor: 'name'
                      },
                      {
                        Header: <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                            onClick={() => this.handleUpdateAll(rindex,'can_view',roledata.can_view)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_view == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                      />
                      <br />
                      <span style={{position:'relative', top:'-15px', fontSize:12}}>View</span>
                      </div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                         
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleUpdateChange(rindex,index,'can_view',original.can_view)}
                              checked={original.can_view == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked:  classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                           onClick={() => this.handleUpdateAll(rindex,'can_view_own',roledata.can_view_own)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_view_own == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>View Own</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                             onClick={() => this.handleUpdateChange(rindex,index,'can_view_own',original.can_view_own)}
                              key="key"
                              checked={original.can_view_own == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                          onClick={() => this.handleUpdateAll(rindex,'can_create',roledata.can_create)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_create == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Create</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleUpdateChange(rindex,index,'can_create',original.can_create)}
                              checked={original.can_create == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                          onClick={() => this.handleUpdateAll(rindex,'can_edit',roledata.can_edit)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_edit == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Edit</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleUpdateChange(rindex,index,'can_edit',original.can_edit)}
                              checked={original.can_edit == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                            onClick={() => this.handleUpdateAll(rindex,'can_export',roledata.can_export)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_export == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Export</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleUpdateChange(rindex,index,'can_export',original.can_export)}
                              checked={original.can_export == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                            onClick={() => this.handleUpdateAll(rindex,'can_delete',roledata.can_delete)}
                            tabIndex={-1}
                            checked={this.state.create_role_permissions[rindex].can_delete == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Delete</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleUpdateChange(rindex,index,'can_delete',original.can_delete)}
                              checked={original.can_delete == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                 
                    ]}
                    defaultPageSize={8}
                    pageSize={this.state.create_role_permissions[rindex].child.length}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                    }
                  </GridItem>
                  </GridContainer>
    </div>
    </div>
    </CardBody>
    </Card>
       )}
    <Card style={{marginTop:15,marginBottom:15}}>
      <CardBody>
       <GridContainer>
         <GridItem  xs={12} sm={12} md={10} style={{marginTop:'auto', marginBottom:'auto'}}>
          <h4> <strong>{this.state.viewPermissionCount} modules mapped</strong></h4>
         </GridItem>
         <GridItem  xs={12} sm={12} md={2}>
         <MaterialButton variant="outlined" className="successBtnOutline"  style={{color:'#4caf50',border:'1px solid #4caf50', width:'100%'}} onClick={()=>this.savePermissions()}>
  Submit
</MaterialButton>
         </GridItem>
         </GridContainer>               
      </CardBody>
      </Card>  
    </div>
    </div>
    
                </GridItem>
                  </GridContainer>
                  
                  }
              </Animated>
                </div>
      </SlidingPane>  

      <SlidingPane
                className={classes.ModalStyle}
                overlayClassName={classes.panelClass}
                isOpen={ this.state.editRolePanel }
                title={"Edit Role"}
                subtitle='Edit role and assign permission' 
                onRequestClose={ () => {
                    this.setState({ editRolePanel: false});
                }}>
                <div> 
                <Animated  animationIn="slideInRight" animationOut="slideOutLeft" animationInDelay="100"> 
                <GridContainer>
          <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <DirectionsRunIcon />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Edit Role</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={3}></GridItem>
                  <GridItem xs={12} sm={12} md={6}  className="outlinedInput">
                  <FormControl fullWidth>
               <TextField 
               id="document-type"   
               label="Role Name" 
               value={this.state.selectedRoleName}
               type="search" 
               onChange={(event) => this.setState({selectedRoleName:event.target.value})}
               variant="outlined" 
               inputProps={{ minLength: 5 }}
               />
               </FormControl>
                  </GridItem>
                <GridItem xs={12} sm={12} md={3}></GridItem>
                </GridContainer>
                {/* <GridContainer style={{marginTop:15}}>
                <GridItem xs={12} sm={12} md={12} className="warningGrid">
                        <div className="alert alert-warning bold">
                        Changing role permissions won't affected current staff members permissions that are using this role.        
                        <FormControlLabel style={{marginLeft:0, fontSize:'14px'}}
                        control={
                          <Checkbox 
                            tabIndex={-1}
                            checked={this.state.allstudentsChecked}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label="Update all staff members permissions that are using this role"
                      />                               
                        </div>
                  </GridItem>

                </GridContainer> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>       
       <GridContainer>
        <GridItem xs={12} sm={12} md={2}></GridItem>
          <GridItem xs={12} sm={12} md={8} className="ModulesListGrid">
                <div className={classes.accordionRoot+" AccordionDiv"} >
                  <div className="MuiPaper-rounded">
       {this.state.view_role_permissions.length > 0 && this.state.view_role_permissions.map((roledata,rindex) =>      
            <Card style={{marginTop:15,marginBottom:15}}>
            <CardBody>      
       <div style={{width:'100%'}}>
       <div className="MuiAccordionSummary-root">
             <FormControlLabel style={{marginLeft:0}}
                    control={
                      <Switch
                        checked={roledata.can_view == "1" ? true : false}
                        onChange={() => this.handleUpdateParent(rindex,roledata.can_view)}
                        value="checkedA"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          thumb: classes.switchIcon,
                          track: classes.switchBar
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label={roledata.name}
                  />
        </div>
        <div className="MuiCollapse-container MuiCollapse-entered">
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        {roledata.child &&   
        <ReactTable
                    data={this.state.view_role_permissions[rindex].child}
                    minRows={0}
                    columns={[
                      {
                        Header: "Permission",
                        accessor: 'name'
                      },
                      {
                        Header: <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                            onClick={() => this.handleUpdateAll(rindex,'can_view',roledata.can_view)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_view == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                      />
                      <br />
                      <span style={{position:'relative', top:'-15px', fontSize:12}}>View</span>
                      </div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                         
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleChange(rindex,index,'can_view',original.can_view)}
                              checked={original.can_view == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked:  classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                           onClick={() => this.handleChangeAll(rindex,'can_view_own',roledata.can_view_own)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_view_own == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>View Own</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                             onClick={() => this.handleChange(rindex,index,'can_view_own',original.can_view_own)}
                              key="key"
                              checked={original.can_view_own == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                          onClick={() => this.handleChangeAll(rindex,'can_create',roledata.can_create)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_create == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Create</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleChange(rindex,index,'can_create',original.can_create)}
                              checked={original.can_create == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                          onClick={() => this.handleChangeAll(rindex,'can_edit',roledata.can_edit)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_edit == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Edit</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleChange(rindex,index,'can_edit',original.can_edit)}
                              checked={original.can_edit == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox
                            onClick={() => this.handleChangeAll(rindex,'can_export',roledata.can_export)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_export == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Export</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleChange(rindex,index,'can_export',original.can_export)}
                              checked={original.can_export == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                      {
                        Header:  <div><FormControlLabel style={{margin:'auto'}}
                        control={
                          <Checkbox 
                            onClick={() => this.handleChangeAll(rindex,'can_delete',roledata.can_delete)}
                            tabIndex={-1}
                            checked={this.state.view_role_permissions[rindex].can_delete == 1 ? true : false}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          root: classes.labelRoot
                        }}
                        label=""
                        />
                        <br />
                        <span style={{position:'relative', top:'-15px', fontSize:12}}>Delete</span></div>,
                        sortable: false,
                        filterable: false,
                        Cell: ({ original,index }) => (
                          <div>
                            <Checkbox
                              key="key"
                              onClick={() => this.handleChange(rindex,index,'can_delete',original.can_delete)}
                              checked={original.can_delete == 1 ? true : false}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                          }}
                    />{" "}
                          </div>
                        ),
                      },
                 
                    ]}
                    defaultPageSize={8}
                    pageSize={this.state.create_role_permissions[rindex].child.length}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                    }
                  </GridItem>
                  </GridContainer>
    </div>
    </div>
    </CardBody>
    </Card>
       )}
    <Card style={{marginTop:15,marginBottom:15}}>
      <CardBody>
       <GridContainer>
         <GridItem  xs={12} sm={12} md={10} style={{marginTop:'auto', marginBottom:'auto'}}>
          <h4> <strong>{this.state.viewUpdatePermissionCount} modules mapped</strong></h4>
         </GridItem>
         <GridItem  xs={12} sm={12} md={2}>
         <MaterialButton variant="outlined" className="successBtnOutline"  style={{color:'#4caf50',border:'1px solid #4caf50', width:'100%'}} onClick={()=>this.updatePermissions()}>
  Submit
</MaterialButton>
         </GridItem>
         </GridContainer>               
      </CardBody>
      </Card>  
    </div>
    </div>
    
      </GridItem>
        </GridContainer>
        
        
    </Animated>
      </div>
</SlidingPane>        

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(tableStyles)(MessageCenter));
