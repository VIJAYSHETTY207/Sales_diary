import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import ReactTable from "react-table";
import axios from 'axios';
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import Datetime from "react-datetime";
// @material-ui/core components
import { fade, makeStyles } from '@material-ui/core/styles';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SortableTree, { getVisibleNodeCount } from 'react-sortable-tree';
import MButton from '@material-ui/core/Button';
import 'react-sortable-tree/style.css'
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Check from "@material-ui/icons/Check";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Book from '@material-ui/icons/Book';
// @material-ui/icons
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";  
import Remove from "@material-ui/icons/Remove";  
import ControlPoint from "@material-ui/icons/ControlPoint";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ViewIcon from "@material-ui/icons/Visibility";  
import RemoveCircle from "@material-ui/icons/RemoveCircle";  
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import SvgIcon from '@material-ui/core/SvgIcon';
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { withStyles } from '@material-ui/styles';
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
//redux functions
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToPros } from '../../Utils/MapStateDispatchProps.js'
import sharedStyles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import defaultImage from "assets/img/image_placeholder.jpg";
// end of redux function
import moment from "moment";
import Service from 'Utils/Service';
import { Grid } from "react-virtualized";

const panelStyles = {
  panelClass: {
    zIndex:999
  },
  ModalStyle: {
    width:'100% !important',
    backgroundColor:'#ddd'
  },
  groupModalStyle: {
    width:'30% !important',
    backgroundColor:'#ddd'
  },
  viewAssignmentModalStyle: {
    width:'40% !important',
    backgroundColor:'#ddd'
  },
 halfModalStyle: {
    width:'50% !important',
    backgroundColor:'#ddd'
  },
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed #ddd`,
  }
};

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


const tableStyles = {...styles, ...sharedStyles, ...panelStyles }
const useStyles = makeStyles(tableStyles);
class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      
      load: false,
      error: '',
      alert:null,
      treeData: [],
      editContent:false,
      groupHolders:[{group_name:'', section_id: 0, grouping_under:'', parent_id:0, checked:false}],
      contentHolders:[{group_id:'', description:'', grouping_under:''}],
      sections:[],
      groups:[],
      selectedGroupName:"",
      selectedContent:"",
      selectedGroupId:"",
      selectedIndex:"",
      section_id:0,
    };

  }


getData = (id) => {  
  const postData = {
        reporting_id: this.props.data.id
      };
      new Service().apiCall('users/getHierarchy',postData).then(response => {
        console.log(response);
    if (response.status==200 && response.data !== null) {

      this.setState({ treeData:response.data }); 
    }
    else{
      this.setState({treeData:[]})
    } 
  }).catch(error => {
    alert(error);

  });
}

  
  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { tableData } = this.state;
    const nodeCountLeft = getVisibleNodeCount({treeData:this.state.treeData});
   
    // getting user data
    const lUserData = this.props.data;
 
    return (
      <div>
        {this.state.alert}
         
        <GridContainer justify="center">

        <GridItem xs={12} sm={12} md={8}  className="sortableGrid">
       {this.state.treeData.length > 0 && <Card style={{marginTop:0, marginBottom:10}}>
            <CardBody>
            <div style={{ height: nodeCountLeft * 62 }}>
        <SortableTree
          canDrag={false}
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={({ node, path }) => ({
            title: (
  //              <div>
  //                 <div className="title" style={{cursor:'pointer',display:'block', overflow:'hidden', textOverflow:'ellipsis'}}  onClick={()=> this.setState({viewDescriptionPanel:true, selectedContent: node.description, selectedGroupId: node.group_id, selectedGroupName: node.group_name, selectedTitle: node.title})}>  
  //                 <Tooltip
  // id="tooltip-top"
  // title={node.title}
  // placement="top"
  // classes={{ tooltip: classes.tooltip }}
  //>
                  <div>{node.name}</div>
                  //  </Tooltip>
                  // </div> 
                  // <div className="actionDiv">
                  //  {node.description!="" && <Button 
                  //   className={classes.actionButton}
                  //   simple
                  //   onClick={()=> this.setState({viewDescriptionPanel:true, selectedContent: node.description, selectedGroupId: node.group_id, selectedGroupName: node.title})}
                  //   color="success"
                  //   className="edit" 
                  //   >
                  //    <ViewIcon className={classes.icon} />
                  //   </Button>}
                  //   </div>
               //  </div>
                 
            ),
        })}
        />
      </div>
            </CardBody>
          </Card>} 
          </GridItem>
          </GridContainer>
       
                        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(withStyles(tableStyles)(Hierarchy));  
