import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useGLTF } from "@react-three/drei"


const Artifact = ({ path, position, scale }) => {

    const artifactRef = useRef()
    const memoizedArtifact = useMemo(() => {
        return useGLTF(path)
    })

    const [hovered, hover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (
        <mesh
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={() => console.log('Duckie Clicked')}
            position={position}
        >
            <primitive
                ref={artifactRef}
                object={memoizedArtifact.scene}
                scale={scale} />
        </mesh>
    )
}

export default Artifact