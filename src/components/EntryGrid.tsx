import React from "react";
import { ResponsiveValue, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet } from "react-router-dom";

import AppGrid from "./AppGrid";
import CardContainer from "./CardContainer";
import EntryCard from "./EntryCard";
import EntryCardSkeleton from "./EntryCardSkeleton";
import useEntries from "../hooks/useEntries";
import colors from "../config/colors";

interface Props {
  authorId?: string;
  mostLiked?: boolean;
  noOfColumns?: ResponsiveValue<number>;
}

const EntryGrid = ({ authorId, mostLiked, noOfColumns }: Props) => {
  const {
    data: entries,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useEntries(authorId, mostLiked);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchedEntriesCount =
    entries?.pages.reduce((total, page) => total + page.length, 0) || 0;

  if (!fetchedEntriesCount)
    return (
      <Text marginLeft={2} color={colors.medium} fontStyle={"italic"}>
        No entries available
      </Text>
    );

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedEntriesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <AppGrid type="entries" noOfColumns={noOfColumns}>
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <EntryCardSkeleton />
              </CardContainer>
            ))}

          {entries?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((entry) => (
                <CardContainer key={entry._id}>
                  <EntryCard entryData={entry} />
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

export default EntryGrid;
