// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract W2EToken is ERC20 {
    address payable public owner;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = payable(msg.sender);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
