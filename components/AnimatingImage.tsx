import React, { useRef, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import { CardImg } from '../types/data';

interface Props {
  heightAnimation?: any;
  src: CardImg;
}

export default function AnimatingImage(props: Props) {
  const borderAnim = useRef(new Animated.Value(16)).current;
  const animatedStyle = {
    borderRadius: borderAnim,
    height: props.heightAnimation,
  };

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: 0,
      delay: 200,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Image
        source={props.src}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 100,
    height: 500,
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-end',
  }
});
