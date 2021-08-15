import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  style?: Record<string, string | number>;
}

export default function Headline({
  children,
  style,
}: PropsWithChildren<Props>) {
  return <Text style={{ ...styles.headline, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  headline: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
});
