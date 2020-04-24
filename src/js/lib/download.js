// Dependencies.
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';

/**
 * Download class
 */
class Download {
  /**
   * Save blob as file
   */
  save() {
    const element = document.querySelector( ".preview-box .preview-wrap" );
    const filename = `quote.it.${Date.now()}.jpeg`;
    this.getImage( element ).then( blob =>
      saveAs( blob, filename )
    );
  }

  /**
   * Convert DOM To blob
   * @param {DOM} node DOM element.
   * @return {Blob}
   */
  getImage( node ) {
    const exportSize = 4;
    const width = node.offsetWidth * exportSize;
    const height = node.offsetHeight * exportSize;
    const config = {
      bgcolor: '#fff',
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'left top',
      },
      width,
      height,
    };
    return domtoimage.toBlob( node, config )
  }
}

// Export as Default
export default Download;
