import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'


const Capsule = () => {

    const capRef = useRef()

    const clockRef = useRef(new THREE.Clock()) // create a reference to the clock

    const [hovered, hover] = useState(false)

    const [capTexture] = useTexture(['/2k_earth_daymap.jpg'])

    const updateCapPosition = useCallback(() => {
        //Rotational Animation for Center Cap
        const angle = clockRef.current.getElapsedTime() * 0.3
        const distance = 15
        const x = Math.sin(angle) * distance
        const z = Math.cos(angle) * distance
        capRef.current.position.set(x, 0, z)
        capRef.current.rotation.y += 0.002
        capRef.current.rotation.x += clockRef.current.getDelta() * 0.75
    }, [])

    const toggleFollowingCapsule = () => {
        setFollowingCapsule((prevFollowingCapsule) => !prevFollowingCapsule)
    }


    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    useFrame(() => {
        updateCapPosition()
    })


    return (
        <mesh
            ref={capRef}
            scale={0.5}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
        >
            <capsuleGeometry args={[1, 2.5, 8, 16]} />
            <meshPhongMaterial
                map={capTexture}
                // color={'hsl(200, 50%, 50%)'}
                shininess={1000}
                emissive={0xffffff}
                emissiveIntensity={hovered ? 0.1 : 0.05} />
        </mesh>
    )
}

export default Capsule