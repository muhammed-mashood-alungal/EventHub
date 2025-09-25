import { Button } from "@chakra-ui/react";

interface ReusableButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  colorScheme?: string;
  variant?: string;
  size?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const CustomButton: React.FC<ReusableButtonProps> = ({
  children,
  colorScheme = "blue",
  isDisabled = false,
  onClick,
  loading = false,
}) => {
  return (
    <Button
      loading={loading}
      colorScheme={colorScheme}
      disabled={isDisabled}
      onClick={onClick}
      _hover={{ transform: "translateY(-1px)", shadow: "md" }}
      transition="all 0.2s"
    >
      {children}
    </Button>
  );
};

export default CustomButton;
