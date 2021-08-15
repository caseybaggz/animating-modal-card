import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';

interface Props {
  onPress: () => void;
}

export default function CloseButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>x</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    display: 'flex',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
});
