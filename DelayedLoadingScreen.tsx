import React, { PropsWithChildren, useEffect, useState } from "react";

export const DelayedLoadingScreen: React.FC<
  PropsWithChildren & { delay?: number; isContentAvailable: boolean }
> = ({ children, isContentAvailable, delay = 1000 }) => {
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderContentIfAvailable, setRenderContentIfAvailable] = useState(false);

  useEffect(() => {
    let innerTimeoutId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      setRenderLoading(true);
      innerTimeoutId = window.setTimeout(() => {
        setRenderContentIfAvailable(true);
      }, 500);
    }, delay);

    return () => {
      console.log(`clear timeouts, outerTimeout = ${timeoutId}, innerTimeout = ${innerTimeoutId}`);
      clearTimeout(timeoutId);
      clearTimeout(innerTimeoutId);
    };
  }, [delay]);

  if (!isContentAvailable && !renderLoading) {
    console.log("render nothing");
    return null;
  }

  // content is available sooner then delay value
  if (isContentAvailable && !renderLoading) {
    console.log("render content because it is available before loading screen should be displayed");
    return <>{children}</>;
  }

  // content is not available quick enough, display loading for at least 500ms
  if (renderLoading && (!renderContentIfAvailable || !isContentAvailable)) {
    console.log("render loading");
    return <LoadingScreen />;
  }

  console.log("render content");
  return <>{children}</>;
};

const LoadingScreen = () => {
  return <div>loading...</div>;
};
