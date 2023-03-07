import React, { useContext,useEffect,useState } from 'react'
import { FaUserAlt } from "react-icons/fa"
import Style from './Status.module.css'
import { ElectionContext } from '../../context/Context'


const Status = () => {
  const { walletAddr, voters, actualVoters } = useContext(ElectionContext);
  const [status, setStatus] = useState("Yet to Vote");

  useEffect(() => {
    voters();
  }, [voters]);

  useEffect(() => {
    actualVoters.forEach((item) => {
      if (item.voteraddress.toLowerCase() === walletAddr.toLowerCase()) {
        item.hasVoted && setStatus("Voted");
      }
    });
  }, [actualVoters]);

  return (
    <div className={Style.status}>
      <FaUserAlt className={Style.userIcon} />
      <p>
        <span>
          Wallet Address:{" "}
          {`${walletAddr.substring(0, 7)}...${walletAddr.substring(35, 42)}`}
        </span>
        <span>Status: {status}</span>
      </p>
    </div>
  );
};

export default Status;

