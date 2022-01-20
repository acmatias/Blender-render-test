import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const texture = new THREE.TextureLoader().load('textures/maps/aurora.jpg')
/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })
const debugObject = {}
// gui.show(false)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment Map
 */
const house1 = cubeTextureLoader.load([
    '/textures/environmentMaps/6/px.png',
    '/textures/environmentMaps/6/nx.png',
    '/textures/environmentMaps/6/py.png',
    '/textures/environmentMaps/6/ny.png',
    '/textures/environmentMaps/6/pz.png',
    '/textures/environmentMaps/6/nz.png',
])
const house2 = cubeTextureLoader.load([
    '/textures/environmentMaps/5/px.png',
    '/textures/environmentMaps/5/nx.png',
    '/textures/environmentMaps/5/py.png',
    '/textures/environmentMaps/5/ny.png',
    '/textures/environmentMaps/5/pz.png',
    '/textures/environmentMaps/5/nz.png',
])
const house3 = cubeTextureLoader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png',
])
house1.encoding = THREE.sRGBEncoding
house2.encoding = THREE.sRGBEncoding
house3.encoding = THREE.sRGBEncoding
scene.background = house1

gui.add(scene, 'background', {
    house1,
    house2,
    house3,
})

/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 10)
// directionalLight.position.set(0.25, 3, -2.25)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.normalBias = 0.015
// scene.add(directionalLight)

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')
// gui.add(directionalLight.shadow, 'normalBias').min(0).max(0.1).step(0.0001)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, -4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.rotateSpeed = 0.5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.NoToneMapping
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFShadowMap

// gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
// gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping,
// })

/**
 * Animate
 */
const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
