import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { Path } from "react-native-svg";
import styles from "./style";

const { width, height } = Dimensions.get("window");

export default function ScrollViewAnimation() {
  const scrollY = useSharedValue(0);

  const [contentHeight, setContentHeight] = useState(1);
  const [layoutHeight, setLayoutHeight] = useState(1);

  const amplitude = 160;
  const frequency = 3 / 100;
  const virtualPathHeight = height * 1;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const generateSinePath = (
    amplitude = 160,
    frequency = 3 / 100,
    totalHeight = virtualPathHeight
  ) => {
    let path = `M ${width / 2} 0`;
    for (let y = 0; y <= totalHeight; y += 1) {
      const x = width / 2 + amplitude * Math.sin((y) * frequency);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const sinePath = generateSinePath(amplitude, frequency, virtualPathHeight);

  const animatedIconStyle = useAnimatedStyle(() => {
    const maxScroll = contentHeight - layoutHeight;
    const scrollPercent = maxScroll > 0 ? scrollY.value / maxScroll : 0;
    const normalizedY = scrollPercent * virtualPathHeight;

    const x = width / 2 + amplitude * Math.sin(normalizedY * frequency);

    // estimate tangent angle using finite difference
    const dy = 1;
    const dx =
      amplitude *
      (frequency) *
      Math.cos(normalizedY * frequency);

    const angle = Math.atan2(dy, dx);

    return {
      position: "absolute",
      top: 0,
      left: 0,
      transform: [
        { translateX: x - 12 },
        { translateY: normalizedY - 12 },
        { rotate: `${angle}rad` }, // rotate in radians
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* sine wave path */}
      <Svg
        height={virtualPathHeight}
        width={width}
        style={[StyleSheet.absoluteFill, { marginTop: 30 }]}
      >
        <Path d={sinePath} stroke="#aaa" strokeWidth={2} fill="none" />
      </Svg>

      {/* scroll content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 1000 }}
        onContentSizeChange={(w, h) => setContentHeight(h)}
        onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <View
            key={index}
            style={{
              height: 150,
              backgroundColor: "transparent",
              borderRadius: 12,
              margin: 16,
            }}
          />
        ))}
      </Animated.ScrollView>

      {/* plane icon following sine path */}
      <Animated.View
        pointerEvents="none"
        style={[animatedIconStyle, { paddingTop: 30, zIndex: 10 }]}
      >
        <Ionicons name="paper-plane" size={32} color="tomato" />
      </Animated.View>
    </SafeAreaView>
  );
}
