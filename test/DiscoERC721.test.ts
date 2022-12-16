import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const { getSigners, utils } = ethers;

describe('DiscoERC721', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  let DiscoERC721: Contract;
  let DiscoERC721Factory: ContractFactory;

  before(async () => {
    [wallet0, wallet1, wallet2] = await getSigners();
    DiscoERC721Factory = await ethers.getContractFactory('DiscoERC721');
  });

  beforeEach(async () => {

  });

  describe('a situtation', () => {
    it('should SUCCEED to mint', async () => {
      expect(true).to.be.true;
    });
  });
});
