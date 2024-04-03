import React, { createContext, useState } from 'react';
//const fs = require('fs');




export const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config] = useState({});

  const setConfig = (config) =>{
    console.log('Configs Set:'+config);
   localStorage.setItem('config', JSON.stringify(config,null,2));
  }
  

  const getConfig = (config) => {
    try{
     return JSON.parse(localStorage.getItem('config'));
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