var ENGINE = ENGINE || ( function () {
    return {
        VERSION: 0.2
    };
})();
function gAnimateLoop()
{
    gameWorld.Render();
}

ENGINE.World = function ( )
{
    this._scene = null;
    this._camera = null;
    this._controls = null;
    var _segmentSize = 256;
    var _worldSize = (_segmentSize * 256); // world size is in pixels
    var _wireframeMode = false;
    var _textureFileName = "grass_256.jpg";

    var _renderer = null;

    var _cameraFOV = 50;
    var _cameraY = 200;
    var _cameraFar = 100000;
    var _cameraZ = 0;
    var _cameraX = -1000;

    var _htmlContainer = null;

    var _worldMeshMaterial = null;
    var _worldMesh = null;

    this.cModels = [ ];

    this.Init = function( )
    {
        _htmlContainer = document.createElement( 'div' );
        document.body.appendChild( _htmlContainer );

        this._scene = new THREE.Scene();
        this.setupCamera();
        this.setupControls();
        this.LoadObjects();

        var floor_texture = THREE.ImageUtils.loadTexture( _textureFileName ); // /grass.jpg
        floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
        floor_texture.repeat.set( _segmentSize, _segmentSize );

        _worldMeshMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: floor_texture, 
            wireframe: _wireframeMode
        });

        _worldMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(_worldSize, _worldSize, _segmentSize, _segmentSize), _worldMeshMaterial
            );
        this._scene.add(_worldMesh);
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _htmlContainer.appendChild( _renderer.domElement );

        this.setupLights();
        this.setupFog();

        // lets go!
        gAnimateLoop();
    };
    /**
     * Core object loading
     */
    this.LoadObjects = function ()
    {
    };

    this.AddCharacterToScene = function (objData)
    {
        console.log('WORLD -> Add Character to Scene: ');
        console.log(objData);
      this._scene.add(objData.meshData);
      this.cModels.push(objData);
    };
   
    this.AnimateModels = function ()
    {
        if (this.cModels.length > 0)
        {
            for (var ch = 0; ch < this.cModels.length; ch++)
            {
                this.cModels[ch].Animate(this._camera);
            }
        }

    };

    /**
     *  Render world
     **/
    this.Render = function ()
    {
        //_camera.position.y = Math.tan(_camera.position.y++);

        this._camera.lookAt( new THREE.Vector3(0, 110, 0) );

        _renderer.render( this._scene, this._camera );
        this._controls.update();
        requestAnimationFrame( gAnimateLoop );

       this.AnimateModels();

    };

    /**
     * Init the core camera and place in scene
     */
    this.setupCamera = function()
    {
        this._camera = new THREE.PerspectiveCamera( _cameraFOV, window.innerWidth / window.innerHeight, 1, _cameraFar );
        this._camera.position.x = _cameraX;
        this._camera.position.z = _cameraZ;
        this._camera.position.y = _cameraY;
        
        this._scene.add( this._camera);
    };

    /**
     * Setup the world lighting
     */
    this.setupLights = function()
    {
        var ambient = new THREE.AmbientLight( 0xffffff );
        this._scene.add( ambient );

    //        var light = new THREE.DirectionalLight( 0xffffff );
    //        light.position.set( 0, 200, -1 ).normalize();
    //
    //	light.castShadow = true;
    //        light.shadowCameraVisible = true;
    //
    //        _scene.add( light );
    };

    /**
     * Setup basic fog
     */
    this.setupFog = function ()
    {
        this._scene.fog = new THREE.Fog( 0xAAD0FF, 2300, 5000 ); //0x050505
    };

    /**
     * Add controls
     */
    this.setupControls = function ()
    {
        this._controls = new THREE.TrackballControls( this._camera );

        this._controls.rotateSpeed = 1.0;
        this._controls.zoomSpeed = 1.2;
        this._controls.panSpeed = 0.8;

        this._controls.noZoom = false;
        this._controls.noPan = false;

        this._controls.staticMoving = true;
        this._controls.dynamicDampingFactor = 0.3;

        this._controls.keys = [ 65, 83, 68 ];
    }
};


