/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

GAME.MyGame = function (world)
{
    this.RUN = 0;
    this.EAT = 1;

    this.world = world;

    this.Start = function ()
    {
        this.LoadCharacters();
    };

    /** init the models **/
    this.LoadCharacters = function ()
    {
        this.SpawnAllo(new THREE.Vector3(0, 0, 0), this.RUN);
        this.SpawnAllo(new THREE.Vector3(1000, 0, -500), this.EAT);

        this.SpawnGrass(new THREE.Vector3(800, 0, -300));
    };

    this.SpawnGrass = function ( pos )
    {
        var ch = new GAME.Model('/plant.obj', null);
        ch.Material = new THREE.MeshBasicMaterial({
                wireframe: false,
                color: 0x195400
            });
        ch.Load( function () {
            ch.SetPosition(pos.x, pos.y, pos.z);
            ch.SetScale(10);

            world.AddCharacterToScene(ch);

        });
    };

    this.SpawnAllo = function( pos, animation )
    {
        var ch = new GAME.Model('/allo.obj', '/allo.bmp');
        ch.Material = new THREE.MeshBasicMaterial({
                wireframe: false
            });
        ch.Load( function () {
            ch.animations.push(new GAME.Animation(AlloAniRun_Track, 15, 22, 'run.wav'));
            ch.animations.push(new GAME.Animation(AlloAniEat_Track, 38, 10, 'eat.wav'));

            ch.SetAnimation(animation);
            ch.SetPosition(pos.x, pos.y, pos.z);

            world.AddCharacterToScene(ch);
        });
    };
};

