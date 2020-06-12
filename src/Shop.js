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
      if (this.isSulfurasItem(this.items[i])) {
        return this.items;
      }
      
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
            if (this.items[i].name.includes("Conjured")) {
              this.items[i].quality = this.items[i].quality - 2;
            } else {
              this.items[i].quality = this.items[i].quality - 1;
            }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
        this.items[i].sellIn = this.items[i].sellIn - 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
                this.items[i].quality = this.items[i].quality - 1;
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
    

    return this.items;
  }

  isSulfurasItem(item) {
    return item.name === SULFURAS_ID;
  }
}

module.exports = {
  Shop
}
