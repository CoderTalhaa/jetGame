import Game from "./components/Game/Game";
import Landing from "./components/Landing/Landing";
import LoadingScreen from "./components/LoadingScreen";
import useGameStore from "./store/gameStore";


function App() {

  const {status} = useGameStore()

  return (
   <div className="w-full h-full">
    {status !== "done" ? <Landing /> : <Game />}
    {/* <Game /> */}
    <LoadingScreen />
   </div>
  );
}

export default App;
