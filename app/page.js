'use client'
import Image from "next/image";
import Wave from './Wave';
import './App.css';

export default function Home() {
  return (
    <div className="App">
      <div className="App-header">
          <div className="top-row"></div>
          <div className="App-header-row">
              <div className="wave">
                <Wave></Wave>
              </div>
              <img
              src="logo.png"
            />
              <div className="wave">
                <Wave></Wave>
              </div>             
          </div>
          <div className="bottom-row"></div>
      </div>
  </div>    
);
}
