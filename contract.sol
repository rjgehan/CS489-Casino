pragma solidity ^0.8.0;

contract Casino489 {

    mapping(address => uint) public balances;
    uint public contractBalance;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        contractBalance += msg.value;
    }

    function withdraw(uint amount, uint multiplier) public {
        balances[msg.sender] -= amount;
        contractBalance -= amount;
        uint reward = amount * multiplier;
        require(reward <= contractBalance, "Insufficient contract balance");
        balances[msg.sender] += reward;
        contractBalance -= reward;
    }
}
