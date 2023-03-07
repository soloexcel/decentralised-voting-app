import React, { useState,useEffect,useContext} from 'react';
import { Button } from '../components/componentsIndex';
import Style from '../styles/result.module.css'
import { ElectionContext } from '../context/Context';
const Result = ({ shortlistedNames }) => {

  const { getTotalAndWinner,getCandidate,getCandidateLength,isVotingEnd,newElection} = useContext(ElectionContext)
  const [candidates,setCandidates] = useState([]);
  const [voteCount,setVoteCount] = useState([]);
  const [winner, setWinner] = useState("");
  const [totalVotes,setTotalVotes] = useState(0);
 // const [started,setStarted] = useState(false);
//   const rehandleWinners = async   ()=>{
//    const votingEnded = await isVotingEnd();

//    if (votingEnded){
//     const nada =  await getTotalAndWinner()
//     setWinner(nada.winner)
//     setTotalVotes(nada.totalVotes)
//     console.log(nada);
//    }
//  }


//  useEffect(()=>{
//  async function handleWinners (){
//   const votingEnded = await isVotingEnd();
//   console.log("voting "+ votingEnded)

//   if (votingEnded){
//    const nada =  await getTotalAndWinner()
//    setWinner(nada.winner)
//    setTotalVotes(nada.totalVotes)
//    console.log(nada);
//   }
// }handleWinners()},[])


const rehandleWinners = async   ()=>{
  const votingEnded = await isVotingEnd();

  if (votingEnded){
   const nada =  await getTotalAndWinner()
   if(nada){
   setWinner(nada.winner)
   }
   if(nada){
   setTotalVotes(nada.totalVotes)
   }
   console.log(nada);
  }
}


useEffect(()=>{
async function handleWinners (){
 const votingEnded = await isVotingEnd();
 console.log("voting "+ votingEnded)

 if (votingEnded){
  const nada =  await getTotalAndWinner()
  if(nada){
  setWinner(nada.winner)
  }
  if(nada){
  setTotalVotes(nada.totalVotes)
  }
  console.log(nada);
 }
}handleWinners()},[])



  useEffect(() => {
    
    setCandidates([]);
    setVoteCount([]);
    async function populateresult() {
      const tempCands = [];
      const tempVoteCt = [];
      const len = await getCandidateLength();
        for (let i = 0 ; i <len; i ++){
           const cand = await getCandidate(i)
           console.log("candy "+ cand)
           tempCands.push(cand[0]);
           tempVoteCt.push(cand[1]);
        }
        setCandidates(tempCands)
        setVoteCount(tempVoteCt)
      //setCandidates(cands);
    }
    //alert(started)
    populateresult();
  }, [winner,totalVotes]);


  return (
    <div className={Style.result}>
      <table className={Style.table}>
      <thead>
        <tr>
          <th>CONTESTANTS</th>
          <th>NUMBER OF VOTES</th>
        </tr>
      </thead>
      <tbody>
        {candidates && candidates.length > 0 && ( candidates.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            {voteCount && voteCount.length>0 && (<td className={Style.tableData}>{voteCount[index]}</td>)}
          </tr>
        )))}
      </tbody>
    </table>
      <div className={Style.winnerSection}>
            <div className={Style.finalResult}> {winner && totalVotes && (
                <p> {winner} won the election, with {totalVotes} votes casted</p>
                )}
            </div>
            <div className={Style.checkWinner}>
            { <Button btnName={"Display Winners"} handleClick = {()=>{rehandleWinners()}}/> }
            { <Button btnName={"Start New Election"} handleClick = {()=>{newElection()}}/> }
            </div>
        
        
      </div>
    </div>
  );
};


export default Result