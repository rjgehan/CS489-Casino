pragma solidity ^0.8.0;

contract DepositWithdraw {
    mapping(address => uint256) public balances;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function addEther(uint256 amount) public payable {
    require(msg.value == amount, "Invalid amount of Ether sent");
    balances[msg.sender] += amount;
    emit Deposit(msg.sender, amount);
}
}
