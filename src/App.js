import React from 'react';
import './App.css';
import Header from './components/core/header';
import Slider from './components/core/slider';
import People from './components/people';


function App() {
  return (
    <div className="App">
     <Header />
     <Slider />
     <People />
    </div>
  );
}

export default App;
