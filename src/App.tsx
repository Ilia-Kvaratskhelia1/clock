import './App.css';
import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import {TimeZone,  images } from './ApisInterface';
import dayBackground from "./images/newmorning.jpg";
import nightBackground from "./images/night.jpg";
import moonIcon from './images/icon-moon.svg';
import sunIcon from './images/icon-sun.svg';
import upArrow from './images/icon-arrow-up.svg';


function App(style:any , func:()=>void , img: images): JSX.Element {
  const [time , setTime]=useState<string>()
  const [datetime , setDatetime]=useState  <string>()
  const [dayOfYear , setDayOfYear]=useState<number>()
  const [DayOfWeek , setDayOfWeek]=useState<number>()
  const [WeekOfYear , setWeekOfYear]=useState<number>()
  const [utcOffset , setUtcOffset]=useState<string>()
  const [more , setMore] =useState(true)
  const handler = ()=>{
    setMore(!more)
    console.log(more)
    console.log(style.container);
  }
  useEffect(()=>{
    fetch("http://worldtimeapi.org/api/timezone/Asia/tbilisi")
    .then((res)=> res.json())
    .then((data)=> {
      resurse(data)
    })
  },[])
  const resurse= ({timezone ,utc_datetime , day_of_year,day_of_week , utc_offset , week_number}:TimeZone)=>{
  setTime(timezone)
  setDatetime(utc_datetime)
  setDayOfYear(day_of_year)
  setDayOfWeek(day_of_week)
  setUtcOffset(utc_offset)
  setWeekOfYear(week_number) 
  }
         const date = new Date()
         const hours = date.getHours()
         const minute = date.getMinutes()
  return (
    
      <div className='mainContiner'>
    

  <div className='bgImages'>
  <p className='headText' style={{opacity: more ? "" : 0, transition: more ?"1.7s"  : "0.9s"}}>
      “The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”
      <br/>
      <span className='writer'>Ada Lovelace</span>
      </p>
  {hours > 12 ? <img src={dayBackground} /> : <img  className='nightbg' src={nightBackground} />  }
      <div className='currentlyTime' style={{top: more ?390 : 20 , transition:"0.7s ease-in"}}>
        <div> 
        <p className='morning'>{hours < 12 ? <img src={moonIcon} /> : <img  src={sunIcon}/>}
        {hours < 12 ?  <span>GOOD NIGHT, IT’S CURRENTLY</span> :  <span>GOOD MORNING, IT’S CURRENTLY</span>}
       </p>
      <p  className='time'><span className='hours'>{hours}:{minute}</span> <span className='pmam'>{hours > 12 ? "PM": "AM"}</span></p>
      <span className='location'>{time?.slice(5,12)},GE</span>
        </div>
        <div className='lessMore'>
        <button className='btn' onClick={()=>handler()}>{more ? "More ": "Less"}<img src={upArrow}/></button>
        </div>
</div>
    <div className={more ?"mainSlider-on":"mainSlider"}>
      <div className='childSlider'>
      <div className='upSection'>
        <p className='sliderName'>CURRENT TIMEZONE</p>
        <p className='mainHours hoursSlider'>{time}</p>
      </div>
      <div className='upSection'>
        <p className='sliderName'>Day of the week</p>
        <p className='dayOfWeek'>{DayOfWeek}</p>
      </div>
      
      </div>
      <div className='childSlider'>
      <div className='upSection'>
        <p className='sliderName'>Day of the year</p>
        <p className='mainHours dayYear'>{dayOfYear}</p>
      </div>
      <div className='upSection'>
        <p className='sliderName'>Week number</p>
        <p className='dayOfWeek'>{WeekOfYear}</p>
      </div>
      
      </div>
      
    </div>
       </div>
      
    </div>      
  );
  
}


// const Hidden = styled.div`
// width: 100%;
// position: absolute;
// bottom: 0px;
// `

// const UnderSlider = styled.div`
// width: 100%;
// height: 370px; 
// position: absolute;
// bottom: 0px;
// z-index:100;
// background:#ffffffda;
/* @media screen and (max-width: 600px) {

  .mainSliderHead {
    border:2px solid red;
    flex-direction:column;
    justify-content:center;
    bottom:0px;
    height:380px;
    font-size:1.1rem;
   }
  } */
// `
export default App;