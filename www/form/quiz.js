function showAnswers(form) {
    /* showAnswers reads quiz answers and tabulates them in a map, then
     * uses the map to calculate maximum score(s), display answer, and
     * selectively display figures. It assumes:
     * - there exists an element <input type="submit" 
     *   onclick="showAnswers('FORM');"> where FORM is the id of the
     *   tag w/ a data-valid attribute
     * - there exists an element with <TAG id="FORM" 
     *   data-valid="V1 V2 V3 V4">, where the data-valid attribute has 
     *   (in this case) four space-separated valid values
     * - there exist <input type="radio" name="qM" value="VALUE"> for:
     *   -- question M -- a unique name for every question
     *   -- value VALUE -- a unique value for every different answer
     * - there exist <span id="VALID"></span> elements to display totals 
     *   for each valid value
     * - there exists a <span id="answer"></span> element to display the 
     *   answer (or answers if more than one)
     * - there exists <figure data-key="VALID"> for each valid value to 
     *   be made visible
     */

    /* create set of valid keys from "valid" id element's data-valid 
     * attribute
     */
    const valid = new Set(
        document.getElementById('valid').getAttribute('data-valid').
            split(' ')
                .map(Function.prototype.call, String.prototype.toLowerCase)
    );
    console.log(Array.from(valid));

    /* process input node list, summing the number of each valid 
     * radio value checked in map
     */
    let map = new Map();    /* { valid_key: total_checked } */
    let inputs              /* all input nodes */
        = document.getElementsByTagName('input');
    for (let node of inputs) {
        if (node.type == 'radio') {
            let key = node.value.toLowerCase(), checked = node.checked;
            if (valid.has(key))
                /* increment value for each valid key */
                map.set(key, (map.has(key) ? map.get(key) : 0) 
                    + (checked ? 1 : 0));
            console.log(key);
        }
    }

    /* set 'display: none;' on all figures with valid data-key attribute 
     */
    let figures             /* all figure nodes */
        = document.getElementsByTagName('figure');
    for (let node of figures)
        if (valid.has(node.getAttribute('data-key')))
            node.setAttribute('style', 'display: none;');

    /* for valid keys w/ non-zero maximum value, create answer string 
     * w/ all keys and set 'display: block;' for all figures with 
     * data-key attribute 
     */
    let maximum = Math.max(...map.values()), answer = '';
    console.log(maximum);
    if (maximum > 0)
        for (let key of map.keys()) {
            if (map.get(key) == maximum) {
                /* concatenate key to answer */
                answer += (answer ? ' / ' : '') + key;
                /* find node for key and set style */
                for (let node of figures) {
                    if (key == node.getAttribute('data-key'))
                        node.setAttribute('style', 'display: block;');
                }
            }
        }

    /* display key / value pairs in elements with id from map keys 
     */
    for (let entry of map.entries()) {
        let key = entry[0], value = entry[1];
        document.getElementById(key).innerHTML 
            = '' + key + ' = ' + map.get(key) + '; ';
        console.log(document.getElementById(key).innerHTML);
    }

    /* display answer in element with 'answer' id 
     */
    document.getElementById('answer').innerHTML 
        = answer;
    console.log(answer);

    return false;
}