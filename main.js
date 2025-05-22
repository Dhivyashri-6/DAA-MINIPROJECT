// Brute-force algorithm: O(n)
function bruteForceMinMax(arr) {
    let min = arr[0], max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    return {min, max, comparisons: 2 * (arr.length - 1)};
}

// Presorting-based algorithm: O(n log n)
function presortMinMax(arr) {
    let sorted = [...arr].sort((a, b) => a - b);
    return {min: sorted[0], max: sorted[sorted.length - 1], comparisons: "O(n log n)"};
}

// Divide-and-Conquer algorithm: O(n)
function divideAndConquerMinMax(arr) {
    let comparisons = 0;
    function helper(low, high) {
        if (low === high) {
            return {min: arr[low], max: arr[high]};
        }
        if (high === low + 1) {
            comparisons++;
            if (arr[low] < arr[high]) return {min: arr[low], max: arr[high]};
            else return {min: arr[high], max: arr[low]};
        }
        let mid = Math.floor((low + high) / 2);
        let left = helper(low, mid);
        let right = helper(mid + 1, high);
        comparisons += 2;
        return {
            min: left.min < right.min ? left.min : right.min,
            max: left.max > right.max ? left.max : right.max
        };
    }
    let result = helper(0, arr.length - 1);
    result.comparisons = comparisons;
    return result;
}

// Display result for selected algorithm
function displayAlgorithm(type) {
    const input = document.getElementById('arrayInput').value;
    let arr = input.split(',').map(Number).filter(x => !isNaN(x));
    if (arr.length === 0) {
        document.getElementById('results').innerHTML = '<span style="color:#ea5753;">Please enter a valid array.</span>';
        return;
    }

    let html = `<b>Input Array:</b> [${arr.join(', ')}]<br><br>`;
    if (type === 'brute') {
        const brute = bruteForceMinMax(arr);
        html += `<b>Brute-force Algorithm</b><br>
            Min = <span style="color:#00897b;">${brute.min}</span>, 
            Max = <span style="color:#b71c1c;">${brute.max}</span><br>
            Comparisons = ${brute.comparisons}<br>
            <i>Efficiency:</i> <span style="color:#ea5753;">O(n)</span>`;
    } else if (type === 'presort') {
        const sorted = presortMinMax(arr);
        html += `<b>Presorting-based Algorithm</b><br>
            Min = <span style="color:#00897b;">${sorted.min}</span>, 
            Max = <span style="color:#b71c1c;">${sorted.max}</span><br>
            Comparisons = ${sorted.comparisons}<br>
            <i>Efficiency:</i> <span style="color:#ea5753;">O(n log n)</span>`;
    } else if (type === 'divide') {
        const dac = divideAndConquerMinMax(arr);
        html += `<b>Divide-and-Conquer Algorithm</b><br>
            Min = <span style="color:#00897b;">${dac.min}</span>, 
            Max = <span style="color:#b71c1c;">${dac.max}</span><br>
            Comparisons = ${dac.comparisons}<br>
            <i>Efficiency:</i> <span style="color:#ea5753;">O(n)</span>`;
    }
    document.getElementById('results').innerHTML = html;
}