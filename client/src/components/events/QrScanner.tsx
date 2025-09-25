import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";

const LiveQrScanner = ({ onScan }: { onScan: (qrData: string) => void }) => {
  return (
    <VStack left={0} top={0} align="center">
      <Flex justify={"space-between"} p={5}>
        <Heading size="md" fontWeight="bold">
          Please Scan Your Qr Code
        </Heading>
      </Flex>

      <Box width={"40%"}>
        <Scanner
          onScan={(detectedCodes: IDetectedBarcode[]) => {
            onScan(detectedCodes[0].rawValue);
          }}
          onError={(err) => console.error(err)}
        />
      </Box>
    </VStack>
  );
};

export default LiveQrScanner;
