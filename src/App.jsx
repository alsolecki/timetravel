import { Canvas } from "@react-three/fiber"

import Experience from "./Experience"

function App() {

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 65, near: 0.1, far: 1000, position: [10, 15, 10] }}>
        <color attach='background' args={['rgb(40, 40, 40)']} />
        <Experience />
      </Canvas>

    </>
  )
}

export default App
