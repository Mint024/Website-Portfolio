import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

let date = new Date();
let hours = date.getHours();
let greeting;

if (hours < 12) {
  greeting = 'Good Morning';
} else if (hours < 18) {
  greeting = 'Good Afternoon';
} else {
  greeting = 'Good Evening';
}


function App() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const audioRef = useRef(null);

  const handleEnter = () => {
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'e' || event.key === 'E') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="App">
      <audio ref={audioRef} src="/Song.mp3" />
      <header className="App-header">
        <h1 className={`App-h1 ${isFadingOut ? 'fade-out-active' : ''}`}>{greeting}</h1>
        <div className="App-enter-container">
          <button className={`App-enter ${isFadingOut ? 'fade-out-active' : ''}`} onClick={handleEnter}>E</button>
          <h3 className={`App-h3 ${isFadingOut ? 'fade-out-active' : ''}`}>Press E to enter</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
