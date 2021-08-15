import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import Headline from './Headline';
import { CardId, CardDataResults, ModalPos } from '../types/data';

import cards from '../data/cards.json';
import { useEffect } from 'react';

// Phone width may vary so we have to calculate it
const { width: winW } = Dimensions.get('window');
const cardW = winW - 48;

const DEFAULT_LAYOUT = {
  height: 400,
  width: cardW,
  x: 0,
  y: 0
};

interface Props {
  cardId: CardId;
  onShowModal: (modal: ModalPos) => void;
  showModal: ModalPos | null;
}

export default function AnimatedCard(props: Props) {
  const { cardId, showModal } = props;
  const layoutRef = useRef<LayoutRectangle>(DEFAULT_LAYOUT);
  const opacityRef = useRef(new Animated.Value(1)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  const isOpen = useMemo(() => {
    if (!showModal) {
      return false;
    }

    if (showModal.id === cardId) {
      return true;
    }

    return false;
  }, [cardId, showModal]);

  const cardItem = useMemo(() => {
    const results: CardDataResults = cards.results;
    return results[cardId];
  }, [cardId]);

  const animatedStyles = {
    transform: [{ scale: pressAnim }]
  };

  const wrapperStyles = {
    ...styles.wrapper,
    visibility: isOpen ? 'hidden' : 'visible'
  };


  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    layoutRef.current = event.nativeEvent.layout;
  }, []);

  function handlePressIn() {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  function handlePress() {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    props.onShowModal({
      ...cardItem,
      ...layoutRef.current
    });
  }

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPress={handlePress} onLayout={handleLayout}>
      <Animated.View style={[wrapperStyles, animatedStyles]}>
        <View style={styles.imageContainer}>
          <Image
            source={cardItem.image}
            style={styles.image}
          />
        </View>
        <View style={styles.headlineWrapper}>
          <Headline style={styles.headline}>{cardItem.headline}</Headline>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headline: {
    color: 'white'
  },
  headlineWrapper: {
    bottom: 24,
    position: 'absolute',
    left: 24,
    zIndex: 100
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    alignItems: 'flex-start',
    flex: 1,
    height: 500,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: '#D1D1D6',
    borderRadius: 16,
    display: 'flex',
    height: 400,
    marginBottom: 32,
    overflow: 'hidden',
    width: '100%',
  },
});
