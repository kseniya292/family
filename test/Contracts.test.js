const { reverting } = require('./helpers/shouldFail');

const MomContract = artifacts.require('MomContract')
const DaughterContract = artifacts.require('DaughterContract')
const SonContract = artifacts.require('SonContract')

const chai = require('chai')
const assert = chai.assert;

contract('Contracts', function (accounts) {
  const randomAccount = accounts[1];
  const momName = "Liliya";
  const momAge = 55;
  const daughterName = "Kseniya";
  const daughterAge = 32;
  const sonName = "Gregory";
  const sonAge = 29; 

  beforeEach(async function () {
    // deploy mom, which deploys daughter and son
    mom = await MomContract.new(momName, momAge, daughterName, daughterAge, sonName, sonAge);
    momAddress = mom.address;
    momContract = await MomContract.at(momAddress);
    
    // get deployed daughter address
    daughterAddress = await momContract.daughter();
    daughterContract = await DaughterContract.at(daughterAddress);

    // get deployed son address
    sonAddress = await momContract.son();
    sonContract = await SonContract.at(sonAddress);
  });

  describe('MomContract', function () {
    it('it should set moms name and age', async function () {
      const nameOfMom = await momContract.name.call();
      const ageOfMom = await momContract.age.call();
      assert.equal(nameOfMom, momName);
      assert.equal(ageOfMom, momAge);
    });
    it('it should set MomContract as owner of daughter contract', async function () {
      const ownerOfDaughter = await daughterContract.owner();
      assert.equal(ownerOfDaughter, momAddress);
    });
  });
  describe('DaughterContract', function () {
    it('it should set daughters name and age', async function () {
      const nameOfDaughter = await daughterContract.name.call();
      const ageOfDaughter = await daughterContract.age.call();
      assert.equal(nameOfDaughter, daughterName);
      assert.equal(ageOfDaughter, daughterAge);
    });
    it('it should set canDate to false', async function () {
      const canDate = await daughterContract.canDate.call();
      assert.equal(canDate, false);
    });
    it('it should update canDate to true if called by owner', async function () {
      await momContract.allowDaughterToDate();
      const canDate = await daughterContract.canDate.call();
      assert.equal(canDate, true);
    });
    it('it should revert if called by anyone other account', async function () {
      await reverting(daughterContract.permissionToDate({from: randomAccount}));
    });
  });
  describe('SonContract', function () {
    it('it should set son name and age', async function () {
      const nameOfSon = await sonContract.name.call();
      const ageOfSon = await sonContract.age.call();
      assert.equal(nameOfSon, sonName);
      assert.equal(ageOfSon, sonAge);
    });
    it('it should set MomContract as owner of son contract', async function () {
      const ownerOfSon= await sonContract.owner();
      assert.equal(ownerOfSon, momAddress);
    });
    it('it should set DaughterContract address', async function () {
      const daughter = await sonContract.daughter();
      assert.equal(daughter, daughterAddress);
    });
    it('it should set MotherContract address', async function () {
      const mother = await sonContract.mom();
      assert.equal(mother, momAddress);
    });
    it('it should update canDate to true if called by owner', async function () {
      await momContract.allowSonToDate();
      const canDate = await sonContract.canDate.call();
      assert.equal(canDate, true);
    });
    it('it should revert if called by anyone other account', async function () {
      await reverting(sonContract.permissionToDate({from: randomAccount}));
    });
    it('it should get allowance amount from DaughterContract', async function () {
      const amount = await sonContract.howMuchIsYourAllowance.call();
      assert.equal(amount, 100);
    });
    it('it should get age from MomContract', async function () {
      const age = await sonContract.howOldAreYou.call();
      assert.equal(age, momAge);
    });
  });
});