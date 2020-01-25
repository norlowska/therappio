import React from "react";
import { CheckBox, ListItem, Text, Button, Content, View } from "native-base";
import styles from "../../theme/styles";

const HighlySensitivePersonTest = () => {
  const questions = [
    "I am easily overwhelmed by strong sensory input.",
    "I seem to be aware of subtleties in my environment.",
    "Other people's moods affect me.",
    "I tend to be very sensitive to pain.",
    "I find myself needing to withdraw during busy days, into bed or into a darkened room or any place where I can have some privacy and relief from stimulation.",
    "I am particularly sensitive to the effects of caffeine.",
    "I am easily overwhelmed by things like bright lights, strong smells, coarse fabrics, or sirens close by.",
    "I have a rich, complex inner life.",
    "I am made uncomfortable by loud noises.",
    "I am deeply moved by the arts or music.",
    "My nervous system sometimes feel so frazzled that I just have to get off by myself.",
    "I am conscientious.",
    "I startle easily.",
    "I get rattled when I have a lot to do in a short amount of time.",
    "When people are uncomfortable in a physical environment I tend to know what needs to be done to make it more comfortable (like changing the lighting or the seating).",
    "I am annoyed when people try to get me to do too many things at once.",
    "I try hard to avoid making mistakes or forgetting things.",
    "I make a point to avoid violent movies and TV shows.",
    "I become unpleasantly aroused when a lot is going on around me.",
    "Being very hungry creates a strong reaction in me,disrupting my concentration or mood.",
    "Changes in my life shake me up.",
    "I notice and enjoy delicate or fine scents, tastes, sounds, works of art.",
    "I find it unpleasant to have a lot going on at once.",
    "I make it a high priority to arrange my life to avoid upsetting or overwhelming situations.",
    "I am bothered by intense stimuli, like loud noises or chaotic scenes.",
    "When I must compete or be observed while performing a task, I become so nervous or shaky that I do much worse than I would otherwise.",
    "When I was a child, my parents or teachers seemed to see me as sensitive or shy."
  ];

  return (
    <>
      <View>
        <Text style={styles.primaryTitle}>Are You Highly Sensitive?</Text>
        <Text style={[styles.paragraph, { marginBottom: 10 }]}>
          Answer each question according to the way you personally feel. Check
          the box if it is at least somewhat true for you; leave unchecked if it
          is not very true or not at all true for you.
        </Text>
      </View>
      <Content>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <CheckBox checked={index == 2 ? true : false} />
            <Text style={{ marginLeft: 10 }}>{question}</Text>
          </ListItem>
        ))}
        <Button
          style={{
            marginTop: 30,
            marginBottom: 5,
            alignSelf: "flex-end",
            paddingHorizontal: 20
          }}
        >
          <Text>Save</Text>
        </Button>
      </Content>
    </>
  );
};

export default HighlySensitivePersonTest;
