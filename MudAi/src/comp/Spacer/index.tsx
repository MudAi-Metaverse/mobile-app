import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { CreateResponsiveStyle } from "src/js/functions";
import useViewType from "src/js/useViewType";

const Spacer = ({ s, horizontal = false, grow, style }) => {
  const layout = useWindowDimensions();
  const viewType = useViewType();

  return <View style={[setSpaceStyle(s, horizontal, grow, viewType), style]} />;
};

const setSpaceStyle = (size, horizontal, grow, viewType) => {
  let _style = {};
  if (grow) {
    _style = { flexGrow: 1 };
  } else if (!Array.isArray(size)) {
    _style = !horizontal
      ? { height: size, flexShrink: 0, width: "100%" }
      : {
          width: size,
          flexShrink: 0,
        };
  } else {
    const index = ["sp", "tb", "pc"].indexOf(viewType);
    _style = !horizontal
      ? { height: size[index], flexShrink: 0 }
      : {
          width: size[index],
          flexShrink: 0,
        };
  }
  return _style;
};

export default Spacer;
