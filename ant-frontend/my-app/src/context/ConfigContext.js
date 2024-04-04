import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

export const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/config`);
      setConfig(response.data);
    } catch (ex) {
      console.error('Error fetching config:', ex);
    }
  };

  const updateConfig = async (newConfig) => {
    try {
      await axios.post(`${API_URL}/api/config`, newConfig);
      setConfig(newConfig);
    } catch (ex) {
      console.error('Error updating config:', ex);
    }
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};