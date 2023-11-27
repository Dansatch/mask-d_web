import { Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppGrid from "./AppGrid";
import CardContainer from "./CardContainer";
import React from "react";
import EntryCardSkeleton from "./EntryCardSkeleton";
import EntryCard from "./EntryCard";
import useEntries from "../hooks/useEntries";

const EntryGrid = () => {
  const { data: entries, isLoading, hasNextPage, fetchNextPage } = useEntries();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchedContentsCount =
    entries?.pages.reduce((total, page) => total + page.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedContentsCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <AppGrid>
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
  );
};

export default EntryGrid;
