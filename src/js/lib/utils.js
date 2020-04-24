// Dependencies.
import "./jquery";
import "inputmask/dist/jquery.inputmask.min.js";

/**
 * Utility class
 */
class Utils {
  /**
   * Returns DOM element
   * @param {String} selector DOM selector
   * @return {DOM}
   */
  dom( selector ) {
    return $( document.body ).find( selector );
  }

  /**
   * Show amount only in line item?
   */
  showAmountOnly() {
    const elm = this.dom( "#quote-form #item-type" );
    return elm.val() === 'amount';
  }

  /**
   * Get currency symbol
   */
  getCurrency() {
    const elm = this.dom( "#quote-form #currency" );
    return elm.val();
  }

  /**
   * Show detailed description field?
   */
  showDetailedDesc() {
    const elm = this.dom( "#quote-form #has-desc" );
    return elm.prop( "checked" );
  }

  /**
   * Show detailed description field?
   */
  showDiscount() {
    const elm = this.dom( "#quote-form #has-discount" );
    return elm.prop( "checked" );
  }

  /**
   * Show custom amount?
   */
  showCustomAmount() {
    const elm = this.dom( "#quote-form #has-custom-amount" );
    return elm.prop( "checked" );
  }

  /**
   * Setup Input mask
   */
  setupInputMask() {
    this.dom( ".item-price input, .item-amount :input, #other-amount, #discount-amount" ).attr( "data-inputmask", "'alias': 'numeric', 'groupSeparator': '', 'digits': 2,'digitsOptional': true, 'placeholder': '0'" ).change();
    this.dom( ".item-qty :input" ).attr( "data-inputmask-regex", "[0-9]{1,3}" ).change();
    this.dom( ":input:not(.enhanced-input)" )
    this.dom( ":input:not(.enhanced-input)" ).each( ( i, e ) => {
      $( e ).inputmask( {
        showMaskOnHover: false,
      } );
      $( e ).addClass( "enhanced-input" ).change();
    } );
  }

  /**
   * Setup Icons
   */
  setupIcons() {
    eva.replace( { width: "18px", height: "18px" } );
  }

  /**
   * Convert to int
   * @param {Number} number 
   */
  int( number ) {
    return parseInt( number, 10 );
  }

  /**
   * Convert to float
   * @param {Number} number
   * @param {Number} limit
   */
  float( number = 0, limit = 2 ) {
    return parseFloat( number ).toFixed( limit );
  }

  /**
   * Get calculated JSON data.
   */
  getJson() {
    const data = {
      title: '',
      description: '',
      items: [],
      discount: {
        type: 0,
        amount: 0
      },
      other: {
        label: 'Others',
        amount: 0
      },
      summary: {
        subtotal: 0,
        total: 0,
        discount: 0,
        custom: 0
      },
      filters: {
        type: 'quantity',
        currency: '$',
        showDesc: true,
        showDiscount: false,
        showCustomAmount: false
      }
    };

    // Get filters details.
    data.filters.type = this.showAmountOnly() ? 'amount' : 'quantity';
    data.filters.currency = this.getCurrency();
    data.filters.showDesc = this.showDetailedDesc();
    data.filters.showDiscount = this.showDiscount();
    data.filters.showCustomAmount = this.showCustomAmount();

    // Get title & description
    data.title = this.dom( "#title" ).val();
    data.description = this.dom( "#description" ).val();

    const rows = this.dom( ".item-group .item-rows .item-row" );
    if ( rows.length ) {
      let items = [];
      let subtotal = 0;
      let discount = 0;
      let custom = 0;
      let total = 0;
      rows.each( ( key, element ) => {
        const row = $( element );
        let title = row.find( ".item-title :input" ).val();
        let desc = row.find( ".item-desc :input" ).val();
        let qty = row.find( ".item-qty :input" ).val();
        let price = row.find( ".item-price :input" ).val();
        let amount = row.find( ".item-amount :input" ).val();

        qty = qty == '' || qty < 1 ? 1 : +qty;
        price = price == '' || price < 0 ? 0 : +price;

        if ( this.showAmountOnly() ) {
          amount = amount == "" || amount < 0 ? 0 : +amount;
        } else {
          amount = qty * price;
          row.find( ".item-amount :input" ).val( this.float( amount ) );
        }

        const itemData = { title, desc, qty, price, amount };
        items.push( itemData );
        subtotal = +subtotal + +amount;
      } );
      data.items = items;

      data.summary.subtotal = +subtotal;
      if ( this.showDiscount() ) {
        let discountType = this.dom( "#discount-type" ).val();
        let discountAmount = this.dom( "#discount-amount" ).val();
        discountType = discountType == '' ? 0 : this.int( discountType );
        discountAmount = discountAmount == '' || discountAmount < 0 ? 0 : +discountAmount;
        data.discount.type = discountType;
        data.discount.amount = discountAmount;
        if ( discountType == 0 ) {
          discount = this.percent( subtotal, discountAmount );
        } else {
          discount = discountAmount;
        }
      }

      if ( this.showCustomAmount() ) {
        let otherLabel = this.dom( "#other-label" ).val();
        let otherAmount = this.dom( "#other-amount" ).val();
        otherLabel = otherLabel == '' ? 'Others' : otherLabel.trim();
        otherAmount = otherAmount == '' ? 0 : otherAmount;
        data.other.label = otherLabel;
        data.other.amount = otherAmount;
        custom = otherAmount;
      }

      total = +subtotal + +discount + +custom;
      data.summary.discount = +discount;
      data.summary.custom = +custom;
      data.summary.total = +total;
    }
    return data;
  }

  /**
   * Calculate percentage
   * @param {Number} num 
   * @param {Number} per 
   */
  percent( num = 0, per = 0 ) {
    let result = ( num / 100 ) * per;
    return +this.float( result );
  }

  /**
   * Checks for negative number
   * @param {Number} num 
   */
  isNegative( num ) {
    return Math.sign( num ) < 0;
  }

  /**
   * Converts to positive number
   * @param {Number} num 
   */
  positive( num ) {
    return Math.abs( num );
  }

  /**
   * Format price and add currency symbol
   * @param {Number} price 
   */
  formatPrice( price = 0 ) {
    const currency = this.getCurrency();
    const negative = this.isNegative( price );
    const positivePrice = this.positive( price );
    const formattedPrice = `${currency}${this.float(positivePrice)}`;
    return negative ? `-${formattedPrice}` : formattedPrice;
  }

  /**
   * Set summary values
   * @param {String} selector 
   * @param {Number} value 
   */
  setSummary( selector, value = 0 ) {
    const element = this.dom( `.summary-table .${selector} .cost` );
    element.text( this.formatPrice( value ) );
  }
}

// Export as default.
export default Utils;
