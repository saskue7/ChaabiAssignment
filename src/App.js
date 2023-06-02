// import statements

import { useRef, useState } from "react"
import "./App.css"
import React from "react"
import Timer from "./components/timer/Timer"

// import statements end


// words generations start
const totalwords = 'asdfjkl;'.repeat(1000)
const words = () => totalwords.split('').sort(() => Math.random() > 0.5 ? 1 : -1)

// words generation end


// Colour function returns the right and wrong value of users keys 
function Text(props) {
 const { text, correct, active } = props


 if (correct) {
  return <span className="correct" >{text} </span>
 }
 if (correct === false) {
  return <span className="incorrect" >{text} </span>
 }
 if (active) {
  return <span className="active" >{text} </span>
 }
 return <span>{text} </span>
}

// function ends

// memoization of text fucntion
Text = React.memo(Text)
// memoization end

// Our App Component
const App = () => {

 // bunch of states initialized
 const [userText, setUserText] = useState("")
 const [activeKeyindex, setActiveKeyIndex] = useState(0)
 const [correctWordArray, setCorrectWordArray] = useState([])
 const [startCounting, setStartCounting] = useState(false)
 const [timeElapsed, setTimeElapsed] = useState(0)
 const cloud = useRef(words())
 const input = useRef()
 const [ends,setEnd] = useState(false)
 // initialization end

 // process function checks if the user is started typing and calculating if the users reaches the end or not
 const process = (event) => {
  if (activeKeyindex === cloud.current.length || timeElapsed >= 300 || ends){
   setUserText('Completed')
   setStartCounting(false)
   return 
  }
  if (activeKeyindex === cloud.current.length-1 || timeElapsed>=300 || ends) {
   setStartCounting(false)
  
  }
  else{
   setUserText(event.target.value)
   setTimeout(() => setUserText(""), 200)
  }
  if (!startCounting && timeElapsed===0) {
   setStartCounting(true)
   
  }
  

  setActiveKeyIndex(index => index + 1)
  


  setCorrectWordArray(data => {
   const word = event.target.value.trim()
   const newResult = [...data]
   newResult[activeKeyindex] = word === cloud.current[activeKeyindex]
   return newResult
  })
 }
 // process fucntion ends

 // reload function reloads for a new typing session
 const reload = () => {
  setTimeout(()=>(window.location.reload()),0)
 }
 // reload ends

 // end function ---- since the 5:00 is long so user can anytime ends the session 
 const end = () => {
  setUserText("Completed")
  setEnd(true) 
  setStartCounting(false)
 }
 // function ends

 // function see ----- returns only 10 keys at a time so users can focus completely also at UI it looks better
 const see = () => {
  return cloud.current.slice(Math.floor(activeKeyindex / 10)*10, Math.min(Math.floor(activeKeyindex / 10)*10+10,cloud.current.length-1))
 }
 // function see---ends

 return (
  <div>

   <h1 className="header">Typing Test</h1>
   <button onClick={reload} className="btn reset" >Reset</button>
   <button style={!startCounting?{cursor:"not-allowed"}:null} disabled={!startCounting? true:false} onClick={end} className="btn end">End</button>
   <h2 ><Timer startCounting={startCounting} correctKeys={correctWordArray.filter(Boolean).length} activeKeyindex={activeKeyindex} 
   timeElapsed={timeElapsed} setTimeElapsed={setTimeElapsed} setActiveKeyIndex = {setActiveKeyIndex} setCorrectWordArray = {setCorrectWordArray} /></h2>
   
   {startCounting?<p className="timer">{see().map((text, index) => {
    return <Text text={text} correct={correctWordArray[index + (Math.floor(activeKeyindex / 10)) * 10]} active={index + (Math.floor(activeKeyindex / 10)) * 10 === activeKeyindex}
    />
   })}</p>:null}

   <input type="text" ref={input} onChange={(e) => process(e)} onFocus={() => {
    if(!startCounting && timeElapsed===0) {setStartCounting(true)}
    else{
     setStartCounting(false)
    }
   }}  value={userText}  />
   
  </div>
 )
}

export default App