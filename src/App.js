import React from 'react';
import { Reddit } from './features/counter/Reddit';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="reddit-container">
        <Reddit resultNo={0}/>
        <Reddit resultNo={1}/>
        <Reddit resultNo={2}/>
        <Reddit resultNo={3}/>
        <Reddit resultNo={4}/>
        <Reddit resultNo={5}/>
        <Reddit resultNo={6}/>
      </div>
    </div>
  );
}

export default App;
