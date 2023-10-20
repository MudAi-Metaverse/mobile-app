import React from "react";
import Answer, { AnswerProps } from "./index";

export default {
  title: "Answer",
  component: Answer,
  parameters: { docs: { description: { component: "" } } },
};
const Template = (args: AnswerProps) => {
  return <Answer {...args} />;
};

export const Main = (args: AnswerProps) => {
  return <Template {...args} />;
};
Main.args = { question: "あなたの性別は？", answer: "A.男性です" };
