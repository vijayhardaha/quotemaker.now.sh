// Dependencies.
import "./lib/jquery";
import "jquery-ui-dist/jquery-ui.js";
import "jquery-ui-dist/jquery-ui.css";
import swal from 'sweetalert';

// Helpers functions.
import Utils from "./lib/utils";
import Download from "./lib/download";
import Preview from "./lib/preview";

/**
 * Do things when document is ready
 */
jQuery( document ).ready( ( $ ) => {
  /**
   * App class
   */
  class App {
    /**
     * Class constructor
     */
    constructor() {
      // Initialize helpers classes.
      this.utils = new Utils();
      this.download = new Download();
      this.preview = new Preview();

      // Define global dom elements.
      this.doc = $( document );
      this.body = $( document.body );
      this.form = this.utils.dom( "#quote-form" );
      this.discountRow = this.utils.dom( "#quote-form .summary-table .discount-row" );
      this.customRow = this.utils.dom( "#quote-form .summary-table .custom-row" );
      this.itemRows = this.utils.dom( "#quote-form .item-rows" );
      this.itemGroup = this.utils.dom( "#quote-form .item-group" );

      // Used in keyup debounce.
      this.timeout = null;

      // Line item row html.
      this.itemRowHtml = `<div class="item-row"><div class="item-col-group"><div class="item-inline"><div class="item-col item-title"><input type="text" class="form-control" placeholder="Enter item Name" inputmode="text"></div><div class="item-col item-qty"><input type="text" class="form-control number-input qty-input" value="1" data-inputmask-regex="[0-9]{1,3}" inputmode="text"></div>
			<div class="item-col item-price"><input type="text" class="form-control number-input" value="0" data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'digits': 2,'digitsOptional': false, 'placeholder': '0'" inputmode="numeric" style="text-align: right;"></div></div><div class="item-col item-desc"><textarea class="form-control" placeholder="Enter detailed description (optional)" inputmode="text"></textarea></div></div><div class="item-col item-amount"><input type="text" class="form-control number-input" value="0" readonly="" data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'digits': 2,'digitsOptional': false, 'placeholder': '0'" inputmode="numeric" style="text-align: right;"></div><div class="item-col item-action"><a href="#" class="item-remove" title="Remove"><i data-eva="close-square-outline"></i></a></div></div>`;
    }

    /**
     * Load class functions.
     */
    load() {
      // Setup icons.
      this.utils.setupIcons();
      // Setup input masks.
      this.utils.setupInputMask();
      // Load filters events.
      this.filtersEvents();
      // Load items events.
      this.itemsEvents();
      // Load preview events.
      this.previewEvents();
      // Initialize sorable on items row.
      this.itemRows.sortable( {
        placeholder: "ui-state-highlight",
        cursor: "move",
        axis: "y"
			} );
			// Initialize update totals.
      this.updateTotals();
    }

    /**
     * Filter events
     */
    filtersEvents() {
      this.body
        .on( "change", "#quote-form select", () => {
          this.updateFilters();
        } )
        .on( "click", "#quote-form :input[type='checkbox']", () => {
          this.updateFilters();
        } )
        .on( "change", "select#currency", () => {
          this.updateCurrency();
        } );
    }

    /**
     * Item events
     */
    itemsEvents() {
      this.body
        .on( "click", ".item-remove", ( e ) => {
          e.preventDefault();
          const elm = $( e.currentTarget );
          if ( this.itemRows.find( ".item-row" ).length > 1 ) {
            elm.closest( ".item-row" ).remove();
          } else {
            elm.closest( ".item-row" ).find( ":input" ).val( "" );
            elm.closest( ".item-row" ).find( ":input.number-input" ).val( 0 );
            elm.closest( ".item-row" ).find( ":input.qty-input" ).val( 1 );
          }
          this.updateTotals();
        } )
        .on( "click", "#add-new-item", ( e ) => {
          e.preventDefault();
          if ( this.itemRows.length ) {
            this.itemRows.append( this.itemRowHtml );
            this.utils.setupIcons();
            this.utils.setupInputMask();
          }
          this.updateFilters();
          this.updateTotals();
        } )
        .on( "change keyup paste blur", "#quote-form :input", ( e ) => {
          clearTimeout( this.timeout );
          this.timeout = setTimeout( () => {
            this.updateTotals();
            clearTimeout( this.timeout );
          }, 100 );
        } );
    }

    /**
     * Preview events
     */
    previewEvents() {
      this.body
        .on( "submit", "#quote-form", ( e ) => {
          e.preventDefault();
          return false;
        } )
        .on( "click", "#get-preview", ( e ) => {
          e.preventDefault();
          this.preview.generate();
          this.body.addClass( "preview--open" );
        } )
        .on( "click", "#reset-form", ( e ) => {
          e.preventDefault();
          swal( {
              title: "Are you sure?",
              text: "Once reset, you will not be able to recover this.",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            } )
            .then( ( reset ) => {
              if ( reset ) {
                this.form.trigger( "reset" );
                this.itemRows.empty();
                this.itemRows.append( this.itemRowHtml );
                this.itemRows.append( this.itemRowHtml );
                this.utils.setupIcons();
                this.utils.setupInputMask();
              }
            } );
        } )
        .on( "click", ".overlay, #close-preview", ( e ) => {
          e.preventDefault();
          this.body.removeClass( "preview--open" );
        } )
        .on( "click", "#download-preview", ( e ) => {
          e.preventDefault();
          this.download.save();
        } );
    }

    /**
     * Update filter changes
     */
    updateFilters() {
      const discountRow = this.discountRow;
      const customRow = this.customRow;
      const group = this.itemGroup;
      const descRows = group.find( ".item-desc" );
      const qtyCols = group.find( ".item-qty" );
      const priceCols = group.find( ".item-price" );
      const amountCols = group.find( ".item-amount" );
      const amountInputs = amountCols.find( ":input" );

      if ( this.utils.showDiscount() ) {
        discountRow.removeClass( "hidden" );
      } else {
        discountRow.removeClass( "hidden" ).addClass( "hidden" );
      }

      if ( this.utils.showCustomAmount() ) {
        customRow.removeClass( "hidden" );
      } else {
        customRow.removeClass( "hidden" ).addClass( "hidden" );
      }

      if ( this.utils.showDetailedDesc() ) {
        descRows.removeClass( "hidden" );
      } else {
        descRows.removeClass( "hidden" ).addClass( "hidden" );
      }

      if ( this.utils.showAmountOnly() ) {
        qtyCols.removeClass( "hidden" ).addClass( "hidden" );
        priceCols.removeClass( "hidden" ).addClass( "hidden" );
        amountInputs.attr( "readonly", false );
      } else {
        qtyCols.removeClass( "hidden" );
        priceCols.removeClass( "hidden" );
        amountInputs.attr( "readonly", true );
      }
    }

    /**
     * Update currency changes
     */
    updateCurrency() {
      const currency = this.utils.getCurrency();
      const option = this.utils.dom( "#discount-type option" ).eq( 1 );
      option.attr( "value", currency );
      option.text( currency );
    }

    /**
     * Update totals
     */
    updateTotals() {
      const data = this.utils.getJson();
      this.utils.setSummary( "subtotal-row", data.summary.subtotal );
      this.utils.setSummary( "discount-row", data.summary.discount );
      this.utils.setSummary( "custom-row", data.summary.custom );
      this.utils.setSummary( "total-row", data.summary.total );
    }
  }

  // Initialize class.
  const app = new App();
  // call class load function.
  app.load();
} );
