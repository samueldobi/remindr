import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface CustomSplashScreenProps {
  loading: boolean;
  onFinish: () => void;
}

export default function CustomSplashScreen({ loading, onFinish }: CustomSplashScreenProps) {
  const opacity = useRef(new Animated.Value(1)).current;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!loading && !hasAnimated.current) {
      hasAnimated.current = true;
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(onFinish);
    }
  }, [loading, opacity, onFinish]);

  return (
    <Animated.Image
      source={require('../assets/images/remindr_flashscreen.png')}
      style={[styles.image, { opacity }]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
