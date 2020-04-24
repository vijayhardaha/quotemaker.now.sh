// Helpers functions.
import Utils from "./utils.js";

/**
 * Preview class
 */
class Preview {
  /**
   * Class constructor
   */
  constructor() {
    // Initialize helpers classes.
    this.utils = new Utils();
  }

  /**
   * Generate preview
   */
  generate() {
    const data = this.utils.getJson();
    const titleElement = this.utils.dom( ".preview-box .project-title" );
    const descriptionElement = this.utils.dom( ".preview-box .project-desc" );
    const tableBody = this.utils.dom( ".preview-box .quote-table tbody" );
    const tableFoot = this.utils.dom( ".preview-box .quote-table tfoot" );

    titleElement.empty();
    descriptionElement.empty();
    tableBody.empty();
    tableFoot.empty();

    if ( data.title != '' ) {
      titleElement.text( data.title );
    }
    if ( data.description != '' ) {
      descriptionElement.text( data.description );
    }

    const items = data.items;
    const amountOnly = data.filters.type == "amount";
    for ( let [ index, item ] of items.entries() ) {
      const number = index + 1;
      const title = item.title;
      const desc = data.filters.showDesc ? item.desc : "";
      const qty = amountOnly ? 1 : parseInt( item.qty, 10 );
      const price = amountOnly ? item.amount : item.price;
      const amount = item.amount;
      const row = `<tr><td class="no">${number}</td><td class="desc"><h3>${title}</h3><span>${desc}</span></td><td class="unit">${this.utils.formatPrice(price)}</td><td class="qty">${qty}</td><td class="total">${this.utils.formatPrice(amount)}</td></tr>`;
      tableBody.append( row );
    }

    tableFoot.append( `<tr class="subtotal"><td colspan="2"></td><td colspan="2">Subtotal</td><td>${this.utils.formatPrice(data.summary.subtotal)}</td></tr>` );
    if ( data.filters.showDiscount ) {
      const discountLabel = data.discount.type == 0 ? `Discount (${data.discount.amount}%)` : `Discount (${this.utils.formatPrice(data.discount.amount)})`;
      tableFoot.append( `<tr class="discount"><td colspan="2"></td><td colspan="2">${discountLabel}</td><td>${this.utils.formatPrice(data.summary.discount)}</td></tr>` );
    }
    if ( data.filters.showCustomAmount ) {
      tableFoot.append( `<tr class="custom"><td colspan="2"></td><td colspan="2">${data.other.label}</td><td>${this.utils.formatPrice(data.summary.custom)}</td></tr>` );
    }
    tableFoot.append( `<tr class="total"><td colspan="2"></td><td colspan="2">Total</td><td>${this.utils.formatPrice(data.summary.total)}</td></tr>` );
  }
}

// Export as default.
export default Preview;
