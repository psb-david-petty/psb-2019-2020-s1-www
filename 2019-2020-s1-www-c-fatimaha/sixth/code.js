
function show(hideSelector, showSelector) {
    let maps = initializeCheckboxRadioMap('form', 'data-valid');
    for (let form of document.querySelectorAll('form')) {
        console.log(form);
        for (let node of form.elements) {
            console.log(node);
            let tagName = node.tagName.toLowerCase();

            /* handle form tags that are not checkbox or radio */
            if (([ "select", "textarea", ].indexOf(tagName) >= 0
                || [ "input", ].indexOf(tagName) >= 0
                    && [ "checkbox", "radio", ].indexOf(node.type) < 0)
                    && node.name) {
                let selector = `#${node.name}`;
                if (document.querySelector(selector)) {
                    document.querySelector(selector).innerHTML = node.value;
                    logHTML(selector);
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
    hideShow(hideSelector, showSelector);
    return false;
}

/* Return a Map of maps w/ keys from space-separated tokens in attr of tag 
 * w/ selector and values initialized to new Maps.
 */
function initializeCheckboxRadioMap(selector, attr) {
    let maps = new Map(),
        node = document.querySelector(selector);
    if (node && node.getAttribute(attr)) {
        for (let key of node.getAttribute(attr).split(' ')) {
            maps.set(key, new Map());
        }
    }
    console.log(Array.from(maps));
    return maps;
}

/* For every node whose id is a key of maps, show maps.get(key) as its InnerHTML.
 * TODO: process maps.get(key) map(s) (which contain counts of checkboxes and
 *       radio buttons) in some other way.
 */
function showMaps(maps) {
    for (let mapsKey of maps.keys()) {
        let map = maps.get(mapsKey);
        let selector = `#${mapsKey}`;
        node = document.querySelector(selector);
        console.log(map, node);
        if (node) {
            for (let key of map.keys()) {
                /* ADD CHECKBOX / RADIO MAP PROCESSING HERE */
                node.innerHTML = `${mapsKey}=${Array.from(map)}`
                    + ' /* DO SOMETHING WITH THESE VALUES */';
            }
            logHTML(selector);
        }
    }
}

/* Hide tag w/ id hideID by setting 'display: none;' and show tag w/
 * id showID by setting 'display: block;'.
 */
function hideShow(hideSelector, showSelector) {
    if (document.querySelector(hideSelector))
        document.querySelector(hideSelector).style.display = 'none';
    if (document.querySelector(showSelector))
        document.querySelector(showSelector).style.display = 'block';
}

/* Log innerHTML for selector.
 */
function logHTML(selector) {
    let node = document.querySelector(selector);
    if (node) {
        console.log(`querySelector('${selector}').innerHTML="${node.innerHTML}"`);
    }
}

/* Replace HTML characters w/ their character entities.
 * https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
 */
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\|/g,'&vert;');
}

/* Set selector color to color.
 */
function selectorColor(selector, color) {
    for (let node of document.querySelectorAll(selector)) {
        node.style.color = color;
    }
}
