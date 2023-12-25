//import React from "react";
import { useLocation } from "react-router";


const Upload = () => {
  const location = useLocation();
  const { file } = location.state || {};

  if(!file){    // when file is not available in the state
    return <div>No image selected</div>
  }

  return(
    <div>
      upload
      <img src={URL.createObjectURL(file)} alt="selected image"/>
    </div>
  )
}

export default Upload;