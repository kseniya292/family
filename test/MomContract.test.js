const { reverting } = require('./helpers/shouldFail');
const encodeCall = require('zos-lib/lib/helpers/encodeCall').default

const MomContract = artifacts.require('MomContract')
const DaughterContract = artifacts.require('DaughterContract')
const SonContract = artifacts.require('SonContract')

const chai = require('chai')
const assert = chai.assert;

contract('MomContract', function (accounts) {
  const momName = "Liliya";
  const momAge = 55;
  const daughterName = "Kseniya";
  const daughterAge = 32;
  const sonName = "Gregory";
  const sonAge = 29; 

  beforeEach(async function () {
    // deploy mom, which deploys daughter and son
    mom = await MomContract.new(momName, momAge, daughterName, daughterAge, sonName, sonAge);
    momContract = await MomContract.at(mom.address);
    
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
    it('it should set daughters name and age', async function () {
      const nameOfDaughter = await daughterContract.name.call();
      const ageOfDaughter = await daughterContract.age.call();
      assert.equal(nameOfDaughter, daughterName);
      assert.equal(ageOfDaughter, daughterAge);
    });
    it('it should set son name and age', async function () {
      const nameOfSon = await sonContract.name.call();
      const ageOfSon = await sonContract.age.call();
      assert.equal(nameOfSon, sonName);
      assert.equal(ageOfSon, sonAge);
    });
  });
  

});