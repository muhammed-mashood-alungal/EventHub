import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(val) => !val && onClose()}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white" 
            color="black" 
            borderRadius="md"
            boxShadow="lg"
            p={4}
          >
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose} color={'gray.500'} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              {children}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
