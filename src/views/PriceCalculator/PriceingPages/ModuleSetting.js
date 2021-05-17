import React from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import {Animated} from "react-animated-css";
import SlidingPane from 'react-sliding-pane';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyleNew.js";
import Moment from 'moment';
import Chip from '@material-ui/core/Chip';
import MButton from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NavigateNext from "@material-ui/icons/NavigateNext";
import Service from 'Utils/Service';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CustomDropDown from "../../Components/CustomDropDown";
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
// @material-ui/icons
import 'date-fns'
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../../Utils/MapStateDispatchProps.js';
import CheckAccess from "components/CheckAccess.js";
import { SyncDisabled } from "@material-ui/icons";
//import customDropDown from "views/Components/customDropDown.js";

const panelStyles = {
  table: {
    minWidth: 650,
  }, 
  imageinput: {
    display: 'none',
  },
  imageButton: {
    padding: '5px 15px !important',
  },
  tableRightBorder : { 
    borderWidth: 1, borderColor:'black',borderStyle: 'solid'
  }, 
  
};

const pageStyles = {...styles,...panelStyles }

const useStyles = makeStyles(pageStyles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class AdminDashboard extends React.Component  { 

  constructor(props) 
  {
    super(props);
    this.state = { 
      moduleslide:false,
      dependentslider:false,
      viewtype:'mainmenu',
      newmodule_type:'',
      dependent:'',
      institute_name:'',
      institute_id:'',
      module_name:'',
      sub_module_name:'',
      default_mod_count:'',
      opt_module_count:'',
      alert:null,
      button:'',
      usermenudata:[],       
      userchildmenudata:[], 
      selectedDependentModules : [],
      selectemenu:'', 
      selectedsubmenu:'',
      main_menu_status:'',
      selectedCategory:'',
      module_id:'',
      query_condtion:[0],
      ActiveSubModule:'',
      dependent_module_name:[],
      new_dependent_module_name:[],
      sub_module_id: '',
      pricing:''
    }
  }
  setMainModule(main_module){
    this.setState({main_module_name:main_module}); 
  }

  setSubModule(sub_main_module){
    this.setState({sub_module_name:sub_main_module}); 
  }

  setDependentName(dependent_name){
    if(dependent_name.length > 0)
    {
      let type = typeof dependent_name[dependent_name.length - 1];
    
      if(type == "object")
      { 
        this.setState({dependent_module_name:dependent_name}); 
      }
    }
    else
    {
      this.setState({dependent_module_name:dependent_name});
    }
  } 
  
  defaultValue(Module){ 
    let newarray = this.state.userchildmenudata;
    let arraylength = newarray.filter(module => module.module_type === 'Default' &&  module.main_module === Module );
    let count =0;
    const newArradded = newarray.map((v,index) => { 
      if(newarray[index].main_module === Module ){
        count++;
        newarray[index].default_module_count=arraylength.length;  
      }      
    });
    
    this.setState({userchildmenudata:newarray}); 
  }  
  
  optionalValue(Module){
    let newarray = this.state.userchildmenudata;
    let arraylength = newarray.filter(module => module.module_type === 'Optional' &&  module.main_module === Module );
    let count =0;
    const newArradded = newarray.map((v,index) => { 
      if(newarray[index].main_module === Module ){
        count++;
        newarray[index].optional_module_count=arraylength.length;  
      }      
    });  

    this.setState({userchildmenudata:newarray});
  }

  handlevalue (Index,Field,Value,Module){
    let newarray = this.state.userchildmenudata;
    newarray[Index][Field]=Value;
    this.setState({userchildmenudata:newarray});
    this.defaultValue(Module);
    this.optionalValue(Module);
  }
  
  handlemoduleValue (Index,Field,Value,Module){
    let newarray = this.state.userchildmenudata;
    let defaultlength = newarray.filter(module => module.module_type === 'Default' &&  module.main_module === Module );
    let optionallength = newarray.filter(module => module.module_type === 'Optional' &&  module.main_module === Module );
    let defaultcount =defaultlength.length;
    let optionalcount =optionallength.length;
    if(Value === 'Default'){
      defaultcount++;
    }
    else if(Value === 'Optional'){
      optionalcount++; 
    }
    /*const newArradded = newarray.map((v,index) => { 
      if(newarray[index].main_module === Module ){
        count++;
        newarray[index].optional_module_count=arraylength.length;  
      }      
    }); */  

    this.setState({default_mod_count:defaultcount,opt_module_count:optionalcount});  
  }
 
  getUserParentMenu() {
    const postData = { };
    new Service().apiCall('UserMenu/GetAllParentData',postData).then(response =>
    { 
      if (response.data!='') 
      {      
        this.setState({usermenudata: response.data})
        //this.setState({main_module_names:response.data[0].main_module}) 
      }
      else{
        this.setState({usermenudata:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }    

  getUserChildMenu() {
    const postData = { };
    new Service().apiCall('UserMenu/GetAllChildData',postData).then(response =>
    {
      if (response.data!='') 
      {      
        const newArr = response.data;
        const newArradded = newArr.map(v => ({...v, minamount:'', maxamount:'', amount_error:''}));

        this.setState({userchildmenudata: newArradded}) 
      }
      else{
        this.setState({userchildmenudata:[]})
      }
    }).catch(error => {
      alert("error.response.data.message");
    });
  }
  setDependentSlider(id,sub_module,dependent_on,status)
  {
    if(status === "1")
    {
      var lSelectDependentModule = [];
      let newarray = this.state.userchildmenudata;

      for(var i=0;i<newarray.length;i++)
      {
        if(dependent_on.includes(newarray[i]['id']))
        {
          lSelectDependentModule.push( newarray[i] ); 
        }
      }

      this.setState({dependentslider:true,selectedsubmenu:sub_module,dependent_module_name : lSelectDependentModule,sub_module_id:id});
    }
  }

  componentDidMount() {    
    this.getUserParentMenu(); 
    this.getUserChildMenu();

    if(this.props.token === '' || this.props.token === null)
    {
      this.props.history.push('/auth/login-page');
    }
  }
 
  EditMenu()
  {    
    this.setState({moduleslide:false}); 
      
    let formData = new FormData();
    formData.append('userchildmenudata',JSON.stringify(this.state.userchildmenudata));
    
    new Service().apiCall('UserMenu/EditMenu', formData).then(response => 
    { 
      if (response.status === 200 && response.data !== '') 
      { 
        this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Module Type Updated Successfully!" showConfirm={false} >Now you can access all</SweetAlert> ), });
        setTimeout(() => {
          this.setState({ alert:null});  
          this.getUserParentMenu();
          this.getUserChildMenu();
        }, 2000)
      } 
    }).catch(error => {
      this.errorAlert('test');
    });
  } 

  EditDependentModule()
  {
      this.setState({dependentslider:false});
      //this.setState({moduleslide:false}); 

      this.state.dependent_module_name.map((v,index) => { 
        this.state.dependent_module_name[index] = v.id;  
      });

      const postData = { 
        sub_module_id:this.state.sub_module_id,
        dependent_module_name: this.state.dependent_module_name,
      };    

      // let formData = new FormData();
      // formData.append('userchildmenudata',JSON.stringify(this.state.userchildmenudata));
      new Service().apiCall('UserMenu/Updatedependent', postData).then(response => 
      {  
        this.setState({ sub_module_id:''});
        this.setState({ selectedsubmenu:''});
        this.setState({ dependent_module_name:''}); 
        this.setState({viewtype:'mainmenu'})
        
        if (response.status === 200 && response.data !== '') 
        {
          this.setState({
            updateAlert: (
              <Alert severity="success">Dependent Module Updated Successfully!</Alert>   
            ),
          });
          this.getUserParentMenu();
          this.getUserChildMenu();
          setTimeout(() => {
            this.setState({ updateAlert:null});
          }, 2000)
        }   
      }).catch(error => {
        this.errorAlert('test');
        this.setState({viewtype:'mainmenu'})
      });
  }

  AddMainMenu()
  {    
    if(this.state.main_module_name !== ''){
      //alert('success');
      this.setState({moduleslide:false}); 
      const postData = { 
        module_name: this.state.main_module_name,
      }; 

      // let formData = new FormData();
      // formData.append('userchildmenudata',JSON.stringify(this.state.userchildmenudata));
      new Service().apiCall('UserMenu/AddMainMenu', postData).then(response => 
      { 
        this.setState({main_module_name:''});
        this.setState({viewtype:'mainmenu'});
       
        if(response.data === 1){ 
          this.setState({alert: (<SweetAlert danger confirmBtnBsStyle="danger" title="Data Already Exist!!!" onConfirm={() => { this.setState({ alert: null });}}> </SweetAlert>),    
          });
        }     
        else if (response.status === 200 && response.data !== '') 
        {
          this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Main Module Created Successfully!" showConfirm={false} ></SweetAlert> ), });
          setTimeout(() => {
            this.setState({ alert:null});    
            this.getUserParentMenu();
            this.getUserChildMenu();
          }, 2000)
        }
      }).catch(error => {
        this.errorAlert('test');
        this.setState({viewtype:'mainmenu'});
      });
    }else{ 
      alert('Please Fill All the Details');   
    }
  }

  AddSubMenu()
  {    
    if(this.state.module_name !== '' && this.state.sub_module_name !== '' && this.state.newmodule_type !== '' && this.state.dependent !== '' && ((this.state.dependent !== 'Yes' && this.state.dependent_module_name !== '') || (this.state.dependent !== 'No'))){ 
      //alert('success'); 
      this.setState({moduleslide:false}); 

      this.state.dependent_module_name.map((v,index) => { 
        this.state.dependent_module_name[index] = v.id;  
      });
      //let new_dependent_module_name = JSON.stringify(this.state.dependent_module_name);

      const postData = { 
        module_name: this.state.module_name,
        sub_module_name: this.state.sub_module_name,
        newmodule_type: this.state.newmodule_type,
        default_mod_count: this.state.default_mod_count,
        opt_module_count: this.state.opt_module_count,
        module_id: this.state.module_id,
        dependent: this.state.dependent,
        dependent_module_name: this.state.dependent_module_name,
        pricing: this.state.pricing,
      };     
    
      // let formData = new FormData();
      // formData.append('userchildmenudata',JSON.stringify(this.state.userchildmenudata));
      new Service().apiCall('UserMenu/AddSubMenu', postData).then(response => 
      { 
        this.setState({ module_name:''}); 
        this.setState({ sub_module_name:''});  
        this.setState({ newmodule_type:''});
        this.setState({ module_id:''});
        this.setState({ dependent_module_name:[]}); 
        this.setState({viewtype:'mainmenu'})
        
        if(response.data === 1){ 
          this.setState({alert: (<SweetAlert danger confirmBtnBsStyle="danger" title="Data Already Exist!!!" onConfirm={() => { this.setState({ alert: null });}}> </SweetAlert>),    
          });
        } 
        else if (response.status === 200 && response.data !== '') 
        {
          this.setState({ alert: ( <SweetAlert  success  confirmBtnBsStyle="success" title="Sub Module Created Successfully!" showConfirm={false} ></SweetAlert> ), });
          setTimeout(() => {
            this.setState({ alert:null});   
            this.getUserParentMenu();
            this.getUserChildMenu();
          }, 2000)
        }   
      }).catch(error => {
        this.errorAlert('test');
        this.setState({viewtype:'mainmenu'})
      });
    }else{ 
      alert('Please Fill All the Details');   
    } 
  } 

  onSelectDropdown = (val,index,id) => {
    this.setState({module_name:val,module_index:index,module_id:id}) 
  }

  changeStaus = (index,value,id) =>{
    let newarray = this.state.userchildmenudata;
    newarray[index]['status']=value;
    this.setState({userchildmenudata:newarray}); 
    const postData = { 
      id: id,
      status: value
    };
  
    new Service().apiCall('UserMenu/UpadateStatus', postData).then(response => 
    { 
      //this.setState({moduleslide:false}); 
      if(response.status === 200 && response.data.status === '1'){ 
        this.setState({
          updateAlert: (
            <Alert severity="success">Sub Module Activated!</Alert>   
          ),
        });
          setTimeout(() => {
            this.setState({ updateAlert:''});  
          }, 2000)
      } 
      else if (response.status === 200 && response.data.status === '0') 
      {
        this.setState({
          updateAlert: (
            <Alert severity="error">Sub Module Deactivated!</Alert>   
          ),
        });
          setTimeout(() => {
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

  moduleslidefunction = (name,status) =>{
    this.setState({moduleslide:true});
    this.setState({selectemenu:name});
    //this.setState({main_menu_status:status});
    this.setState({viewtype:'mainmenu'});
    
    if(status === 1){
      this.setState({main_menu_status:true});
    }
    else
    {
      this.setState({main_menu_status:false}); 
    }
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
          {/*<div>Add/Edit/View Module List</div>*/}
          <div>{this.state.selectedsubmenu !== '' ? this.state.selectedsubmenu : this.state.viewtype === "mainmenu" ? this.state.selectemenu : this.state.viewtype === "addmainmenu" ? 'Add Main Module' : "Add Sub Module"}</div>  
        </GridItem> 
        <GridItem xs={12} sm={10} md={6} style={{textAlign:'right'}}> 
        </GridItem>
      </GridContainer>
    )
  }

  render()
  { 
    const { classes } = this.props;
    return (
      <div>
      
        <GridContainer  justify="center" alignItems="center">  
          <GridItem lg={8} md={8} sm={12} xs={12}>
            <Card >
              <CardBody>
                <GridContainer className="outlinedInput"  justify="center" alignItems="center">
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} onClick={ ()=> this.setState({viewtype:'mainmenu'})} style={{backgroundColor:this.state.viewtype ==='mainmenu' && '#0ee0e0'}} >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                        <Typography> Module List </Typography>
                      </GridItem>                          
                    </GridContainer>
                    </button>
                  </GridItem> 
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} onClick={ ()=> {this.setState({viewtype:'addmainmenu'});this.setState({moduleslide:true})}} style={{backgroundColor:this.state.viewtype ==='addmainmenu' && '#0ee0e0'}}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                        <Typography> Add Main Module </Typography>
                      </GridItem>                          
                    </GridContainer>
                    </button>
                  </GridItem> 
                  <GridItem lg={3} md={3} xs={12} sm={12}>
                    <button className={classes.CardButton} onClick={ ()=> {this.setState({viewtype:'addsubmenu',dependent:'',dependent_module_name:[]});this.setState({moduleslide:true})}} style={{backgroundColor:this.state.viewtype ==='addsubmenu' && '#0ee0e0'}}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                        <Typography> Add Sub Module </Typography>
                      </GridItem>                          
                    </GridContainer>
                    </button>
                  </GridItem> 
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        {this.state.viewtype === 'mainmenu' && <div>          
        <GridContainer justify="center" alignItems="center" >
          <GridItem lg={8} md={8} sm={12} xs={12}>
            <Card>
              <CardBody> 
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableRightBorder} align="left">Main Module Name</TableCell>
                        <TableCell className={classes.tableRightBorder} align="left">Default Count</TableCell>
                        <TableCell className={classes.tableRightBorder} align="left">Optional Count</TableCell>
                        <TableCell className={classes.tableRightBorder} align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{backgroundColor:'#eee'}}> 
                      {this.state.usermenudata.map((item, itemindex) => (
                        <TableRow>
                          <TableCell className={classes.tableRightBorder} align="left">{item.main_module}</TableCell>
                          <TableCell className={classes.tableRightBorder} align="left">{item.default_module_count}</TableCell>
                          <TableCell className={classes.tableRightBorder} align="left">{item.optional_module_count}</TableCell>
                          <TableCell className={classes.tableRightBorder+" pickerGrid"} align="left"><Avatar variant="outlined" onClick={()=> this.moduleslidefunction(item.main_module,item.status)} style={{marginRight:10}}><NavigateNext /></Avatar></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card> 
          </GridItem>
        </GridContainer></div>}      

        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle1}
              overlayClassName={classes.panelClass}
              isOpen={this.state.moduleslide}
              title={this.renderHeader()}
              
              onRequestClose={ () => {
                this.setState({ moduleslide: false,viewtype: 'mainmenu'});

            }}
            
            >
          <div> 
            {this.state.viewtype === 'mainmenu' && 
            
            <GridContainer justify="center" alignItems="center" >
              <GridItem lg={11} md={11} sm={12} xs={12}>
              <GridContainer justify="center" alignItems="center" >
                <GridItem lg={10} md={10} sm={12} xs={12}>
                  {this.state.updateAlert}
                </GridItem>
              </GridContainer>
                <Card>
                  <CardBody> 
                    <TableContainer component={Paper} className={classes.CustomTableStyle}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            {/*<TableCell className={classes.tableRightBorder} align="left">Menu</TableCell>*/}
                            <TableCell className={classes.tableRightBorder} align="left">Sub Module Name</TableCell>
                            <TableCell className={classes.tableRightBorder} align="left">Default</TableCell>
                            <TableCell className={classes.tableRightBorder} align="left">Optional</TableCell>
                            <TableCell className={classes.tableRightBorder} align="center">Dependent Count</TableCell>
                            <TableCell className={classes.tableRightBorder} align="center">Fixed(Pricing)</TableCell>
                            <TableCell className={classes.tableRightBorder} align="center">Dynamic(Pricing)</TableCell>
                            <TableCell className={classes.tableRightBorder} align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{backgroundColor:'#eee'}}> 
                          {this.state.userchildmenudata.map((item, itemindex) => ( this.state.selectemenu === item.main_module &&
                            <TableRow>
                              {/*<TableCell className={classes.tableRightBorder} align="left">{item.main_module}</TableCell>*/}
                              <TableCell className={classes.tableRightBorder} align="left">{item.sub_module}</TableCell>
                              <TableCell className={classes.tableRightBorder} align="center">
                                <RadioGroup row aria-label="position"  align="center">  
                                  <FormControlLabel control={<Radio color="primary" checked={item.module_type === "Default"} disabled={item.status === "0" ? true : false} onClick={()=> this.handlevalue(itemindex,'module_type','Default',item.main_module)} />} />
                                </RadioGroup>
                              </TableCell>
                              <TableCell className={classes.tableRightBorder} align="center">
                                <RadioGroup row aria-label="position"  align="center">  
                                  <FormControlLabel  align="center" control={<Radio color="primary" checked={item.module_type === "Optional"} disabled={item.status === "0" ? true : false} onClick={()=> this.handlevalue(itemindex,'module_type','Optional',item.main_module)}  />} />
                                </RadioGroup>
                              </TableCell> 
                              <TableCell className={classes.tableRightBorder} align="center">
                              <button style={{borderRadius:"50%", border:"none"}} align="center" className={classes.purple} onClick={()=> this.setDependentSlider(item.id,item.sub_module,item.dependent_on.split(','),item.status)} >{item.has_dependent === 'Yes' ? item.dependent_on.split(',').length : '0'}</button> 
                              </TableCell>
                              <TableCell className={classes.tableRightBorder} align="center">
                                <RadioGroup row aria-label="position"  align="center">  
                                  <FormControlLabel control={<Radio color="primary" checked={item.pricing === "fixed"} disabled={item.status === "0" ? true : item.module_type === "Default" ? true : false} onClick={()=> this.handlevalue(itemindex,'pricing','fixed',item.main_module)} />} />
                                </RadioGroup>
                              </TableCell>
                              <TableCell className={classes.tableRightBorder} align="center">
                                <RadioGroup row aria-label="position"  align="center">  
                                  <FormControlLabel  align="center" control={<Radio color="primary" checked={item.pricing === "dynamic"} disabled={item.status === "0" ? true : item.module_type === "Default" ? true : false} onClick={()=> this.handlevalue(itemindex,'pricing','dynamic',item.main_module)}  />} />
                                </RadioGroup>
                              </TableCell> 
                              <TableCell className={classes.tableRightBorder} align="left"> 
                                <Switch
                               
                                  color="primary"
                                  name="ActiveSubModule"
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                                  checked={item.status === "1"}
                                  onClick={() => this.changeStaus(itemindex,item.status === "1" ? "0" : "1",item.id)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <GridContainer  style={{paddingTop:"1%",paddingBottom:"2%"}}>
                      <GridItem lg={12} md={12} sm={12} xs={12} justify="right" alignItems="right">
                        <MButton className={classes.FinalSubmitButton }  onClick={this.EditMenu.bind(this)}  variant="outlined" style={{float:"right"}} >
                          Submit
                        </MButton>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card> 
              </GridItem>
            </GridContainer>} 
            
            {this.state.viewtype === 'addmainmenu' && 
            <GridContainer justify="center" alignItems="center" >
              <GridItem lg={11} md={11} sm={12} xs={12}>
                <Card>
                  <CardBody>  
                    <GridContainer>
                      <GridItem lg={12} md={12} sm={12} xs={12}>
                      <p className={classes.heading} style={{paddingTop:"7px"}}>New Main Module Creation</p> 
                      </GridItem> 
                    </GridContainer>
                    <GridContainer className="outlinedInput"  style={{paddingTop:"1%",paddingBottom:"2%"}}> 
                      <GridItem  md={12} lg={12} xs={12} sm={12} style={{textAlign:"center"}}>
                      <Autocomplete
                         freeSolo
                         id="document-type" 
                          options={this.state.usermenudata}
                          //getOptionDisabled={(option) => option == option.main_module}
                          onChange={(event, value) => { if(value) {this.setMainModule(value.main_module)}}}
                          //onChange={(event) => this.setState({main_module_name:event.target.value})} 
                         getOptionLabel={(option) => option.main_module} 
                          getOptionDisabled={(option) => !!this.state.usermenudata.find(element => element === option)} 
                          renderInput={(params) => <TextField  {...params}label="Module Name" onChange={(event) => this.setState({main_module_name:event.target.value})}  variant="outlined" />}
                        /> 
                      </GridItem>
                    </GridContainer>
                    <GridContainer  style={{paddingTop:"1%",paddingBottom:"2%"}}>
                      <GridItem lg={12} md={12} sm={12} xs={12} justify="right" alignItems="right">
                        <MButton className={classes.FinalSubmitButton }  onClick={()=>this.AddMainMenu()}  variant="outlined" style={{float:"right"}} >
                          Submit
                        </MButton>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card> 
              </GridItem>
            </GridContainer>}
            
            {this.state.viewtype === 'addsubmenu' && 
            <GridContainer justify="center" alignItems="center" >
              <GridItem lg={11} md={11} sm={12} xs={12}>
                <Card>
                  <CardBody>  
                    <GridContainer>
                      <GridItem lg={12} md={12} sm={12} xs={12}>
                        <p className={classes.heading} style={{paddingTop:"7px"}}>Sub Module Creation</p> 
                      </GridItem>
                    </GridContainer>
                    <GridContainer className="outlinedInput" justify="center" alignItems="center" style={{paddingTop:"1%",paddingBottom:"2%"}}> 
                    <GridItem  md={12} lg={12} xs={12} sm={12} style={{textAlign:"center"}}>
                      <CustomDropDown id='sub-module' query_id="GET_MODULE_CATEGORY" query_data={this.state.query_condtion} onSelected={this.onSelectDropdown} heading={"Select Main Module"} value={this.state.module_name} {...this.props} /> 
                      </GridItem>
                      <GridItem  md={12} lg={12} xs={12} sm={12}  style={{textAlign:"center",marginTop:"7px"}}>
                        <FormControl fullWidth>
                        <Autocomplete
                          freeSolo
                          id="document-type" 
                            options={this.state.userchildmenudata}
                            onChange={(event, value) => { if(value) {this.sub_main_module(value.sub_module)}}}
                          getOptionLabel={(option) => option.sub_module} 
                            getOptionDisabled={(option) => !!this.state.userchildmenudata.find(element => element === option)}  
                            renderInput={(params) => <TextField  {...params}label="Sub Module Name" onChange={(event) => this.setState({sub_module_name:event.target.value})}  variant="outlined" />}
                          />                  
                        </FormControl>
                      </GridItem>
                      <GridItem  md={12} lg={12} xs={12} sm={12} style={{textAlign:"center"}}>
                        <RadioGroup row aria-label="position" style={{textAlign:"center"}}>  
                          <FormControlLabel control={<Radio color="primary" checked={this.state.newmodule_type === "Default"} onClick={()=> {this.setState({newmodule_type:'Default'});this.handlemoduleValue(this.state.module_index,'module_type','Default',this.state.module_name)}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Default</span>} />
                          <FormControlLabel control={<Radio color="primary" checked={this.state.newmodule_type === "Optional"} onClick={()=> {this.setState({newmodule_type:'Optional'});this.handlemoduleValue(this.state.module_index,'module_type','Optional',this.state.module_name)}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Optional</span>} /> 
                        </RadioGroup>
                      </GridItem>
                      { this.state.newmodule_type === "Optional" && <GridItem  md={12} lg={12} xs={12} sm={12}>
                        <RadioGroup row aria-label="position" style={{textAlign:"center"}}>  
                        <span className={classes.heading} style={{paddingTop:"10px",paddingRight:"10px"}}>Pricing?</span>
                          <FormControlLabel control={<Radio color="primary" checked={this.state.pricing === "fixed"} onClick={()=> {this.setState({pricing:'fixed'})}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Fixed</span>} />
                          <FormControlLabel control={<Radio color="primary" checked={this.state.pricing === "dynamic"} onClick={()=> {this.setState({pricing:'dynamic'})}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Dynamic</span>} /> 
                        </RadioGroup>
                      </GridItem>}
                      <GridItem  md={12} lg={12} xs={12} sm={12}>
                        <RadioGroup row aria-label="position" style={{textAlign:"center"}}>  
                        <span className={classes.heading} style={{paddingTop:"10px",paddingRight:"10px"}}>Dependent?</span>
                          <FormControlLabel control={<Radio color="primary" checked={this.state.dependent === "Yes"} onClick={()=> {this.setState({dependent:'Yes'})}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>Yes</span>} />
                          <FormControlLabel control={<Radio color="primary" checked={this.state.dependent === "No"} onClick={()=> {this.setState({dependent:'No'})}} />} label={<span style={{ fontSize: '16px',fontWeight:400,color:'black' }}>No</span>} /> 
                        </RadioGroup>
                      </GridItem> 
                      
                      { this.state.dependent === "Yes" && <GridItem  md={12} lg={12} xs={12} sm={12}  style={{textAlign:"center",marginTop:"7px"}}>
                        <FormControl fullWidth>
                        <Autocomplete
                          freeSolo
                          multiple 
                          id="document-type" 
                          value={this.state.dependent_module_name}
                          options={this.state.userchildmenudata}
                          onChange={(event, value) => { if(value) {this.setDependentName(value)}}}
                          getOptionLabel={(option) => option.sub_module} 
                          getOptionDisabled={(option) => (option.module_type === "Default")}  
                          renderInput={(params) => <TextField  {...params}label="Dependent On"  variant="outlined" />}
                          />                 
                        </FormControl>
                      </GridItem> }
                    </GridContainer>
                    <GridContainer justify="right" alignItems="right"  style={{paddingTop:"1%",paddingBottom:"2%"}}>
                      <GridItem lg={12} md={12} sm={12} xs={12} style={{textAlign:"right"}}>
                        <MButton className={classes.FinalSubmitButton }  onClick={()=>this.AddSubMenu()}  variant="outlined" style={{float:"right"}} > 
                          Submit
                        </MButton>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card> 
              </GridItem>
            </GridContainer>}
          </div>
        </SlidingPane>
        <SlidingPane
          closeIcon={<div>   
            <Button justIcon round color="white" style={{color:'black'}} >
            <KeyboardArrowLeft style={{width:36,height:36}} className={classes.sidebarMiniIcon} />
            </Button></div>}  
              className={classes.ModalStyle1}
              overlayClassName={classes.panelClass}
              isOpen={this.state.dependentslider}
              title={this.renderHeader()}
              onRequestClose={ () => {
                this.setState({ dependentslider: false,selectedsubmenu:''});
            }}
            >
            <GridContainer justify="center" alignItems="center">
              <GridItem lg={11} md={11} sm={12} xs={12}>
                <Card >
                  <CardBody> 
                      <FormControl fullWidth className={classes.DependentOnInput}>
                        <Autocomplete
                          freeSolo
                          multiple 
                          id="document-type" 
                          value={this.state.dependent_module_name}
                          options={this.state.userchildmenudata}
                          defaultValue={this.state.dependent_module_name}
                          onChange={(event, value) => { if(value) {this.setDependentName(value)}}}
                          getOptionLabel={(option) => option.sub_module}    
                          getOptionDisabled={(option) => (option.sub_module === this.state.selectedsubmenu) || (option.module_type === "Default")}  
                          renderInput={(params) => <TextField  {...params}label="Dependent On"  variant="outlined" />}
                          />                 
                        </FormControl> 
                    <GridContainer  style={{paddingTop:"1%",paddingBottom:"2%"}}>
                      <GridItem lg={12} md={12} sm={12} xs={12} justify="right" alignItems="right">
                        <MButton className={classes.FinalSubmitButton }  onClick={this.EditDependentModule.bind(this)}  variant="outlined" style={{float:"right"}} >
                          Submit
                        </MButton>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card> 
              </GridItem>
            </GridContainer>
        </SlidingPane>
        {this.state.alert}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(AdminDashboard)); 