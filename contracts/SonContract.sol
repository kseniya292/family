pragma solidity ^0.5.0;

import "./MomContract.sol";
import "./DaughterContract.sol";

contract SonContract {

  string public name;
  uint public age;

  constructor(
    string memory _sonsName,
    uint _sonsAge
  ) 
    public
  {
    name = _sonsName;
    age = _sonsAge;
  }

}