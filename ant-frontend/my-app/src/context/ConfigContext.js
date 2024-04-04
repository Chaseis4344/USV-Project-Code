import React, { createContext, useState } from 'react';
//const fs = require('fs');
import config from '../config.json'
import axios from 'axios';
 
export const ConfigContext = createContext(null);
export const ConfigProvider = ({ children }) => {
  const [config] = useState({});

  const setConfig = async (config) =>{
    //console.log('Configs Set:'+config);
   //localStorage.setItem('config', JSON.stringify(config,null,2));
   
   try{
    const response = await axios.post(/*URL for resource goes here*/"", config);
    }
   catch(ex){
    console.error("Config Error:"+ ex);
     }
   
  }
  

  const getConfig = async () => {
    
    
    try{
      const response = await axios.get(/*URL goes here*/"");
     return JSON.parse(response.data);
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