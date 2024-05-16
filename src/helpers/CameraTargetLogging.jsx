import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import * as THREE from 'three'

function CameraTargetLogging({ event }) {
    const { camera } = useThree()
    const cameraRef = useRef()

    const getVector = () => {
        const vector = new THREE.Vector3(0, 0, - 1)
        vector.applyQuaternion(camera.quaternion).add( camera.position );
        // console.log(vector)
        return vector
    }


    useEffect(() => {
        const logCameraTarget = () => {
            
            const { x, y, z } = getVector()
            const roundX = Math.round(x * 100) / 100
            const roundY = Math.round(y * 100) / 100
            const roundZ = Math.round(z * 100) / 100
            console.log(`Camera target: ${roundX}, ${roundY}, ${roundZ}`)
        }

        cameraRef.current = camera
        window.addEventListener(event, logCameraTarget)

        return () => {
            window.removeEventListener(event, logCameraTarget)
        }
    }, [])

    return null
}

export default CameraTargetLogging