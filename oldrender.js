  //            init();
            //            animate();
            //
            //            function init() {
            //
            //                container = document.createElement( 'div' );
            //                document.body.appendChild( container );
            //
            //                scene = new THREE.Scene();
            //
            //                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            //                camera.position.z = -300;
            //                scene.add( camera );
            //
            //                var ambient = new THREE.AmbientLight( 0x555555 );
            //                scene.add( ambient );
            //
            //                var directionalLight = new THREE.DirectionalLight( 0xffeedd );
            //                directionalLight.position.set( 1, 1, 1 ).normalize();
            //                scene.add( directionalLight );
            //
            //                var texture = THREE.ImageUtils.loadTexture( '/allo.bmp' );
            //
            //                var loader = new THREE.OBJLoader();
            //                loader.load( "/allo.obj", function ( object ) {
            //
            //                    var mat = new THREE.MeshBasicMaterial({
            //                        map: texture,
            //                        wireframe: false
            //                    });
            //
            //                      object.children[0].geometry.dynamic = true;
            //                      mesh = object;
            //
            //                    for ( var i = 0, l = object.children.length; i < l; i ++ ) {
            //
            //                        object.children[ i ].material.map = texture;
            //
            //                    }
            //                    scene.add( object );
            //
            //                } );
            //
            //                addGrid();
            //                // RENDERER
            //
            //                renderer = new THREE.WebGLRenderer();
            //                renderer.setSize( window.innerWidth, window.innerHeight );
            //                container.appendChild( renderer.domElement );
            //
            //                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            //            }
            //
            //            // test frame1 animation transform by loading tween
            //            function GApplyTweenAni1()
            //            {
            //                var timeDiv = 937 / 15; // TOTAL TIME MS / Num of FRAMES - Use to generate spline
            //
            //                for (var v = 0; v < mesh.children[0].geometry.vertices.length; v++)
            //                {
            //                   // calc
            //                   curFrame = 0;
            //                   tween = new TWEEN.Tween(mesh.children[0].geometry.vertices[v]).to(AlloAni1[0][v], timeDiv);
            //
            //                   tween.onUpdate(function(){
            //                       mesh.children[ 0 ].__dirtyVertices = true;
            ////                         mesh.children[0].geometry.vertices[v].x = position.x;
            ////                         mesh.children[0].geometry.vertices[v].y = position.y;
            ////                         mesh.children[0].geometry.vertices[v].z = position.z;
            //                      });
            //                    // start next frame
            //                    tween.onComplete(function(){
            //                        curFrame++;
            //
            //                        if (curFrame == 15)
            //                        {
            //                            curFrame = 0;
            //                        }
            //
            //                        for (var vb = 0; v < mesh.children[0].geometry.vertices.length; vb++)
            //                        {
            //                            tween.to(AlloAni1[curFrame][vb], timeDiv);
            //                        }
            //                    });
            //                  tween.start();
            //                }
            //            }
            //
            //            function onDocumentMouseMove( event ) {
            //
            //                mouseX = ( event.clientX - windowHalfX ) / 2;
            //                mouseY = ( event.clientY - windowHalfY ) / 2;
            //
            //            }
            //
            //            //
            //
            //            function animate() {
            //
            //                TWEEN.update();
            //                requestAnimationFrame( animate );
            //                render();
            //
            //            }
            //
            //            function render() {
            //
            //                camera.position.x += ( mouseX - camera.position.x ) * .05;
            //                camera.position.y += ( - mouseY - camera.position.y ) * .05;
            //
            //                camera.lookAt( new THREE.Vector3(0, 110, 0) );
            //
            //                renderer.render( scene, camera );
            //
            //            }

            /**
             * Render a square flat plane in wireframe.
             * This provides an environmental context for system
             */
            //            function addGrid()
            //            {
            //                var mapSize = 1024^2;
            //
            //                var width = mapSize,
            //                height = mapSize,
            //                segments = 129;
            //
            //                var planeMaterial = new THREE.MeshBasicMaterial({
            //                    color: 0xFFFFFF,
            //                    map: THREE.ImageUtils.loadTexture('/grass.jpg'),
            //                    wireframe: false
            //                });
            //
            //                var plane = new THREE.Mesh(
            //                new THREE.PlaneGeometry(width, height, segments, segments), planeMaterial
            //            );
            //
            //                scene.add(plane);
            //            }