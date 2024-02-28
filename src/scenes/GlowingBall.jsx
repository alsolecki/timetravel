import React, { useState, useEffect } from 'react'

const GlowingBall = ({position, color}) => {

    const [hovered, hover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'help' : 'auto'
    }, [hovered])

    return (
        <mesh
            position={position}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
        >
            <sphereGeometry args={[1, 32, 16]} />
            <meshPhongMaterial
                color={color}
                shininess={100}
                emissive={0xffffff}
                emissiveIntensity={hovered ? 0.1 : 0.05}
            />
        </mesh>
    )
}

export default GlowingBall