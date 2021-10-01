import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
/*
const backgroundAudio = new Audio("./MushroomBluegrass.mp3")
  backgroundAudio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
    console.log('playing again')
  }, false);
  backgroundAudio.play()
  backgroundAudio.volume = 0.3

  const backgroundAudio2 = new Audio("./MushroomBluegrass.mp3")
  backgroundAudio2.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
    console.log('playing again')
  }, false);
  backgroundAudio2.play()
  backgroundAudio2.volume = 0.3
*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
