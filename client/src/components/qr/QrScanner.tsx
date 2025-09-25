import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Box, Heading, VStack } from "@chakra-ui/react";

const LiveQrScanner = ({
  className,
  onScan,
}: {
  className?: string;
  onScan: (qrData: string) => void;
}) => {
  return (
    <VStack
      pt={24}
      gap={4}
      align="center"
      className={className}
    >
      <Heading size="md" fontWeight="bold">
        Live Ticket QR Scanner
      </Heading>
      <Box>
        <Scanner
          onScan={(detectedCodes: IDetectedBarcode[]) =>
            onScan(detectedCodes[0].rawValue)
          }
          onError={(err) => console.error(err)}
        />
      </Box>
    </VStack>
  );
};

export default LiveQrScanner;