import * as React from "react";
import { useWindowDimensions } from "react-native";
import { breakPoints } from "./configView";

const useViewType = (mediaQueryObj) => {
  const windowWidth = useWindowDimensions().width;
  const mediaQuery = mediaQueryObj || breakPoints;

  const [viewType, setviewType] = React.useState(
    windowWidth <= mediaQuery.sp
      ? "sp"
      : windowWidth < mediaQuery.tb
      ? "tb"
      : "pc"
  );

  React.useEffect(() => {
    if (windowWidth <= mediaQuery.sp) {
      setviewType("sp");
    } else if (windowWidth < mediaQuery.tb) {
      setviewType("tb");
    } else {
      setviewType("pc");
    }
  }, [windowWidth]);

  return viewType;
};

export default useViewType;
