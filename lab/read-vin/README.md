# VIN Image Collector

Collects camera frames where VIN barcode decoding fails. These images help us optimize the barcode reading template for your environment.

## How to use

1. Open **https://dynamsoft.github.io/tst/lab/read-vin/** on your phone or laptop
2. Allow camera access when prompted
3. Point your camera at a VIN barcode
4. Tap **"Aim at VIN"** — the button turns red and starts collecting
5. Hold steady for ~30 seconds while aiming at the VIN
6. The tool auto-stops after 10 images, or tap **"Stop & Download"** anytime
7. A ZIP file downloads automatically — send it back to us

## What gets collected

- Only frames where decoding **failed** (successful reads are not saved)
- One image every 3 seconds (to avoid duplicates)
- A `log.json` with timestamps and decode statistics

## Tips

- Use good lighting — avoid glare and shadows on the VIN
- Hold the camera 6-12 inches from the barcode
- Try different angles if the VIN is hard to read
- The status badge (top-right) shows live frame and save counts
