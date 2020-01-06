// https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showFormValues() {
    var name = '', html = '';
    const
        tags = [ "input", "textarea", ],
        checked = [ "radio", "checkbox", ],
        // The only input types handled are these:
        handled = [ "text", "password", ].concat(checked);

    // Look at all forms.
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
            if (tags.indexOf(tagName) >= 0) {
                if (e.name && e.name.toLowerCase() != name) {
                    name = e.name.toLowerCase();
                    text += '| ' + name + ': ';
                }
                if (!e.name && tagName == 'input' && handled.indexOf(e.type) >= 0) {
                    name = '';
                    text += '| ';
                }
                // Form values for tags.
                if (tagName == 'textarea' && e.value) {
                    text += '\"' + e.value + '\" ';
                }
                // Form values for input tags. e.type is lowercase.
                if (tagName == 'input' && e.type == 'text' && e.value) {
                    text += '\"' + e.value + '\" ';
                }
                if (tagName == 'input' && e.type == 'password' && e.value) {
                    text += '\"' + e.value + '\" ';
                }
                if (tagName == 'input' && checked.indexOf(e.type) >= 0) {
                    text += e.checked + ' ';
                }
            }
        }
        text += '|</p>'
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
    for (let i = 0; i < tags.length; i++) {
        var t, a, text = '';
        for (let j = 0; (t = document.getElementsByTagName(tags[i])[j]); j++) {
            for (let k = 0; (a = t.attributes[k]); k++) {
                text += a.name + '=' + '\"' + a.value + '\"' + ' ';
                if (a.name.toLowerCase() == "type"
                    && (a.value.toLowerCase() == "radio"
                        || a.value.toLowerCase() == "checkbox"))
                    text += 'CHECKED=\"' + t.checked + '\"" ';
            }
            if (t.value)
                text += 'VALUE=\"' + t.value + '\" ';
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

function show() {
    document.getElementById("inputs").innerHTML = '';
    document.getElementById("output").innerHTML = '';
    var inputs = showFormValues();
    var outputs = showFormElementAttributes();
    document.getElementById("inputs").innerHTML = inputs;
    document.getElementById("output").innerHTML = outputs;
    return false;
}