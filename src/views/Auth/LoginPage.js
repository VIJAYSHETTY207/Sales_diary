import React, {useEffect} from "react";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Alert from '@material-ui/lab/Alert';
import { NavLink } from "react-router-dom";
import axios from 'axios';
// @material-ui/icons
import Emp from "@material-ui/icons/Person";

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
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { connect } from 'react-redux';
import {mapStateToProps , mapDispatchToPros} from '../../Utils/MapStateDispatchProps.js'

const useStyles = makeStyles(styles);

const LoginPage = (props) => {
  //console.log(props);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginerror, setLoginError] = React.useState(false);
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    if(props.data.token){
      props.history.push('/admin/dashboard');
    }
  });

  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
   /* for login submit*/
  const handleLogin = () => {
 
    const postData = {
        email: email, 
        password:password,
        requestname: "get_password",
        loginflag:'1'
      };
 

        axios({
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          url: 'http://salesdiary.egenius.in/server/users/get_password',
          data: postData
        }).then((response) => {
          //console.log(response);
          if(response.status==200 && response.data!=''){
            let lData = {}
              lData.data = response.data; 
              lData.token = "123";
              props.setUserData(lData);
    
              props.history.push('/admin/dashboard');
          }
         
        }).catch(error => {
			setLoginError(true)
          // this.setLoading(false);
          // if (error.response === error) this.setError(error.response.data.message);
          // else this.setError("Something went wrong. Please try again later.");
        }); 
      
      }
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Login</h4>
              </CardHeader>
              <CardBody className={classes.CustomCardBody} style={{  padding: "10px 20px !important",}}>
                <CustomInput
                  labelText="Email ID"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Emp className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: event => {
                      setEmail(event.target.value);
                    },
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
                    onChange: event => {
                      setPassword(event.target.value);
                    },
                    type: "password",
                    autoComplete: "off"
                  }}
                  
                />
				      
              </CardBody>
              <CardFooter className={classes.justifyContentCenter} style={{display:"block",marginTop:"0px !important"}}>
                <div>
                {loginerror && <Alert severity="error">Invalid credentials</Alert>} 
                </div>
                  <Button color="rose" simple size="lg" block onClick={()=>handleLogin()} style={{fontWeight:"500"}}>
                    Let's Go
                  </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToPros)(LoginPage);