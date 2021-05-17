import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { connect } from 'react-redux';
import {mapStateToProps , mapDispatchToPros} from '../../Utils/MapStateDispatchProps.js';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

class PasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password : '',
        loading : false,
        cardAnimaton : 'cardHidden',
        loginPassword : "",
		loginerror:false,
        loginPasswordState : ""
      };
      
  };
  setCardAnimation = (value) => {
    this.setState({cardAnimaton : value});      
  }
  handleLogin = () => {
    const postData = {
      email: this.state.email, 
      password:this.state.password,
      requestname: "get_password",
      loginflag:'3'
    };
    new Service().apiCall('users/get_password',postData).then(response => {
      console.log(response); 
      if (response.status==200 && response.data!='') {
        let lData = {}
       // lData.token = response.data.token;
        lData.data = response.data;
        this.props.setUserData(lData);
        this.props.history.push("/admin/dashboard");
      }
    }).catch(error => {
      console.log(error);
	  this.setState({loginerror:true});
    });
  }
  componentDidMount = () =>{
    setTimeout(() =>  { this.setCardAnimation("") }, 700);
    if(this.props.token && this.props.token != ""){
      this.props.history.push('/admin/dashboard');
    }
  }
  render(){
    const classes = this.props.classes;
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>

            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="First Name.."
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
				
				{this.state.loginerror && <div>Invalid credentials</div>}
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block onClick={()=>this.handleLogin()}>
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
    }
}
const PasswordPageHOC = withStyles(styles)(PasswordPage);
export default connect(mapStateToProps, mapDispatchToPros)(PasswordPageHOC);