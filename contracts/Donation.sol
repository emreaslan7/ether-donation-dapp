// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
  address owner;
  uint256 public totalDonations;

  struct Donates{
    address donor;
    uint256 amount;
  }

  Donates public donate;
  Donates[] public donations;

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {
    donate  = Donates(
      msg.sender,
      msg.value
    );

    donations.push(donate);
    totalDonations += msg.value;
  }

  function getDonations() external view returns (Donates[] memory) {
    return donations;
  }

  function getTotalDonations() external view returns (uint256) {
    return totalDonations;
  }
}