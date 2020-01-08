function tagColor(tag, color) {
    // Set the tag color attribute to color.
    for (let node of document.getElementsByTagName(tag)) {
        node.style.color = color;
    }
}

// https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showFormValues() {
    const
        div = '|',
        tagValues = [ "select", "textarea", ],
        // The only tags handled are these:
        tags = [ "input", ].concat(tagValues),
        // The only input types handled are these:
        inputValues = [ "file", "hidden", "password", "text",
            // Input types aded in HTML-5.
            "color", "email", "number", "range", "search", "tel", "url",
            "date", "datetime-local", "month", "week", "time",
        ],
        // Input types with .checked attribute.
        checkedValues = [ "radio", "checkbox", ];
    let html = '',  name = '';

    // Process input from all forms (form) and elements (node) in those forms.
    for (let form of document.getElementsByTagName('form')) {
        // console.log(new XMLSerializer().serializeToString(f))
        let text = (form.id)
            ? `<h3>Form: id="${form.id}"</h3><p>`
            : `<h3>Form:</h3><p>`;
        for (let node of form) {
            // console.log(new XMLSerializer().serializeToString(e));
            let tagName = node.tagName.toLowerCase();
            // Process input from all tags named in tags.
            if (tags.indexOf(tagName) >= 0) {
                // Booleans for supported value tags. node.type is lowercase.
                let supportedValueTag = tagValues.indexOf(tagName) >= 0,
                    supportedInputValueType = tagName == 'input'
                        && inputValues.indexOf(node.type) >= 0,
                    supportedInputCheckedType = tagName == 'input'
                        && checkedValues.indexOf(node.type) >= 0;
                // Set divider around processed inputs... w/o common name...
                if (node.name && node.name.toLowerCase() != name) {
                    name = node.name.toLowerCase();
                    text += `${div} ${name}: `;
                }
                // ...and w/o *any* name.
                if (!node.name && (supportedValueTag 
                    || supportedInputValueType || supportedInputCheckedType)) {
                    name = '';
                    text += `${div} `;
                }
                // Form values for tags.
                if (supportedValueTag && node.value) {
                    text += `"${node.value}" `;
                }
                // Form values for input types.
                if (supportedInputValueType && node.value) {
                    text += `"${node.value}" `;
                    if (node.type == 'color')   /* set forms to color */
                        tagColor('form', node.value);
                }
                // Form values for checked inputs.
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
        //for (let j = 0; (t = document.getElementsByTagName(tags[i])[j]); j++) {
        for (let node of document.getElementsByTagName(tag)) {
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

/*
 * Show form input values in the element with id="inputs" and
 * form element attributes in the element with id="outputs".
 */
function show() {
    document.getElementById("inputs").innerHTML = '';
    document.getElementById("output").innerHTML = '';
    var inputs = showFormValues();
    var outputs = showFormElementAttributes();
    document.getElementById("inputs").innerHTML = inputs;
    document.getElementById("output").innerHTML = outputs;
    return false;
}
