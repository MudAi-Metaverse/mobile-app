import React, { useState, useEffect } from "react";
import { Box } from "native-base";

const AspectBox = ({ ratio, children, ...others }) => {
  return (
    <Box w="100%" position="relative" {...others}>
      <Box pt={`${ratio * 100}%`} />
      <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex="999">
        {children}
      </Box>
    </Box>
  );
};

export default AspectBox;
