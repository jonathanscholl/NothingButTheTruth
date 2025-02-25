import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, Easing } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface LandingPageProps {
  intro_sentences: string[];
  icon: string[];
  title: string[];
}

function LandingPage({ intro_sentences, icon, title }: LandingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateCard();
  }, [currentIndex]);

  const animateCard = () => {
    slideAnim.setValue(width);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.9);
    rotateAnim.setValue(0);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextSlide = () => {
    if (currentIndex >= intro_sentences.length - 1) {
      router.push('/game_modes');
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderBulletPoints = () => {
    return (
      <View style={styles.bulletPointContainer}>
        {intro_sentences.map((_, index) => (
          <View
            key={index}
            style={[
              styles.bulletPoint,
              index === currentIndex ? styles.activeBulletPoint : {}
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#007991', '#78ffd6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Animated.View 
              style={[
                styles.challengeContainer,
                {
                  transform: [
                    { translateX: slideAnim },
                    { scale: scaleAnim },
                    { rotate: spin }
                  ],
                  opacity: fadeAnim,
                }
              ]}
            >

{currentIndex === 0 && (
  <LottieView
    source={require('@/assets/animations/confetti.json')}
    autoPlay
    loop
    style={styles.lottieBackground}
  />
)}

              <View style={styles.cardContent}>
                <Ionicons name={icon[currentIndex] as any} size={80} color="#78ffd6" style={styles.icon} />
                <Text style={styles.title}>{title[currentIndex]}</Text>
                <View style={styles.divider} />
                <Text style={styles.challengeText}>
                  {intro_sentences[currentIndex]}
                </Text>
              </View>
            </Animated.View>

            <TouchableOpacity 
              style={styles.button}
              onPress={nextSlide}
            >
              <Text style={styles.buttonText}>
                {currentIndex === intro_sentences.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>

            {renderBulletPoints()}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeContainer: {
    padding: 30,
    borderRadius: 25,
    width: '100%',
    minHeight: 500,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    width: '100%',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#78ffd6',
    width: '100%',
    marginBottom: 20,
    opacity: 0.8,
  },
  challengeText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 10,
  },
  packInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packInfo: {
    color: '#eb7d34',
    fontSize: 16,
  },
  packCount: {
    color: '#666',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  arrowIcon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  activeBulletPoint: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default LandingPage;
