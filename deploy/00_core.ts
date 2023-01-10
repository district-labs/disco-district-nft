import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hardhat;
  const { deploy } = deployments;
  const { deployer, administrator, minter } = await getNamedAccounts();

  const name = " Disco District";
  const symbol = "DISCO";
  const baseURI = "https://ipfs.io/ipfs/QmZexWfWGZWCmsbY2FUp8N8CvSZeYRu3ucJ74wWX18AZip/";
  const numberOfImages = 75;

  const contactInformation = {
    name: "Disco District",
    description:
      "Disco District is a collaborative proof-of-concept between Disco.xyz and District Labs. The limited edition Disco District NFTs introduce a novel approach to implementing smart contracts. Disco District NFTs can only be minted by the holders of an off-chain Official Disconaut credential which can be earned after onboarding onto Disco.xyz. Disco District shows how Ethereum app developers can build and deploy on-chain logic that can be gated the verification of off-chain reputation which represents a step forward for the ecosystem with respect to the concepts of identity, reputation, privacy and security. To learn more please checkout out a more extensive breakdown of this proof-of-concept here disco.districtlabs.com. And be sure to checkout Disco at disco.xyz and District Labs at districtlabs.com",
    image: "ipfs://QmRZ86jmHScFm94hoED2FmB6SjqpuACgy6VYN5nTibxwSB",
    externalLink: "https://disco.xyz",
    sellerFeeBasisPoints: "0",
    feeRecipient: "0x0000000000000000000000000000000000000000",
  };
  // const contactInformation = {
  //   name: "DistrictLabs",
  //   description: "DistrictLabs",
  //   image: "",
  //   externalLink: "https://districtlabs.com",
  //   sellerFeeBasisPoints: "0",
  //   feeRecipient: "0x0000000000000000000000000000000000000000",
  // };

  const DiscoERC721 = await deploy("DiscoERC721", {
    contract: "DiscoERC721",
    from: deployer,
    args: [name, symbol, baseURI, contactInformation, deployer, numberOfImages],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  const DelegatableERC721Controller = await deploy("DelegatableERC721Controller", {
    contract: "DelegatableERC721Controller",
    from: deployer,
    args: [DiscoERC721.address, deployer, minter],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  const disco = await hardhat.ethers.getContractAt("DiscoERC721", DiscoERC721.address);
  await disco.grantMinterBurnerRole(DelegatableERC721Controller.address);
  await disco.transferAdmin(administrator);

  const controller = await hardhat.ethers.getContractAt(
    "DelegatableERC721Controller",
    DelegatableERC721Controller.address
  );
  await controller.transferAdmin(administrator);
}
