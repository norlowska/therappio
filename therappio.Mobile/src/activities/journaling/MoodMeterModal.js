import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Form, Text, Item, Input, Button } from "native-base";
import Options from "../../components/Options";
import styles from "../../theme/styles";

const SelectQuadrant = ({ selectQuadrant }) => {
  const firstQuadrantMoods = ["alert", "excited", "elated", "happy"];
  const secondQuadrantMoods = ["tense", "nervous", "stressed", "upset"];
  const thirdQuadrantMoods = ["sad", "depressed", "bored", "fatigued"];
  const forthQuadrantMoods = ["content", "serene", "relaxed", "calm"];

  return (
    <View style={styles.quadrantsContainer}>
      <TouchableOpacity
        style={[styles.quadrant, { backgroundColor: "#f44336" }]}
        onPress={() => selectQuadrant(firstQuadrantMoods, "#f44336")}
      >
        <View>
          <Text style={styles.quadrantName}>High Energy</Text>
          <Text style={styles.quadrantName}>Unpleasant</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.quadrant, { backgroundColor: "#ffeb3b" }]}
        onPress={() => selectQuadrant(secondQuadrantMoods, "#ffeb3b")}
      >
        <View>
          <Text style={[styles.quadrantName, { color: "#333" }]}>
            High Energy
          </Text>
          <Text style={[styles.quadrantName, { color: "#333" }]}>Pleasant</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.quadrant, { backgroundColor: "#42a5f5" }]}
        onPress={() => selectQuadrant(thirdQuadrantMoods, "#42a5f5")}
      >
        <View>
          <Text style={styles.quadrantName}>Low Energy</Text>
          <Text style={styles.quadrantName}>Unpleasant</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.quadrant, { backgroundColor: "#66bb6a" }]}
        onPress={() => selectQuadrant(forthQuadrantMoods, "#66bb6a")}
      >
        <View>
          <Text style={styles.quadrantName}>Low Energy</Text>
          <Text style={styles.quadrantName}>Pleasant</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DescribeMood = ({ moods, color }) => {
  return (
    <View>
      <Text style={[styles.title, { marginBottom: 15 }]}>I feel</Text>
      <View>
        <Options
          options={moods}
          color={color}
          onChange={() => console.log("coś działa")}
        />
      </View>
      <View>
        <Text style={[styles.title, { marginTop: 20, fontSize: 22 }]}>
          Comments
        </Text>
        <Form>
          <Item>
            <Input style={{ borderColor: color }} />
          </Item>
        </Form>
      </View>
      <Button
        style={{
          backgroundColor: color,
          marginTop: 30,
          alignSelf: "flex-end",
          paddingHorizontal: 20
        }}
      >
        <Text>Save</Text>
      </Button>
    </View>
  );
};

const MoodMeterModal = () => {
  {
    /* <SelectQuadrant /> */
  }
  return (
    <DescribeMood
      moods={["alert", "excited", "elated", "happy"]}
      color="#f44336"
    />
  );
};
export default MoodMeterModal;
