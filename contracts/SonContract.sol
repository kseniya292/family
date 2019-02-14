pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MomContract.sol";
import "./DaughterContract.sol";

contract SonContract is Ownable {

  string public name;
  uint public age;
  DaughterContract public daughter;
  MomContract public mom;
  bool public canDate;

  constructor(
    string memory _sonsName,
    uint _sonsAge,
    DaughterContract _daughter,
    address _mom
  ) 
    public
  {
    name = _sonsName;
    age = _sonsAge;
    daughter = _daughter;
    mom = MomContract(_mom);
    canDate = false;
  }

  function permissionToDate() public onlyOwner {
    canDate = true;
  }

  function howMuchIsYourAllowance() public returns (uint) {
    return daughter.howMuch();
  }

  function howOldAreYou() public returns (uint) {
    return mom.getAge();
  }

}