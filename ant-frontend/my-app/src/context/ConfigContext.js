import React, { createContext, useState } from 'react';
//const fs = require('fs');
import config from '../config.json'
 
export const ConfigContext = createContext(null);
export const ConfigProvider = ({ children }) => {
  const [config] = useState({});

  const setConfig = (config) =>{
    //console.log('Configs Set:'+config);
   //localStorage.setItem('config', JSON.stringify(config,null,2));
   console.error("Config Error: Cannot write to read-only resource")
   
  }
  

  const getConfig =() => {
    try{
     return config;
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