// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact contact@elzian.com
contract LifeForce is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable,
    ERC721Burnable
{
    struct ERData {
        string FarmerName;
        uint256 RegistrationNo;
        string[] Species;
        uint256 ERUnits;
        string H2O;
        string O2;
        string CapturedCarbon;
    }

    mapping(uint256 => mapping(uint256 => ERData)) public AnnualERData;

    constructor() ERC721("LifeForce", "LIFE") {}

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(
        address to,
        string memory uri,
        uint256 tokenId
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function safeTransferFrom(
        address /*from*/,
        address to,
        uint256 tokenId
    ) public override(IERC721, ERC721) {
        super.safeTransferFrom(_msgSender(), to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setERData(
        uint256 investorID,
        string memory farmerName,
        uint256 registrationNo,
        string[] memory species,
        uint256 eRUnits,
        uint256 servicingYear,
        string memory h2o,
        string memory o2,
        string memory capturedCarbon
    ) public onlyOwner {
        ERData memory eRData = ERData(
            farmerName,
            registrationNo,
            species,
            eRUnits,
            h2o,
            o2,
            capturedCarbon
        );
        AnnualERData[investorID][servicingYear] = eRData;
    }

    function getERData(
        uint256 investorID,
        uint256 servicingYear
    ) public view returns (ERData memory) {
        return AnnualERData[investorID][servicingYear];
    }
}
