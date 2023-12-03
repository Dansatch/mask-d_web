import { Link, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import colors from "../config/colors";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  linkTo?: string;
  isClicked?: boolean;
  label?: string;
  styles?: React.CSSProperties;
}

const NavLink = ({ children, label, linkTo, isClicked, styles }: Props) => {
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const navigate = useNavigate();

  return (
    <Tooltip label={label}>
      <Link
        onClick={() => (linkTo ? navigate(linkTo) : {})}
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
