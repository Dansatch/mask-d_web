import { Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet } from "react-router-dom";

import AppGrid from "./AppGrid";
import CardContainer from "./CardContainer";
import React from "react";
import UserCardSkeleton from "./UserCardSkeleton";
import UserCard from "./UserCard";
import useUsers from "../hooks/useUsers";
import colors from "../config/colors";

const UserGrid = () => {
  const { data: users, isLoading, hasNextPage, fetchNextPage } = useUsers();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchedUsersCount =
    users?.pages.reduce((total, page) => total + page.length, 0) || 0;

  if (!fetchedUsersCount)
    return (
      <Text marginLeft={2} color={colors.medium} fontStyle={"italic"}>
        No users available
      </Text>
    );

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedUsersCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <AppGrid type="users">
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <UserCardSkeleton />
              </CardContainer>
            ))}

          {users?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((user) => (
                <CardContainer key={user._id}>
                  <UserCard userData={user} />
                </CardContainer>
              ))}
            </React.Fragment>
          ))}
        </AppGrid>
      </InfiniteScroll>

      <Outlet />
    </>
  );
};

export default UserGrid;
