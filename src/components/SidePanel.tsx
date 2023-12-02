import { Box, Heading, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  ResponsiveValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Menu } from "@chakra-ui/menu";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { MdOutlineShowChart, MdFormatListBulleted } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";

import SidePanelMenuItem from "./SidePanelMenuItem";
import ProfileAvatar from "./ProfileAvatar";
import useNotifications from "../hooks/useNotifications";
import colors from "../config/colors";
import useAppStore from "../store";

interface Props {
  isSlideable?: ResponsiveValue<Boolean>;
}

interface PanelContentProps {
  userId: string;
}

const PanelContent = ({ userId }: PanelContentProps) => {
  const {
    fetchFollowingNotifications: { data },
    handleFollowedNotificationsClear,
  } = useNotifications(userId);
  const gray100 = "#EDEDED"; // gray.100

  const panelOptions = [
    {
      icon: <MdFormatListBulleted />,
      label: "ALL ENTRIES",
      handleClick: () => {},
    },
    {
      icon: <RiUserFollowLine />,
      label: "FOLLOWED USERS' ENTRIES",
      handleClick: () => {},
    },
    {
      icon: <MdOutlineShowChart />,
      label: "TOP ENTRIES TODAY",
      handleClick: () => {},
    },
    {
      icon: <MdOutlineShowChart />,
      label: "TOP ENTRIES THIS MONTH",
      handleClick: () => {},
    },
  ];

  return (
    <Box
      width={"100%"}
      border={`1px solid ${useColorModeValue(gray100, "black")}`}
      boxShadow={`5px 5px 5px 5px ${useColorModeValue(gray100, "black")}`}
      minHeight={"100%"}
      padding={1}
      paddingBottom={"60px"}
      fontFamily={"playpenSans"}
    >
      <Menu>
        <Box>
          {panelOptions.map((option) => (
            <SidePanelMenuItem
              key={option.label}
              label={option.label}
              isOption={true}
              icon={option.icon}
              handleClick={option.handleClick}
            />
          ))}
        </Box>

        <Box marginTop={5}>
          <Heading
            fontSize={"sm"}
            textAlign={"left"}
            marginLeft={1}
            textTransform={"uppercase"}
          >
            Followed Updates
            <Button
              padding={0}
              fontSize={"xs"}
              variant={"link"}
              float={"right"}
              marginRight={5}
              marginTop={"1px"}
              color={colors.medium}
              _hover={{
                color: useColorModeValue(colors.lightTheme, colors.darkTheme),
                textDecoration: "underline",
              }}
              onClick={() => handleFollowedNotificationsClear()}
            >
              clear
            </Button>
          </Heading>

          {data && data[0]?._id ? (
            data?.map(
              (item) =>
                item.isNewEntry && (
                  <SidePanelMenuItem
                    key={item._id}
                    label={`${item.isNewEntry.username} has a new entry`}
                    icon={
                      <ProfileAvatar
                        boxSize="30px"
                        username={item.isNewEntry.username}
                      />
                    }
                    handleClick={() => {
                      // Route to user's page
                      console.log(
                        `Routed to ${item.isNewEntry?.username}'s page`
                      );
                    }}
                  />
                )
            )
          ) : (
            <Text
              marginY={2}
              textAlign={"left"}
              marginLeft={5}
              color={colors.medium}
              fontStyle={"italic"}
              fontSize={"sm"}
            >
              No update available
            </Text>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

const SidePanel = ({ isSlideable }: Props) => {
  const userId = useAppStore().currentUser._id;
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isSlideable) return <PanelContent userId={userId} />;
  else
    return (
      <>
        <ChevronLeftIcon
          width={"25px"}
          height={"40px"}
          position={"absolute"}
          right={0}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius={"2px"}
          cursor={"pointer"}
          zIndex={10}
          onClick={onOpen}
        />

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody padding={0}>
              <PanelContent userId={userId} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
};

export default SidePanel;
