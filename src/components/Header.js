import React from "react";
import redsound from '../sounds/red.mp3'

const Header = () => {

  function playSound() {
    var audio = new Audio(redsound);
    audio.play();
  }
  const handleClick =()=>{
playSound()
  }
  return <div><button onClick={handleClick}>Click</button></div>;
};

export default Header;
