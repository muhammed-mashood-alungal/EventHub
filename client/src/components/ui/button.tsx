import { Button } from "@chakra-ui/react";

interface ReusableButtonProps {
  children: React.ReactNode;
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
  variant = "solid",
  size = "md",
  isDisabled = false,
  onClick,
  leftIcon,
  rightIcon,
}) => {
  return (
    <Button
      colorScheme={colorScheme}
    //  variant={variant}
    //  size={size}
      disabled={isDisabled}
      onClick={onClick}
      //leftIcon={leftIcon}
    //  rightIcon={rightIcon}
      _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
      transition="all 0.2s"
    >
      {children}
    </Button>
  );
};

export default CustomButton;