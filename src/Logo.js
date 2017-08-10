import * as THREE from 'three';

export class Logo {
  renderIntoElement(element) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,
        element.clientWidth / element.clientHeight,
        0.1, 1000);

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();
  }
}