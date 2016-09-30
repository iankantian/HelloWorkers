/**
 * Created by joshuabrown on 9/30/16.
 */
( function(){
    var app = function(){

        var blob = new Blob( [
                "onmessage = function(e) {\
                    var data = e.data;\
                    switch (data.cmd ) {\
                        case 'start':\
                            postMessage('WORKER STARTED: ' + data.msg);\
                            break;\
                        case 'stop':\
                            postMessage('WORKER KILLED MERCILESSLY: ' + data.msg +'. ( my buttons will not work, gone... like tears in the rain )');\
                            close();\
                            break;\
                        default:\
                            postMessage('Unknown command: ' + data.msg);\
                    }\
                };"
            ] ),
            blobURL = window.URL.createObjectURL(blob),
            worker = new Worker(blobURL),
            stopButton = document.getElementById( 'stopButton' ),
            unknownButton = document.getElementById( 'unknownButton' ),
            helloButton = document.getElementById( 'helloButton' ),
            buffer = {},

            logger = ( function(){
                var log = document.getElementById('log');
                return function( message ){
                    log.insertAdjacentHTML('beforeend', '\> ' + message + '<br>');
                };
            }() ),

            sayHI = function() {
                buffer = { 'cmd': 'start', 'msg': 'Hi' };
                worker.postMessage( buffer );
            },

            stop = function() {
                // worker.terminate() from this script would also stop the worker.
                worker.postMessage( { 'cmd': 'stop', 'msg': 'Bye' } );
            },

            unknownCmd = function () {
                worker.postMessage( { 'cmd': 'foobard', 'msg': '???' } );
            };

        window.URL.revokeObjectURL(blobURL); // no longer need it, drop it like a good dog.

        stopButton.addEventListener('click', stop );
        unknownButton.addEventListener('click', unknownCmd );
        helloButton.addEventListener('click', sayHI );

        // here's the only
        worker.addEventListener('message', function(e) {
            logger(e.data);
        }, false);
    };

    var readyChecker = setInterval( function(){
        if( document.readyState == 'complete' ){
            clearInterval( readyChecker );
            app();
        }
    }, 100 );
}() );