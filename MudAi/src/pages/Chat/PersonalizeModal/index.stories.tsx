import React from "react";
import PersonalizeModal from "./index";

export default {
  title: "PersonalizeModal",
  component: PersonalizeModal,
  parameters: { docs: { description: { component: "" } } },
};
const Template = (args) => {
  return <PersonalizeModal {...args} />;
};

export const Main = (args) => {
  return <Template {...args} />;
};
Main.args = { label: "name" };
