import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three'


const Duckie = ({ }) => {

    const duckieRef = useRef()
    const memoizedDuckie = useMemo(() => {
        return useGLTF('/DuckieModel/Duckie.gltf')
    })

    const clockRef = useRef(new THREE.Clock()) // create a reference to the clock

    const [hovered, hover] = useState(false)

    const updateDuckiePosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * 0.8
        const distance = 1.5
        duckieRef.current.position.y = Math.sin(angle) * distance
    })

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    useFrame(() => {
        updateDuckiePosition()
    })

    return (
        <mesh
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={() => console.log('Duckie Clicked')}
        >
            <primitive
                ref={duckieRef}
                object={memoizedDuckie.scene}
                position={[0, 0, 10]}
                scale={1.5} />
        </mesh>
    )
}

export default Duckie