pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./SonContract.sol";

contract DaughterContract is Ownable {

  string public name;
  uint public age;
  bool public canDate;
  uint public allowance;

  constructor(
    string memory _daughtersName,
    uint _daughtersAge
  ) 
    public
  {
    name = _daughtersName;
    age = _daughtersAge;
    canDate = false;
    allowance = 100;
  }

  function permissionToDate() public onlyOwner {
    canDate = true;
  }

  function howMuch() public view returns (uint) {
    return allowance;
  }

}