const Exchange = artifacts.require('./Exchange')
const Token = artifacts.require('./Token')

require('chai').use(require('chai-as-promised')).should()
contract('Exchange', ([deployer, feeAccount, user1]) => {
  let exchange
  let token
  let feePercent = 10

  beforeEach(async () => {
    token = await Token.new()
    exchange = await Exchange.new(feeAccount, feePercent)
    await token.transfer(user1, 100000000, { from: deployer })
  })

  describe('Exchange deployment', () => {
    it('should track feeAccount', async () => {
      let result = await exchange.feeAccount()
      result.toString().should.equal(feeAccount.toString())
    })

    it('should track feePercent', async () => {
      let result = await exchange.feePercent()
      result.toString().should.equal(feePercent.toString())
    })
  })

  describe('deposite tokens', () => {
    beforeEach(async () => {
      await token.approve(exchange.address, 10000, { from: user1 })
      const result = await exchange.depositeToken(token.address, 10000, {
        from: user1,
      })
    })
    describe('success', () => {
      it('tracks the deposite', async () => {
        //check the token balance
        let balance = await token.balanceOf(exchange.address)
        balance.toString().should.equal('10000')
        balance = await exchange.tokens(token.address , user1) ; 
        balance.toString().should.equal('10000');
      })
    })
    describe('failure', () => {})
  })
})
