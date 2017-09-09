function initConsole() {
    const origConsole = console;

    console = {
        log: function() {
            const newargs = ["[D]"].concat(Array.from(arguments));
            origConsole.log.apply(null, newargs);
        }
    };
}

function printBuildId() {
    const buildId = document.getElementById('StrBuildId').innerHTML;
    console.log(buildId);
}

// MAIN!
(function() {
    initConsole();
    printBuildId();
})();
