import Choice from 'src/comp/Choice';
import React from 'react';
import {Box, ScrollView} from 'native-base';
import {StyleSheet} from 'react-native';

export type TFixedPhrase = {
  question: string;
  answer: string;
};

type FixedPhraseProps = {
  addFixedPhrase: (obj: TFixedPhrase) => void;
};

const FixedPhrase = (props: FixedPhraseProps) => {
  const handleClick = (obj: TFixedPhrase) => {
    props.addFixedPhrase(obj);
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.comp}>
      {fixedPhrases.map((item, index) => {
        return (
          <Box key={item.question} style={styles.choiceWrap}>
            <Choice
              key={item.question}
              text={item.question}
              onPress={() => {
                handleClick(item);
              }}
            />
          </Box>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  comp: {
    flexGrow: 1,
    paddingHorizontal: 13,
    gap: 4,
  },
  choiceWrap: {flexShrink: 0},
});

const fixedPhrases: TFixedPhrase[] = [
  {
    question: 'What is MudAi?',
    answer: `MudAi is a generic term for an application with multiple functions, including a metaverse, a messaging application, social media, and a bot that utilizes artificial intelligence. Users can access MudAi from any of three devices: PC, mobile, and XR devices (VR and MR).
    The MudAi metaverse is a gathering place for many users, so complete your Ai personalization and dive into the MudAi metaverse.`,
  },
  {
    question: 'How does Ai work?',
    answer: `Ai is a personalized Ai, which means that the more information you give it, the more it grows from a generic Ai to your own personalized Ai.
    Users can use their personalized Ai in a variety of situations. In addition to being a chat Ai, the MudAi metaverse allows you to control an avatar to perform economic activities on your behalf while minimizing your disposable time consumption. Another possibility is to set up an Ai as an always-on bot in the MudAi messaging application, where it handles messages from an unspecified number of people.
    This is made possible by adding MudAi's own tuning to the GPT-3.5 and language processing model provided by OpenAI.`,
  },
  {
    question: 'How can I earn money?',
    answer: `By placing a personalized Ai in the metaverse with any degree of accuracy, you can have MudAiToken perform economic activities in the metaverse on your behalf. You can also earn rewards through DataStaking.
    For more information, please visit www.mudai.city`,
  },
];

export default FixedPhrase;
