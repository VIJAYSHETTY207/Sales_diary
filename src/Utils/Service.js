import React, { Component } from 'react'
import Config from '../config';
import axiosConfig from '../axiosConfig';
import axios from 'axios';
import qs from "qs";
 class Service extends Component {
     apiCall(method,postData){
       // return axios.post(Config.url+method,qs.stringify(postData), axiosConfig.headers);

        return  axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: Config.url+method,
            data: postData
          });
    }
}

export default Service
  