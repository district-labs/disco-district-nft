import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  //   const { deployments, getNamedAccounts} = hardhat;
  //   const { deploy } = deployments;
  //   const { deployer } = await getNamedAccounts();
  //   const name = 'Mintable NFT'
  //   const symbol = 'Mintable NFT'
  //   const baseURI = 'https://ipfs.io/ipfs/QmZexWfWGZWCmsbY2FUp8N8CvSZeYRu3ucJ74wWX18AZip/'
  //   const numberOfImages = 75
  //   const contactInformation = {
  //     name: "",
  //     description: "",
  //     image: "",
  //     externalLink: "https://districtlabs.com",
  //     sellerFeeBasisPoints: "0",
  //     feeRecipient: "0x0000000000000000000000000000000000000000",
  //   };
  //   await deploy("MintableERC721", {
  //     contract: "MintableERC721",
  //     from: deployer,
  //     args: [
  //       name,
  //       symbol,
  //       baseURI,
  //       contactInformation,
  //       deployer,
  //       numberOfImages
  //     ],
  //     skipIfAlreadyDeployed: true,
  //     log: true,
  //   });
}
