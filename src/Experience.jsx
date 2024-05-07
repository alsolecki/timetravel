import React, { useRef, useState, forwardRef } from 'react'
import { useHelper, CameraControls, Center, useGLTF, Grid, useCubeTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls, button, buttonGroup, folder } from 'leva'
import { suspend } from 'suspend-react'
import CameraPositionLogging from './helpers/CameraPositionLogging'

import * as THREE from 'three'

import Cylinder from './scenes/Cylinder'
import TorusKnot from './scenes/TorusKnot'
import Duckie from './scenes/Duckie'
import Barracuda from './scenes/Barracuda'
import Capsule from './scenes/Capsule'
import GlowingBall from './scenes/GlowingBall'
import Artifact from './scenes/Artifact'

const suzi = import(`@pmndrs/assets/models/suzi.glb`)
const george = import(`@pmndrs/assets/models/bunny.glb`)

const { DEG2RAD } = THREE.MathUtils

const Suzi = forwardRef((props, ref) => {
    const { nodes } = useGLTF(suspend(suzi).default)
    return (
        <>
            <mesh ref={ref} castShadow receiveShadow geometry={nodes.mesh.geometry} {...props}>
                <meshStandardMaterial color="#9d4b4b" />
            </mesh>
        </>
    )
})

const George = forwardRef((props, ref) => {
    const { nodes } = useGLTF(suspend(george).default)
    return (
        <>
            <mesh ref={ref} castShadow receiveShadow geometry={nodes.mesh.geometry} {...props}>
                <meshPhongMaterial shininess={100} specular={'rgb(255, 255, 255)'} color="hsl(240, 60%, 80%)" />
            </mesh>
        </>
    )
})


function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

// const envMap = useCubeTexture(['textures/px.png', 'textures/nx.png', 'textures/py.png', 'textures/ny.png', 'textures/pz.png', 'textures/nz.png'], { path: 'cube/' })

const Experience = () => {


    const directionalLightRef = useRef()
    const directionalLightRef2 = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'red')
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'green')

    const cameraControlsRef = useRef()
    const meshRef = useRef()
    const { camera } = useThree()

    //Leva Controls
    const { enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
        thetaGrp: buttonGroup({
            label: 'rotate theta',
            opts: {
                '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
                '-90º': () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
                '+180º': () => cameraControlsRef.current?.rotate(180 * DEG2RAD, 0, true)
            }
        }),
        phiGrp: buttonGroup({
            label: 'rotate phi',
            opts: {
                '+10º': () => cameraControlsRef.current?.rotate(0, 10 * DEG2RAD, true),
                '-20º': () => cameraControlsRef.current?.rotate(0, -20 * DEG2RAD, true)
            }
        }),
        truckGrp: buttonGroup({
            label: 'truck',
            opts: {
                'L1': () => cameraControlsRef.current?.truck(-1, 0, true),
                'R1': () => cameraControlsRef.current?.truck(1, 0, true)
            }
        }),
        dollyGrp: buttonGroup({
            label: 'dolly',
            opts: {
                '+1': () => cameraControlsRef.current?.dolly(1, true),
                '-1': () => cameraControlsRef.current?.dolly(-1, true)
            }
        }),
        zoomGrp: buttonGroup({
            label: 'zoom',
            opts: {
                '/2': () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
                '/-2': () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true)
            }
        }),
        elevGrp: buttonGroup({
            label: 'elevate',
            opts: {
                '+1': () => cameraControlsRef.current?.elevate(1, true),
                '-1': () => cameraControlsRef.current?.elevate(-1, true)
            }
        }),
        setLookAt: folder(
            {
                vec4: { value: [9, 15, 5], label: 'position' },
                vec5: { value: [0, 0, 0], label: 'target' },
                'setLookAt(…position, …target)': button((get) => cameraControlsRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
            },
            { collapsed: true }
        ),
        saveState: button(() => cameraControlsRef.current?.saveState()),
        reset: button(() => cameraControlsRef.current?.reset(true)),

        lookatCuda: button(() => cameraControlsRef.current?.setLookAt(8, 3, -9, 0, 0, -10, true)),
        lookatDuckie: button(() => cameraControlsRef.current?.setLookAt(5.6, 1.1, 11.5, 0, 1, 10, true)),
        lookatGeorgie: button(() => cameraControlsRef.current?.setLookAt(1.5, 11.5, 1.5, 0, 10, 0, true)),

        enabled: { value: true, label: 'controls on' }
    })

    return (
        <>

            <ambientLight intensity={0.3} />

            <directionalLight
                castShadow
                ref={directionalLightRef}
                position={[0, 20, 30]}
                intensity={2}
                color={'rgb(200, 0, 0)'}
            />

            <directionalLight
                castShadow
                ref={directionalLightRef2}
                position={[0, 20, -30]}
                intensity={1}
                color={'rgb(0, 200, 0)'}
            />

            <CameraPositionLogging event='mousedown' />
            {/* <CameraTargetLogging event='mousedown' /> */}

            {/* <Cylinder /> */}

            <GlowingBall color={'green'} position={[0, -5, 0]} />
            <GlowingBall color={'red'} position={[-5, -5, 0]} />
            <GlowingBall color={'yellow'} position={[5, -5, 0]} />

            {/* <Capsule /> */}

            {/* <TorusKnot /> */}

            <Duckie />

            <Barracuda />

            <CameraControls
                ref={cameraControlsRef}
                enabled={enabled}
                verticalDragToForward={verticalDragToForward}
                dollyToCursor={dollyToCursor}
                infinityDolly={infinityDolly}
                smoothTime={0.5}
            />

            <Center top>
                <Suzi ref={meshRef} rotation={[-0.63, 0, 0]} />
            </Center>

            <George position={[0, 10, 0]} />

            <Ground />

            {/* <Artifact
                path={'/ToyCar/ToyCar.gltf'}
                position={[0, 2, 5]}
                scale={40}
            />

            <Artifact
                path={'/WaterBottle/WaterBottle.gltf'}
                position={[0, 0, -5]}
                scale={10}
            />

            <Artifact
                path={'/SciFiHelmet/SciFiHelmet.gltf'}
                position={[0, 0, 12]}
                scale={0.75}
            />

            <Artifact
                path={'/oldSoccerJersey/oldSoccerJersey.gltf'}
                position={[0, 10, 5]}
                scale={2.5}
            />

            <Artifact
                path={'/StartrakOutfit/StartrakOutfit.gltf'}
                position={[0, 0, 20]}
                scale={2.5}
            />

            <Artifact
                path={'/baseballJersey/baseballJersey.gltf'}
                position={[0, 0, 15]}
                scale={2.5}
            />

            <Artifact
                path={'/hayesBust/hayesBust.gltf'}
                position={[-15, 0, 0]}
                scale={0.015}
            />

            <Artifact
                path={'/andrewJacksonStatue/andrewJacksonStatue.gltf'}
                position={[15, 0, 0]}
                scale={0.01}
            />
            <Artifact
                path={'/saxaphone/2019-10-1a-g_001-100k-2048.gltf'}
                position={[0, 5, 0]}
                scale={5}
            />
            <Artifact
                path={'/miaHammJersey/miaHammJersey.gltf'}
                position={[5, 8, 0]}
                scale={4}
            />
            <Artifact
                path={'/rebeccaLoboJersey/rebeccaLoboJersey.gltf'}
                position={[-5, 8, 0]}
                scale={[4, 4, 2]}
            />
            <Artifact
                path={'/cuatroInstrument/cuatroInstrument.gltf'}
                position={[-5, 12, 0]}
                scale={4}
            />
            <Artifact
                path={'/spaceCostume/spaceCostume.gltf'}
                position={[-5, 5, -5]}
                scale={4}
            />
            <Artifact
                path={'/flightSuit/flightSuit.gltf'}
                position={[-8, 5, -5]}
                scale={4}
            />
            <Artifact
                path={'/orchid1/orchid1.gltf'}
                position={[-11, 5, -5]}
                scale={0.35}
            />
            <Artifact
                path={'/elephantStatue/elephantStatue.gltf'}
                position={[7, 5, -3]}
                scale={10}
            />
            <Artifact
                path={'/1903WrightFlyer/1903WrightFlyer.gltf'}
                position={[0, 20, 0]}
                scale={1}
            />
            <Artifact
                path={'/airplaneBell1/airplaneBell1.gltf'}
                position={[0, 25, 0]}
                scale={0.0015}
            />
            <Artifact
                path={'/2024_03_14-FLPinesTest-v1/2024_03_14-FLPinesTest.gltf'}
                position={[0, -25, 0]}
                scale={0.5}
            /> */}

        </>
    )
}

export default Experience