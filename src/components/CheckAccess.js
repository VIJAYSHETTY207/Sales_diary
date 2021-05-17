import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Animated} from "react-animated-css";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import NavigateNext from "@material-ui/icons/NavigateNext";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { withStyles } from '@material-ui/styles';
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import sharedStyles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import Service from 'Utils/Service'; 
const tableStyles = {...styles, ...sharedStyles }
const useStyles = makeStyles(tableStyles);
export default class CheckAccess extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
     childMenu:[],
     navAccess:true,
    };

  }

  renderMenu = () => {
    const postData = {
      role_id: this.props.data.role_id
    };


      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'http://salesdiary.egenius.in/server/users/getNavMenu',
        data: postData
      }).then((response) => {
        if(response.status==200 && response.data!=''){
          let currentUrl = window.location.pathname;
           let splitUrl = currentUrl.split("/");
           let routeName = "/"+splitUrl[2];
           console.log(routeName)
          let valid=true;
          let arr=[];
          response.data.map(element =>{
            arr.push(element.path)
          })
          console.log(arr);
          if(arr.includes(routeName)){
            valid = true;
          }
          else{
            valid = false;
          }
          this.setState({navAccess:valid});
     
        }
       
      }).catch(error => {
        console.log(error)
      }); 
}

  
  renderPage = (page) => {  
    this.props.history.push({
      pathname: '/admin'+page,
    })
  }


  componentDidMount() {
    console.log("menu");
    this.renderMenu();
  }
  render() {
    const { classes } = this.props;

    return this.state.navAccess;
  }
}
