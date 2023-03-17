import React, { useContext, useEffect } from 'react';
import { Button } from '../components/componentsIndex';
import Style from '../styles/registerVoters.module.css';
import { ElectionContext } from '../context/Context';
import { useRouter } from 'next/router';

const registerVoters = () => {
  const router = useRouter();
  const { registerVoter, getCandidate, actualVoters, voters } = useContext(ElectionContext);

  useEffect(() => {
    voters();
  }, [actualVoters]);

  return (
    <div className={Style.registerVoter}>
      <div className={Style.registerfield}>
        PLEASE CLICK BUTTON BELOW TO REGISTER SO YOU'RE ELIGIBLE FOR VOTING
        <Button btnName='Register' handleClick={registerVoter} />
      </div>

      <div className={Style.registeredVoter}>
        <h3>List of registered voters and their Status</h3>
        {actualVoters && actualVoters.length > 0 ? (
          actualVoters.map((voter) => (
            <div key={voter.voteraddress}>
              <p className={Style.address}>
                {`${voter.voteraddress.substring(0, 7)}...${voter.voteraddress.substring(35, 42)}`}
                <span className={Style.status}>{voter.hasVoted ? 'Voted' : 'Yet to Vote'}</span>
              </p>
            </div>
          ))
        ) : (
          <p className={Style.noRegister}>No registered voters found</p>
        )}
      </div>
    </div>
  );
};

export default registerVoters;
