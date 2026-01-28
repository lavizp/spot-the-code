import { useGameStore } from "@/store"

const MOCK_LOCATIONS = [
  { lat: 48.8566, lng: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
  { lat: 40.7128, lng: -74.0060, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' }, 
  { lat: 35.6762, lng: 139.6503, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' },
  { lat: 51.5074, lng: -0.1278, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad' }, 
  { lat: -33.8688, lng: 151.2093, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9' },
];

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}
const getRandomLocationAndImage = (): Promise<{location: number[], image: string}> => {
  const randomImage = ''
  const location = [1,2]
  return Promise.resolve({image: randomImage, location})
}
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function calculateScore(distance: number): number {
    return Math.max(0, Math.round(5000 * Math.exp(-distance / 2000)));
}

export const gameActions = {
  startGame: () => {
    const randomIndex = Math.floor(Math.random() * MOCK_LOCATIONS.length);
    const loc = MOCK_LOCATIONS[randomIndex];
    useGameStore.getState().setStartGame([loc.lat, loc.lng], loc.image);
  },

  submitGuess: (point: number[]) => {
    const { target } = useGameStore.getState();
    if(!target || target.length < 2) return;
    
    const distance = calculateDistance(target[0], target[1], point[0], point[1]);
    const roundScore = calculateScore(distance);

    useGameStore.getState().setGuessResult(point, distance, roundScore);
  },

  nextRound: () => {
    const { currentRound, totalRounds } = useGameStore.getState();
    if (currentRound >= totalRounds) {
        useGameStore.getState().setGameOver();
    } else {
        const randomIndex = Math.floor(Math.random() * MOCK_LOCATIONS.length);
        const loc = MOCK_LOCATIONS[randomIndex];
        useGameStore.getState().setNextRound([loc.lat, loc.lng], loc.image);
    }
  },

  resetGame: () => {
    gameActions.startGame();
  }
}