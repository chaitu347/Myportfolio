import ironman from "../../assets/iamronman.mp4";
import React from 'react'
import ReactPlayer from 'react-player'
import "./Header.css";

const Header =()=>{
    return(
      <ReactPlayer url="https://res.cloudinary.com/dnbnst2wn/video/upload/v1747990859/xy7c2zzx7nap8sbs9x2g.mp4" playing = "true" loop = "true" />
    )
}
export default Header;