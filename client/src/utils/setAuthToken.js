import axios from "axios";

import React from 'react'

const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken