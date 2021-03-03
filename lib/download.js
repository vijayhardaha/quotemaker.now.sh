import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";

export const saveImage = () =>
	getImage().then((blob) => saveAs(blob, `quote-maker-${Date.now()}.png`));

const getImage = () => {
	const node = document.querySelector("#preview-box #preview");
	const exportSize = 4;
	const width = node.offsetWidth * exportSize;
	const height = node.offsetHeight * exportSize;
	const config = {
		bgcolor: "#fff",
		style: {
			transform: `scale(${exportSize})`,
			"transform-origin": "left top",
		},
		width,
		height,
	};
	return domtoimage.toBlob(node, config);
};

export const copyImage = () =>
	getImage().then((blob) =>
		navigator.clipboard.write([
			new window.ClipboardItem({
				"image/png": blob,
			}),
		])
	);