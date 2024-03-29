// SPDX-License-Identifier: MIT
// Author: Olalekan Solomon Awoyemi
// Description: This is a smart contract for conducting an election where candidates can be added and voters can register and cast their votes. It also includes a function to determine the winning candidate.

pragma solidity ^0.8.0;

contract Election {
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedFor;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // State variables
    uint256 public listingPrice = 0.0000025 ether;
    address public admin;
    mapping(address => Voter) public voters; // address to each 
    Candidate[] public candidates;
    uint256 public votingStart;
    uint256 public votingEnd;
    uint256 public minimumVotes;
    bool public isVotingOpen;
    bool public contestantsAdded;
    uint256 public totalVotes;
    address[] registeredVoters;
    uint256 public timestamp;
    // Constructor
   constructor()  {
         admin = msg.sender;
   }

   modifier onlyAdmin (){
        require(msg.sender == admin, "Sorry Only Administrator can perform this operation");
        _;
    }

    // transfer ownership to evaluator
    function transferOwnership(address _address) public {
        require(msg.sender == admin, "Only the owner has the right to transfer ownership.");
        admin = _address;
    }

    // get admin
    function getAdmin() external view returns (address) {
        return admin;
    }

    // add candidate's name with calculated vote duration timestamp.
    function contestants(string[] memory candidateNames, uint256 votingStartTime, uint256 votingEndTime, uint256 minVotes) public onlyAdmin()  {
        // candidates.push(Candidate({name: _name, voteCount: 0}));
        require(!contestantsAdded, "contestants has already been added and admin hasn't declared new election");
        require(candidateNames.length > 0, "There must be at least one candidate");
        require(votingStartTime < votingEndTime, "Voting end time must be after voting start time");
        // Add candidates to the array
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
        votingStart = votingStartTime;
        votingEnd = votingEndTime;
        minimumVotes = minVotes;
        isVotingOpen = true;  
        contestantsAdded = true; 
    }
   
    // Register a voter
    function registerVoter() public {
        require(isVotingOpen, "Voting is closed");
        require(!voters[msg.sender].isRegistered, "Voter has already registered");
        voters[msg.sender].isRegistered = true;
        registeredVoters.push(msg.sender);
    }
    
    // Cast a vote for a candidate
    function castVote(uint256 candidateIndex) public {
        require(isVotingOpen, "Voting is closed");
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        require(candidateIndex < candidates.length, "Invalid candidate index");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = candidateIndex;
        candidates[candidateIndex].voteCount++;
        totalVotes++;
    }

    // End voting
    function endVoting() public onlyAdmin(){
        require(timestamp >= votingEnd, "Voting has not ended yet");
        require(totalVotes >= minimumVotes, "Not enough votes");
        isVotingOpen = false;
    }

    // Get the number of candidates
    function getVotingEnd() public view returns(uint256){
       return(votingEnd);
    }

    // get the time voting session starts
    function getVotingStart() public view returns(uint256){
       return(votingStart);
    }

    // Get the name and vote count of a candidate
    function getCandidate(uint256 candidateIndex) public view returns (string memory, uint256) {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        return (candidates[candidateIndex].name, candidates[candidateIndex].voteCount);
    }

    // get the number of candidates shortlisted
    function getCandidatesLength() public view returns (uint256){
        return candidates.length;
    }

    // Check if a voter has already voted
    function getVoterHasVoted(address  voter) public view returns (bool) {
        return voters[voter].hasVoted;
    }

    // get the candidates each voters voted for
    function getVotedFor(address  voter) public view returns (uint256){
        return voters[voter].votedFor;
    }

    // get the registered voters
    function getRegisteredVoters() public view returns (address[] memory){
        return registeredVoters;
    } 

    // get the total votes
    function getTotalVotes() public view returns(uint256){
        return totalVotes;
    }

    // Get the name of the winning candidate
    function getWinner() public view returns (string memory) {
        //require(!isVotingOpen || timestamp >= votingEnd, "Voting has not ended yet");
        uint256 winningVoteCount = 0;
        uint256 winningCandidateIndex = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateIndex = i;
                
            }
        }
        return candidates[winningCandidateIndex].name;
    }

    // start a new election - strictly by the admin / owner
   function newElection() public onlyAdmin(){
        delete candidates;
        totalVotes = 0;
        resetMapping();
        delete registeredVoters;
        contestantsAdded = false;
    }
    
    function resetMapping () public {
        if(registeredVoters.length > 0){
            for(uint256 i = 0 ; i < registeredVoters.length ; i++){
                delete voters[registeredVoters[i]];
            }
        }
    }
}
