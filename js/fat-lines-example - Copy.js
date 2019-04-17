
// My Test FAT LINE  -- 
var testMyFatLine = function (mypoints) {
    var line = createFatLine({
            width: 20,
            geo: createFatLineGeometry({
                ptCount: 2,

                colorSolid: true,
                color: new THREE.Color(0x0000ff),

                forPoint: function (i, per) {
                    return {
                        x: mypoints[i].x,
                        y: mypoints[i].y,
                        z: mypoints[i].z
                    }
                }

            })
        });
    scene.add(line);
}









var testFatLine = function () {

// CREATE FAT LINE  -- swirl
    var line = createFatLine({
            width: 8,
            geo: createFatLineGeometry({
                ptCount: 80,
                colorSolid: true,
                color: new THREE.Color(0x00ff00),
                forPoint: function (i, per) {
                    return {
                        x: i * 1.5,
                        y: Math.cos(Math.PI * 4 * (per)) * 10,
                        z: Math.sin(Math.PI * 4 * (per)) * 10
                    }
                }
            })
        });
 
    scene.add(line);
 
// CREATE ANOTHER FAT LINE  -- just straight with color changing by default
    line = createFatLine({
            width: 10,
            geo: createFatLineGeometry()
        });
    scene.add(line);
 
    // // LOOP
    // var loop = function () {
 
    //     requestAnimationFrame(loop);
 
    //     // // main scene
    //     // renderer.setClearColor(0x000000, 0);
    //     // renderer.setViewport(0, 0, 320, 240);
 
    //     // // renderer will set this eventually
    //     // renderer.render(scene, camera);
    //     // renderer.setClearColor(0x222222, 1);
    //     // renderer.clearDepth();
 
    // };
 
    // loop();
 }

