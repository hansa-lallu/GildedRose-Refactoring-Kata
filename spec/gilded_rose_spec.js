'use strict';

import { Shop } from '../src/shop'
import { Item } from '../src/item'

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
      const normalItemNegative = new Item("normal item negatives", 0, 0);
   
      const gildedRose = new Shop([normalItem, normalItemExpiring, normalItemNegative]);
  
      const items = gildedRose.updateQuality();
      
      describe("sellIn", function() {
        it('reduces sellIn value by 1', function() {
          expect(items[0].sellIn).toBe(1)
        })
      })
      
      describe("quality", function() {
        it('reduces quality value by 1', function() {
           expect(items[0].quality).toBe(9) 
        })
  
        it('reduces quality value by 2 when sellIn date passed', function() {
          expect(items[1].quality).toBe(8)
        })
      
        it('cannot reduce quality value into negatives', function() {
          expect(items[2].quality).toBe(0)
        })
      })
    })

    describe("Aged Brie", function() {
      const agedBrieItem = new Item("Aged Brie", 4, 10);
      const agedBrieItemMax = new Item("Aged Brie", 10, 50);

      const gildedRose = new Shop([agedBrieItem, agedBrieItemMax]);

      const items = gildedRose.updateQuality();

      describe("quality", function() {
        it('increases in value by one when it gets older', function() {
           expect(items[0].quality).toBe(11)
        })

        it('cannot increase quality value when at 50', function() {
          expect(items[1].quality).toBe(50)
        })
      })      
    })

    describe("Sulfuras", function() {
      const sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 10, 100);
      const gildedRose = new Shop([sulfurasItem]);
      
      const items = gildedRose.updateQuality();

      describe("sellIn", function() {
        it('never needs to be sold', function() {
          expect(items[0].sellIn).toBe(10)
        })
      })

      describe("quality", function() {
        it('never decreases in quality', function() {
           expect(items[0].quality).toBe(100)
        })
      })
    })

    describe("Backstage passes", function() {
      const backstagePassesGreaterThan10 = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 15);
      const backstagePassesEqualTo10 = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
      const backstagePassesLessThan10 = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 15);
      const backstagePassesEqualTo5 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15);
      const backstagePassesLessThan5 = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 15);
      const backstagePassesEqualTo0 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15);
      const backstagePassesLessThan0 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15);
      const gildedRose = new Shop([backstagePassesGreaterThan10, backstagePassesEqualTo10, backstagePassesLessThan10, backstagePassesEqualTo5, backstagePassesLessThan5, backstagePassesEqualTo0, backstagePassesLessThan0]);

      const items = gildedRose.updateQuality();

      describe("quality", function() {
        it('increases in value by 1 when sellIn value is greater than 10', function() {
           expect(items[0].quality).toBe(16)
        })

        it('increases in value by 2 when sellIn value is equal to 10', function() {
          expect(items[1].quality).toBe(17)
        })

        it('increases in value by 2 when sellIn value is less than 10', function() {
          expect(items[2].quality).toBe(17)
        })

        it('increases in value by 3 when sellIn value is equal to 5', function() {
          expect(items[3].quality).toBe(18)
        })

        it('increases in value by 3 when sellIn value is less than 5', function() {
          expect(items[4].quality).toBe(18)
        })

        it('decreases to a value of 0 after sellIn value is equal to 0', function() {
          expect(items[5].quality).toBe(0)
        })

        it('decreases to a value of 0 after sellIn value is less than 0', function() {
          expect(items[6].quality).toBe(0)
        })
      })

      describe("Conjured", function() {
        const conjuredItem = new Item("Conjured item", 2, 10);
        const gildedRose = new Shop([conjuredItem]);
    
        const items = gildedRose.updateQuality();

        it('reduces quality value by 2', function() {
          expect(items[0].quality).toBe(8) 
        })
      })
    })
  })
});
