import * as THREE from 'three';
import {
  OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import {
  MTLLoader
} from 'three/examples/jsm/loaders/MTLLoader.js';
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

const MAXSIZE = 50;
let scene;
let camera;
let canvas;
let renderer;
let mainOBJ;

function addLight() {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 100, 0);
  light.target.position.set(0, -100, 0);
  scene.add(light);
  scene.add(light.target);
}

function addCamera() {
  const fov = 45;
  const aspect = 2;
  const near = 0.01;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 100, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0))
}

function addControls() {
  const controls = new OrbitControls(camera, canvas);
  controls.update();
}

function addAxes() {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
}

function animation() {
  if (mainOBJ) {
    mainOBJ.rotateX(Math.PI / 180);
    mainOBJ.rotateY(Math.PI / 180);
    mainOBJ.rotateZ(Math.PI / 180);
  }
}

function caculateScale(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const x = box.max.x - box.min.x;
  const y = box.max.y - box.min.y;
  const z = box.max.z - box.min.z;
  const longest = Math.max(x, y, z);
  return MAXSIZE / longest;
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  animation();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function main() {
  canvas = document.querySelector('#main');
  renderer = new THREE.WebGLRenderer({ canvas });
  scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  addCamera()
  addLight()
  // addControls();
  // addAxes()

  const objLoader = new OBJLoader();
  objLoader.load('kleo.obj', (obj) => {
    mainOBJ = obj;
    obj.scale.x = obj.scale.y = obj.scale.z = caculateScale(obj);
    scene.add(obj);
  });

  requestAnimationFrame(render);
}

main();
