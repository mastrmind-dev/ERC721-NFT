// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LifeForce is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("LifeForce", "LIFE") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafkreifwfvt52efs4nrpvsc567y7luoflrdqxkgvbpc4giq7gcpzml46uy";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function safeTransferFrom(
            address from,
            address to,
            uint256 tokenId,
            bytes memory data
        ) public virtual override {
            require(false, "Transfer with additional data is prohibited!");
            _safeTransfer(from, to, tokenId, data);
        }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(false, "Giving approve to transfer tokens is prohibited!");
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        _requireMinted(tokenId);
        return _baseURI();
    }
}

