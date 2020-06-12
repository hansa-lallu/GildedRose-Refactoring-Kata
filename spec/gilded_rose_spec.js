'use strict';

import { Shop, Item } from '../src/gilded_rose'

describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  describe("Item", function() {    
    describe("Normal", function() {
      const normalItem = new Item("normal item", 2, 10);
      const normalItemExpiring = new Item("normal item expiring", 0, 10);
      const normalItemNegative = new Item("quality negatives", 0, 0);
   
      const gildedRose = new Shop([normalItem, normalItemExpiring, normalItemNegative]);
  
      const items = gildedRose.updateQuality();
      
      describe("sellIn", function() {
        it('reduces sellIn value by one', function() {
          expect(items[0].sellIn).toBe(1)
        })
      })
      
      describe("quality", function() {
        it('reduces quality value by one', function() {
           expect(items[0].quality).toBe(9) 
        })
  
        it('reduces quality value by two when sellIn date passed', function() {
          expect(items[1].quality).toBe(8)
        })
      
        it('cannot reduce quality value into negatives', function() {
          expect(items[2].quality).toBe(0)
        })
      })
    })
  })
});
