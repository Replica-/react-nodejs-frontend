export function decodeEntities(encodedString) {
   /*
    var prefix = encodedString.split("-");

    if (prefix.length > 1) {
        prefix.shift();
        encodedString = prefix.join();
    }
    */
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    var textString = textArea.value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    if (textString.indexOf("(EC08)") != -1) {
        textString = textString.replace("Timber Frame Internal Wall Systems - ", "");
        textString = textString.replace("Steel Frame Internal Wall Systems - ", "");
    } else {
    }

    //textString = textString.replace("Timber Frame Internal Wall Systems - ", "");
    textString = textString.replace(/_/g, "/");
    textString = textString.replace("Roof/ceiling", "Roof/Ceiling");
    textString = textString.replace("Floor/ceiling", "Floor/Ceiling");
    textString = textString.replace("Ec08", "EC08");
    textString = textString.replace("(EC08)", "");
    textString = textString.replace("Owa ", "OWA ");
    textString = textString.replace("Heb1", "HEB1");
    textString = textString.replace("Powerpanel", "PowerPanel");
    textString = textString.replace("(Frl)", "(FRL)");
    textString = textString.replace("Frl", "FRL");
    textString = textString.replace("Csr ", "CSR ");
    textString = textString.replace("Stratawall", "StrataWall");
    textString = textString.replace("party", "Party");
    textString = textString.replace("Faã§ade", "Façade")
    textString = textString.replace("beam", "Beam");
    textString = textString.replace("Rhs", "RHS");
    textString = textString.replace("rhs", "RHS");
    textString = textString.replace("C-h", "C-H");
    textString = textString.replace("Powerfloor", "PowerFloor");
    textString = textString.replace("truss", "Truss");
    textString = textString.replace("Securitywall", "SecurityWall");
    textString = textString.replace("xl", "<sup>XL</sup>");
    textString = textString.replace("Afs ", "AFS ");
    textString = textString.replace("Logicwall ", "LOGICWALL ");
    textString = textString.replace("Flanking Path Systems -", "");
    textString = textString.replace("/universal", "/Universal");
    return textString;
}

// Change to iterative function
export function safe (obj, props, defaultValue) {
    // If we have reached an undefined/null property
    // then stop executing and return the default value.
    // If no default was provided it will be undefined.
    if (obj === undefined || obj === null) {
        return defaultValue;
    }

    // If the path array has no more elements, we've reached
    // the intended property and return its value
    if (props.length === 0) {
        return obj;
    }

    // Prepare our found property and path array for recursion
    var foundSoFar = obj[props[0]];
    var remainingProps = props.slice(1);

    return exports.safe(foundSoFar, remainingProps, defaultValue);
}

