import React, { useRef, useState } from "react";
import "./App.css";

import video from "./assets/video.mp4";
import reverse from "./assets/reverse.mp4";
import useVideoPlayer from "./hooks/usePlayer";

import {
  BiCaretLeft,
  BiCaretRight,
  BiPause,
  BiVolumeFull,
  BiVolumeMute,
  BiArrowToLeft,
  BiArrowToRight,
  BiFastForward,
  BiRewind,
  BiRedo,
  BiUndo,
} from "react-icons/bi";

const App = () => {
  const [videoFile, setVideoFile] = useState(video);
  const [videoForward, setVideoForward] = useState(true);

  const handleVideoForward = () => {
    setVideoFile(video);
    setVideoForward(true);
  };

  const handleVideoBackward = () => {
    setVideoFile(reverse);
    setVideoForward(false);
  };

  const videoElement = useRef();
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);
  return (
    <div className="container">
      <div className="video-wrapper">
        <div className="video-wrapper">
          <video
            src={videoFile}
            ref={videoElement}
            onTimeUpdate={handleOnTimeUpdate}
          />
        </div>
        <div className="controls">
          <div className="actions">
            <button>
              <i>
                <BiArrowToLeft />
              </i>
            </button>
          </div>
          <div className="actions">
            <button>
              <i>
                <BiRewind />
              </i>
            </button>
          </div>
          <div className="actions">
            <button>
              <i>
                <BiUndo />
              </i>
            </button>
          </div>
          <div className="actions">
            {videoForward && (
              <button onClick={handleVideoBackward}>
                <i>
                  <BiCaretLeft />
                </i>
              </button>
            )}
            {!videoForward && (
              <button onClick={togglePlay}>
                {!playerState.isPlaying ? (
                  <i>
                    <BiCaretLeft />
                  </i>
                ) : (
                  <i>
                    <BiPause />
                  </i>
                )}
              </button>
            )}
          </div>
          {videoForward && (
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
            />
          )}
          {!videoForward && (
            <input
              type="range"
              min="0"
              max="100"
              value={100 - playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
            />
          )}
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <div className="actions">
            {!videoForward && (
              <button onClick={handleVideoForward}>
                <i>
                  <BiCaretRight />
                </i>
              </button>
            )}
            {videoForward && (
              <button onClick={togglePlay}>
                {!playerState.isPlaying ? (
                  <i>
                    <BiCaretRight />
                  </i>
                ) : (
                  <i>
                    <BiPause />
                  </i>
                )}
              </button>
            )}
          </div>
          <div className="actions">
            <button>
              <i>
                <BiRedo />
              </i>
            </button>
          </div>
          <div className="actions">
            <button>
              <i>
                <BiFastForward />
              </i>
            </button>
          </div>
          <div className="actions">
            <button>
              <i>
                <BiArrowToRight />
              </i>
            </button>
          </div>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i>
                <BiVolumeFull />
              </i>
            ) : (
              <i>
                <BiVolumeMute />
              </i>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="container">
  //     <div className="video-wrapper">
  //       <video
  //         src={video}
  //         ref={videoElement}
  //         onTimeUpdate={handleOnTimeUpdate}
  //       />
  //       <div className="controls">
  //         <div className="actions">
  //           <button onClick={togglePlay}>
  //             {!playerState.isPlaying ? (
  //               <i><BiCaretRight  /></i>
  //             ) : (
  //               <i><BiPause /></i>
  //             )}
  //           </button>
  //         </div>
  //         <input
  //           type="range"
  //           min="0"
  //           max="100"
  //           value={playerState.progress}
  //           onChange={(e) => handleVideoProgress(e)}
  //         />
  //         <select
  //           className="velocity"
  //           value={playerState.speed}
  //           onChange={(e) => handleVideoSpeed(e)}
  //         >
  //           <option value="0.50">0.50x</option>
  //           <option value="1">1x</option>
  //           <option value="1.25">1.25x</option>
  //           <option value="2">2x</option>
  //         </select>
  //         <button className="mute-btn" onClick={toggleMute}>
  //           {!playerState.isMuted ? (
  //             <i><BiVolumeFull /></i>
  //           ) : (
  //             <i><BiVolumeMute /></i>
  //           )}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default App;
