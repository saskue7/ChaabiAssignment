import React, { useEffect} from 'react'
import "./timer.css"
const Timer = (props) => {
  const {correctKeys,startCounting,activeKeyindex,timeElapsed,setTimeElapsed} = props
  
  useEffect(() => {
    let id
    
   if (startCounting) {
    id = setInterval(() => {
      
     setTimeElapsed((oldTime) => oldTime+1
      )

    },1000)
   }
   return () => {
    clearInterval(id)
   }

  },[startCounting])
  let mins = Math.floor(timeElapsed/60)
  let secs = timeElapsed%60
  return (
    <div>
     <p className='time'>Time: {mins}:{(secs > 9 ? secs : `0${secs}` ) }</p>
      {(timeElapsed >= 300 || !startCounting) && timeElapsed > 0 ? `Your Accuracy was : ${((((correctKeys / activeKeyindex) || 0).toFixed(2)) * 100).toFixed(0)} %` : null}  
   </div>
  )
}

export default Timer