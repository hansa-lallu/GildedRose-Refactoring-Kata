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
      const currentItem = this.items[i]
      
      if (this._isConjuredItem(currentItem.name)) {
        currentItem.quality -= 2;
      }
      
      if (this._isAgedBrieItem(currentItem.name)) {
        if (currentItem.quality < 50) {
          currentItem.quality += 1;
        }
      }
      
      if (this._isBackstagePassItem(currentItem.name)) {
        if (currentItem.sellIn > 10) {
          currentItem.quality += 1;
        } else if (currentItem.sellIn <= 10 && currentItem.sellIn > 5) {
          currentItem.quality += 2
        } else if (currentItem.sellIn <= 5 && currentItem.sellIn > 0) {
          currentItem.quality += 3
        } else if (currentItem.sellIn <= 0) {
          currentItem.quality -= currentItem.quality;
        }        
      }
      
      if (this._isNormalItem(currentItem.name)) {
        if (currentItem.quality > 0) {
          if (currentItem.sellIn > 0) {
            currentItem.quality -= 1
          } else {
            currentItem.quality -= 2
          }
        }
      }

      if (this._isSulfurasItem(currentItem.name)) {
        return this.items;
      }

      currentItem.sellIn -= 1;
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
