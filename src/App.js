import React from 'react';
import './App.css';
import Header from './components/core/header';
import Slider from './components/core/slider';
import People from './components/people';
import Planets from './components/planets';
import StarShips from './components/starship';
import Footer from './components/core/footer';


function App() {
  return (
    <div className="App">
     <Header />
     <Slider />
    <section>
    <People />
     <Planets />
     <StarShips />
    </section>
    <Footer />
    </div>

  );
}

export default App;
