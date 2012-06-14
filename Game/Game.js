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
        var ch = new GAME.Model('/Allo.obj', '/allo.bmp');

        ch.Load( function () {
            console.log('Load callback init...');
            ch.animations.push(new GAME.Animation(AlloAniRun_Track, 15, 22, 'run.wav'));
            ch.animations.push(new GAME.Animation(AlloAniEat_Track, 38, 10, 'eat.wav'));

            ch.SetAnimation(this.RUN);
            ch.Animate();
            
            world.AddCharacterToScene(ch);
        });


    };
};

