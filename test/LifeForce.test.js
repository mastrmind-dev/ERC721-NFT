'use strict';

const { expect } = require('chai');
const { ethers } = require('hardhat');

//// positive test cases ////
describe('LifeForce positive test cases', () => {
  let lifeForce, owner, investor1, investor2;

  before(async () => {
    const lifeForceContract = await ethers.getContractFactory('LifeForce');
    [owner, investor1, investor2] = await ethers.getSigners();
    lifeForce = await lifeForceContract.deploy();
    await lifeForce.deployed();
  });

  describe('LifeForce smart contract testing', () => {
    it('Deployment should give the ownership of the smart contract to the deployer', async () => {
      const realOwner = await lifeForce.owner();
      expect(realOwner).to.equal(owner.address);
    })

    it('Smart contract owner should be able to pause minting NFTs', async () => {
      try {
        const pause = await lifeForce.pause();
        await pause.wait();
        const mint = await lifeForce.safeMint(investor1.address, 'https://sampleuriofnft');
        await mint.wait();
      }
      catch (error) {
        expect(error.message).to.include('Pausable: paused');
      }
    })

    it('Smart contract owner should be able to unpause minting NFTs', async () => {
      const unpause = await lifeForce.unpause();
      await unpause.wait();
      const mint = await lifeForce.safeMint(investor1.address, 'https://sampleuriofnft');
      await mint.wait();
    })
  })

  describe('NFT testing', () => {
    it('NFT ownership is properly given to the NFT holder', async () => {
      const mint = await lifeForce.safeMint(investor1.address, 'https://sampleuriofnft');
      await mint.wait();
      const ownerOfNFT = await lifeForce.ownerOf(1);
      expect(ownerOfNFT).to.equal(investor1.address);
    });

    it('NFT owner should be able to transfer his own NFT', async () => {
      const transfer = await lifeForce.connect(investor1)["safeTransferFrom(address,address,uint256)"](investor1.address, investor2.address, 1);
      await transfer.wait();
      const ownerOfNFT = await lifeForce.ownerOf(1);
      expect(ownerOfNFT).to.equal(investor2.address);
    });

    it('NFT reciever should receive the NFT ownership', async () => {
      const ownerOfNFT = await lifeForce.ownerOf(1);
      expect(ownerOfNFT).to.equal(investor2.address);
    })

  })

});


//// negative test cases /////
describe('LifeForce negative test cases', () => {
  let lifeForce, owner, investor1, investor2;

  beforeEach(async () => {
    const lifeForceContract = await ethers.getContractFactory('LifeForce');
    [owner, investor1, investor2] = await ethers.getSigners();
    lifeForce = await lifeForceContract.deploy();
    await lifeForce.deployed();
  });

  describe('LifeForce smart contract testing', () => {
    it('Apart from smart contract owner, others should not be able to pause minting NFTs', async () => {
      try {
        const pause = await lifeForce.connect(investor1).pause();
        await pause.wait();
      } catch(error){
        expect(error.message).to.include('Ownable: caller is not the owner');
      }
    })

    it('Apart from smart contract owner, others should not be able to unpause minting NFTs', async () => {
      try {
        const pause = await lifeForce.pause();
        await pause.wait();
        const unpause = await lifeForce.unpause();
        await unpause.wait();
      } catch(error){
        expect(error.message).to.include('Ownable: caller is not the owner');
      }
    })
  })

  describe('NFT testing', () => {
    it('Apart from smart contract owner others should not be able to mint NFTs', async () => {
      try {
        const mint = await lifeForce.connect(investor1).safeMint(investor1.address, 'https://sampleuriofnft');
        await mint.wait();
      } catch (error) {
        expect(error.message).to.include("Ownable: caller is not the owner");
      }
    })

    it('Apart from NFT owner/operator others should not be able to transfer NFTs', async () => {
      try {

        const mint = await lifeForce.safeMint(investor1.address, 'https://sampleuriofnft');
        await mint.wait();
        const transfer = await lifeForce["safeTransferFrom(address,address,uint256)"](investor1.address, investor2.address, 0);
        await transfer.wait();
      } catch (error) {
        expect(error.message).to.include('ERC721: caller is not token owner or approved');
      }
    })
  })

})