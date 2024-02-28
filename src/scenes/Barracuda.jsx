import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useGLTF } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

const Barracuda = ({ }) => {

    const cudaRef = useRef()
    const memoizedCuda = useMemo(() => {
        return useGLTF('/BarracudaModel/Barracuda.gltf')
    })
    const clockRef = useRef(new THREE.Clock()) // create a reference to the clock

    const [hovered, hover] = useState(false)

    const updateCudaPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * 1.8
        const distance = 2
        cudaRef.current.position.y = Math.sin(angle) * distance
    })

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])


    useFrame(() => {

        updateCudaPosition()

    })


    return (
        <mesh
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            position={[0, 0, 0]}
        >
            <primitive
                ref={cudaRef}
                object={memoizedCuda.scene}
                position={[0, 0, -10]}
                scale={8} />
        </mesh>
    )
}

export default Barracuda