const Token = artifacts.require('./Token')

require('chai').use(require('chai-as-promised')).should()

contract('Token', ([deployer, receiver, exchange]) => {
  const name = 'Brij Token'
  const symbol = 'BRJ'
  const decimal = 10
  const totalSupply = '10000000000000000'
  let token

  beforeEach(async () => {
    token = await Token.new()
  })

  describe('deployment', () => {
    it('tracks the name', async () => {
      const result = await token.name()
      result.should.equal(name)
    })

    it('tracks the symbol', async () => {
      const result = await token.symbol()
      result.should.equal(symbol)
    })
    it('should track total sypply', async () => {
      const result = await token.totalSupply()
      result.toString().should.equal(totalSupply)
    })

    it(' should assign the total supply to the deployer', async () => {
      const total = await token.totalSupply()
      const result = await token.balanceOf(deployer)
      result.toString().should.equal(total.toString())
    })
  })

  describe('sending tokens ', () => {
    let result

    describe('success', () => {
      beforeEach(async () => {
        result = await token.transfer(receiver, '100000000000000', {
          from: deployer,
        })
      })
      it('transfer token to receipient', async () => {
        let balanceOf
        balanceOf = await token.balanceOf(receiver)
        balanceOf.toString().should.equal('100000000000000')
        balanceOf = await token.balanceOf(deployer)
        balanceOf
          .toString()
          .should.equal(
            (parseInt(totalSupply) - parseInt('100000000000000')).toString(),
          )
      })

      it('emit a trasfer event ', () => {
        result.logs[0].event.should.equal('Transfer')
        let event = result.logs[0].args
        event.to.toString().should.equal(receiver)
        event.from.toString().should.equal(deployer)
        event.value.toString().should.equal('100000000000000')
      })
    })

    describe('failure', () => {
      it('rejects insufficient balance ', async () => {
        let invalidAmount = '100000000000000000000000000000000'
        await token
          .transfer(receiver, invalidAmount, { from: deployer })
          .should.be.rejectedWith(
            'VM Exception while processing transaction: revert',
          )
      })
    })

    describe('approving tokens', () => {
      let result
      let amount

      beforeEach(async () => {
        amount = 100
        result = await token.approve(exchange, amount, { from: deployer })
      })
      describe('success', () => {
        it('allowance for delegated token spending on exchange', async () => {
          const allowance = await token.allowance(deployer, exchange)
          allowance.toString().should.equal(amount.toString())
        })
        it('emit a approval event ', () => {
          result.logs[0].event.should.equal('Approval')
          let event = result.logs[0].args
          event.owner.toString().should.equal(deployer.toString())
          event.delegate.toString().should.equal(exchange.toString())
          event.amount.toString().should.equal(amount.toString())
        })

        it('transferFrom event' ,async () =>  {
          await token.transferFrom(deployer ,  receiver , 10 , { from: exchange } ) ; 
          console.log((await token.balanceOf(receiver)).toString())
          console.log((await token.balanceOf(deployer)).toString())
          console.log((await token.allowance(deployer , exchange)).toString())

        })
        describe('failure', () => {})
      })
    })
  })
})
