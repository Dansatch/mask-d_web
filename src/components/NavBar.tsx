import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  Center,
  Image,
  Link,
  Text,
  PlacementWithLogical,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa6";
import { BiHome, BiPlus } from "react-icons/bi";

import NavLink from "./NavLink";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import ProfileAvatar from "./ProfileAvatar";
import EntryForm from "./EntryForm";
import NotificationPanel from "./NotificationPanel";
import logo from "../assets/1DE-removebg-preview.png";
import User from "../entities/User";
import colors from "../config/colors";

interface Props {
  user: User;
}

const NavBar = ({ user }: Props) => {
  const [lastClicked, setLastClicked] = useState("Entries");
  const [notificationPlacement, setNotificationPlacement] =
    useState<PlacementWithLogical>("auto");
  const { toggleColorMode } = useColorMode();
  const isMd = useBreakpointValue({ base: false, md: true });

  const Links = [
    { label: "Entries", linkTo: "/entries", icon: <BiHome /> },
    { label: "Users", linkTo: "/users", icon: <FaUsers /> },
    {
      label: "New Entry",
      linkTo: "/contents/create",
      icon: <EntryForm displayComponent={<BiPlus />} />,
    },
    {
      // Change to drop down like add content (USE MENU)
      label: "",
      linkTo: "/notifications",
      icon: (
        <NotificationPanel
          userId={user._id}
          placement={notificationPlacement}
        />
      ),
    },
  ];

  useEffect(() => {
    setNotificationPlacement(isMd ? "top-end" : "bottom-end");
  }, [isMd]);

  return (
    <>
      <HStack
        bg={useColorModeValue("gray.100", "gray.900")}
        px={{ base: 3, md: 7 }}
        py={2}
        width={"100%"}
        height={"60px"}
        align={"start"}
        justify={"space-between"}
        alignItems={"center"}
        spacing={{ base: 4, xl: 10 }}
        position={"sticky"}
        top={-0.2}
        zIndex={10}
      >
        {/* Link to / */}
        <Link
          minWidth={"50px"}
          minHeight={"40px"}
          color={useColorModeValue(colors.lightTheme, colors.darkTheme)}
          _hover={{ textDecoration: "none" }}
        >
          <HStack spacing={1}>
            <Image
              src={logo}
              boxSize="50px"
              borderRadius={"100%"}
              objectFit="contain"
            />
            <Text
              display={{ base: "none", md: "flex" }}
              fontFamily={"serif"}
              textTransform={"uppercase"}
              // fontSize={"xs"}
              fontWeight={"bold"}
            >
              Mask'd
            </Text>
          </HStack>
        </Link>

        <Box flex={1} maxWidth={"100%"}>
          {/* Set context based on current route parameters */}
          <SearchInput placeholder="Search ..." />
        </Box>

        <HStack spacing={{ base: 4, xl: 9 }}>
          <HStack
            as={"nav"}
            spacing={{ base: 2, xl: 4 }}
            display={{ base: "none", md: "flex" }}
            fontSize={"20px"}
          >
            {Links.map((link) => (
              <Box key={link.label} onClick={() => setLastClicked(link.label)}>
                <NavLink
                  isClicked={lastClicked === link.label ? true : false}
                  linkTo={link.linkTo}
                  styles={{
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    width: "fit-content",
                  }}
                  label={link.label}
                >
                  {link.icon ? link.icon : link.label}
                </NavLink>
              </Box>
            ))}
          </HStack>

          <Menu>
            <MenuButton
              as={Button}
              boxSize={"40px"}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              transition={".5s ease"}
              _hover={{
                boxSize: "41px",
                boxShadow: `1px 1px 5px ${colors.medium}`,
                opacity: "0.5",
              }}
            >
              <ProfileAvatar username={user.username} boxSize="100%" />
            </MenuButton>

            <MenuList alignItems={"center"}>
              <Center my={3}>
                <ProfileAvatar username={user.username} boxSize="120px" />
              </Center>
              <Center my={3}>
                <Text
                  fontWeight={"bold"}
                  // textTransform={"uppercase"}
                  fontFamily={"shantellSans"}
                >
                  {user.username}
                </Text>
              </Center>
              <MenuDivider />

              <Link>
                <MenuItem py={2} px={4}>
                  My Profile
                </MenuItem>
              </Link>

              <Link>
                <MenuItem py={2} px={4}>
                  Logout
                </MenuItem>
              </Link>

              <MenuItem onClick={toggleColorMode}>
                <ColorModeSwitch displayOnly={true} />
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <HStack
        bg={useColorModeValue("gray.100", "gray.900")}
        width={"100%"}
        px={2}
        py={2}
        position={"fixed"}
        bottom={0}
        marginBottom={"-1px"}
        display={{ base: "flex", md: "none" }}
        justify={"space-around"}
        as={"nav"}
        fontSize={"20px"}
        zIndex={10}
      >
        {Links.map((link) => (
          <Box key={link.label} onClick={() => setLastClicked(link.label)}>
            <NavLink
              linkTo={link.linkTo}
              isClicked={lastClicked === link.label ? true : false}
              styles={{
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "fit-content",
              }}
              label={link.label}
            >
              {link.icon ? link.icon : link.label}
            </NavLink>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default NavBar;
