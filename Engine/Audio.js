ENGINE.Audio = function ( sources, radius, volume, loop ) {

    var audio = document.createElement( 'audio' );

    for ( var i = 0; i < sources.length; i ++ ) {

        var source = document.createElement( 'source' );
        source.src = sources[ i ];

        audio.appendChild( source );

    }

    this.position = new THREE.Vector3();

    this.play = function () {

        audio.loop = loop;
        audio.play();

    }

    this.stop = function ()
    {
        audio.pause();
    }

    this.update = function ( camera ) {

        var distance = this.position.distanceTo( camera.position );

        if ( distance <= radius ) {

            audio.volume = volume * ( 1 - distance / radius );

        } else {

            audio.volume = 0;

        }

    }

};