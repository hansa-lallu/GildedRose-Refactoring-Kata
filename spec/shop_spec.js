import { Shop } from '../src/Shop'

const fakeItem = function(name = "fake item", sellIn = 0, quality = 0) {
  return {
    name: name,
    sellIn: sellIn,
    quality: quality
  }
}

describe("Shop", function() {
  describe("items", function() {    
    it('stores multiple items', function() {
      const item = fakeItem();
      const shop = new Shop([item, item])
      const items = shop.updateQuality();
  
      expect(items.length).toBe(2);
      expect(items[0]).toBe(item)
    });
  });

  describe("updateQuality", function() {
    describe("Aged Brie", function() {
      const gildedRose = new Shop([fakeItem("Aged Brie", 4, 10), fakeItem("Aged Brie", 10, 50)]);
      const items = gildedRose.updateQuality();
      
      describe("sellIn", function() {
        it('reduces sellIn value by 1', function() {
          expect(items[0].sellIn).toBe(3)
        })
      })

      describe("quality", function() {
        it('increases by 1 when it gets older', function() {
           expect(items[0].quality).toBe(11)
        })

        it('does not increase in quality when at 50', function() {
          expect(items[1].quality).toBe(50)
        })
      })
    })

    describe("Conjured", function() {
      const gildedRose = new Shop([fakeItem("Conjured item", 2, 10)]);
      const items = gildedRose.updateQuality();

      describe("sellIn", function() {
        it('reduces sellIn by 1', function() {
          expect(items[0].sellIn).toBe(1)
        })
      })

      describe("quality", function() {
        it('reduces quality value by 2', function() {
          expect(items[0].quality).toBe(8) 
        })
      })
    })

    describe("Sulfuras", function() {
      const gildedRose = new Shop([fakeItem("Sulfuras, Hand of Ragnaros", 10, 100)]);     
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

    describe("Normal", function() {
      const gildedRose = new Shop([
        fakeItem("item", 2, 10),
        fakeItem("item", 0, 10),
        fakeItem("item", 0, 0)
      ]);
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

    describe("Backstage passes", function() {
      const gildedRose = new Shop([
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 10, 15),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 20, 20),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 10, 15),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 9, 15),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 5, 15),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 4, 15),
        fakeItem("Backstage passes to a TAFKAL80ETC concert", 0, 15),
      ]);
      const items = gildedRose.updateQuality();

      describe("sellIn", function() {
        it('reduces sellIn by 1', function() {
          expect(items[0].sellIn).toBe(9)
        })
      })

      describe("quality", function() {
        it('increases by 1 when sellIn is greater than 10', function() {          
          expect(items[1].quality).toBe(21)
        })

        it('increases in value by 2 when sellIn value is equal to 10', function() {
          expect(items[2].quality).toBe(17)
        })
        
        it('increases in value by 2 when sellIn value is less than 10', function() {
          expect(items[3].quality).toBe(17)
        })

        it('increases in value by 3 when sellIn value is equal to 5', function() {          
          expect(items[4].quality).toBe(18)
        })

        it('increases in value by 3 when sellIn value is less than 5', function() {
          expect(items[5].quality).toBe(18)
        })

        it('decreases to 0 after sellIn is equal to 0', function() {
          expect(items[6].quality).toBe(0)
        })
        
        it('decreases to a value of 0 after sellIn value is less than 0', function() {
          expect(items[6].quality).toBe(0)
        })
      })
    })
  })
})