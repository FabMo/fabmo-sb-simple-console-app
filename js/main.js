// Check for webgl
if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
	document.getElementById( 'container' ).innerHTML = "";
}
// Global true position tracking
window.globals = {
	TOol_x: 0,                                  	// REAL LOCATIONS OF TOOL from G2
	TOol_y: 0,                                  	// ... had to set as windows.globals to get for paperjs
	TOol_z: 0,										// ... best way for 3js?
	TOol_a: 0,
	TOol_b: 0,
	TOol_c: 0,
	G2_state: ""
}
var TOol = new THREE.Vector3();

var useFatLine = getOS(); // if linux, assume pi for the moment and run with standard line
useFatLine = false;  // ## turning off fatline for the moment to see if we can live simply

// Graphics variables
var container, stats; // stats is for little 3js data window if enbled
var camera, controls, scene, renderer, background;
var textureLoader;
var clock = new THREE.Clock();

var fabmo = new FabMoDashboard(); //...need here for global?

	init();
	animate();

//===================================================== Drawing

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	//var plane = new THREE.Plane();
	var planeNormal = new THREE.Vector3();
	var point = new THREE.Vector3();

		function getPoint(event) {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
			planeNormal.copy(camera.position).normalize();
			//plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
			var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // suggested example XZ plane
			raycaster.setFromCamera(mouse, camera);
			raycaster.ray.intersectPlane(plane, point);
		}
	// ........................................... Drawing Details
	//                                                                  (note xyz disparity with app gui)
	var lastpoint = point;
	var newpoint = point;
	var mypoints = [];
	
		function setPoint() {
		// ... puttering here with making sphere just the bottom part of the geometry for potential cut simulation
		//  var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(.125, 4, 2), new THREE.MeshBasicMaterial({
		//  var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(.125, 12, 12), new THREE.MeshBasicMaterial({
//		##TODO fix next line layout
			var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(.125, 12, 12, 0, Math.PI * 2,  Math.PI * .05 / .125, Math.PI * .125 / .125 ), new THREE.MeshBasicMaterial({
		    	color: "yellow",
		    	wireframe: true
			}));

			lastpoint = newpoint;
			sphere.position.copy(point);
			sphere.position.y += 1;  // just put item 1 unit up in y ** which is our z
//			scene.add(sphere);
			newpoint = sphere.position;
//console.log('lastpt- ');
//console.log(JSON.stringify(newpoint.x, null, 4));
			mypoints[0] = lastpoint;
			mypoints[1] = newpoint;
		}

        function feed_G2() {
	    	var code = ['G1']
	    	if(newpoint.x != undefined) {code.push('X' + newpoint.x.toFixed(4));}
	    	if(newpoint.z != undefined) {code.push('Y' + (-1 * newpoint.z.toFixed(4)));}
		//	      if(newpoint.y != undefined) {code.push('Z' + newpoint.y.toFixed(4));}
	    	code.push('F180');
//console.log(code);
	    	fabmo.manualRunGCode(code.join(''))
        }

		function mkLine() {
		    var s = lastpoint, e = newpoint;
		    var geometry = new THREE.Geometry();
		    geometry.vertices.push(new THREE.Vector3(s.x, s.y, s.z));
		    geometry.vertices.push(new THREE.Vector3(e.x, e.y, e.z));
			material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 3 } );
			// For windows we draw with fatline, others maybe std in pixels ... ## works??
			if (useFatLine) {
			    testMyFatLine(mypoints);
			} else {
				myline = new THREE.Line(geometry, material);
				scene.add(myline);
			}
		}

		function mkToolLine(s,e) {
		    var geometry = new THREE.Geometry();
		    geometry.vertices.push(new THREE.Vector3(s.x, s.y, s.z));
		    geometry.vertices.push(new THREE.Vector3(e.x, e.y, e.z));
			material = new THREE.LineBasicMaterial( { color: 0xff00, linewidth: 3 } );
				toolline = new THREE.Line(geometry, material);
				scene.add(toolline);
		}

		//--------------------------------------- Activate a Drawing Instance

 		function onMouseDown(event) {
console.log('mouse down')
		  getPoint(event);
		  //if (draw.checked) setPoint();
		  setPoint();
		}

		var draw = 0;

		function onMouseMove(event) {
			getPoint(event);
			//  if (draw.checked) setPoint();
console.log("getting mouse");
			if(draw === 1) { // some sort of event timing management needed here ???
				setPoint();
				feed_G2();
		    	mkLine();
//				mkToolLine(lastpoint,newpoint);  // test tool line output	
 			}
		}

		function onKeyDown(event) {
			var obj = event;
console.log('key down- ');
console.log(event);
			//console.log('testingFAT');
			//testFatLine();
			switch ( event.keyCode ) {
				case 65:  //A
					console.log("getting A");
					draw = 1;
				break;
				case 81: //Q
					console.log("gotQ");
					getToolPath();
				break;	
			}	
		}
		function onKeyUp(event) {
			var obj = event;
console.log('key UP- ' + obj);
			draw = 0;
			switch ( event.keyCode ) {
				case 65:  //A
					console.log("cancel A");
					draw = 0;
				break;
			}	
		}

		// end drawing --------------------------------------- 

		// work on reading file ...............................

		function getToolPath() {
		// 	fabmo.launchApp('previewer', {
		// 		'job': '84'
		// 	  });
		  
	
		// 	fabmo.getJobsInQueue(function(err, jobs) {
		// 		if (jobs){
		// 			//if(jobs.pending[0]._id.toqString() === jobId) {
		// 				//$('.run-now').show();
		// 				console.log("got something");
		// 				console.log(jobs);
		// 				//}
		// 		}
		// 	});
		


		// 	fabmo.getAppArgs(function(err, args) {
		// 		if(err) {
		// 			console.log(err);
		// 		}
	// console.log("started path get");		
//				if('job' in args) {
					var url = '/job/' + '84' + '/parseFile';
					$.ajax({
						url: url,
						type: 'GET',
						success: function(data){ 
				//			var isLive = ('isLive' in args) ? args.isLive : false;
				//			initializeViewer(data, isLive, args.job);
							console.log(data);
						},
						error: function(data) {
						if(data && data.responseJSON) {
							fabmo.notify('error', data.responseJSON);
						}
						}
					});
			// 	} else {
			// 		//initializeViewer("", false, -1);
			// 		console.log(args);
			// 	}
			// });
		}	




//=========================== FabMo ===========================================================
fabmo.requestStatus(function(err,status) {		// first call to get us started
	console.log('G2_first_state>' + status.state);
});

fabmo.on('status', function(status) {
	var last = new THREE.Vector3();

	globals.TOol_x = status.posx;               // get LOCATION GLOBALS
	globals.TOol_y = status.posy;
	globals.TOol_z = status.posz;
	globals.TOol_a = status.posa;
	globals.G2_state = status.state;
												// and display them
	document.getElementById("tool-display-x").innerHTML = (globals.TOol_x<0?"X ":"X +") + globals.TOol_x.toFixed(3);
	document.getElementById("tool-display-y").innerHTML = (globals.TOol_y<0?"Y ":"Y +") + globals.TOol_y.toFixed(3);
	document.getElementById("tool-display-z").innerHTML = (globals.TOol_z<0?"Z ":"Z +") + globals.TOol_z.toFixed(3);

	last.x = TOol.x;
	last.y = TOol.y;
	last.z = TOol.z;
	TOol.x = status.posx;
	TOol.z = -status.posy;
	TOol.y = status.posz;
	mkToolLine(last,TOol);

//	console.log("last- " + last.x);
//	console.log("new TOol.x- " + TOol.x);
	console.log(status);
//	console.log('G2_state> ' + globals.G2_state); //idle,running,paused,stopped,manual or dead
});

$(document).ready(function() {
	 	initMenu();
	  fabmo.getConfig();
	  fabmo.manualEnter({hideKeypad:true, mode:'raw'});
	  fabmo.requestStatus();
 // On unload, clear manual mode 
    window.addEventListener("unload", function(e){
		fabmo.manualExit();
		console.log("unloaded!");        
	}, false);
})
