var ENV_Platform = function () {
	var scope = null;
	THREE.Geometry.call( this );
	v( -3.717685, 146.0834, -69.68641 );

	this.computeCentroids();
	this.computeFaceNormals();
	function v( x, y, z) { scope.vertices.push( new THREE.Vector3( x, y, z) ); }
	function f3( a, b, c) { scope.faces.push( new THREE.Face3( a, b, c) ); }
}
ENV_Platform.prototype = new THREE.Geometry();
ENV_Platform.prototype.constructor = ENV_Platform;
