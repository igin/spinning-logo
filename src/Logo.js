import * as THREE from 'three';
import './OrbitControls';

export class Logo {
  constructor(pathToFont) {
    this._fontPath = pathToFont;
    this._font = null;
  }

  renderIntoElement(element) {
    this._loadFont()
        .then(() => this._renderScene(element));
  }

  _renderScene(element) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,
        element.clientWidth / element.clientHeight,
        0.1, 1000);

    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    const textMesh = this._buildTextMesh();
    scene.add(textMesh);

    camera.position.z = 5;
    camera.position.y = 5;

    const directionalLight = new THREE.DirectionalLight('#F59F3D');
    directionalLight.position.set(-5, 0, 5).normalize();
    scene.add(directionalLight);

    const controls = new THREE.OrbitControls(camera);

    const animate = () => {
      requestAnimationFrame(animate);
      textMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();
  }

  _buildTextMesh() {
    const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    const textN = this._buildCharacterMesh('N', material);
    const textP = this._buildCharacterMesh('P', material);

    textN.position.z = -5;
    textP.position.z = -5;
    textP.position.x = 4;
    textP.rotation.y = Math.PI * 0.5;

    const group = new THREE.Object3D();
    group.add(textN);
    group.add(textP);

    this._centerGroup(group);

    return group;
  }

  _centerGroup(group) {
    const boundingBox = new THREE.Box3().setFromObject(group);
    const centerTranslation = new THREE.Vector3()
        .subVectors(boundingBox.max, boundingBox.min)
        .divideScalar(2)
        .add(boundingBox.min);

    group.children.forEach((child) => {
      child.position.sub(centerTranslation);
    });
  }

  _buildCharacterMesh(character, material) {
    const geometry = new THREE.TextGeometry(character, {
      font: this._font,
      size: 5,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.1,
      bevelSegments: 5
    });
    return new THREE.Mesh(geometry, material);
  }

  _loadFont() {
    return new Promise((resolve, reject) => {
      const loader = new THREE.FontLoader();
      const onLoad = (font) => {
        this._font = font;
        resolve();
      };
      const onError = (xhr) => reject(xhr);
      const onProgress = (xhr) => undefined;
      loader.load(
          this._fontPath,
          onLoad,
          onProgress,
          onError
      );
    });

  }
}