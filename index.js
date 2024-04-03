import {Mesh, MeshLambertMaterial, BoxGeometry, Scene, PerspectiveCamera, WebGLRenderer, GridHelper, AxesHelper, AmbientLight, DirectionalLight, CubeUVReflectionMapping, Raycaster, Vector2} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const size = {
    width: 800,
    height: 800
}
const scene = new Scene();

const camera = new PerspectiveCamera(75, size.width / size.height );
camera.position.set(5,5,5)


const threeCanvas = document.getElementById('three-canvas');

const renderer =  new WebGLRenderer({canvas: threeCanvas});
renderer.setSize(size.width,size.height);
renderer.setClearColor(0xffffff,1);


window.addEventListener('resize',() => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width,size.height);
})


const grid = new GridHelper(50,30);
scene.add(grid);

const axes = new AxesHelper();
axes.material.depthTest = false;
scene.add(axes);

const controls = new OrbitControls(camera, threeCanvas);
controls.enableDamping = true;
controls.target.set(0,0,0);

const lightColor = 0xffffff;
const ambientLight= new AmbientLight(lightColor,2);
scene.add(ambientLight);

const dirLight1 = new DirectionalLight(lightColor,1);
dirLight1.position.set(0,10,0);
dirLight1.target.position.set(-15,0,0);
scene.add(dirLight1);
scene.add(dirLight1.target);


const cubeGeometry = new BoxGeometry(1,1,1);
const cubematerial = new MeshLambertMaterial({
    color:  0xff0000
});

const cube = new Mesh(cubeGeometry, cubematerial);

scene.add(cube);

const gui = new dat.GUI();
gui.add(cube, 'visible').name('cube visibility');
gui.add(cube.position,'x',-3,3,0.5).name('cube position');

const raycaster = new Raycaster();
const mouse = new Vector2();

window.ondblclick = ( event ) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length > 0) {
        const intersect = intersects[0];
        intersect.object.material.color.r =0;
        intersect.object.material.color.g =1;
        intersect.object.material.color.b =0;
    }
 
}


function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    cube.rotation.y += Math.PI / 100;
}

animate();
