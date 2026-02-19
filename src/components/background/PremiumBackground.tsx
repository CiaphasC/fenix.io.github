import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Fondo de partículas con Three.js.
 * Se mantiene como componente autocontenido para aislar el ciclo de vida WebGL.
 */
export function PremiumBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const i3 = index * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 32;
    textureCanvas.height = 32;

    const context = textureCanvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(160, 136, 112, 1)');
      gradient.addColorStop(1, 'rgba(160, 136, 112, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }

    const texture = new THREE.CanvasTexture(textureCanvas);
    const material = new THREE.PointsMaterial({
      color: 0xa08870,
      size: 1.5,
      map: texture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(30, 40, 80);
    scene.add(keyLight);

    const polyhedronGroup = new THREE.Group();
    polyhedronGroup.position.set(26, -6, -12);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(14, 0);
    const icosahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0xa08870,
      roughness: 0.45,
      metalness: 0.15,
      flatShading: true,
      transparent: true,
      opacity: 0.42,
    });
    const icosahedronMesh = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    polyhedronGroup.add(icosahedronMesh);

    const wireframeGeometry = new THREE.EdgesGeometry(icosahedronGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x8f7560,
      transparent: true,
      opacity: 0.38,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    polyhedronGroup.add(wireframe);

    scene.add(polyhedronGroup);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const targetX = mouseX * 5;
      const targetY = mouseY * 5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const particlePositions = particles.geometry.attributes.position.array as Float32Array;

      for (let index = 0; index < particleCount; index += 1) {
        const i3 = index * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];

        const movementY = Math.sin(elapsedTime * 0.5 + x * 0.05) * 5;
        const movementX = Math.cos(elapsedTime * 0.3 + y * 0.05) * 2;

        particlePositions[i3] = originalPositions[i3] + movementX;
        particlePositions[i3 + 1] = originalPositions[i3 + 1] + movementY;

        const mouseWorldX = mouseX * 100;
        const mouseWorldY = mouseY * 50;

        const dx = mouseWorldX - particlePositions[i3];
        const dy = mouseWorldY - particlePositions[i3 + 1];
        const distance = Math.hypot(dx, dy);

        if (distance < 30) {
          const force = (30 - distance) / 30;
          const angle = Math.atan2(dy, dx);
          particlePositions[i3] -= Math.cos(angle) * force * 5;
          particlePositions[i3 + 1] -= Math.sin(angle) * force * 5;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.05;

      icosahedronMesh.rotation.x = elapsedTime * 0.22;
      icosahedronMesh.rotation.y = elapsedTime * 0.3;
      wireframe.rotation.x = icosahedronMesh.rotation.x;
      wireframe.rotation.y = icosahedronMesh.rotation.y;
      polyhedronGroup.position.y = -6 + Math.sin(elapsedTime * 0.7) * 2.2;
      polyhedronGroup.position.x = 26 + mouseX * 3.5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      texture.dispose();
      icosahedronGeometry.dispose();
      icosahedronMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
}
