"""
POC Server — Medical Form Scanner
Receives scanned PDF uploads, saves with barcode-derived filenames,
and serves documents for viewing.
"""

import os
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

UPLOAD_DIR = Path(__file__).parent / "uploaded"
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="POC Medical Form Scanner")


@app.post("/api/upload")
async def upload_document(
    file: UploadFile = File(...),
    barcode_text: str = Form(...),
):
    """Save uploaded PDF using barcode text as filename."""
    # Sanitize filename from barcode text
    safe_name = "".join(c if c.isalnum() or c in "-_" else "_" for c in barcode_text)
    if not safe_name:
        safe_name = "unknown"
    filename = f"{safe_name}.pdf"

    # Avoid overwriting — append timestamp if file exists
    dest = UPLOAD_DIR / filename
    if dest.exists():
        ts = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
        filename = f"{safe_name}_{ts}.pdf"
        dest = UPLOAD_DIR / filename

    content = await file.read()
    dest.write_bytes(content)

    return JSONResponse(
        {
            "success": True,
            "filename": filename,
            "barcode_text": barcode_text,
            "size": len(content),
        }
    )


@app.get("/api/documents")
async def list_documents():
    """List all uploaded documents."""
    docs = []
    for f in sorted(UPLOAD_DIR.iterdir()):
        if f.suffix.lower() == ".pdf":
            stat = f.stat()
            docs.append(
                {
                    "filename": f.name,
                    "size": stat.st_size,
                    "uploaded_at": datetime.fromtimestamp(
                        stat.st_mtime, tz=timezone.utc
                    ).isoformat(),
                    "url": f"/api/documents/{f.name}",
                }
            )
    return {"documents": docs}


@app.get("/api/documents/{filename}")
async def get_document(filename: str):
    """Serve a specific uploaded document."""
    filepath = UPLOAD_DIR / filename
    if not filepath.exists() or not filepath.is_relative_to(UPLOAD_DIR):
        return JSONResponse({"error": "Not found"}, status_code=404)
    return FileResponse(filepath, media_type="application/pdf", filename=filename)


# In production, serve the React build from here
DIST_DIR = Path(__file__).parent / ".." / "frontend" / "dist"
if DIST_DIR.exists():
    app.mount("/", StaticFiles(directory=str(DIST_DIR), html=True), name="static")
