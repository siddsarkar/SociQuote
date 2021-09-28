/**
 * @source https://lloyds-digital.com/blog/lets-create-a-carousel-in-react-native
 * @modified
 */

import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Clipboard,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Slide = memo(function Slide({data}) {
  const copyToClipboard = () => {
    Clipboard.setString(data.fields.content + '  — ' + data.fields.author);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  return (
    <View style={s.slide}>
      <Text style={s.quoteSymbol}>〃</Text>
      <Text onLongPress={copyToClipboard} style={s.slideText}>
        {data.fields.content}
      </Text>
      <Text onLongPress={copyToClipboard} style={s.slideTextAuthor}>
        — {data.fields.author}
      </Text>
    </View>
  );
});

const Caraousel = ({slideList = []}) => {
  const [index, setIndex] = useState(0);
  let flatListRef = useRef(null);

  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    flatListRef.current.scrollToIndex({index: 0, animated: false});
  }, [slideList]);

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(newIndex);

    const distance = Math.abs(roundIndex - newIndex);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, idx) => ({
        index: idx,
        length: windowWidth,
        offset: idx * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item}) {
    return <Slide data={item} />;
  }, []);

  return (
    <View>
      <FlatList
        ref={ref => {
          flatListRef.current = ref;
        }}
        data={slideList}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <View style={s.pagination} pointerEvents="none">
        {slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                s.paginationDot,
                index === i ? s.paginationDotActive : s.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Caraousel;

const s = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  slideText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
    padding: 8,
    textAlign: 'center',
  },
  slideTextAuthor: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
    padding: 6,
    textAlign: 'center',
  },
  quoteSymbol: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 18,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 999,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {backgroundColor: 'white'},
  paginationDotInactive: {backgroundColor: 'gray'},
});
