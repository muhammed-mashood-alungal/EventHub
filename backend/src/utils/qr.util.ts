import QRCode from "qrcode";

export const generateTicketQR = async (ticketData: object) => {
  try {
    const payload = JSON.stringify(ticketData);
    const qrImageUrl = await QRCode.toDataURL(payload); 
    return qrImageUrl; 
  } catch (err) {
    throw new Error("Failed to generate QR");
  }
};
