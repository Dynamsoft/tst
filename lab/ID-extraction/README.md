# 🪪 ID Extraction: Passport MRZ + Driver License PDF417

A focused demo that reads and parses identity document data from camera or image input. It supports:

- Passport / ID MRZ (Machine Readable Zone) text recognition and parsing
- Driver's license PDF417 barcode decoding and parsing

## Included files

- `index.html` — main demo page (camera + image input UI).  
- `SampleDriversLicense.jpg` — example license image.  
- `read_id.json` — JSON template used by the sample.  
- `index.css` — styles for the demo.  

## ✨ Features

- Read and parse PDF417 (AAMVA) data from driver's licenses  
- Read and parse MRZ data from passports and MRZ-based IDs
- Display raw recognition result and structured parsed fields
- Single workflow for both barcode-based and MRZ-based documents

## 🔧 How it works

- The page initializes one Capture Vision workflow that includes:
	- A barcode task for PDF417 decoding (driver licenses)
	- A text-line recognition task for MRZ detection and recognition (passport/ID)
- If a barcode is found, the sample parses PDF417 bytes with Code Parser and renders structured fields.
- If MRZ text lines are found, the sample reconstructs MRZ lines and parses them with Code Parser, then renders structured fields.
- Raw text and parsed output are shown together for easier validation and troubleshooting.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use high-resolution images or a higher camera resolution for reliable decoding and parsing.  
- Keep MRZ lines fully visible and in focus for stable recognition.  
- Test with multiple passport/ID and license samples to validate coverage across document variants.  

## 📌 Notes

- Serve via localhost or HTTPS to enable camera access.  
- Replace the included trial/demo license with a valid Dynamsoft license for extended evaluation.  
- See the repository root `README.md` for running instructions and API documentation.