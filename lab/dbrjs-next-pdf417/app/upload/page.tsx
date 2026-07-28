"use client";

import dynamic from "next/dynamic";

const ImageCapture = dynamic(() => import("../../components/ImageCapture"), {
  ssr: false,
});

export default function UploadPage() {
  return (
    <main>
      <h2 style={{ padding: "16px 24px" }}>Image Upload — PDF417 Only</h2>
      <ImageCapture />
    </main>
  );
}
