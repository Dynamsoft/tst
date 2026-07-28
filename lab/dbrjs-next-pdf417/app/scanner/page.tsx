"use client";

import dynamic from "next/dynamic";

const VideoCapture = dynamic(() => import("../../components/VideoCapture"), {
  ssr: false,
});

export default function ScannerPage() {
  return (
    <main>
      <h2 style={{ padding: "16px 24px" }}>Camera Scanner — PDF417 Only</h2>
      <VideoCapture />
    </main>
  );
}
