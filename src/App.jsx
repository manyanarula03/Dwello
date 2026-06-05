import { useGameStore } from './store/gameStore';
import { MainMenu } from './screens/MainMenu';
import { HouseSelection } from './screens/HouseSelection';
import { ThemeSelection } from './screens/ThemeSelection';
import { RoomEditor } from './screens/RoomEditor';
import { FinalSummary } from './screens/FinalSummary';

function App() {
  const screen = useGameStore(s => s.screen);

  switch (screen) {
    case 'menu':
      return <MainMenu />;
    case 'houseSelect':
      return <HouseSelection />;
    case 'themeSelect':
      return <ThemeSelection />;
    case 'editor':
      return <RoomEditor />;
    case 'summary':
      return <FinalSummary />;
    default:
      return <MainMenu />;
  }
}

export default App;
