/**
 * External dependancies
 */
import { useState, useEffect } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useAsyncCallback } from "actionsack";
import { FiDownload, FiCopy } from "react-icons/fi";

/**
 * Internal dependancies
 */
import { downloadImage, copyImage } from "../../lib/download";

const PreviewActions = ({ close }) => {
	const clipboardSupported = () => {
		const [isClipboardSupports, setClipboardSupport] = useState(false);

		useEffect(() => {
			setClipboardSupport(
				window.navigator &&
					window.navigator.clipboard &&
					typeof ClipboardItem === "function"
			);
		}, []);

		return isClipboardSupports;
	};

	const [showCopied, { loading: copied }] = useAsyncCallback(
		() => new Promise((res) => setTimeout(res, 500))
	);

	const [copy, { loading: loading }] = useAsyncCallback(async (...args) => {
		await copyImage(...args);
		showCopied();
	});

	const [showDownloaded, { loading: downloaded }] = useAsyncCallback(
		() => new Promise((res) => setTimeout(res, 500))
	);

	const [download, { loading: downloading }] = useAsyncCallback(
		async (...args) => {
			await downloadImage(...args);
			showDownloaded();
		}
	);

	return (
		<ButtonGroup aria-label="Preview Actions">
			<Button variant="primary" disabled={downloading} onClick={download}>
				<FiDownload />
				{downloading
					? "Downloading..."
					: downloaded
					? "Downloaded!"
					: "Download"}
			</Button>
			<Button
				variant="dark"
				disabled={!clipboardSupported || loading}
				onClick={copy}
			>
				<FiCopy />
				{loading ? "Copying" : copied ? "Copied!" : "Copy"}
			</Button>
			<Button variant="secondary" onClick={() => close(false)}>
				Close Preview
			</Button>
		</ButtonGroup>
	);
};

export default PreviewActions;
