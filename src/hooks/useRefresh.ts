import { useState, useCallback } from "react";

// To be removed later on since refresh could be done through zustand state
const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    refresh;
    setRefresh((prevRefresh) => !prevRefresh); // Toggles the state to trigger a refresh
  }, []);

  return handleRefresh;
};

export default useRefresh;
