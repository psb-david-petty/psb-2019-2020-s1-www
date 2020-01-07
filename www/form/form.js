function bodyColor(color) {
    // Set the body color attribute to color.
    for (let i = 0; (b = document.getElementsByTagName('body')[i]); i++) {
        b.style.color = color;
    }
}

// https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showFormValues() {
    var name = '', html = '';
    const
        div = '|',
        tagValues = [ "select", "textarea", ],
        // The only tags handled are these:
        tags = [ "input", ].concat(tagValues),
        // The only input types handled are these:
        inputValues = [ "file", "hidden", "password", "text",
            // input types aded in HTML-5
            "color", "email", "number", "range", "search", "tel", "url",
            "date", "datetime-local", "month", "week", "time",
        ],
        checkedValues = [ "radio", "checkbox", ];

    // Process input from all forms (f) and elements (e) in those forms.
    var f;
    for (let i = 0; (f = document.getElementsByTagName('form')[i]); i++) {
        var e, text = '<h3>Form:';
        // console.log(new XMLSerializer().serializeToString(f))
        if (f.id) {
            text += ' id=\"' + f.id + '\"';
        }
        text += '</h3><p>';
        for (let j = 0; (e = f[j]); j++) {
            // console.log(new XMLSerializer().serializeToString(e));
            var tagName = e.tagName.toLowerCase();
            // Process input from all tags in tags.
            if (tags.indexOf(tagName) >= 0) {
                // Booleans for supported value tags. e.type is lowercase.
                var supportedValueTag = tagValues.indexOf(tagName) >= 0,
                    supportedInputValueType = tagName == 'input'
                        && inputValues.indexOf(e.type) >= 0,
                    supportedInputCheckedType = tagName == 'input'
                        && checkedValues.indexOf(e.type) >= 0;
                // Set divider around processed inputs... w/o common name.
                if (e.name && e.name.toLowerCase() != name) {
                    name = e.name.toLowerCase();
                    text += div + ' ' + name + ': ';
                }
                // ...and w/o *any* name.
                if (!e.name && (supportedValueTag 
                    || supportedInputValueType || supportedInputCheckedType)) {
                    name = '';
                    text += div + ' ';
                }
                // Form values for tags.
                if (supportedValueTag && e.value) {
                    text += '\"' + e.value + '\" ';
                }
                // Form values for input types.
                if (supportedInputValueType && e.value) {
                    text += '\"' + e.value + '\" ';
                }
                // Form values for checked inputs.
                if (supportedInputCheckedType) {
                    text += e.checked + ' ';
                }
            }
        }
        text += div + '</p>'
        console.log(text + '\n');
        html += text;
    }
    return html;
}

function showFormElementAttributes() {
    var html = '';
    const tags = [
        "form", "input", "textarea", "label", "button",
        "fieldset", "legend", "select", "optgroup", "datalist", "option",
        "output",
    ];
    // Process every attribute of element in tags.
    for (let i = 0; i < tags.length; i++) {
        var t, a, text = '';
        for (let j = 0; (t = document.getElementsByTagName(tags[i])[j]); j++) {
            for (let k = 0; (a = t.attributes[k]); k++) {
                text += a.name + '=' + '\"' + a.value + '\"' + ' ';
                // Take special note of CHECKED.
                if (a.name.toLowerCase() == "type"
                    && (a.value.toLowerCase() == "radio"
                        || a.value.toLowerCase() == "checkbox"))
                    text += 'CHECKED=\"' + t.checked + '\"" ';
            }
            // Take special note of VALUE.
            if (t.value)
                text += 'VALUE=\"' + t.value + '\" ';
            // Add HTML code as a <pre> last.
            if (htmlEntities(t.innerHTML))
                text += '<pre style="display: inline-block; margin: 0;">' 
                    + htmlEntities(t.innerHTML) + '</pre>';
            if (text) text += '<br>';
        }
        text = '<h3>Form element: &lt;' + tags[i] + '&gt;</h3><p>' + text + '</p>'
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
