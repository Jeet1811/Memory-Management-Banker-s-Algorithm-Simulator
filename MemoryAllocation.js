function addProcessInput() {
    var numProcesses = document.getElementById("numProcesses").value;
    var processSizesDiv = document.getElementById("processSizes");
    processSizesDiv.innerHTML = "";
    for (var i = 0; i < numProcesses; i++) {
        processSizesDiv.innerHTML += '<label for="process' + (i + 1) + '">Process ' + (i + 1) + ' Size: </label>' +
            '<input type="number" id="process' + (i + 1) + '"><br>';
    }
}

function addBlockInput() {
    var numBlocks = document.getElementById("numBlocks").value;
    var blockSizesDiv = document.getElementById("blockSizes");
    blockSizesDiv.innerHTML = "";
    for (var i = 0; i < numBlocks; i++) {
        blockSizesDiv.innerHTML += '<label for="block' + (i + 1) + '">Block ' + (i + 1) + ' Size: </label>' +
            '<input type="number" id="block' + (i + 1) + '"><br>';
    }
}

function allocateMemory() {
    var numProcesses = document.getElementById("numProcesses").value;
    var processes = [];
    for (var i = 0; i < numProcesses; i++) {
        processes.push(parseInt(document.getElementById("process" + (i + 1)).value));
    }

    var numBlocks = document.getElementById("numBlocks").value;
    var blocks = [];
    for (var i = 0; i < numBlocks; i++) {
        blocks.push(parseInt(document.getElementById("block" + (i + 1)).value));
    }

    var allocationStrategy = document.getElementById("allocationStrategy").value;
    var allocation;
    var internalFragmentation = 0;
    var externalFragmentation = 0;
    
    if (allocationStrategy === "firstFit") {
        var result = firstFit(processes, blocks);
        allocation = result.allocation;
        internalFragmentation = result.internalFragmentation;
        externalFragmentation = result.externalFragmentation;
    } else if (allocationStrategy === "bestFit") {
        var result = bestFit(processes, blocks);
        allocation = result.allocation;
        internalFragmentation = result.internalFragmentation;
        externalFragmentation = result.externalFragmentation;
    } else if (allocationStrategy === "worstFit") {
        var result = worstFit(processes, blocks);
        allocation = result.allocation;
        internalFragmentation = result.internalFragmentation;
        externalFragmentation = result.externalFragmentation;
    } else if (allocationStrategy === "nextFit") {
        var result = nextFit(processes, blocks);
        allocation = result.allocation;
        internalFragmentation = result.internalFragmentation;
        externalFragmentation = result.externalFragmentation;
    } 

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<h2>Allocation Result:</h2>';

    var table = '<table class="allocation-table"><tr><th>Process ID</th><th>Process Size</th><th>Allocated Block</th></tr>';
    for (var i = 0; i < allocation.length; i++) {
        table += '<tr><td>' + (i + 1) + '</td><td>' + processes[i] + '</td><td>' +
            (allocation[i] != -1 ? allocation[i] + 1 : 'Not Allocated') + '</td></tr>';
    }
    table += '</table>';
    resultDiv.innerHTML += table;

    var memoryBlocks = '<div class="memory-blocks">';
    for (var i = 0; i < blocks.length; i++) {               // block ni andar >1 karta vadhu process aave mate array
        var processIndices = [];
        for (var j = 0; j < allocation.length; j++) {
            if (allocation[j] === i) {                     // block ni size mathi indx ane allocation mathi element check 
                processIndices.push(j + 1);
            }
        }
        var processInfo = processIndices.length > 0 ? '<div class="process-info">Process ' + processIndices.join(', ') + '</div>' : '';
        var blockInfo = 'Block ' + (i + 1) + ' (' + blocks[i] + ')';
        memoryBlocks += '<div class="memory-block">' +
            '<div class="block-info">' + blockInfo + '</div>' +
            processInfo +
            '</div>';
    }
    memoryBlocks += '</div>';
    resultDiv.innerHTML += memoryBlocks;

    resultDiv.innerHTML += '<p>Internal Fragmentation: ' + internalFragmentation + '</p>';
    resultDiv.innerHTML += '<p>External Fragmentation: ' + externalFragmentation + '</p>';
}

function firstFit(processes, blocks) {
    var allocation = new Array(processes.length).fill(-1);
    var availableBlocks = blocks.slice();
    var internalFragmentation = 0;
    var externalFragmentation = 0;

    for (var i = 0; i < processes.length; i++) {  
        var allocated = false;
        for (var j = 0; j < availableBlocks.length; j++) {
            if (availableBlocks[j] >= processes[i]) {
                allocation[i] = j;
                internalFragmentation += availableBlocks[j] - processes[i]; 
                availableBlocks[j] -= processes[i]; 
                allocated = true;
                break;
            }
        }
        if (!allocated) {
            externalFragmentation += processes[i]; 
        }
    }
    
    return {
        allocation: allocation,
        internalFragmentation: internalFragmentation,
        externalFragmentation: externalFragmentation
    };
}

function worstFit(processes, blocks) {
    var allocation = new Array(processes.length).fill(-1);
    var availableBlocks = blocks.slice();
    var internalFragmentation = 0;
    var externalFragmentation = 0;

    for (var i = 0; i < processes.length; i++) {
        var worstBlockIdx = -1;
        var worstFitSize = -1;
            // worst fit block ni size pn jose 
            // -1 batave ke first block 
        for (var j = 0; j < availableBlocks.length; j++) {
            if (availableBlocks[j] >= processes[i] && (worstBlockIdx === -1 || availableBlocks[j] > availableBlocks[worstBlockIdx])) {
                worstBlockIdx = j;
                worstFitSize = availableBlocks[j];
            }
        }

        if (worstBlockIdx != -1) {
            allocation[i] = worstBlockIdx;
            internalFragmentation += availableBlocks[worstBlockIdx] - processes[i];
            availableBlocks[worstBlockIdx] -= processes[i];
        } else {
            externalFragmentation += processes[i];
        }
    }

    return {
        allocation: allocation,
        internalFragmentation: internalFragmentation,
        externalFragmentation: externalFragmentation
    };
}

function nextFit(processes, blocks) {
    var allocation = new Array(processes.length).fill(-1);
    var availableBlocks = blocks.slice();
    var internalFragmentation = 0;
    var externalFragmentation = 0;
    var lastBlockIdx = -1;

    for (var i = 0; i < processes.length; i++) {
        var startBlockIdx = (lastBlockIdx + 1) % availableBlocks.length;
        var blockFound = false;

        for (var j = startBlockIdx; j < availableBlocks.length; j++) {
            if (availableBlocks[j] >= processes[i]) {
                allocation[i] = j;
                internalFragmentation += availableBlocks[j] - processes[i];
                availableBlocks[j] -= processes[i];
                lastBlockIdx = j;
                blockFound = true;
                break;
            }
        }

        if (!blockFound) {
            for (var j = 0; j < startBlockIdx; j++) {
                if (availableBlocks[j] >= processes[i]) {
                    allocation[i] = j;
                    internalFragmentation += availableBlocks[j] - processes[i];
                    availableBlocks[j] -= processes[i];
                    lastBlockIdx = j;
                    blockFound = true;
                    break;
                }
            }
        }

        if (!blockFound) {
            externalFragmentation += processes[i];
        }
    }

    return {
        allocation: allocation,
        internalFragmentation: internalFragmentation,
        externalFragmentation: externalFragmentation
    };
}

function bestFit(processes, blocks) {
    var allocation = new Array(processes.length).fill(-1);
    var availableBlocks = blocks.slice();
    var internalFragmentation = 0;
    var externalFragmentation = 0;

    for (var i = 0; i < processes.length; i++) {
        var bestBlockIdx = -1;
        var bestFitSize = Number.MAX_SAFE_INTEGER;

        for (var j = 0; j < availableBlocks.length; j++) {
            if (availableBlocks[j] >= processes[i] && availableBlocks[j] - processes[i] < bestFitSize) {
                bestBlockIdx = j;
                bestFitSize = availableBlocks[j] - processes[i];
            }
        }

        if (bestBlockIdx != -1) {
            allocation[i] = bestBlockIdx;
            internalFragmentation += availableBlocks[bestBlockIdx] - processes[i];
            availableBlocks[bestBlockIdx] -= processes[i];
        } else {
            externalFragmentation += processes[i];
        }
    }

    return {
        allocation: allocation,
        internalFragmentation: internalFragmentation,
        externalFragmentation: externalFragmentation
    };
}

