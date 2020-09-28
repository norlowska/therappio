import React from "react";
import { View, Form, Text, Item, Textarea, Button } from "native-base";
import styles from "../../theme/styles";

const DiaryModal = () => {
  return (
    <View>
      <Text style={[styles.title, { marginBottom: 20, fontSize: 22 }]}>
        {`What's on your mind?`}
      </Text>
      <Form>
        <Item>
          <Textarea
            bordered
            rowSpan={8}
            style={{ width: "100%", borderRadius: 4, paddingVertical: 10 }}
          />
        </Item>
      </Form>
      <Button
        style={{
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

export default DiaryModal;
