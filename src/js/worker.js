onmessage = function(e) {
    var data = e.data;
    switch (data.cmd ) {
        case 'start':
            postMessage('WORKER STARTED: ' + data.msg);
            break;
        case 'stop':
            postMessage('WORKER KILLED MERCILESSLY: ' + data.msg +
                '. ( my buttons will not work, gone... like tears in the rain )');
            close(); // Terminates the worker.
            break;
        default:
            postMessage('Unknown command: ' + data.msg);
    }
};