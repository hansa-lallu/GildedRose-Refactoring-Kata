import { Item } from "../src/Item"

describe("Item", function () {
  describe("initialize", function() {
    const item = new Item('test', 3, 4);

    it('sets the name correctly', function() {
      expect(item.name).toEqual('test')
    })

    it('sets the sellIn correctly', function() {
      expect(item.sellIn).toEqual(3)
    })

    it('sets the quality correctly', function() {
      expect(item.quality).toEqual(4)
    })
  })
});
