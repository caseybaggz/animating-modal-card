import React, { useCallback, useMemo, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import AnimatedCard from './components/AnimatedCard';
import AnimatedModal from './components/AnimatedModal';
import { CardId, ModalPos } from './types/data';

import cardsData from './data/cards.json';

export default function App() {
  const scrollY = useRef<number>(0);
  const [showModal, setShowModal] = useState<ModalPos | null>(null);

  const handleCloseModal = useCallback(() => {
    setShowModal(null);
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  }, []);

  const handleShowModal = useCallback((modal: ModalPos) => {
    setShowModal(modal);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.wrapper} onScroll={handleScroll} scrollEventThrottle={5}>
      <View style={styles.safeArea}>
        {
          cardsData.items.map((cardId: CardId) => (
            <AnimatedCard
              cardId={cardId}
              key={cardId}
              onShowModal={handleShowModal}
              showModal={showModal}
            />
          ))
        }
      </View>

      {showModal && (
        <AnimatedModal
          {...showModal}
          onClose={handleCloseModal}
          yOffset={scrollY.current}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingBottom: 48,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 64,
  },
  wrapper: {
    backgroundColor: '#fff',
  }
});
