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

// Type check function
export function type(object, type, optional = false) {

    var found = false;

    function loopTypes(item) {
        if (item == "array") {
            if ((object instanceof Array)) {
                found = true;
            }
        } else if (typeof(object) == item) {
            found = true;
        }
    }

    if (!optional) {
        if ((object == null) && (typeof object == "undefined")) {
            throw new Error("Recieved NULL " + typeof(object) + " - expected " + type);
        }
    } else {
        if ((object == null) && ((typeof object == "undefined") || (typeof object == "object"))) {
            return true;
        }
    }

    if (type instanceof Array) {
        type.forEach(loopTypes);
    } else {
        loopTypes(type);
    }

    if (!found) {
        throw new Error("Recieved " + typeof(object) + " - expected " + type);
    }


    return true;
}

