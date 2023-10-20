import React from "react";
import LevelLabel from "./index";

export default {
  title: "LevelLabel",
  component: LevelLabel,
  parameters: { docs: { description: { component: "" } } },
};
const Template = (args) => {
  return <LevelLabel {...args} />;
};

export const Main = (args) => {
  return <Template {...args} />;
};
Main.args = { label: "name" };
