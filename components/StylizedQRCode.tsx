import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface StylizedQRCodeProps {
  transactionHash: string;
  isDarkMode: boolean;
}

export const StylizedQRCode: React.FC<StylizedQRCodeProps> = ({
  transactionHash,
  isDarkMode,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (!transactionHash || !baseUrl) return;

    const generateQR = async (): Promise<void> => {
      try {
        // Generate the full URL for the transaction
        const url = `${baseUrl}/blob/${transactionHash}`;

        // Generate QR code with custom styling
        const qrCode = await QRCode.toDataURL(url, {
          width: 512,
          margin: 2,
          color: {
            dark: isDarkMode ? "#4ade80" : "#059669", // green-400 : green-600
            light: isDarkMode ? "#0f172a" : "#f0fdf4", // slate-900 : emerald-50
          },
          scale: 8,
        });

        setQrDataUrl(qrCode);
      } catch (err) {
        console.error("QR Code generation failed:", err);
      }
    };

    generateQR();
  }, [transactionHash, baseUrl, isDarkMode]);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-48 h-48">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Transaction QR Code"
            className="w-full h-full transition-all duration-300 hover:scale-105"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div
            className={`w-full h-full border-2 border-dashed
          ${isDarkMode ? "border-green-500/30" : "border-green-600/30"}
          rounded-lg flex items-center justify-center`}
          >
            <span className="text-sm opacity-50">Generate QR Code</span>
          </div>
        )}
      </div>
    </div>
  );
};
