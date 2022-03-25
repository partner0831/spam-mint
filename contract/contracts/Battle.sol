// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Battle Contract
 */

contract BattleContract is  Ownable {
    constructor() {}

    function battle () external payable{
        require(address(this).balance > 0,"Not enough ETH");

    }

    function withdraw() external onlyOwner {
        address  _owner = owner();
        payable(_owner).transfer( address(this).balance );
    }
}