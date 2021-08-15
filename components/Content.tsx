import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Copy() {
  return (
    <Text style={styles.text}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quasi ab
      repellat! Explicabo, esse facilis nemo dolorem distinctio vitae
      perferendis commodi voluptatibus, fugit minus enim iure recusandae itaque
      necessitatibus magni!
    </Text>
  );
}

export default function Content() {
  return (
    <View style={styles.wrapper}>
      <Copy />
      <Copy />
      <Copy />
      <Copy />
      <Copy />
      <Copy />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 24,
  },
  wrapper: {
    backgroundColor: 'white',
    padding: 24
  },
});
