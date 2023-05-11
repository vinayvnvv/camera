
import './App.scss';
import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import {  } from '@zxing/library';
import card from './assets/05.png';


const sizes = [
  {name: 'Selfie', value: 'cover'},
  {name: 'A4 Size', value: 8.27 / 11.67},
  {name: 'Business Card', value: 3.370/2.125}
]

function App() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [preview, setPreview] = useState(false)
  const [aspectRatio, setAspectRatio] = useState('cover');


  const getARClass = () => {
    const classes = ['ar'];
    if(aspectRatio === 'cover') {
      classes.push('cover');
    }
    return classes.join(' ');
  }

  const getARStyle = () => {
    if(aspectRatio === 'cover') {
      return {
        display: 'none',
      }
    } else {
      return {
        aspectRatio,
      }
    }
  }


  const onPhotoTake =  () => {
    const image  = camera.current.takePhoto();
    setImage(image)
    // const el = document.createElement('IMG');
    // el.src = 'https://zxing-js.github.io/library/resources/blackbox/pdf417-2/05.png';
    // decodeFun(el)
    

  }
  return (
    <div className='app'>
      <div className='camera'>
        <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} 
        // aspectRatio={aspectRatio}
        />
        <div className={getARClass()} style={getARStyle()}/>
      </div>
      <div className='bottom-bar'>
        <div className='tabs'>
          {sizes.map(size => <div className={'tab ' + (aspectRatio === size.value ? 'active' : '')} key={size.name} onClick={() => setAspectRatio(size.value)}>{size.name}</div>)}
          
        </div>
        <div className='actions'>
          <div>
            {numberOfCameras > 1 && <button 
            className='switch-btn' 
            onClick={() => camera.current.switchCamera()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
            </button>}
          
          </div>
          <div>
          <button 
            className='shutter-btn' 
            onClick={onPhotoTake}>
              <span />
            </button>
          </div>
          <div>
            {image ? <button 
            className='list-btn'
            onClick={() => setPreview(true)}>
              <img alt='Photos' 
                  src={image} 
                  />
            </button> : <button></button>}
          
          </div>
        </div>
      </div>
      {preview && <div className='modal'>
        <button onClick={() => setPreview(false)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></button>
        <img alt='Photos' src={image}/>
      </div>}
      
    </div>
  );
}

export default App;
