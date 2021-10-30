// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MockUSD is ERC20 {
    
 constructor() ERC20("Mock USD", "MUSD")
 {
  _mint(msg.sender, 10000*10**18);
 }
 
 function mint(address myaddress) public payable
 {
  _mint(myaddress, 10000 * 10**18);
 }
 
}