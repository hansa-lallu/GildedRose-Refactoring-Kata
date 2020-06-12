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
      if (this._isSulfurasItem(this.items[i].name)) {
        return this.items;
      }

      if (this._isConjuredItem(this.items[i].name)) {
        this.items[i].quality -= 2;
        return this.items
      }
      
      if (this._isAgedBrieItem(this.items[i].name)) {
        if (this.items[i].quality < 50) {
          this.items[i].quality += 1;
        }

        return this.items
      }

      

      if (this._isNormalItem(this.items[i].name)) {        
      }

      if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
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
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
                this.items[i].quality -= 1;
            }
          } else {
            this.items[i].quality -= this.items[i].quality;
          }
        }    
    }
    return this.items;
  }

  _isNormalItem(itemName) {
    return !this._isSulfurasItem(itemName) && !this._isConjuredItem(itemName) && !this._isAgedBrieItem(itemName) && !this._isBackstagePassItem(itemName)
  }

  _isSulfurasItem(itemName) {
    return itemName.includes(SULFURAS_ID);
  }

  _isConjuredItem(itemName) {
    return itemName.includes(CONJURED_ID);
  }

  _isAgedBrieItem(itemName) {
    return itemName.includes(AGED_BRIE_ID);
  }

  _isBackstagePassItem(itemName) {
    return itemName.includes(BACKSTAGE_PASS_ID)
  }
}

module.exports = {
  Shop
}
