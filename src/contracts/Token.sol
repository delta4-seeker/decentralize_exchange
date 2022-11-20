// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol" ; 
contract Token{
    string public name= "Brij Token" ; 
    string public symbol = "BRJ" ; 
    uint256 public decimal = 10 ;
    uint256 public totalSupply ;

    event Transfer(address indexed from , address indexed to , uint256 value);

    //track balance
    //send token 
    mapping(address => uint256) public balanceOf ; 
    constructor()  {
        totalSupply = 1000000 * (10**decimal) ; 
        balanceOf[msg.sender] = totalSupply ; 

    }

    function transfer(address _to , uint256 _value) public returns (bool success) { 
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value ; 
        balanceOf[_to]  = balanceOf[_to] + _value ; 
        emit Transfer(msg.sender , _to , _value);
        return true ; 
    }

}