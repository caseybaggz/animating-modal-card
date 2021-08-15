import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import AnimatingImage from './AnimatingImage';
import CloseButton from './CloseButton';
import Content from './Content';
import Headline from './Headline';
import { ModalPos } from '../types/data';
import { useCallback } from 'react';

const { height: winH, width: winW } = Dimensions.get('window');

interface Props extends ModalPos {
  yOffset: number;
  onClose: () => void;
}

export default function AnimatedModal(props: Props) {
  const { height, width, x, y, onClose, yOffset } = props;
  const headlineYAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(height)).current;
  const imageHeightAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(width)).current;
  const xLocAnim = useRef(new Animated.Value(x)).current;
  const yLocAnim = useRef(new Animated.Value(y)).current;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const finalYOffset = useMemo(() => {
    return yOffset < 0 ? 0 : yOffset;
  }, [yOffset]);

  const animatedStyle = {
    height: heightAnim,
    left: xLocAnim,
    top: yLocAnim,
    width: widthAnim,
  };

  const opacityAnimatedStyle = {
    opacity: opacityAnim
  };

  const headlineAnimatedStyle = {
    transform: [
      { translateY: headlineYAnim }
    ],
  };

  const handleClose = useCallback(() => {
    setScrollEnabled(false);

    Animated.spring(yLocAnim, {
      toValue: y,
      useNativeDriver: false,
    }).start(),
    Animated.spring(heightAnim, {
      toValue: height,
      useNativeDriver: false,
    }).start(),
    Animated.spring(imageHeightAnim, {
      toValue: height,
      useNativeDriver: false,
    }).start(),
    Animated.spring(headlineYAnim, {
      toValue: 38,
      useNativeDriver: true
    }).start(),
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start();
    Animated.parallel([
      Animated.spring(xLocAnim, {
        toValue: x,
        useNativeDriver: false,
      }),
      Animated.spring(widthAnim, {
        toValue: width,
        useNativeDriver: false,
      })
    ]).start(() => {
      onClose();
    });
  }, [height, onClose, width, x, y]);

  useEffect(() => {
    Animated.spring(yLocAnim, {
      toValue: finalYOffset,
      useNativeDriver: false,
    }).start(),
    Animated.spring(heightAnim, {
      toValue: winH,
      useNativeDriver: false,
    }).start(),
    Animated.spring(imageHeightAnim, {
      toValue: 500,
      useNativeDriver: false,
    }).start(),
    Animated.spring(headlineYAnim, {
      toValue: 30,
      useNativeDriver: true
    }).start(),
    Animated.parallel([
      Animated.spring(xLocAnim, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(widthAnim, {
        toValue: winW,
        useNativeDriver: false,
      })
    ]).start(),
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [finalYOffset]);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Animated.View style={[styles.closeWrapper, opacityAnimatedStyle]}>
        <CloseButton onPress={handleClose} />
      </Animated.View>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View>
          <AnimatingImage heightAnimation={imageHeightAnim} src={props.image} />
          <Animated.View style={[styles.headlineWrapper, headlineAnimatedStyle]}>
            <Headline style={styles.headline}>{props.headline}</Headline>
          </Animated.View>
        </View>
        <Animated.View style={opacityAnimatedStyle}>
          <Content />
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  closeWrapper: {
    position: 'absolute',
    right: 24,
    top: 64,
    zIndex: 100,
  },
  gestureWrapper: {
    flex: 1
  },
  headline: {
    color: 'white'
  },
  headlineWrapper: {
    bottom: 62,
    position: 'absolute',
    left: 24,
    zIndex: 100
  },
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: winH,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: winW,
    zIndex: 1000,
  },
});
