	function init() {
		initGraphics();
	//createObjects();
	  // With stuff for working with mouse and keyboard intercepts
		var testWindow = window.parent || window;    //## what is test window ?
		testWindow.addEventListener("keydown", onKeyDown, true);
		testWindow.addEventListener("keyup", onKeyUp, true);
		document.addEventListener("mousedown", onMouseDown, false);
		document.addEventListener("mousemove", onMouseMove, false);
	}
		function initGraphics() {
			container = document.getElementById( 'container' );
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 2000 );
			scene = new THREE.Scene();
		//  			scene.background = new THREE.Color( 0x146b7d );
			camera.position.set( - 12, 7, 4 );
		  getEl = document.getElementById("LittleGreenDivSensor");
			controls = new THREE.OrbitControls( camera, getEl );
			controls.target.set( 0, 2, 0 );
			controls.update();
			renderer = new THREE.WebGLRenderer({ alpha:true });
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.shadowMap.enabled = true;
			textureLoader = new THREE.TextureLoader();


      // GRID (from GridHelper)
	  ghelp = new THREE.XgridHelper( 6, 1, 8, 1 );
	  ghelp.position.set(3,0,-4);
	  ghelp.visible = true;
	// AXES (from AxesHelper)
	  ahelp = new THREE.AxesHelper(3);
	  //this.ahelp.position.set( -3, 0, 4 );
	  ahelp.rotation.set(0, Math.PI / 2, 0);
	// TABLE
	  table = new THREE.Mesh( new THREE.BoxBufferGeometry(6,.1,8), new THREE.MeshBasicMaterial({ color: 0x666666 }));
	  table.position.set(3,-.78,-4);
	  //this.table.position.y = y;




			var ambientLight = new THREE.AmbientLight( 0x404040 );
			scene.add( ambientLight );

			scene.add(table)
			scene.add(ghelp)
			scene.add(ahelp)


			var light = new THREE.DirectionalLight( 0xffffff, 1 );
			light.position.set( - 7, 10, 15 );
			light.castShadow = true;

			var d = 10;
			light.shadow.camera.left = - d;
			light.shadow.camera.right = d;
			light.shadow.camera.top = d;
			light.shadow.camera.bottom = - d;
			light.shadow.camera.near = 2;
			light.shadow.camera.far = 50;
			light.shadow.mapSize.x = 1024;
			light.shadow.mapSize.y = 1024;
			light.shadow.bias = - 0.003;
			scene.add( light );

			container.innerHTML = "";
			container.appendChild( renderer.domElement );

		  // little 3js stat display; comment out if not wanted
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '90%';
			container.appendChild( stats.domElement );

			window.addEventListener( 'resize', onWindowResize, false );
		}
		// function createObjects() {
		// 	var pos = new THREE.Vector3();
		// 	var quat = new THREE.Quaternion();

		// 	// Ground
		// 	pos.set( 0, - 0.5, 0 );
		// 	quat.set( 0, 0, 0, 1 );
		// //	var ground = createParalellepiped( 40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
        //     //... make deck really thin
		// 	var ground = createParalellepiped( 80, 1, 80, 0, pos, quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
		// 	ground.castShadow = true;
		// 	ground.receiveShadow = true;
		// 	textureLoader.load( "assets/img/grid.png", function ( texture ) {
		// 		texture.wrapS = THREE.RepeatWrapping;
		// 		texture.wrapT = THREE.RepeatWrapping;
		// 		texture.repeat.set( 20, 20 );
		// //			texture.repeat.set( 10, 10);
		// 		ground.material.map = texture;
		// 		ground.material.needsUpdate = true;
		// 	} );
		// }

		// function createParalellepiped( sx, sy, sz, mass, pos, quat, material ) {
		// 	var threeObject = new THREE.Mesh( new THREE.BoxBufferGeometry( sx, sy, sz, 1, 1, 1 ), material );
		// 	createRigidBody( threeObject,mass, pos, quat );
		// 	return threeObject;
		// }

		// function createRigidBody( threeObject, mass, pos, quat ) {
		// 	threeObject.position.copy( pos );
		// 	threeObject.quaternion.copy( quat );
		// 	scene.add( threeObject );
		// 	if ( mass > 0 ) {
		// 		rigidBodies.push( threeObject );
		// 		// Disable deactivation
		// 		body.setActivationState( 4 );
		// 	}
		//  }

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		function animate() {
			requestAnimationFrame( animate );
			render();
			stats.update();
		}

		function render() {
			var deltaTime = clock.getDelta();
		//		updatePhysics( deltaTime );
			renderer.render( scene, camera );
		}


		// Make the DIV element draggable:
dragElement(document.getElementById("LittleGreenDiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}