
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

interface PhysicsHeroProps {
  className?: string;
}

const PhysicsHero: React.FC<PhysicsHeroProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let rapierWorld: RAPIER.World;
    let physicsObjects: { mesh: THREE.Mesh; body: RAPIER.RigidBody }[] = [];
    let animationFrameId: number;
    
    const windForce = new THREE.Vector3(0, 0, 0);
    const mouse = new THREE.Vector2(0, 0);
    
    async function initPhysics() {
      // Initialize RAPIER
      await RAPIER.init();
      
      const gravity = { x: 0.0, y: -9.81, z: 0.0 };
      rapierWorld = new RAPIER.World(gravity);
      
      // Initialize Three.js scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); // Black background to match the site theme
      
      // Setup camera
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);
      
      // Setup renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      scene.add(directionalLight);
      
      // Create ground
      createGround();
      
      // Create dynamic objects
      createBoxes(15);
      
      // Add event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Start animation loop
      animate();
    }
    
    function createGround() {
      // Three.js visual ground
      const groundGeo = new THREE.PlaneGeometry(50, 50);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.receiveShadow = true;
      groundMesh.position.y = -5; // Lower the ground a bit
      scene.add(groundMesh);
      
      // Rapier physics ground
      const groundColliderDesc = RAPIER.ColliderDesc.cuboid(25.0, 0.1, 25.0);
      const collider = rapierWorld.createCollider(groundColliderDesc);
      collider.setTranslation({ x: 0, y: -5, z: 0 }); // Match ground position
    }
    
    function createBoxes(count: number) {
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      
      for (let i = 0; i < count; i++) {
        // Gold-themed colors for the portfolio
        const boxMaterial = new THREE.MeshStandardMaterial({
          color: i % 3 === 0 ? 0xF5D145 : 0x333333,
          metalness: 0.7,
          roughness: 0.3
        });
        
        // Three.js Mesh
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Random initial position
        const px = (Math.random() - 0.5) * 15;
        const py = Math.random() * 10 + 5;
        const pz = (Math.random() - 0.5) * 15;
        
        mesh.position.set(px, py, pz);
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        scene.add(mesh);
        
        // Rapier Rigid Body
        const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(px, py, pz)
          .setRotation({
            x: mesh.quaternion.x,
            y: mesh.quaternion.y,
            z: mesh.quaternion.z,
            w: mesh.quaternion.w
          });
        
        const rigidBody = rapierWorld.createRigidBody(rigidBodyDesc);
        
        // Rapier Collider
        const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
          .setRestitution(0.6)
          .setFriction(0.7);
        
        rapierWorld.createCollider(colliderDesc, rigidBody);
        
        // Store the pair
        physicsObjects.push({
          mesh,
          body: rigidBody
        });
      }
    }
    
    function handleResize() {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    
    function handleMouseMove(event: MouseEvent) {
      // Calculate normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update wind force based on mouse
      const windStrength = 12.0;
      windForce.set(mouse.x * windStrength, 0, -mouse.y * windStrength);
    }
    
    function animate() {
      // Apply forces
      physicsObjects.forEach(obj => {
        if (obj.body.isDynamic()) {
          obj.body.resetForces(true);
          obj.body.addForce(windForce, true);
          obj.body.setLinearDamping(0.5);
          obj.body.setAngularDamping(0.5);
        }
      });
      
      // Step physics world
      rapierWorld.step();
      
      // Update Three.js meshes
      physicsObjects.forEach(obj => {
        if (obj.body) {
          const position = obj.body.translation();
          const rotation = obj.body.rotation();
          
          obj.mesh.position.set(position.x, position.y, position.z);
          obj.mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        }
      });
      
      // Render scene
      renderer.render(scene, camera);
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize
    initPhysics();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      physicsObjects = [];
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className || ''}`}
    />
  );
};

export default PhysicsHero;
