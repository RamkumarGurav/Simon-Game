import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "./Game.css";
import timeout from "../utils/util";

const Game = () => {
  const colorList = ["yellow", "red", "green", "blue"];
  const [animatePress, setAnimatePress] = useState("");
  const [isOn, setIsOn] = useState(false);
  const initPlay = {
    isDisplay: false, //computers display colors time
    colors: [], //randomly generated color sequence
    score: 0, //score = length of randomly generated color sequence
    userPlay: false, //users playing time
    userColors: [], //user clicked color sequence
  };

  const [play, setPlay] = useState(initPlay);
  // -------------------------------------------------------
  // game on => isOn=true,initPlay

  // computer playing time(generating random colors) => isOn=true, isDisplay=true,

  // computer playing time(flashing colors) => isOn=true, isDisplay=true,alteast one randomly generated color

  // user playing time => isOn=true,isDislay =false, userPlay=true

  //game off= isON=false,initPlay

  // -----------------------------------------------------

  //starting game
  //Displaying score box after start btn is clicked
  const handleStart = () => {
    setIsOn(true);
  };

  //setting computer time consdtions to generate and flash colors when isOn becomes true
  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  //computer generating random colors pattern under computer playing time conditions
  useEffect(() => {
    if (isOn && play.isDisplay) {
      let randomColor = colorList[Math.floor(Math.random() * 4)];
      const copyColors = [...play.colors];
      copyColors.push(randomColor); //pushing random color into copyof randomly generated colors list
      setPlay({ ...play, colors: copyColors }); //andomly generated colors listsetting
    }
  }, [isOn, play.isDisplay]);

  //when there is atleast one randomly generated color and computer playing time is on
  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  // displaying/flashing colors one by one with delay
  const displayColors = async () => {
    await timeout(1000); //waiting 1sec before computer start flashing colors
    for (let i = 0; i < play.colors.length; i++) {
      setAnimatePress(play.colors[i]); //flashing color
      generateSound(play.colors[i]);
      await timeout(300); //waiting 1sec after flashing that color
      setAnimatePress(" "); //removing flashing animation
      await timeout(300); //waiting 1sec before next color is flashed
      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        }); // user only play when isDispaly is false and userPlay is true //here usercolors are reversed bcz after user clicks colors we have to  pop the first color of computer generated sequence which is last color of userColors
      }
    }
  };

  //--user entering his colors pattern under userPlay conditions --
  const handleClick = async (e) => {
    const clickedColor = e.target.id;
    if (!play.isDisplay && play.userPlay) {
      generateSound(clickedColor);

      const copyUserColors = [...play.userColors];
      const lastUserColor = copyUserColors.pop(); //it gives last color of userColors to compare with userClicked color
      if (clickedColor === lastUserColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors }); //setting users colors to remaining colors after popping of last color of userColors
        } else {
          //when userColors have Zero colors (when lentgh becomes zero) setting game condition to computerplaying time with updated state and turning off userPlaying time and setting userColors to empty
          await timeout(1000); //waiting 1sec before moving to next level
          setPlay({
            ...play,
            score: play.colors.length,//upadating score 
            isDisplay: true,//going to next level with empty usercolors 
            userPlay: false,//no to user playing time
            userColors: [],
          });
        }
      } else {
        generateSound("wrong");
        await timeout(1000); //waiting 1sec before showing total score untill that time
        setPlay({ ...initPlay, score: play.colors.length });
      }
    }
  };

  //restarting game agian after getting final score
  const handleClose = () => {
    setPlay(initPlay);
    setIsOn(false);
  };

  //adding sounds for press and animatePress
  const generateSound = (soundName) => {
    new Audio(require(`../sounds/${soundName}.mp3`)).play();
  };

  return (
    <section className="game-container">
      <div>
        <h1 className="game-title">The Simon Game</h1>

        <div className="circle-wrapper">
          <div className="msg-box">
            {!isOn && !play.score && (
              <button
                className="btn btn-lg btn-dark start-btn"
                onClick={handleStart}
              >
                Start
              </button>
            )}
            {isOn && (play.isDisplay || play.userPlay) && (
              <div className="score">Level-{play.score}</div>
            )}
            {isOn && !play.isDisplay && !play.userPlay && play.score && (
              <div className="lost">
                <div>
                  <h2 className="final-score">Final Score:{play.score - 1}</h2>
                </div>
                <button
                  className="btn btn-lg btn-dark lost-btn " style={{padding:'4px 10px', fontSize:'20px'}}
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <div className="game-content" onClick={handleClick}>
            <div
              className={`box box-1 green ${
                animatePress === "green" ? "pressed" : " "
              }`}
              id="green"
              name="green"
            ></div>
            <div
              className={`box box-2 red ${
                animatePress === "red" ? "pressed" : " "
              }`}
              name="red"
              id="red"
            ></div>
            <div
              className={`box box-3 yellow ${
                animatePress === "yellow" ? "pressed" : " "
              }`}
              name="yellow"
              id="yellow"
            ></div>
            <div
              className={`box box-4 blue ${
                animatePress === "blue" ? "pressed" : " "
              }`}
              name="blue"
              id="blue"
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Game;
