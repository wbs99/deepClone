const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const assert = chai.assert;
const deepClone = require("../src/index");

describe('deepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(deepClone)
  })
  it('可以复制基本类型', () => {
    const n = 1
    const n2 = deepClone(n)
    assert(n === n2)
    const s = 'string'
    const s2 = deepClone(s)
    assert(s === s2)
    const b = true
    const b2 = deepClone(b)
    assert(b === b2)
    const u = undefined
    const u2 = deepClone(u)
    assert(u === u2)
    const empty = null
    const empty2 = deepClone(empty)
    assert(empty === empty2)
    const symbol = Symbol()
    const symbol2 = deepClone(symbol)
    assert(symbol === symbol2)
  })
  describe('对象', () => {
    it('可以复制普通对象', () => {
      const person = { name: 'Jack', child: { name: 'small Jack' } }
      const person2 = deepClone(person)
      assert(person !== person2)
      assert(person.child !== person2.child)
      assert(person.name === person2.name)
      assert(person.child.name === person2.child.name)
    })
    it('可以复制数组', () => {
      const array = [[11, 12], [21, 22], [31, 32]]
      const array2 = deepClone(array)
      assert(array[0] !== array2[0])
      assert(array[1] !== array2[1])
      assert(array[2] !== array2[2])
      assert(array[0][1] === array2[0][1])
      assert(array[1][1] === array2[1][1])
      assert(array[2][1] === array2[2][1])
    })
    it('可以复制函数', () => {
      const f1 = (a, b) => a + b
      const f2 = function (a, b) { return a + b }
      const f11 = deepClone(f1)
      const f22 = deepClone(f2)
      assert(f1 !== f11)
      assert(f1(1, 2) === f11(1, 2))
      assert(f2 !== f22)
      assert(f2(1, 2) === f22(1, 2))
    })
  })
  it('可以解决环引用的 bug', () => {
    const object = { name: 'Jack' }
    object.self = object
    const object2 = deepClone(object)
    assert(object !== object2)
    assert(object.self !== object2.self)
    assert(object.name === object2.name)
  })
  it('可以复制正则表达式', () => {
    const regex = new RegExp(/\.(j|t)sx/i)
    const regex2 = deepClone(regex)
    assert(regex !== regex2)
    assert(regex.source === regex2.source)
    assert(regex.flags === regex2.flags)
  })
  it('可以复制日期', () => {
    const date = new Date(2000, 0, 1, 20, 30, 0)
    const date2 = deepClone(date)
    assert(date.getTime() === date2.getTime())
  })
})