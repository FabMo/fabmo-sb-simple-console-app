// Elaborated from an exercise by: https://dustinpfister.github.io/2018/11/07/threejs-line-fat-width/

// Fat Line Geometry
var createFatLineGeometry = function (opt) {
 
    opt = opt || {};
    opt.forPoint = opt.forPoint || function (i, per) {
        return {
            x: i * 5,
            y: 0,
            z: 0
        }
    };
    opt.ptCount = opt.ptCount === undefined ? 20 : opt.ptCount;
    opt.colorSolid = opt.colorSolid === undefined ? false : opt.colorSolid;
    opt.color = opt.color === undefined ? new THREE.Color(0xffffff) : opt.color;
 
    // Position and Color Data
    var positions = [],
    colors = [],
    i = 0,
    point,
    geo;
 
    // for each point
    while (i < opt.ptCount) {
 
        // push point
        point = opt.forPoint(i, i / opt.ptCount);
        positions.push(point.x, point.y, point.z);
 
        // push color
        if (!opt.colorSolid) {
            opt.color.setHSL(i / opt.ptCount, 1.0, 0.5);
        }
        colors.push(opt.color.r, opt.color.g, opt.color.b);
 
        i += 1;
    }
 
    // return geo
    geo = new THREE.LineGeometry();
    geo.setPositions(positions);
    geo.setColors(colors);
    return geo;
 
};

// Make the Fat Line ............................................
var createFatLine = function (opt) {
 
    opt = opt || {};
    opt.width = opt.width || 5;
 
    // LINE MATERIAL
    var matLine = new THREE.LineMaterial({
            linewidth: opt.width, // in pixels
            vertexColors: THREE.VertexColors
        });
    matLine.resolution.set( window.innerWidth, window.innerHeight );
 
    var line = new THREE.Line2(opt.geo, matLine);
 
matLine.castShadow = true;
matLine.receiveShadow = true;

    return line;
 
};