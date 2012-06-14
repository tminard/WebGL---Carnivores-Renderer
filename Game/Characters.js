/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var GAME = GAME || ( function () {
    return {
        VERSION: 0.1
    };
})();

var CHARACTERS = CHARACTERS || ( function () {
    return {
        VERSION: 0.1
    };
})();

GAME.Animation = function (trackData, totalFrames, KPS, audioFileName)
{
    this.trackData = trackData;
    this.numFrames = totalFrames;
    this.kps = KPS;
    this.audioFile = audioFileName;
    this.audio = null;

    /** load audio file **/
    this.audio = new ENGINE.Audio([audioFileName], 251, 1, false);
};

GAME.Model = function (meshFileName, textureFileName)
{
    console.log('hit construct');
    this.meshData = null;
    this.texture = null;
    this.animations = []; // array of GAME.Animation
    
    this._texture = textureFileName;
    this.meshFile = meshFileName;
    this.curAnimationStart = 0; // MS of current animation start
    this.curAnimationTime = 0; // MS of current animation execution
    this.curAnimationIndex = 0; // current animation index
    this.prevAnimationindex = null;

    /* Load the model from provided file name */

    this.Load = function (callbackMain)
    {
        this.texture = THREE.ImageUtils.loadTexture( this._texture );
        console.log('Load start');
        var objLoader = new THREE.OBJLoader();
        var self = this;
        objLoader.load( this.meshFile, function ( object ) {
            object.children[0].geometry.dynamic = true;

            for ( var i = 0, l = object.children.length; i < l; i ++ ) {

                object.children[ i ].material.map = self.texture;

            }

            for (var v = 0; v < object.children[0].geometry.vertices.length; v++)
            {
                object.children[0].geometry.vertices[v].x *= 2.0;
                object.children[0].geometry.vertices[v].y *= 2.0;
                object.children[0].geometry.vertices[v].z *= 2.0;
            }
            object.castShadow = true;
            self.meshData = object;

            console.log('Load done - calling callback');
            callbackMain(object);
        } );
    };

    this.SetAnimation = function (animationIndex)
    {
        if (this.prevAnimationIndex != this.curAnimationIndex && this.prevAnimationIndex != null)
        {
           this.animations[this.curAnimationIndex].audio.stop();
        }

        this.prevAnimationIndex = animationIndex;
        this.curAnimationIndex = animationIndex;
        this.curAnimationTime = 0;
        this.curAnimationStart = 0;
    };

    this.Animate = function ()
    {
        if (this.meshData == null)
        {
            return;
        } else if (this.curAnimationIndex == undefined) {
            this.curAnimationIndex = 0;
            this.prevAnimationIndex = null;
        }

        if (this.animations[this.curAnimationIndex].audio.paused == true || (this.curAnimationTime == 0 && this.animations[this.curAnimationIndex].audio != null))
        {
            if (this.animations[this.curAnimationIndex].audio.paused == true)
                {
                    var dr = new Date();
                    this.curAnimationStart = dr.getTime();
                }
            this.animations[this.curAnimationIndex].audio.position.copy( this.meshData.position );
            this.animations[this.curAnimationIndex].audio.play();
        }
        var dd = new Date();
        this.curAnimationTime = dd.getTime() - this.curAnimationStart;

        if (this.curAnimationStart == 0 || this.curAnimationTime >= ((this.animations[this.curAnimationIndex].numFrames * 1000) / this.animations[this.curAnimationIndex].kps)) //38 * X / 10
        {
            this.curAnimationStart = dd.getTime();
            this.curAnimationTime = 0;
        }

        this.meshData.position.z -= 10;
        CreateMorphedModel( this.meshData, this.animations[this.curAnimationIndex].trackData,
            this.curAnimationTime, this.animations[this.curAnimationIndex].numFrames,
            this.animations[this.curAnimationIndex].kps);
        this.meshData.children[ 0 ].geometry.verticesNeedUpdate = true;
    };
};


























function CreateMorphedModel( meshData, animationData, aniTime, numFrames, KPS)
{
    var totalAniTime = (numFrames * 1000) / KPS;
    //    console.log('Total Ani Time: ' + totalAniTime);
    
    var scale = 1;
    var curFrame = ((numFrames - 1) * (aniTime) * 256.0) / totalAniTime;
    var splineD = curFrame & 0xFF;

    curFrame = curFrame>>8;

    var k2 = splineD / 256.0;
    var k1 = 1.0 - k2;

    k2 = k2 * (scale/8); // scale / 8
    k1 = k1 * (scale/8);
    
    //    console.log('k2: ' + k2);
    //    console.log('k1: ' + k1);
    //    console.log('CurFrame: ' + curFrame + ' of ' + numFrames);

    // calculate offsets starting at current animation
    var verLength = meshData.children[0].geometry.vertices.length;
    var aniOffset = (curFrame * verLength * 3);
    var trackLength = (verLength * 3); // length per track (used for k2)

    //    console.log('Ani Offset: ' + aniOffset);
    //    console.log('1 Track Length: ' + trackLength);
    //    console.log('Animation Data Length: ' + animationData.length);

    for (var v = 0; v < verLength; v++)
    {
        meshData.children[0].geometry.vertices[v].x = animationData[(aniOffset) + (v*3 + 0)] * k1 + animationData[(aniOffset) + ((v+verLength)*3+0)] * k2;
        meshData.children[0].geometry.vertices[v].y = animationData[(aniOffset) + (v*3 + 1)] * k1 + animationData[(aniOffset) + ((v+verLength)*3+1)] * k2;
        meshData.children[0].geometry.vertices[v].z = animationData[(aniOffset) + (v*3 + 2)] * k1 + animationData[(aniOffset) + ((v+verLength)*3+2)] * k2;
    //        if (animationData[(aniOffset) + trackLength + (v*3 + 0)] == undefined)
    //            {
    //                console.log((aniOffset) + trackLength + (v*3 + 0));
    //            }
    }
}


