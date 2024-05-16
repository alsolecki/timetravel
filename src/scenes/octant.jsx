import React, { useState, useEffect } from 'react'

const Octant = ({ position, color, rotation, position2 }) => {

    const [hovered, hover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'help' : 'auto'
    }, [hovered])

    return (
        <>

            <mesh
                position={position}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                rotation={[0, rotation, 0]}
            >
                <boxGeometry args={[4, 84, 144]} />
                <meshPhongMaterial
                    color={color}
                    shininess={100}
                    emissive={0xffffff}
                    emissiveIntensity={hovered ? 0.1 : 0.05}
                />
            </mesh>

            <mesh
                position={position2}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                rotation={[0, rotation, 0]}
            >
                <boxGeometry args={[4, 72, 108]} />
                <meshPhongMaterial
                    color={color}
                    shininess={100}
                    emissive={0xffffff}
                    emissiveIntensity={hovered ? 0.1 : 0.05}
                />
            </mesh>
        </>
    )
}

export default Octant