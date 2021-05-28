
//CURT ADDS SOME GLOBALS
var globalSpeed = 0.5;
var globalPoints = 0;
var gateDistances = [];

        var GAME = (function() {
            var hide = function(id) {
                    document.getElementById(id).style.display = "none";
                },
                show = function(id) {
                    document.getElementById(id).style.display = "block";
                };

            return {
                running: false,

                win: function() {
                    show("win");
                    this.running = false;
                    globalPoints = 0;

                },

                loose: function() {
                    if (!this.running) return false;
                    crashSound.play();
                  //  show("loose");
                    this.running = false;
                    // CURT ADD JUST RESTART AFTER CRASH
                    globalPoints = 0;
                    GAME.restart();
                },

                start: function() {
                    hide("start");
                    this.running = true;
                    music.play();
                    globalPoints = 0;
                },

                restart: function() {
                    //crashSound.currentTime=0;
                    NAVIGATION.reset();
                    hide("win");
                    hide("loose");
                    this.running = true;
                    music.currentTime = 0;
                    globalPoints = 0;
                },

                init: function() {
                    show("start");
                    if (!init()) animate();
                    MAPS.set_level(0);
                    NAVIGATION.set();
                }

            }
        })();


        var MAPS = (function() {
            var maps = [];
            maps[0] = {
                mapString: "\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 FF FF FF FF FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF FF FF FF FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 FF FF FF FF FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF FF FF FF FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 FF FF FF FF FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
\
\
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF FF FF FF FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF \
",


    charsPerElement: 2,
    doorsPerMap: 6,
    doorLength: 13,
    runwayLength: 7,
            };

/*
        var MAPS = (function() {
            var maps = [];
            maps[0] = {
                mapString: "\
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF F0 70 30 10 00 00 10 30 70 F0 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF F0 70 30 10 00 00 10 30 70 F0 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF F0 00 00 00 00 00 00 00 00 0F FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 0F 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 FF 00 00 00 FF 00 FF 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 FF 00 00 FF \
FF 00 00 00 00 00 FF 00 00 00 00 FF \
FF 00 00 00 00 00 00 FF 00 00 00 FF \
FF 00 00 00 00 00 FF FF FF FF FF FF \
FF 00 00 00 00 FF 00 00 00 00 00 FF \
FF 00 00 00 FF 00 FF FF FF FF FF FF \
FF FF 00 AA FF 00 00 FF FF FF FF FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF FF 00 AA AA FF FF FF FF FF FF FF \
FF FF 00 00 00 00 00 FF FF FF FF FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 32 00 EA EA EF EF FF FF A8 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 FF 00 00 00 00 FF \
FF FF 00 FF 0F 0F 0F FF FF FF FF 00 \
FF 00 00 00 00 00 00 00 00 00 00 00 \
FF 00 00 87 00 00 44 00 A0 00 00 00 \
FF FF 00 00 00 00 B3 FF FF 00 00 00 \
FF FF 00 00 00 0A FF FF FF 00 00 00 \
00 FF 00 00 FF FF 00 FF FF FF 0F F0 \
00 00 00 00 00 F0 00 FF FF FF FF 00 \
FF 00 00 00 FF 00 00 FF FF 00 00 00 \
00 FF 00 18 FA 00 00 32 56 87 95 00 \
00 FF 00 3C FA 0F FF 32 56 87 00 00 \
00 FF 00 7E FA 0F FF 32 56 87 00 00 \
00 FF 00 8E FA 0F FF 32 56 87 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
00 00 00 00 00 00 00 00 00 00 00 00 \
FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF AA 00 AA 55 AA 55 AA 55 AA 55 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 55 00 55 AA 55 AA 55 AA 55 AA FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF AA 00 AA 55 AA 55 AA 55 AA 55 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 55 00 55 AA 55 AA 55 AA 55 AA FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 FF FF 00 00 00 00 FF \
FF 00 00 00 FF 00 00 FF 00 00 00 FF \
FF 00 00 FF 00 00 00 00 FF 00 00 FF \
FF 00 00 00 00 FF FF 00 00 FF 00 FF \
FF 00 00 00 00 FF FF 00 00 F0 00 FF \
FF 00 00 00 00 FF FF 00 00 F0 00 FF \
FF 00 00 00 00 00 00 00 00 F0 00 FF \
FF 00 00 00 00 00 00 00 00 F0 00 FF \
00 FF 00 00 00 00 00 00 00 FF FF FF \
00 00 00 00 00 00 00 00 00 00 FF 00 \
00 FF 00 00 00 00 00 00 00 00 FF 00 \
00 00 00 00 00 10 10 10 00 00 FF 00 \
FF 00 00 00 00 10 00 10 00 00 00 FF \
FF 00 00 00 00 10 10 10 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 10 00 10 00 00 00 00 00 00 00 FF \
FF F0 00 F0 10 00 00 00 00 00 00 FF \
FF F1 00 F1 F0 00 00 00 00 00 00 FF \
FF F3 00 F3 F1 00 00 00 00 00 00 FF \
FF FF 00 00 FF F0 FF F0 FF F0 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 AA A4 FF A4 33 33 00 00 FF \
FF 00 00 00 FF 00 A4 33 33 00 00 FF \
FF 00 00 00 00 00 A4 00 00 00 00 FF \
FF 00 00 00 00 00 A4 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF DF 00 DF DF DF DF DF DF DF DF FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 08 00 08 FF 08 FF 08 FF 08 FF FF \
FF 08 08 08 08 08 08 08 08 08 00 FF \
FF 0F 00 0F 00 0F 00 0F 00 0F 00 FF \
FF 8F 00 8F 00 8F 00 8F 00 8F 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF FB 00 FB FB FB FB FB FB FB FB FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF E7 00 81 81 81 81 81 81 C3 E7 FF \
FF FF 00 C3 C3 C3 C3 C3 C3 E7 FF FF \
FF FF 00 E7 E7 E7 E7 E7 E7 FF FF FF \
FF FF 00 E7 E7 E7 E7 E7 E7 FF FF FF \
FF FF 00 E7 E7 E7 E7 E7 E7 FF FF FF \
FF FF 00 FF E7 E7 E7 E7 FF FF FF FF \
FF FF 00 FF E7 FF FF E7 FF FF FF FF \
FF FF 00 FF E7 FF FF E7 FF FF FF FF \
FF 81 00 A5 A5 BD BD A5 A5 81 81 FF \
FF 81 00 A5 A5 BD BD A5 A5 81 81 FF \
FF 81 00 87 85 9D 9D 85 87 81 81 FF \
FF 81 00 DF 85 C5 C5 85 DF 81 81 FF \
FF 85 00 C5 9D C5 DD 85 C5 85 87 FF \
FF 85 00 C5 01 01 01 01 C5 85 87 FF \
FF 8D 00 01 01 01 01 01 01 C5 8F FF \
FF CD 00 01 00 00 00 01 01 01 CD FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF EE 00 80 BB EE 03 DE 73 3D E7 FF \
FF EF 00 89 BB FF 63 FF 73 3D EF FF \
FF C5 00 89 BB C7 03 FF 43 05 FF FF \
FF 45 00 01 0F 07 03 FF 03 05 0F FF \
FF 00 00 00 00 00 00 FF 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 06 42 7E 40 00 72 52 5E 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
FF 00 00 00 00 00 00 00 00 00 00 FF \
",

                charsPerElement: 2
            };
*/
            /*
            var MAPS=(function(){
              var maps=[];
            maps[0]={
            mapString: "\
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF F0 70 30 10 00 00 10 30 70 F0 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF F0 70 30 10 00 00 10 30 70 F0 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF F0 00 00 00 00 00 00 00 00 0F FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 F0 00 00 F3 00 FF \
            FF 00 00 00 00 00 00 00 00 FF 00 FF \
            FF 00 0F 00 00 F1 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 FF 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 FF 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 FF 00 FF 00 FF 00 FF 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 FF 00 00 FF \
            FF 00 00 00 FF 00 FF 00 00 00 00 FF \
            FF 00 00 00 00 00 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 FF FF FF FF FF FF \
            FF 00 00 00 00 FF 00 00 00 00 00 FF \
            FF 00 00 00 FF 00 FF FF FF FF FF FF \
            FF FF FF AA FF 00 00 FF FF FF FF FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF FF FF AA AA FF FF FF FF FF FF FF \
            FF FF FF 00 00 00 00 FF FF FF FF FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 32 00 EA EA EF EF FF FF A8 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 FF 00 00 00 00 FF \
            FF FF FF FF 0F 0F 0F FF FF FF FF 00 \
            FF 00 00 00 00 00 00 00 00 00 00 00 \
            FF 00 00 87 00 00 44 00 A0 00 00 00 \
            FF FF FF 00 00 00 B3 FF FF 00 00 00 \
            FF FF FF 00 00 0A FF FF FF 00 00 00 \
            00 FF FF 00 FF FF 00 FF FF FF 0F F0 \
            00 00 0F 00 00 F0 00 FF FF FF FF 00 \
            FF 00 FF 00 FF 00 00 FF FF 00 00 00 \
            00 FF FF 18 FA 00 00 32 56 87 95 00 \
            00 FF FF 3C FA 0F FF 32 56 87 00 00 \
            00 FF FF 7E FA 0F FF 32 56 87 00 00 \
            00 FF FF 8E FA 0F FF 32 56 87 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            00 00 00 00 00 00 00 00 00 00 00 00 \
            FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 FF 00 FF 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF AA 55 AA 55 AA 55 AA 55 AA 55 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 55 AA 55 AA 55 AA 55 AA 55 AA FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF AA 55 AA 55 AA 55 AA 55 AA 55 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 55 AA 55 AA 55 AA 55 AA 55 AA FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 FF FF 00 00 00 00 FF \
            FF 00 00 00 FF 00 00 FF 00 00 00 FF \
            FF 00 00 FF 00 00 00 00 FF 00 00 FF \
            FF 00 FF 00 00 FF FF 00 00 FF 00 FF \
            FF 00 F0 00 00 FF FF 00 00 F0 00 FF \
            FF 00 F0 00 00 FF FF 00 00 F0 00 FF \
            FF 00 F0 00 00 00 00 00 00 F0 00 FF \
            FF 00 F0 00 00 00 00 00 00 F0 00 FF \
            00 FF FF 00 00 00 00 00 00 FF FF FF \
            00 00 FF 00 00 00 00 00 00 00 FF 00 \
            00 FF 00 00 00 00 00 00 00 00 FF 00 \
            00 00 00 00 00 10 10 10 00 00 FF 00 \
            FF 00 00 00 00 10 00 10 00 00 00 FF \
            FF 00 00 00 00 10 10 10 00 00 00 FF \
            FF 00 10 00 00 00 00 00 00 00 00 FF \
            FF 10 F0 10 00 00 00 00 00 00 00 FF \
            FF F0 F1 F0 10 00 00 00 00 00 00 FF \
            FF F1 F3 F1 F0 00 00 00 00 00 00 FF \
            FF F3 FF F3 F1 00 00 00 00 00 00 FF \
            FF FF FF 00 FF F0 FF F0 FF F0 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 FF AA A4 FF A4 33 33 00 00 FF \
            FF 00 00 00 FF 00 A4 33 33 00 00 FF \
            FF 00 00 00 00 00 A4 00 00 00 00 FF \
            FF 00 00 00 00 00 A4 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF DF DF DF DF DF DF DF DF DF DF FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 08 FF 08 FF 08 FF 08 FF 08 FF FF \
            FF 08 08 08 08 08 08 08 08 08 00 FF \
            FF 0F 00 0F 00 0F 00 0F 00 0F 00 FF \
            FF 8F 00 8F 00 8F 00 8F 00 8F 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF FB FB FB FB FB FB FB FB FB FB FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF E7 C3 81 81 81 81 81 81 C3 E7 FF \
            FF FF E7 C3 C3 C3 C3 C3 C3 E7 FF FF \
            FF FF FF E7 E7 E7 E7 E7 E7 FF FF FF \
            FF FF FF E7 E7 E7 E7 E7 E7 FF FF FF \
            FF FF FF E7 E7 E7 E7 E7 E7 FF FF FF \
            FF FF FF FF E7 E7 E7 E7 FF FF FF FF \
            FF FF FF FF E7 FF FF E7 FF FF FF FF \
            FF FF FF FF E7 FF FF E7 FF FF FF FF \
            FF 81 81 A5 A5 BD BD A5 A5 81 81 FF \
            FF 81 81 A5 A5 BD BD A5 A5 81 81 FF \
            FF 81 81 87 85 9D 9D 85 87 81 81 FF \
            FF 81 81 DF 85 C5 C5 85 DF 81 81 FF \
            FF 85 85 C5 9D C5 DD 85 C5 85 87 FF \
            FF 85 85 C5 01 01 01 01 C5 85 87 FF \
            FF 8D C5 01 01 01 01 01 01 C5 8F FF \
            FF CD 01 01 00 00 00 01 01 01 CD FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF EE BB 80 BB EE 03 DE 73 3D E7 FF \
            FF EF BB 89 BB FF 63 FF 73 3D EF FF \
            FF C5 B5 89 BB C7 03 FF 43 05 FF FF \
            FF 45 01 01 0F 07 03 FF 03 05 0F FF \
            FF 00 00 00 00 00 00 FF 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 06 42 7E 40 00 72 52 5E 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            FF 00 00 00 00 00 00 00 00 00 00 FF \
            ",

            charsPerElement: 2
            };
            */

            var width = 9,
                cubeScale = 10,
                slope = 1 * Math.PI / 12,
                mapMesh = false,
                collider = false,
                ymax = 0,
                ground = false,
                faces = false,   // CURT ADD TEST
            cubesMesh = false;




            return {
                parse_level: function(lvl) {

                    var cubeGeometry, roofGeometry;
                    var posZ = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        negZ = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        posX = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        negX = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        posY = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        negY = new THREE.PlaneGeometry(cubeScale, cubeScale),
                        matrix = new THREE.Matrix4();
                    matrix.makeRotationZ(Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    negX.applyMatrix(matrix);

                    matrix.makeRotationZ(-Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    posX.applyMatrix(matrix);

                    matrix.makeRotationX(Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    negZ.applyMatrix(matrix);

                    matrix.makeRotationX(-Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    posZ.applyMatrix(matrix);

                    matrix.makeRotationY(Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    negY.applyMatrix(matrix);

                    matrix.makeRotationY(-Math.PI / 2);
                    matrix.translate({
                        x: 0,
                        y: cubeScale / 2,
                        z: 0
                    });
                    posY.applyMatrix(matrix);

                    cubeGeometry = negX;
                    THREE.GeometryUtils.merge(cubeGeometry, posX);
                    THREE.GeometryUtils.merge(cubeGeometry, posZ);
                    THREE.GeometryUtils.merge(cubeGeometry, negZ);

                    roofGeometry = negY;
                    THREE.GeometryUtils.merge(roofGeometry, posY);



                    var building_textures = [
                        THREE.ImageUtils.loadTexture("images/buildings/1.jpg"),
                        THREE.ImageUtils.loadTexture("images/buildings/2.jpg"),
                        THREE.ImageUtils.loadTexture("images/buildings/3.jpg"),
                        THREE.ImageUtils.loadTexture("images/buildings/4.jpg"),
                        THREE.ImageUtils.loadTexture("images/buildings/5.jpg")
                    ];
                    building_textures[0].repeat.set(1, 1);
                    building_textures[1].repeat.set(1, 1);
                    building_textures[2].repeat.set(1, 1);
                    building_textures[3].repeat.set(1, 1);
                    building_textures[4].repeat.set(1, 1);


                    building_textures.map(function(building_texture) {
                        building_texture.wrapS = building_texture.wrapT = THREE.RepeatWrapping;
                    });

                    var building_materials = [
                        new THREE.MeshPhongMaterial({
                            map: building_textures[0],
                            color: 0xffffff,
                            ambient: 0x777777,
                            specular: 0x999999,
                            shininess: 15,
                            shading: THREE.SmoothShading
                        }),
                        new THREE.MeshPhongMaterial({
                            map: building_textures[1],
                            color: 0xffffff,
                            ambient: 0x777777,
                            specular: 0x999999,
                            shininess: 15,
                            shading: THREE.SmoothShading
                        }),
                        new THREE.MeshPhongMaterial({
                            map: building_textures[2],
                            color: 0xffffff,
                            ambient: 0x777777,
                            specular: 0x999999,
                            shininess: 15,
                            shading: THREE.SmoothShading
                        }),
                        new THREE.MeshPhongMaterial({
                            map: building_textures[3],
                            color: 0xffffff,
                            ambient: 0x777777,
                            specular: 0x999999,
                            shininess: 15,
                            shading: THREE.SmoothShading
                        }),
                        new THREE.MeshPhongMaterial({
                            map: building_textures[4],
                            color: 0xffffff,
                            ambient: 0x777777,
                            specular: 0x999999,
                            shininess: 15,
                            shading: THREE.SmoothShading
                        })
                    ];

                    var roof_texture = THREE.ImageUtils.loadTexture("images/roof.jpg");
                    roof_texture.repeat.set(4, 4);
                    roof_texture.wrapS = roof_texture.wrapT = THREE.RepeatWrapping;
                    var roof_material = new THREE.MeshPhongMaterial({
                        map: roof_texture,
                        color: 0xffffff,
                        ambient: 0x777777,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });


                    var lvlString = maps[lvl].mapString,
                        cubes = [],
                        cube, roof, roofs = false,
                        i = 0,
                        h, z,
                        c, x = 0,
                        y = 0,
                        matrix, zou, zde = 0,
                        cumulated_c = "",
                        texture_indice;
                    collider = [
                        []
                    ];


                	        	// CURT ADD GENERATE MAPSTRING FROM RUNWAY AND DOOR COUNT
          //  maps[0].mapString = maps[0].runwayString + maps[0].mapString * maps[0].doorsPerMap;

                    for (i = 0; i < building_materials.length; i++) cubes.push(false);

                    for (i = 0; i < lvlString.length; i++) {
                        c = lvlString.charAt(i);
                        if (c == "\n" || c == " ") continue;
                        c = (c == "A") ? "10" : c;
                        c = (c == "BA") ? "11" : c;
                        c = (c == "C") ? "12" : c;
                        c = (c == "D") ? "13" : c;
                        c = (c == "E") ? "14" : c;
                        c = (c == "F") ? "15" : c;
                        c = parseInt(c).toString(2);
                        while (c.length < 4) c = "0" + c;
                        cumulated_c = c + cumulated_c;
                        zde++;
                        if (zde < maps[lvl].charsPerElement) {
                            continue;
                        }
                        zde = 0;
                        zou = [];
                        for (h = 0; h < cumulated_c.length; h++) {
                            z = (h - y * Math.sin(slope) - cumulated_c.length);
                            if (cumulated_c.charAt(cumulated_c.length - h - 1) === "0") {
                                zou.push(false);
                                continue;
                            }
                            zou.push(true);

                            //cube=new THREE.CubeGeometry( cubeScale, cubeScale, cubeScale );
                            cube = THREE.GeometryUtils.clone(cubeGeometry);
                            roof = THREE.GeometryUtils.clone(roofGeometry);

                            texture_indice = Math.floor(Math.random() * building_materials.length);
                            matrix.makeTranslation((x - width / 2) * cubeScale, z * cubeScale, y * cubeScale);
                            cube.applyMatrix(matrix);
                            roof.applyMatrix(matrix);

                            if (roofs) {
                                THREE.GeometryUtils.merge(roofs, roof);
                            } else {
                                roofs = roof;
                            }

                            if (cubes[texture_indice]) {
                                THREE.GeometryUtils.merge(cubes[texture_indice], cube);
                            } else {
                                cubes[texture_indice] = cube;
                            }
                        }
                        collider[y][x] = zou;
                        x++;
                        cumulated_c = "";
                        if (x >= width) {
                            x = 0;
                            y++;
                            collider[y] = [];
                        }
                    }
                    ymax = y;

                    for (i = 0; i < cubes.length; i++) {
                        if (!cubes[i]) continue;
                        cubesMesh = new THREE.Mesh(cubes[i], building_materials[i]);
                        cubesMesh.receiveShadow = true;
                        scene.add(cubesMesh);
                    }
                    scene.add(new THREE.Mesh(roofs, roof_material));

                    return true;
                },

                set_ground: function() {
                    var ground_texture = THREE.ImageUtils.loadTexture("images/ground.jpg");
                    ground_texture.repeat.set(width, ymax);
                    ground_texture.wrapS = ground_texture.wrapT = THREE.RepeatWrapping;
                    var ground_material = new THREE.MeshPhongMaterial({
                        map: ground_texture,
                        color: 0xffffff,
                        ambient: 0x111111,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });
                    var groundGeometry = new THREE.PlaneGeometry(width * cubeScale, cubeScale * ymax / Math.cos(slope));
                    var matrix = new THREE.Matrix4();
                    matrix.makeRotationX(Math.atan(Math.sin(slope)));
                    groundGeometry.applyMatrix(matrix);
                    var groundMesh = new THREE.Mesh(groundGeometry, ground_material);
                    //groundMesh.castShadow = true;
                    groundMesh.receiveShadow = true;

                    //groundMesh.rotation.z=0;
                    //groundMesh.rotation.x=slope;
                        //doorLength: 18,
    					//runwayLength: 7,
                            //DON"T TOUCH!!!!
                    groundMesh.translateZ(ymax * 0.5 * cubeScale - 0.5 * cubeScale); //DON"T TOUCH!!!!
                    groundMesh.translateY((-this.get_lvlHight() - ymax * 0.5 * Math.sin(slope)) * cubeScale); //DON"T TOUCH!!!!
                    groundMesh.translateX(-0.5 * cubeScale); //DON"T TOUCH!!!!
                    groundMesh.updateMatrix();
                    if (ground) scene.del(ground);
                    scene.add(groundMesh);
                },


                // ****************************** CURT TEST ADD **************************************
                // ****************************** CURT TEST ADD **************************************
                // ****************************** CURT TEST ADD **************************************
                // ****************************** CURT TEST ADD **************************************


                set_faces: function(doorIndex, door) {
                    var faceR_texture = THREE.ImageUtils.loadTexture(door.right);
                    var faceL_texture = THREE.ImageUtils.loadTexture(door.left);
                    var sign_texture = THREE.ImageUtils.loadTexture(door.sign);

                    var door_texture = THREE.ImageUtils.loadTexture("images/door.jpg");

                    faceR_texture.wrapS = faceR_texture.wrapT = THREE.RepeatWrapping;
                    faceL_texture.wrapS = faceL_texture.wrapT = THREE.RepeatWrapping;
                    sign_texture.wrapS = sign_texture.wrapT = THREE.RepeatWrapping;
                    door_texture.wrapS = sign_texture.wrapT = THREE.RepeatWrapping;


                    var faceR_material = new THREE.MeshPhongMaterial({
                        map: faceR_texture,
                        transparent: true,
                        color: 0xffffff,
                        ambient: 0x111111,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });
                    var faceL_material = new THREE.MeshPhongMaterial({
                        map: faceL_texture,
                        transparent: true,
                        color: 0xffffff,
                        ambient: 0x111111,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });
                    var sign_material = new THREE.MeshPhongMaterial({
                        map: sign_texture,
                        transparent: true,
                        color: 0xffffff,
                        ambient: 0x111111,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });
                    var door_material = new THREE.MeshPhongMaterial({
                        map: door_texture,
                        transparent: true,
                        color: 0xffffff,
                        ambient: 0x111111,
                        specular: 0x999999,
                        shininess: 15,
                        shading: THREE.SmoothShading
                    });
                  //  var faceGeometry = new THREE.PlaneGeometry(width * cubeScale, cubeScale * ymax / Math.cos(slope));
                    var faceR_Geometry = new THREE.PlaneGeometry(2.5 * cubeScale, 2.5 * cubeScale);
                    var faceL_Geometry = new THREE.PlaneGeometry(2.5 * cubeScale, 2.5 * cubeScale);
                    var sign_Geometry = new THREE.PlaneGeometry(2 * cubeScale, 2 * cubeScale);

                    var door_Geometry = new THREE.PlaneGeometry(3 * cubeScale, 7.5 * cubeScale); //taller than the rest

                    var faceR_matrix = new THREE.Matrix4();
                    var faceL_matrix = new THREE.Matrix4();
                    var sign_matrix = new THREE.Matrix4();

                    var door_matrix = new THREE.Matrix4();
                  //  matrix.makeRotationX(Math.atan(Math.sin(slope)));
               //     matrix.makeRotationX(Math.atan(Math.sin(   -1 * Math.PI   )));
                    faceR_matrix.makeRotationX( Math.atan(Math.sin(   -.25 * Math.PI   )) * 2.5);
                    faceL_matrix.makeRotationX( Math.atan(Math.sin(   -.25 * Math.PI   )) * 2.5);
                    sign_matrix.makeRotationX( Math.atan(Math.sin(   -.25 * Math.PI   )) * 2.5);

                    door_matrix.makeRotationX( Math.atan(Math.sin(   -.25 * Math.PI   )) * 2.5);

                 //   matrix.makeRotationY( Math.PI);
                    faceR_Geometry.applyMatrix(faceR_matrix);
                    faceL_Geometry.applyMatrix(faceL_matrix);
                    sign_Geometry.applyMatrix(sign_matrix);

                    door_Geometry.applyMatrix(door_matrix);

                    var faceR_Mesh = new THREE.Mesh(faceR_Geometry, faceR_material);
                    var faceL_Mesh = new THREE.Mesh(faceL_Geometry, faceL_material);
                    var sign_Mesh = new THREE.Mesh(sign_Geometry, sign_material);

                    var doorL_Mesh = new THREE.Mesh(door_Geometry, door_material);
                    var doorR_Mesh = new THREE.Mesh(door_Geometry, door_material);
                    //groundMesh.castShadow = true;
                    faceR_Mesh.receiveShadow = true;
                    faceL_Mesh.receiveShadow = true;
                    sign_Mesh.receiveShadow = true;

                    doorL_Mesh.receiveShadow = true;
                    doorR_Mesh.receiveShadow = true;

                    //groundMesh.rotation.z=0;
                  //  faceMesh.rotation.x=(0.5 * Math.PI);

                 //   faceMesh.translateZ(ymax * 0.5 * cubeScale - 0.5 * cubeScale);
                 //   faceMesh.translateY((-this.get_lvlHight() - ymax * 0.5 * Math.sin(slope)) * cubeScale);
                 //   faceMesh.translateX(-0.5 * cubeScale);

                    faceR_Mesh.translateZ( 1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale); 
                    faceL_Mesh.translateZ( 1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale);
                    sign_Mesh.translateZ(  1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale - 0.1); //subtract a litle to push infront

                    doorL_Mesh.translateZ(  1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale + 0.1); //add a little to push behind other images
                    doorR_Mesh.translateZ(  1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale + 0.1);

                    //store gate distance from origin for score keeping
                    gateDistances[doorIndex] =  1 * doorIndex * cubeScale * maps[0].doorLength  + 1.45 * maps[0].runwayLength * cubeScale;

                    faceR_Mesh.translateY( (-ymax * doorIndex * 0.18 * Math.sin(slope) - 5.5) * cubeScale);
                    faceL_Mesh.translateY( (-ymax * doorIndex * 0.18 * Math.sin(slope) - 5.5) * cubeScale);
                    sign_Mesh.translateY(  (-ymax * doorIndex * 0.18 * Math.sin(slope) - 5.5) * cubeScale);

                    doorL_Mesh.translateY(  (-ymax * doorIndex * 0.18 * Math.sin(slope) - 5.5 -1.5) * cubeScale);
                    doorR_Mesh.translateY(  (-ymax * doorIndex * 0.18 * Math.sin(slope) - 5.5 -1.5) * cubeScale);

                    faceR_Mesh.translateX(2 * cubeScale - 0.5 * cubeScale);
                    faceL_Mesh.translateX(-2 * cubeScale - 0.5 * cubeScale);
                    sign_Mesh.translateX( -0.5 * cubeScale);

                    doorL_Mesh.translateX(-2 * cubeScale - 0.5 * cubeScale);
                    doorR_Mesh.translateX(2 * cubeScale - 0.5 * cubeScale);

                    console.log("FACEMESH POSITION --  x:" + faceR_Mesh.position.x + "  y:" + faceR_Mesh.position.y + "  z:" + faceR_Mesh.position.z);

                    faceR_Mesh.updateMatrix();
                    faceL_Mesh.updateMatrix();
                    sign_Mesh.updateMatrix();
                    doorL_Mesh.updateMatrix();
                    doorR_Mesh.updateMatrix();
                    if (faces) scene.del(faces);
                    scene.add(faceR_Mesh);
                    scene.add(faceL_Mesh);
                    scene.add(sign_Mesh);
                    scene.add(doorL_Mesh);
                    scene.add(doorR_Mesh);
                },

                set_sides: function() {


                },

                set_level: function(lvl) {


                    this.current = lvl;
                    this.parse_level(lvl);
                    this.set_ground();

                    //images for doors
                    var doors = [];
                    doors[0] = {
                        right: "images/happy1.png",
                        left: "images/angry1.png",
                        sign: "images/sign_angry.png"
                    }
                    doors[1] = {
                        right: "images/worried1.png",
                        left: "images/happy2.png",
                        sign: "images/sign_worried.png"
                    }
                    doors[2] = {
                        right: "images/happy1.png",
                        left: "images/angry1.png",
                        sign: "images/sign_angry.png"
                    }
                    doors[3] = {
                        right: "images/worried1.png",
                        left: "images/happy2.png",
                        sign: "images/sign_worried.png"
                    }
                    doors[4] = {
                        right: "images/happy1.png",
                        left: "images/angry1.png",
                        sign: "images/sign_angry.png"
                    }
                    doors[5] = {
                        right: "images/worried1.png",
                        left: "images/happy2.png",
                        sign: "images/sign_worried.png"
                    }

                    // ****************************** CURT TEST ADD
                    //********************* LOOP THROUGH DOORS
                    //********************* LOOP THROUGH DOORS
                    //********************* LOOP THROUGH DOORS
                    for(var i = 0; i < doors.length ; i++){
                        this.set_faces(i, doors[i]);
                    }

                },

                collide: function(position) {
                    var x = Math.round(position.x / cubeScale + width / 2),
                        y = Math.round(position.z / cubeScale);

                    var z = Math.round(this.get_lvlHight() + position.y / cubeScale + y * Math.sin(slope));
                    if (this.get_lvlHight() * cubeScale + position.y + y * Math.sin(slope) * cubeScale < -0.1 * cubeScale) return true;
                    if (x < 0 || x >= width) return true;
                    if (y < 0) return false;
                    if (y >= collider.length - 1) {
                        GAME.win();
                        return false;
                    }
                    return collider[y][x][z];
                },

                get_width: function() {
                    return width;
                },
                get_slope: function() {
                    return slope;
                },
                get_zmax: function(y) {
                    return -y * Math.sin(slope);
                },
                get_lvlHight: function() {
                    return maps[this.current].charsPerElement * 4;
                }
            };
        })();


        var NAVIGATION = (function() {
            var X_sensibility = 0.02,
                Y_sensibility = 0.02,
            //    speed = 0.5,
            	speed = globalSpeed,
                back = 1.08,
                theta = 0,
            //    gamespeed = 50,
                gamespeed = globalSpeed*100,
                phiMin = -Math.PI / 4,
                phi = 0;
            var fall = -speed * Math.sin(MAPS.get_slope());
            var keyDowns = [],
                moveTheta = false,
                movePhi = false,
                delta = 0;
            return {
                keydown: function(event) {
                    event.preventDefault();
                    switch (event.keyCode) {
                        case 37: //left arrow
                            NAVIGATION.addKeyDown(37);
                            break;
                        case 39: //right arrow
                            NAVIGATION.addKeyDown(39);
                            break;
                        case 38: //up arrow
                            NAVIGATION.addKeyDown(38);
                            break;
                        case 40: //down arrow
                            NAVIGATION.addKeyDown(40);
                            break;
                    }
                },

                keyup: function(event) {
                    event.preventDefault();
                    switch (event.keyCode) {
                        case 37: //left arrow
                            NAVIGATION.delKeyDown(37);
                            break;
                        case 39: //right arrow
                            NAVIGATION.delKeyDown(39);
                            break;
                        case 38: //up arrow
                            NAVIGATION.delKeyDown(38);
                            break;
                        case 40: //down arrow
                            NAVIGATION.delKeyDown(40);
                            break;
                    }
                },

                addKeyDown: function(keyCode) {
                    if (keyDowns.indexOf(keyCode) !== -1) return;
                    keyDowns.push(keyCode);
                },

                delKeyDown: function(keyCode) {
                    keyDowns.splice(keyDowns.indexOf(keyCode), 1);
                },

                set: function() {
                    document.onkeydown = this.keydown;
                    document.onkeyup = this.keyup;
                },

                unset: function() {
                    document.onkeydown = null;
                    document.onkeyup = null;
                },

                move: function(keyCode) {
                    switch (keyCode) {
                        case 37: //left arrow
                            NAVIGATION.moveXY(1, 0);
                            moveTheta = true;
                            break;
                        case 39: //right arrow
                            NAVIGATION.moveXY(-1, 0);
                            moveTheta = true;
                            break;
                        case 38: //up arrow
                            NAVIGATION.moveXY(0, 1);
                            movePhi = true;
                            break;
                        case 40: //down arrow
                            NAVIGATION.moveXY(0, -1);
                            movePhi = true;
                            break;
                    }
                },

                moveXY: function(x, y) {
                    theta += x * X_sensibility * delta;
                    if (y > 0 || phi > phiMin) phi += y * Y_sensibility * delta;
                },

                update: function(raw_delta) {


                    //CURT ADDS SPEED UPDATE
                    speed = globalSpeed;
                    gamespeed = globalSpeed*100;

                    delta = raw_delta * gamespeed;
                    if (!tux) return;
                    if (MAPS.collide(tux.position)) {
                        GAME.loose();
                    }
                    moveTheta = false;
                    movePhi = false;
                    keyDowns.map(NAVIGATION.move);
                    if (!moveTheta) theta /= back;
                    if (!movePhi) phi /= back;


                    if (GAME.running) {
                        if (MAPS.get_zmax(tux.position.z) < tux.position.y + 4) { // && Math.sin(phi)<=0.1) { //redresse le zdé
                            //tux.translateY(delta*(fall-speed*0.5));
                            phi += Y_sensibility * delta + 0.04;
                        }
                        tux.translateY(delta * (fall - speed * Math.sin(phi)));
                        tux.translateZ(delta * (speed * Math.cos(theta) * Math.cos(phi)));
                        tux.translateX(delta * speed * Math.sin(theta));

                        tux.rotation.y = theta * 1.5;
                        tux.rotation.x = phi * 1.5;
                        tux.rotation.z = -theta;

                        // CURT ADD
                          console.log("TUX POSITION --  x:" + tux.position.x + "  y:" + tux.position.y + "  z:" + tux.position.z);

                        //GET POINT SCORE
                        for(var i = 0; i < gateDistances.length; i++){
                            if( tux.position.z > (gateDistances[i] + 4 ) && tux.position.z < (gateDistances[i] + 5) ){
                                globalPoints = 10 * (i + 1);
                                $(".display-points").html("POINTS: " + globalPoints);

                                // MAKE FOGGY TO INCREASE DIFFICULTY
                                scene.fog.density = (i + 1) * 0.007;
                            } 
                        }
                        

                    }

                    camera.position.copy(tux.position);
                    camera.position.z -= 5 * (1 + Math.sin(-phi / 3));
                    camera.position.x -= 5 * Math.sin(theta / 3);
                    camera.position.y += 3 * (1 + Math.sin(phi / 3));
                    camera.lookAt(tux.position);

                    spotLight.position.copy(tux.position);
                    spotLight.position.z -= 10; //*(1+Math.sin(-phi));
                    spotLight.position.x -= 10 * Math.sin(theta / 3);
                    spotLight.position.y += 10 * (0.9 + Math.sin(phi / 3));
                    spotLight.lookAt(tux.position);

                    shadowLight.position.copy(spotLight.position);
                    shadowLight.lookAt(tux.position);

                    pointLight.position.copy(tux.position);
                    pointLight.position.z -= 2;
                    pointLight.position.y -= 10;
                    return true;
                },

                reset: function() {
                    theta = phi = 0;
                    tux.position.set(0, 0, 0);
                }
            }
        })();




        var stats, scene, renderer;
        var camera, cameraControl, tux = false,
            skyboxMesh, spotLight, pointLight, shadowLight, music, crashSound, clock = new THREE.Clock();


        function main() {
            GAME.init();
        }

        // init the scene
        function init() {

            if (Detector.webgl) {
                renderer = new THREE.WebGLRenderer({
                    antialias: true, // to get smoother output
                    preserveDrawingBuffer: true // to allow screenshot
                });
                //renderer.setFaceCulling(false);
                renderer.setClearColorHex(0xBBBBBB, 1);
                renderer.shadowMapEnabled = true;
                renderer.shadowMapSoft = true;


                // uncomment if webgl is required
                //}else{
                //	Detector.addGetWebGLMessage();
                //	return true;
            } else {
                renderer = new THREE.CanvasRenderer();
            }
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('container').appendChild(renderer.domElement);

            //music
            music = document.createElement("audio");
            var sourceMusic = document.createElement("source");
            sourceMusic.src = "audio/mixkit-grinding-hard-391.mp3";
            music.loop = true;
            music.preload = true;
            music.autoplay = false;
            music.appendChild(sourceMusic);


            crashSound = document.createElement("audio");
            var sourceMusicCrash = document.createElement("source");
            sourceMusicCrash.src = "audio/crash.ogg";
            crashSound.loop = false;
            crashSound.preload = true;
            crashSound.autoplay = false;
            crashSound.appendChild(sourceMusicCrash);
            crashSound.onended = crashSound.pause;


            // create a scene
            scene = new THREE.Scene();
          //  scene.fog = new THREE.Fog(0x000022, 10, 300);

            //CURT ADD FOG SETTINGS
          //  scene.fog.far = 9999;
          //  scene.fog.near=0.1;

            //CURT ADD EXPERIMENTAL FOG
          //  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
            scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.0025 );    

            // put a camera in the scene
            camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

            camera.position.set(0, 0, 19);
            //camera.rotation.y=Math.PI;			
            camera.updateMatrix();
            //camera.lookAt(new THREE.Vector3(0.,0,-1));			
            scene.add(camera);

            THREEx.WindowResize(renderer, camera);

            var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;
            loader.load('tux.dae', function colladaReady(collada) {

                var tuxScene = collada.scene;
                skin = collada.skins[0];

                tuxScene.scale.x = tuxScene.scale.y = tuxScene.scale.z = 1;
                tuxScene.updateMatrix();
                spotLight.target = tuxScene;
                shadowLight.target = tuxScene;
                tux = tuxScene;
                tux.children[0].castShadow = true;
                tux.children[0].receiveShadow = false;
                //camera.lookAt(tux);
                //camera.updateMatrix();
                scene.add(tux);
            });

            var textureCube = THREE.ImageUtils.loadTextureCube(["images/skybox/posx.jpg", "images/skybox/negx.jpg", "images/skybox/posy.jpg", "images/skybox/negy.jpg", "images/skybox/posz.jpg", "images/skybox/negz.jpg"]);
            var shader = THREE.ShaderUtils.lib["cube"];
            //var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
            shader.uniforms["tCube"].texture = textureCube;
            shader.uniforms["tFlip"].texture = -1;
            //uniforms['tCube'].texture= textureCube; // textureCube has been init before
            var cubeMaterial = new THREE.ShaderMaterial({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
            });
            cubeMaterial.overdraw = true;

            skyboxMesh = new THREE.Mesh(new THREE.CubeGeometry(5000, 5000, 5000), cubeMaterial);
            skyboxMesh.flipSided = true;
            skyboxMesh.castShadow = false;
            skyboxMesh.receiveShadow = false;

            scene.add(skyboxMesh);

            var ambientLight = new THREE.AmbientLight(0x555555);
            scene.add(ambientLight);


            pointLight = new THREE.PointLight(0xff6600, 1, 50);
            scene.add(pointLight);

            spotLight = new THREE.SpotLight(0xaaaaaa, 2, 0, Math.PI / 4, 1);
            spotLight.position.set(0, 0, -1);
            spotLight.castShadow = false;
            scene.add(spotLight);

            shadowLight = new THREE.DirectionalLight(0xaaaaaa, 4, 1);
            shadowLight.position.set(0, 0, -1);
            shadowLight.castShadow = true;
            shadowLight.onlyShadow = true;
            shadowLight.shadowCameraNear = 2;
            shadowLight.shadowCameraFar = 200;
            shadowLight.shadowCameraLeft = -10;
            shadowLight.shadowCameraRight = 10;
            shadowLight.shadowCameraTop = 10;
            shadowLight.shadowCameraBottom = -10;
            shadowLight.shadowCameraVisible = false;
            shadowLight.shadowBias = 0;
            shadowLight.shadowDarkness = 0.5;
            shadowLight.shadowMapWidth = 512;
            shadowLight.shadowMapHeight = 512;
            scene.add(shadowLight);
        }

        // animation loop
        function animate() {

            // loop on request animation loop
            // - it has to be at the begining of the function
            // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
            requestAnimationFrame(animate);

            // do the render
            render();

        }

        // render the scene
        function render() {

            // update camera controls
            //cameraControls.update();
            NAVIGATION.update(clock.getDelta());

            // actually render the scene

            renderer.render(scene, camera);
        }
