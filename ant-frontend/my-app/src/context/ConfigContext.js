import React, { createContext, useState } from 'react';
//const fs = require('fs');
import axios from 'axios';
import {API_URL} from '../config'
 
export const ConfigContext = createContext(null);
export const ConfigProvider = ({ children }) => {
  const [config] = useState({});

  const setConfig = async (config) =>{
   try{
    const response = await axios.post("/api/config", config,{baseURL:API_URL});
    }
   catch(ex){
    console.error("Config Error:"+ ex);
     }
   
  }
  

  const getConfig = async () => {
    try{
      const response = await axios.get("/api/config",{baseURL:API_URL});
     return response.data;
    }catch(ex){
      //Bad I/O Errors go here
      console.error(ex);
      return null;
    }
  }

  return (
    <ConfigContext.Provider value={{ config, setConfig, getConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};