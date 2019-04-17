
// My Test FAT LINE  -- 
var testMyFatLine = function (mypoints) {
    var line = createFatLine({
            width: 3,
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
