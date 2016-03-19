var camera, scene, renderer; //Initialize vars to create world
    var effect, controls;
    var element, container;

    var clock = new THREE.Clock(); //Debug: Read up on this

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer(); //Use webGL
      element = renderer.domElement;
      container = document.getElementById('jqueryCanvas');
      container.appendChild(element);
    /*  
 // left wall
    geo = new THREE.PlaneGeometry(50,20);
    var wallleft = new THREE.Mesh(geo ,new THREE.MeshBasicMaterial({color : 0xcccc00}));
    wallleft.material.side = THREE.DoubleSide;
    wallleft.rotation.y = Math.PI/2;
    wallleft.position.x = -5;
    wallleft.position.z = 50;
    scene.add(wallleft);
    */
    
    
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            
var geometryLateral = new THREE.BoxGeometry(0.2, 75, 100);
var wall1 = new THREE.Mesh(geometryLateral, material);
scene.add(wall1);
wall1.position.x=-50;
var wall2 = new THREE.Mesh(geometryLateral, material);
scene.add(wall2);
wall2.position.x=50;



var wall3 = new THREE.Mesh(geometryLateral, material);
wall3.rotation.y = Math.PI / 2;
scene.add(wall3);
wall3.position.z=-50;



var wall4 = new THREE.Mesh(geometryLateral, material);
wall4.rotation.y = Math.PI / 2;
scene.add(wall4);
wall4.position.z=+50;

//CUBE
var geometry = new THREE.BoxGeometry( 4, 4, 4 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(25,25,25);
scene.add( cube );

//SPHERE


        
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(25,5,25);
scene.add( sphere );
        
            
            
            

effect = new THREE.StereoEffect(renderer); //Stereo effect object created from stereoeffect.js library

      

      camera = new THREE.PerspectiveCamera(120, 1, 0.001, 700); //Make this dynamic. Debug: Scaffold with angularjs
      camera.position.set(0, 10, 0); //Second position sets height of camera Debug: Dynamic
      scene.add(camera);

      controls = new THREE.OrbitControls(camera, element); //Attach camera to mouse/swipe
      controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);


    var light = new THREE.AmbientLight( 0xE6E3E3 ); // soft white light
    scene.add( light );

    
      //Set Color
      renderer.setClearColorHex( 0x000000, 0.5 );

     // Debug: This is dynamic
      var texture = THREE.ImageUtils.loadTexture(
        'textures/ground/railtrack.png'
      );

      //Texture is repeated from 4x times. (50/50 horizonatal vertical)
      //Can be changed to 1x by 100,100
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();

      //Instantiate material object with mapped to texture
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      //Plate Geometry. Could be changed to provide user with more option
      //Debug: Could be hooked up with angular?
      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render(dt) {
      effect.render(scene, camera);


    }

    function animate(t) {
      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    //For cell phone
    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }