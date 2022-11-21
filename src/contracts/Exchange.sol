// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import './Token.sol' ; 
// TODO
// [x] Set the fee account
// [] Deposite ether
// []  Withdraw ether
// []  deposite ether
// []  withdraw token
// []  deposite token
// []  check balance
// []  make order
// []  cancel order
// []  fill order
// []  charge fee
contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    //mapping(token_address => mapping(user_address => amount_of_token_deposited)) tokens;
    mapping(address => mapping(address => uint256)) public tokens;

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositeToken(address _token , uint _amount ) public {
        //user1 , exchange.address , 10000
        require(Token(_token).transferFrom(msg.sender , address(this) , _amount));
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount ; 
        
        //which token 
        //how much  
        // send token to this contract 
        // manage deposit - update balance 
        //emit event 
    }
}
