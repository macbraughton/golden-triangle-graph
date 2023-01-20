import { useViewport } from './lib/stores/viewport'
import Svg from './lib/components/Svg'
import Rect from './lib/components/Rect';
function App() {
  const [viewPort] = useViewport()
  
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Svg viewBox={viewPort()}>
        <Rect />
      </Svg>
    </div>
  );
}

export default App;
