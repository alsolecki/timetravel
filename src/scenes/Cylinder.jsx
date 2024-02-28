import React, { useRef, useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


const Cylinder = () => {

    const cylinderRef = useRef()

    const [hovered, hover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const [
        cylinderTexture,
        cylinderAlphaMap,
        cylinderNormalMap,
        cylinderDisplacementMap,
        cylinderBumpMap,
        cylinderSpecularMap,
    ] = useTexture([
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_COL_2K.png',
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_AO_2K.png',
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_NRM_2K.png',
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_DISP_2K.png',
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_BUMP_2K.png',
        '/TilesMosaicPennyround001/TilesMosaicPennyround001_GLOSS_2K.png'
    ])


    useFrame((state, delta) => {
        cylinderRef.current.rotation.y += 0.002
        cylinderRef.current.rotation.x += delta * 0.75
    })

    return (
        <mesh
            ref={cylinderRef}
            position={[10, 0, 0]}
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={() => console.log('cylinder clicked')}
        >
            <cylinderGeometry args={[2, 2, 3, 32]} />
            <meshPhongMaterial
                // color={'hsl(100, 10%, 50%)'}
                map={cylinderTexture}
                alphaMap={cylinderAlphaMap}
                normalMap={cylinderNormalMap}
                bumpMap={cylinderBumpMap}
                specularMap={cylinderSpecularMap}
                shininess={50}
            />
        </mesh>
    )
}

export default Cylinder