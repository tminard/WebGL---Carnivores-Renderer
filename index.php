<!DOCTYPE html>
<html lang="en"><head>
        <title>WebGL Learning - Render OBJ</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <style>
            body {
                font-family: Monospace;
                background-color: #AAD0FF;
                color: #fff;
                margin: 0px;
                overflow: hidden;
            }
            #info {
                color: #fff;
                position: absolute;
                top: 10px;
                width: 100%;
                text-align: center;
                z-index: 100;
                display:block;
            }
            #info a, .button { color: #f00; font-weight: bold; text-decoration: underline; cursor: pointer }
        </style>
        <style type="text/css"></style></head>

    <body>
        <script src="/Three/three.js/src/Three.js"></script>
        <script src="/Three/three.js/src/loaders/OBJLoader.js"></script>

        <script src="/Three/three.js/src/Detector.js"></script>
        <script src="/Three/three.js/src/Stats.js"></script>
        <script src="/Three/three.js/src/Tween.js"></script>

        <script src="/alloani_1.js"></script>
        <script src="/Engine/World.js"></script>
        <script src="/Engine/Audio.js"></script>
        <script src="/Game/Characters.js"></script>
        <script src="/Game/Game.js"></script>

        <script>
            var gameWorld = new ENGINE.World();
            gameWorld.Init();

            var game = new GAME.MyGame(gameWorld);
            game.Start();
        </script><div><canvas width="1680" height="906"></canvas></div>



    </body></html>