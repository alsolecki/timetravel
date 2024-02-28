import React, { useRef, useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'



const TorusKnot = () => {

    const torusKnotRef = useRef()

    const [hovered, hover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime * 0.8
        const distance = 0.5
        torusKnotRef.current.rotation.y -= delta * 1.2
    })

    const [
        rustTexture,
        rustDisplacementMap,
        rustNormalMap,
        rustSpecularMap
    ] = useTexture([
        '/MetalCastRusted001/MetalCastRusted001_COL_2K.png',
        '/MetalCastRusted001/MetalCastRusted001_DISP_2K.png',
        '/MetalCastRusted001/MetalCastRusted001_NRM_2K.png',
        '/MetalCastRusted001/MetalCastRusted001_GLOSS_2K.png'
    ])

    return (
        <mesh
            ref={torusKnotRef}
            position={[-10, 0, 0]}
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={() => console.log('torusknot clicked')}
        >
            <torusKnotGeometry args={[1, 0.2, 128, 16, 4]} />
            <meshPhongMaterial
                // color={'hsl(300, 50%, 50%)'} 
                map={rustTexture}
                displacementMap={rustDisplacementMap}
                normalMap={rustNormalMap}
                specularMap={rustSpecularMap}
            />
        </mesh>
    )
}

export default TorusKnot