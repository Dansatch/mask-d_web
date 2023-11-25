import { Fragment } from "react";
import { Box, Divider, HStack, List, ListItem, Text } from "@chakra-ui/layout";
import { MdNotificationsActive } from "react-icons/md";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { PlacementWithLogical } from "@chakra-ui/popper";
import useNotifications from "../hooks/useNotifications";

interface Props {
  userId: string;
  placement?: PlacementWithLogical;
}

const NotificationPanel = ({ userId, placement }: Props) => {
  const {
    fetchNotifications: { data },
    handleNotificationsClear,
  } = useNotifications(userId);

  return (
    <>
      <Popover
        closeOnBlur={false}
        placement={placement}
        onClose={() => handleNotificationsClear()}
        arrowPadding={2}
      >
        <PopoverTrigger>
          <Box width={"fit-content"} cursor={"pointer"} margin={"auto"}>
            <MdNotificationsActive />
          </Box>
        </PopoverTrigger>

        <PopoverContent
          width={"300px"}
          maxWidth={"90vw"}
          fontFamily={"playpenSans"}
          color={useColorModeValue("black", "white")}
          _focusVisible={{ display: "none" }}
          marginY={2}
        >
          <PopoverHeader fontWeight="semibold" display={"flex"} fontSize={"md"}>
            <HStack spacing={1}>
              <Text>Notifications</Text>
              <MdNotificationsActive />
            </HStack>
          </PopoverHeader>

          <PopoverArrow />
          <PopoverCloseButton />

          <PopoverBody
            padding={0}
            fontSize={"sm"}
            color={useColorModeValue("gray.800", "gray.300")}
            maxHeight={"60vh"}
            overflowY={"hidden"}
            overflowX={"hidden"}
            _hover={{ overflowY: "auto" }}
          >
            <List width={"100%"} textAlign={"left"}>
              {data && data[0]?._id ? (
                data?.map((obj) => (
                  <Fragment key={obj._id}>
                    <ListItem paddingX={2} paddingY={1}>
                      {obj.message}
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))
              ) : (
                <ListItem paddingX={2} paddingY={1} fontStyle={"italic"}>
                  no new notifications
                </ListItem>
              )}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPanel;
