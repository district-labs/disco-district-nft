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
    const name =' Funk Town'
    const symbol = 'FUNK'
    const baseURI = 'https://ipfs.io/ipfs/QmZexWfWGZWCmsbY2FUp8N8CvSZeYRu3ucJ74wWX18AZip/'
    const numberOfImages = 75

    const contactInformation = {
      name: "Funk Town NFT",
      description: "Get on the Dance Floor",
      image: "",
      externalLink: "https://disco.xyz",
      sellerFeeBasisPoints: "0",
      feeRecipient: "0x0000000000000000000000000000000000000000",
    };

    DiscoERC721 = await DiscoERC721Factory.deploy(name,
        symbol,
        baseURI,
        contactInformation,
        wallet0.address,
        numberOfImages
        );

        DiscoERC721.grantMinterBurnerRole()

  });

  describe('mint(address to)', () => {
    it('should SUCCEED to mint', async () => {
      await DiscoERC721.mint(wallet0.address);
      const owner = await DiscoERC721.ownerOf(1);
      const totalSupply = await DiscoERC721.totalSupply();
      expect(owner).to.equal(wallet0.address);
      expect(totalSupply).to.equal(1);
    });
  });
});
