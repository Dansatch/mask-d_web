import { Link, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import colors from "../config/colors";

interface Props {
  children: ReactNode;
  linkTo: string;
  isClicked?: boolean;
  label?: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

const NavLink = ({ children, label, isClicked, styles, onClick }: Props) => {
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);

  return (
    <Tooltip label={label}>
      <Link
        onClick={onClick}
        px={2}
        py={2}
        width={"100%"}
        rounded={"md"}
        transition={"0.5s ease"}
        color={isClicked ? color : ""}
        border={isClicked ? `1px solid ${color}` : "none"}
        _hover={{
          color: color,
          border: "1px solid",
        }}
        href={"#"}
        style={styles}
      >
        {children}
      </Link>
    </Tooltip>
  );
};

export default NavLink;
