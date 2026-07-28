export default function Home() {
  return (
    <main style={{ padding: "40px 24px", maxWidth: 640 }}>
      <h1>PDF417 Barcode Scanner</h1>
      <p style={{ marginTop: 16, lineHeight: 1.6 }}>
        This sample uses the Dynamsoft Barcode Reader SDK with a custom template
        that only reads <strong>PDF417</strong> barcodes.
      </p>
      <ul style={{ marginTop: 16, lineHeight: 2 }}>
        <li><a href="/scanner">Camera Scanner</a> — scan PDF417 barcodes via live camera</li>
        <li><a href="/upload">Image Upload</a> — decode PDF417 barcodes from image files</li>
      </ul>
    </main>
  );
}
