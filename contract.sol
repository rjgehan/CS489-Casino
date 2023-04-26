pragma solidity ^0.8.0;

contract Withdrawable {

    mapping(address => uint) public balances;
    uint public contractBalance;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        contractBalance += msg.value;
    }

    function withdraw(uint amount, uint multiplier) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        contractBalance -= amount;
        uint reward = amount * multiplier;
        payable(msg.sender).transfer(reward);
    }
}
