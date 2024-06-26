import React, { useEffect } from "react";
import { Box, ResponsiveValue, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet } from "react-router-dom";

import AppGrid from "./AppGrid";
import CardContainer from "./CardContainer";
import EntryCard from "./EntryCard";
import EntryCardSkeleton from "./EntryCardSkeleton";
import useEntries from "../hooks/useEntries";
import colors from "../config/colors";
import useAppStore from "../store";

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
  } = useEntries(mostLiked);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const setAuthorId = useAppStore().entryQueryStore().setAuthorId;
  const setTimeFilter = useAppStore().entryQueryStore().setTimeFilterValue;

  const fetchedEntriesCount =
    entries?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  // Set author ID
  useEffect(() => {
    setAuthorId(authorId || "");
  }, [authorId]);

  // Set default time filter (to be refactored out)
  useEffect(() => {
    if (authorId) {
      setTimeFilter("allTime");
    } else {
      setTimeFilter("today");
    }
  }, []);

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
              {page.data.map((entry) => (
                <CardContainer key={entry._id}>
                  <Box height={"350px"}>
                    <EntryCard entryData={entry} />
                  </Box>
                </CardContainer>
              ))}
            </React.Fragment>
          ))}
        </AppGrid>
      </InfiniteScroll>

      {/* To not render outlet in side user profile panel */}
      {!mostLiked && <Outlet />}
    </>
  );
};

export default EntryGrid;
