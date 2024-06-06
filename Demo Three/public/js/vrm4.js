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

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
camera.position.z = 5;

const backgrounds = new THREE.TextureLoader();
backgrounds.load('image/backgrounds.png', function (texture) {
    scene.background = texture;
});

const loader = new GLTFLoader();
loader.load('three-vrm-girl.vrm', function (gltf) {
    const vrmModel = gltf.scene;
    vrmModel.rotation.y = Math.PI;
    vrmModel.scale.set(5, 5, 5);
    vrmModel.position.y = -6;
    vrmModel.rotation.x = Math.PI / 30;

    scene.add(vrmModel);

    const mixer = new THREE.AnimationMixer(vrmModel);

    // 查找左手臂和右手臂骨骼
    const rightArmBone = vrmModel.getObjectByName('J_Bip_R_UpperArm');
    const leftArmBone = vrmModel.getObjectByName('J_Bip_L_UpperArm');
    if (!rightArmBone || !leftArmBone) {
        console.error('Arm bones not found.');
        return;
    }

    rightArmBone.rotation.set(-1.6, 1.15, 0.1); // 根据需要调整
    leftArmBone.rotation.set(-1.6, -1.15, -0.1); // 根据需要调整

    // const waveKeyframeTrack = new THREE.QuaternionKeyframeTrack(
    //     rightArmBone.name + '.quaternion',
    //     [0, 1, 2],
    //     [
    //         0, 0, 0, 1,
    //         0, 0.707, 0, 0.707,
    //         0, 0, 0, 1
    //     ]
    // );

    // const waveClip = new THREE.AnimationClip('wave', 2, [waveKeyframeTrack]);

    // const action = mixer.clipAction(waveClip);
    // action.setLoop(THREE.LoopPingPong);
    // action.play();

    let lastTime = 0;
    function animate(time) {
        requestAnimationFrame(animate);
        const delta = (time - lastTime) / 1000;
        mixer.update(delta);
        renderer.render(scene, camera);
        controls.update();
        lastTime = time;
    }

    animate(0);
}, undefined, function (error) {
    console.error('Failed to load VRM model:', error);
});