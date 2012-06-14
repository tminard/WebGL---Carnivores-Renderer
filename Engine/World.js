var ENGINE = ENGINE || ( function () {
    return {
        VERSION: 0.1
    };
})();
function gAnimateLoop()
{
    gameWorld.Render();
}

ENGINE.World = function ( )
{
    this._scene = null;
    var _segmentSize = 129; //129
    var _worldSize = 10000;
    var _wireframeMode = false;
    var _textureFileName = "/grass.jpg";

    var _renderer = null;

    var _camera = null;
    var _cameraFOV = 50;
    var _cameraY = 200;
    var _cameraFar = 100000;
    var _cameraZ = 0;
    var _cameraX = -1000;

    var _fog = 0.0004;

    var _htmlContainer = null;

    var _worldMeshMaterial = null;
    var _worldMesh = null;

    var _firstPersonControls = null;

    var dinoMesh = null;
    var dinoAudio = null;
    var aniStartTime = 0;
    var aniTimeTotal = 0;

    this.cModels = [ ];

    this.Init = function( )
    {
        _htmlContainer = document.createElement( 'div' );
        document.body.appendChild( _htmlContainer );

        this._scene = new THREE.Scene();
        this.setupCamera();
        this.LoadObjects();

        _worldMeshMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: THREE.ImageUtils.loadTexture( _textureFileName ), // /grass.jpg
            wireframe: _wireframeMode
        });

        _worldMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(_worldSize, _worldSize, _segmentSize, _segmentSize), _worldMeshMaterial
            );
        this._scene.add(_worldMesh);
        _renderer = new THREE.WebGLRenderer();
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _htmlContainer.appendChild( _renderer.domElement );

        this.setupControls();
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
//        var texture = THREE.ImageUtils.loadTexture( '/allo.bmp' );
//
//        var loader = new THREE.OBJLoader();
//        loader.load( "/allo.obj", function ( object ) {
//
//            console.log(object);
//            var mat = new THREE.MeshBasicMaterial({
//                map: texture,
//                wireframe: false
//            });
//
//            object.children[0].geometry.dynamic = true;
//
//            for ( var i = 0, l = object.children.length; i < l; i ++ ) {
//
//                object.children[ i ].material.map = texture;
//
//            }
//            //CreateMorphedModel( object, AlloAni1, 100, 15, 681);
//            for (var v = 0; v < object.children[0].geometry.vertices.length; v++)
//            {
//                object.children[0].geometry.vertices[v].x *= 2.0;
//                object.children[0].geometry.vertices[v].y *= 2.0;
//                object.children[0].geometry.vertices[v].z *= 2.0;
//            }
//
//            object.castShadow = true;
//
//            CreateMorphedModel( object, AlloAniRun_Track, aniTimeTotal, 38, 10);
//
//            dinoMesh = object;
//            dinoAudio = new ENGINE.Audio( [ 'run.wav', ], 275, 1, true );
//            dinoAudio.position.copy( dinoMesh.position );
//
//            var dd = new Date()
//            aniStartTime = dd.getTime();
//
//            _scene.add( object );

//
//        } );
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
                this.cModels[ch].Animate();
            }
        }
//        if (dinoMesh != null)
//        {
//            if (aniTimeTotal == 0)
//            {
//                dinoAudio.play();
//            }
//            var dd = new Date();
//            aniTimeTotal = dd.getTime() - aniStartTime;
//
//            if (aniTimeTotal >= ((15 * 1000) / 22)) //38 * X / 10
//            {
//                aniStartTime = dd.getTime();
//                aniTimeTotal = 0;
//            }
//            CreateMorphedModel( dinoMesh, AlloAniRun_Track, aniTimeTotal, 15, 22); // 38, 10
//            dinoMesh.children[ 0 ].geometry.verticesNeedUpdate = true;
//        }
        
    };

    /**
     *  Render world
     **/
    this.Render = function ()
    {
        //_camera.position.y = Math.tan(_camera.position.y++);

        _camera.lookAt( new THREE.Vector3(0, 110, 0) );

        _renderer.render( this._scene, _camera );
        requestAnimationFrame( gAnimateLoop );

       this.AnimateModels();

    };

    /**
     * Init the core camera and place in scene
     */
    this.setupCamera = function()
    {
        _camera = new THREE.PerspectiveCamera( _cameraFOV, window.innerWidth / window.innerHeight, 1, _cameraFar );
        _camera.position.x = _cameraX;
        _camera.position.z = _cameraZ;
        _camera.position.y = _cameraY;
        
        this._scene.add( _camera);
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
        _firstPersonControls = new THREE.FirstPersonControls(
            _camera,
            _renderer.domElement
            );

        _firstPersonControls.movementSpeed = 5.0;
        _firstPersonControls.lookSpeed = 0.005;
        _firstPersonControls.noFly = true;
        _firstPersonControls.activeLook = false;
        _firstPersonControls.constrainVertical = true;
        _firstPersonControls.verticalMin = 0;
        _firstPersonControls.verticalMax = 0;
    }
};


