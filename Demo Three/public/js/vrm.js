import * as THREE from 'https://cdn.skypack.dev/three@0.130.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 啟用阻尼效果
controls.dampingFactor = 0.25; // 阻尼因子
controls.screenSpacePanning = false; // 禁用空間平移
controls.minDistance = 5; // 最小縮放距離
controls.maxDistance = 5; // 最大縮放距離
controls.maxPolarAngle = Math.PI / 2; // 最大垂直旋轉角度
controls.minPolarAngle = Math.PI / 2; // 最小垂直旋轉角度
controls.maxAzimuthAngle = 0; // 最大水平旋轉角度
controls.minAzimuthAngle = 0; // 最小水平旋轉角度
controls.update();

camera.position.z = 5;

const loader = new GLTFLoader();
loader.load('project.vrm', function(gltf) {
    const vrmModel = gltf.scene;
    vrmModel.rotation.y = Math.PI;
    vrmModel.scale.set(10, 10, 10);
    vrmModel.position.y = -8;
    vrmModel.rotation.x = Math.PI / 30;

    vrmModel.traverse((child) => {
        if (child.isMesh && child.name.includes('upperBody')) {
            scene.add(child);
        }
    });
    scene.add(vrmModel);

    const mixer = new THREE.AnimationMixer(vrmModel);

    console.log(gltf.animations);

    if (gltf.animations && gltf.animations.length > 0) {
        const blinkAction = mixer.clipAction(gltf.animations[0]);
        blinkAction.play();
    } else {
        console.warn('No animations found in the GLTF file.');
    }

    function animate() {
        requestAnimationFrame(animate);
        mixer.update(0.01);
        renderer.render(scene, camera);
        controls.update();
    }

    animate();
}, undefined, function(error) {
    console.error('Failed to load VRM model:', error);
});