import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const ThreeGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      console.error('Mount ref not available');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    console.log('Renderer attached to DOM');

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    const gridSize = 4;
    const planeSize = 1.5;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const textureLoader = new THREE.TextureLoader();

    // रँडम डमी प्रतिमा URL (Lorem Picsum)
    const getRandomImageUrl = () => `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`;

    const planes = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        textureLoader.load(getRandomImageUrl(), (texture) => {
          const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
          const plane = new THREE.Mesh(planeGeometry, material);
          plane.position.set(
            (i - (gridSize - 1) / 2) * planeSize * 1.1,
            -(j - (gridSize - 1) / 2) * planeSize * 1.1,
            0
          );
          plane.userData = { originalY: plane.position.y, index };
          scene.add(plane);
          planes.push(plane);
          console.log(`Plane ${index} loaded with random image`);
        }, undefined, (error) => console.error(`Error loading image for plane ${index}:`, error));
      }
    }

    camera.position.z = 10;
    console.log('Camera positioned');

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planes);
      planes.forEach(plane => plane.onHover(false));
      if (intersects.length > 0) intersects[0].object.onHover(true);
    };

    window.addEventListener('mousemove', onMouseMove);

    // होवर इफेक्ट
    planes.forEach(plane => {
      plane.onHover = (hover) => {
        gsap.to(plane.scale, {
          x: hover ? 1.2 : 1,
          y: hover ? 1.2 : 1,
          z: hover ? 1.2 : 1,
          duration: 0.3
        });
        gsap.to(plane.position, {
          y: hover ? plane.userData.originalY + 0.2 : plane.userData.originalY,
          duration: 0.3
        });
      };
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // प्रतिमा बदलण्याचा फंक्शन (नंतर हस्तक्षेपासाठी)
    window.changeImage = (index, newUrl) => {
      textureLoader.load(newUrl, (texture) => {
        const plane = planes[index];
        if (plane) {
          plane.material.map = texture;
          plane.material.needsUpdate = true;
          console.log(`Image changed for plane ${index}`);
        }
      });
    };

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      delete window.changeImage;
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
};

export default ThreeGrid;