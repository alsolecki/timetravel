import { Canvas } from "@react-three/fiber"

import Experience from "./Experience"

function App() {

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 65, near: 0.1, far: 2500, position: [100, 150, 100] }}>
        <color attach='background' args={['rgb(40, 40, 40)']} />
        <Experience />
      </Canvas>

    </>
  )
}

export default App
