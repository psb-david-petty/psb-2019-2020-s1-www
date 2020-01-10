/* show();
 *
 * Look at every element in every form and, if it is one of "input" (if
 * element's type is *not* "checkbox" or "radio"), "select", or "textarea"
 * and if it has a name, set internalHTML of element whose id matches name 
 * to node's value.
 *
 * If element is "input" and element's type is "checkbox" or "radio", 
 * - Create maps w/ keys for every token in "data-valid" attribute of form.
 * - For every checkbox whose "name" matches a key and every "radio" whose
 *   "class" contains a key:
 *   - count number of elements containing "value", storing them in a map
 *
 * Finally:
 * - call showMaps(maps);           // to set elements' internalHTML matching keys
 * - call hideShow(hideId, showId); // to reveal element with id showId
 */
function show(hideId, showId) {
    let maps = initializeCheckboxRadioMap('form', 'data-valid');
    for (let form of document.getElementsByTagName('form')) {
        console.log(form);
        for (let node of form.elements) {
            console.log(node);
            let tagName = node.tagName.toLowerCase();

            /* handle form tags that are not checkbox or radio */
            if (([ "select", "textarea", ].indexOf(tagName) >= 0
                || [ "input", ].indexOf(tagName) >= 0
                    && [ "checkbox", "radio", ].indexOf(node.type) < 0)
                    && node.name) {
                if (document.getElementById(node.name)) {
                    document.getElementById(node.name).innerHTML = node.value;
                }
            }

            /* handle checkbox differently w/ map for node.name */
            if (tagName == 'input' && node.type == 'checkbox' && node.name) {
                if (maps.has(node.name) && node.value) {
                    /* increment maps.get(node.name) map count for node.value key */
                    let map = maps.get(node.name);
                    map.set(node.value, (map.has(node.value)
                        ? map.get(node.value) : 0)
                            + (node.checked ? 1 : 0));
                    console.log(map);
                }
            }

            /* handle radio differently w/ map for node.className tokens */
            if (tagName == 'input' && node.type == 'radio' && node.className) {
                for (classToken of node.className.split(' ')) {
                    if (maps.has(classToken) && node.value) {
                        /* increment maps.get(classToken) map count for node.value key */
                        let map = maps.get(classToken);
                        map.set(node.value, (map.has(node.value)
                            ? map.get(node.value) : 0)
                                + (node.checked ? 1 : 0));
                        console.log(map);
                    }
                }
            }
        }
    }
    showMaps(maps);
    hideShow(hideId, showId);
    return false;
}

/* Return a Map of maps w/ keys from space-separated tokens in attr of tag 
 * w/ id and values initialized to new Maps.
 */
function initializeCheckboxRadioMap(id, attr) {
    let maps = new Map(),
        node = document.getElementById(id);
    if (node && node.getAttribute(attr)) {
        for (let key of node.getAttribute(attr).split(' ')) {
            maps.set(key, new Map());
        }
    }
    console.log(`map: ${Array.from(maps)};`);
    return maps;
}

/* For every node whose id is a key of maps, show maps.get(key) as its InnerHTML.
 * TODO: process maps.get(key) map(s) (which contain counts of checkboxes and
 *       radio buttons) in some other way.
 */
function showMaps(maps) {
    for (let mapsKey of maps.keys()) {
        let map = maps.get(mapsKey);
        node = document.getElementById(mapsKey);
        console.log(map, node);
        if (node) {
            for (let key of map.keys()) {
                /* ADD CHECKBOX / RADIO MAP PROCESSING HERE */
                node.innerHTML = `${mapsKey}=${Array.from(map)}`
                    + ' /* DO SOMETHING WITH THESE VALUES */';
                console.log(`document.getElementById('${key}').InnerHTML = '${node.innerHTML}'`);
            }
        }
    }
}

/* Hide tag w/ id hideID by setting 'display: none;' and show tag w/
 * id showID by setting 'display: block;'.
 */
function hideShow(hideID, showID) {
    if (document.getElementById(hideID))
        document.getElementById(hideID).style.display = 'none';
    if (document.getElementById(showID))
        document.getElementById(showID).style.display = 'block';
}
