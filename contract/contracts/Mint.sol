// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Mint NFT Contract
 */

contract MintContract is ERC721, Ownable {
    uint256 total_supply = 0;
    mapping (address => uint) ownwallet;
    constructor() ERC721("HERO", "HER") {}

    function mintNFT ( uint _count ) external payable{
        require(address(this).balance > 0,"Not enough ETH");
        require(total_supply + _count <= 7777, "Can't mint anymore");
        require(msg.value == .05 ether * _count,"Not match balance");
        require(ownwallet[msg.sender] + _count <= 5,"Maxium is 5");
        
        for( uint i = 0; i < _count; i++ ) {
            total_supply++;
            ownwallet[msg.sender]++;
        }
    }


    function getRestSupply() external view returns (uint256) {
        return total_supply;
    }

    function withdraw() external onlyOwner {
        address  _owner = owner();
        payable(_owner).transfer( address(this).balance );
    }
}