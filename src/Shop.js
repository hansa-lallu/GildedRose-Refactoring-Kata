const SULFURAS_ID = 'Sulfuras, Hand of Ragnaros'
const AGED_BRIE_ID = 'Aged Brie'
const CONJURED_ID = 'Conjured'
const BACKSTAGE_PASS_ID = 'Backstage passes to a TAFKAL80ETC concert'

class Shop {
  constructor(items=[]){
    this.items = items;
  }

 updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.isSulfurasItem(this.items[i].name)) {
        return this.items;
      }

      if (this.isConjuredItem(this.items[i].name)) {
        this.items[i].quality -= 2;
        return this.items
      }

      if (this.isNormalItem(this.items[i].name)) {        
      }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          this.items[i].quality -= 1;
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality += 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality += 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality += 1;
              }
            }
          }
        }
      }
        this.items[i].sellIn -= 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
                this.items[i].quality -= 1;
            }
          } else {
            this.items[i].quality -= this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality += 1;
          }
        }
      }
    }
    return this.items;
  }

  isNormalItem(itemName) {
    return !this.isSulfurasItem(itemName) && !this.isConjuredItem(itemName) && !this.isAgedBrieItem(itemName) && !this.isBackstagePassItem(itemName)
  }

  isSulfurasItem(itemName) {
    return itemName === SULFURAS_ID;
  }

  isConjuredItem(itemName) {
    return itemName.includes(CONJURED_ID);
  }

  isAgedBrieItem(itemName) {
    return itemName.includes(AGED_BRIE_ID);
  }

  isBackstagePassItem(itemName) {
    return itemName.includes(BACKSTAGE_PASS_ID)
  }
}

module.exports = {
  Shop
}
