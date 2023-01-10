//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "base64-sol/base64.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract MintableERC721 is ERC721 {
  using Strings for uint256;

  // Private
  uint256 private _nextId = 0;
  string private _baseTokenURI;
  uint256 private _numberOfImages;
  ContractURI private _contractURI;

  struct ContractURI {
    string name;
    string description;
    string image;
    string externalLink;
    string sellerFeeBasisPoints;
    string feeRecipient;
  }

  mapping(address => uint256) private _tokenOwner;

  constructor(
    string memory name,
    string memory symbol,
    string memory _baseTokenURI_,
    ContractURI memory _contractURI_,
    address admin,
    uint256 _numberOfImages_
  ) ERC721(name, symbol) {
    _nextId++;
    _baseTokenURI = _baseTokenURI_;
    _contractURI = _contractURI_;
    _numberOfImages = _numberOfImages_;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function totalSupply() external view returns (uint256) {
    return _nextId - 1;
  }

  /**
   * @notice Mints a new token to the given address
   * @param to address - Address to mint to`
   */
  function mint(address to) external {
    unchecked {
      uint256 nextId = _nextId++;
      _mint(to, nextId);
    }
  }

  /**
   * @notice Burns a token
   * @param tokenId uint256 - Token ID to burn
   */
  function burn(uint256 tokenId) external {
    _burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function contractURI() external view returns (string memory uri) {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              string.concat(
                '{"name":',
                '"',
                _contractURI.name,
                '",',
                '"description":',
                '"',
                _contractURI.description,
                '",',
                '"image":',
                '"',
                _contractURI.image,
                '",',
                '"externalLink":',
                '"',
                _contractURI.externalLink,
                '",',
                '"sellerFeeBasisPoints":',
                '"',
                _contractURI.sellerFeeBasisPoints,
                '",',
                '"feeRecipient":',
                '"',
                _contractURI.feeRecipient,
                '"',
                "}"
              )
            )
          )
        )
      );
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  //   function _baseURI() internal view virtual override returns (string memory) {
  //     return _baseTokenURI;
  //   }
}
