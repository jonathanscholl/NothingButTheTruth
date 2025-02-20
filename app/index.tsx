import { router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';

function AppLogo() {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoTextContainer}>
        <Text style={styles.preText}>Pre</Text>
        <Ionicons name="wine" size={45} color="white" style={styles.wineIcon} />
        <Text style={styles.rinksText}>Drinks</Text>
      </View>
      <Text style={styles.tagline}>Party Games & Challenges</Text>
    </View>
  );
}

export default function LandingScreen() {
  return (
    <LinearGradient
    colors={['#007991', '#78ffd6']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <AppLogo />
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => router.push('/game_modes')}
          >
            <Text style={styles.playButtonText}>Play</Text>
            <IconSymbol 
              name="chevron.right" 
              size={24} 
              color="white" 
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Please drink responsibly. Must be of legal drinking age.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    transform: [{ translateY: -100 }],
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preText: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wineIcon: {
    marginHorizontal: 10,
    transform: [
      { translateY: 2 },
    ],
  },
  rinksText: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playButton: {
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  disclaimer: {
    color: 'grey',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
    marginTop: 20,
  },
});