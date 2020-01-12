/* Return HTML for form input values for all elements of all forms.
 */
function showFormInputValues() {
    const
        div = '|',
        tagValues = [ "select", "textarea", ],
        /* the only tags handled are these: */
        tags = [ "input", ].concat(tagValues),
        /* the only input types handled are these: */
        inputValues = [ "file", "hidden", "password", "text",
            /* input types added in HTML-5: */
            "color", "email", "number", "range", "search", "tel", "url",
            "date", "datetime-local", "month", "week", "time",
        ],
        /* input types with .checked attribute: */
        checkedValues = [ "radio", "checkbox", ];
    let html = '',  name = '';

    /* process input from all forms (form) and elements (node) in those forms */
    for (let form of document.querySelectorAll('form')) {
        /* add <h3> header w/ form and its id */
        let text = (form.id)
            ? `<h3>Form: id="${form.id}"</h3><p>`
            : `<h3>Form:</h3><p>`;
        for (let node of form) {
            let tagName = node.tagName.toLowerCase();
            /* process input from all tags named in tags */
            if (tags.indexOf(tagName) >= 0) {
                /* set Booleans for supported value tags; node.type is lowercase */
                let supportedValueTag = tagValues.indexOf(tagName) >= 0,
                    supportedInputValueType = tagName == 'input'
                        && inputValues.indexOf(node.type) >= 0,
                    supportedInputCheckedType = tagName == 'input'
                        && checkedValues.indexOf(node.type) >= 0;

                /* set divider around processed inputs... w/o common name... */
                if (node.name && node.name.toLowerCase() != name) {
                    name = node.name.toLowerCase();
                    text += `${div} ${name}: `;
                }
                /* ...and w/o *any* name */
                if (!node.name && (supportedValueTag 
                    || supportedInputValueType || supportedInputCheckedType)) {
                    name = '';
                    text += `${div} `;
                }

                /* form values for tags */
                if (supportedValueTag && node.value) {
                    text += `"${node.value}" `;
                }
                /* form values for input types */
                if (supportedInputValueType && node.value) {
                    text += `"${node.value}" `;
                }
                /* form values for checked input types */
                if (supportedInputCheckedType) {
                    text += `[${node.checked}] `;
                }
            }
        }
        text += `${div}</p>`;
        console.log(text + '\n');
        html += text;
    }
    return html;
}

/* Return HTML for all form element attributes, including <pre> for code itself.
 */
function showFormElementAttributes() {
    let html = '';
    const tags = [
        "form", "input", "textarea", "label", "button",
        "fieldset", "legend", "select", "optgroup", "datalist", "option",
        "output",
    ];
    // Process every attribute of element in tags.
    //for (let i = 0; i < tags.length; i++) {
    for (let tag of tags) {
        let text = '';
        //for (let j = 0; (t = document.querySelectorAll(tags[i])[j]); j++) {
        for (let node of document.querySelectorAll(tag)) {
            //for (let k = 0; (a = t.attributes[k]); k++) {
            for (let attr of node.attributes) {
                text += `${attr.name} = "${attr.value}" `;
                // Take special note of CHECKED.
                if (attr.name.toLowerCase() == "type"
                    && (attr.value.toLowerCase() == "radio"
                        || attr.value.toLowerCase() == "checkbox"))
                    text += `CHECKED="${node.checked}" `;
            }
            // Take special note of VALUE.
            if (node.value)
                text += `VALUE="${node.value}" `;
            // Add HTML code as a <pre> last.
            if (htmlEntities(node.innerHTML))
                text += '<pre style="display: inline-block; margin: 0;">' 
                    + htmlEntities(node.innerHTML) + '</pre>';
            if (text)
                text += '<br>';
        }
        text = `<h3>Form element: &lt;${tag}&gt;</h3><p>${text}</p>`;
        console.log(text + '\n');
        html += text;
    }
    return html;
}

/* Create closure for event on setSelector to change color on changeSelector.
 */
function setWatchColorPicker(setSelector, changeSelector) {
    /* closure to change color on changeSelector in response to event */
    function watchColorPicker(event) {
        document.querySelectorAll(changeSelector).forEach(function(s) {
            s.style.color = event.target.value;
        });
    }
    node = document.querySelector(setSelector);
    if (node) {
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
        node.addEventListener("input", watchColorPicker, false);
        node.addEventListener("change", watchColorPicker, false);
        // node.select();  /* select text content of the color input */
        //                 /* if control is implemented as a text field */
        console.log(`setWatchColorPicker: watching "${setSelector}" to change color of "${changeSelector}"`);
    }
}

/* Show form values in the element with id formID and form
 * element attributes in the element with id elementID.
 */
function show(formSelector, elementSelector) {
    document.querySelector(formSelector).innerHTML = '';
    document.querySelector(elementSelector).innerHTML = '';
    var inputs = showFormInputValues();
    var outputs = showFormElementAttributes();
    document.querySelector(formSelector).innerHTML = inputs;
    document.querySelector(elementSelector).innerHTML = outputs;
    return false;
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
