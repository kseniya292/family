pragma solidity ^0.5.0;

import "./MomContract.sol";
import "./SonContract.sol";

contract DaughterContract {

  string public name;
  uint public age;

  constructor(
    string memory _daughtersName,
    uint _daughtersAge
  ) 
    public
  {
    name = _daughtersName;
    age = _daughtersAge;
  }

}