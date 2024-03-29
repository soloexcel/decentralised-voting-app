import React, { useState, useEffect, useContext } from 'react';
import Style from '../styles/admin.module.css';
import { useRouter } from 'next/router';
import { Button, CandidateTable } from '../components/componentsIndex';
import { ElectionContext } from '../context/Context';


const Admin = ({shortlistedCandidates}) => {
  const [shortlistname, setShortlistname] = useState('');
  const [reviewItem, setReviewItem] = useState([]);
  const [startDate, setStartDate] = useState('')
  const [startTime, setstartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [dnt, setDnt] = useState([])
  const [isCandidateListed, setIsCandidateListed] = useState(false)
  const [transferAdminRightTo, setTransferAdminRightTo] = useState('')
  const router = useRouter()
  // const [submitButton, setSubmitButon] = useState(false)
  const { candidates, transferOwnership } = useContext(ElectionContext)
  
  const onChangeHandler = (e) => {
    setShortlistname(e.target.value);
  };

  const shortlistHandler = () => {
    
    setReviewItem([...reviewItem,shortlistname]);
    setShortlistname('');
    console.log(reviewItem.length)
  };


  const startDatehandler = (e) => {
    setStartDate(e.target.value);
    console.log(startDate)
  }

  const startTimehandler = (e) => {
    setstartTime(e.target.value);
    console.log(startTime)
  }
  
  const endDatehandler = (e) => {
    setEndDate(e.target.value);
    console.log(endDate)
  }

  const endTimehandler = (e) => {
    setEndTime(e.target.value);
    console.log(startTime)
  }

  const isValidStartDate = (startDate) => {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return re.test(String(startDate).toLowerCase());
}

const isValidEndDate = (endDate) => {
  const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return re.test(String(endDate).toLowerCase());
}

const isValidStartTime = (startTime) => {
  const re = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
  return re.test(String(startTime).toLowerCase());
}
const isValidEndTime = (endTime) => {
  const re = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
  return re.test(String(endTime).toLowerCase());
}


  // //
  const dateTimeHandler = () => {
    if (startDate === "" || endDate === "" || startTime === "" || endTime === ""){
      alert("You are required to provide a valid date and time.")
    }else if (!isValidStartDate(startDate) || !isValidEndDate (endDate) || !isValidStartTime(startTime) || !isValidEndTime (endTime)) {
      alert("Provide a valid date and time in this format: DATE: 1/1/1111 TIME: 1:00 PM");
    } else {alert("Continue to the review section.");}
    // setStartDate("");
    // setEndDate("");
    
  }


  // Transfer of Administration right
  const signature = (e) => {
    setTransferAdminRightTo(e.target.value);
  }

  const transferRight = () => {
    transferOwnership(transferAdminRightTo);
  }

  // cancel button
  const cancel = () => {
    setShortlistname('')
    setReviewItem([])
    setStartDate('')
    setEndDate('')
    setstartTime('')
    setEndTime('')
  }

  // submit button
  const submit = () => {
    if (reviewItem === "" || startDate === "" || endDate === "") {
      alert("One of the required field is missing. Fill it out to continue.")
    }
    else {
      // call the async function from the context file to submit to the blockchain.
      // and display the candidates
      const votingStartTime = startDate.concat(" "+startTime);
      const votingEndTime = endDate.concat(" "+endTime);
      const minVotes = 2
      console.log(votingStartTime)
      console.log(votingEndTime)
      candidates(reviewItem, votingStartTime, votingEndTime, minVotes)
    
    }
  }

  return (

        <div className={Style.main}>
          <div className={Style.shortList}>
          <h1>SHORTLIST CANDIDATES</h1>
          <p className={Style.note}>
            <span>NOTE</span> You may add as much contestants as needed one at a time before you submit.
          </p>
  
          <div>
            <div className={Style.details}>
              <input className={Style.input} type="text" placeholder="Short List a Candidate" onChange={onChangeHandler} value={shortlistname} />
              <Button btnName="ShortList" handleClick={shortlistHandler} />
            </div>
          </div>
  
          <div className={Style.time}>
            <div>
                <input className={Style.dnt} type="text" placeholder="Vote StartDate: MM/DD/YYYY" value={startDate} onChange={startDatehandler} />
                
                  <input className={Style.dnt} type="text" placeholder="Vote EndDate: MM/DD/YYYY" value={endDate} onChange={endDatehandler} />
            </div>

            <div>
                  <input className={Style.dnt} type="text" placeholder="Vote StartTime: HH:MM A" value={startTime} onChange={startTimehandler} />

                  <input className={Style.dnt} type="text" placeholder="Vote EndTime: HH:MM A" value={endTime} onChange={endTimehandler} />
                  
            </div>
  
            <Button className={Style.button} btnName="Ok" handleClick={dateTimeHandler} />  
          </div>

          <div className={Style.adminRight}>
            <p>Incase you would like to transfer Administration right </p>
            <div className={Style.adminPane}>
              <input className={Style.giveRight} type="text" placeholder="address" value={transferAdminRightTo} onChange={signature} />
              <Button className={Style.button} btnName="Transfer" handleClick={transferRight} />
            </div>

          </div>

         
          </div>

        <div className={Style.review}>
          <h3>REVIEW</h3>
          <p className={Style.note}>
            <span>NOTE</span> Review before submission.
          </p>
  
          <div className={Style.reviewItemlist}>

            {
            
            reviewItem ? reviewItem.map((el, i) => (
              <div key={i}>{el}</div>
            )):""}
          </div>
  
          <div className={Style.dnt}>
            <p>
              Start-Date-Time:  {startDate} {startTime}
            </p>
  
            <p>
              End-Date-Time:  {endDate} {endTime}
            </p>
          </div>
  
          <div className={Style.reviewButtons}>
            <Button btnName='Cancel' handleClick={cancel}/>
            <Button btnName='Submit' handleClick={()=>{
              submit()
              
              //shortlistedCandidates = reviewItem;
            }}/>
          </div>
        </div>

        
      </div>
      )
};

export default Admin;
