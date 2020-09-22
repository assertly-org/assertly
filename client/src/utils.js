"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionStringify = exports.findReactElement = exports.findReactElementDURKA = exports.getCoordinates = exports.getComponentName = exports.getComponentProps = exports.getComponentInfo = void 0;
function getComponentInfo(component, maxNest, resultArray) {
    var _a, _b, _c, _d, _e;
    console.log('getComponentInfo: ', component, resultArray);
    if (!component || maxNest === 0) {
        // console.log('resultArray: ', resultArray)
        return resultArray;
    }
    if ((_a = component === null || component === void 0 ? void 0 : component._debugSource) === null || _a === void 0 ? void 0 : _a.fileName) {
        // the owner of the node where the 'source' filename exists is the file that you want the props for 
        var props = getComponentProps(component === null || component === void 0 ? void 0 : component._debugOwner);
        var name_1 = getComponentName(component === null || component === void 0 ? void 0 : component._debugOwner);
        resultArray.push({
            filename: (_b = component === null || component === void 0 ? void 0 : component._debugSource) === null || _b === void 0 ? void 0 : _b.fileName,
            // the line number is really for the next component down in the tree that is being called from the 'filename'
            linenumber: (_c = component === null || component === void 0 ? void 0 : component._debugSource) === null || _c === void 0 ? void 0 : _c.lineNumber,
            props: props,
            // if it's component  str.split('\\').pop.split(`/`).pop().split('.')[0]
            componentName: name_1 === 'Component' ? (_e = (_d = component === null || component === void 0 ? void 0 : component._debugSource) === null || _d === void 0 ? void 0 : _d.fileName) === null || _e === void 0 ? void 0 : _e.split('\\').pop().split("/").pop().split('.')[0] : name_1
        });
        return getComponentInfo(component === null || component === void 0 ? void 0 : component._debugOwner, maxNest - 1, resultArray);
    }
    else {
        return getComponentInfo(component === null || component === void 0 ? void 0 : component._debugOwner, maxNest - 1, resultArray);
    }
}
exports.getComponentInfo = getComponentInfo;
function getComponentProps(component, props) {
    var _a;
    if (props === void 0) { props = {}; }
    if (!component) {
        functionStringify(props);
        return props;
    }
    var newProps = component.pendingProps
        ? __assign(__assign({}, props), component.pendingProps) : props;
    delete newProps.children;
    if (((_a = component === null || component === void 0 ? void 0 : component.type) === null || _a === void 0 ? void 0 : _a.__proto__) &&
        ["Component", "PureComponent"].includes(component.type.__proto__.name)) {
        functionStringify(newProps);
        return newProps;
    }
    return getComponentProps(component._debugOwner, newProps);
}
exports.getComponentProps = getComponentProps;
function getComponentName(fiber) {
    if (!fiber)
        return null;
    if (fiber.elementType && fiber.elementType.name) {
        return fiber.elementType.name;
    }
    if (fiber.elementType && fiber.elementType.displayName) {
        return fiber.elementType.displayName;
    }
    if (fiber.type.displayName) {
        return fiber.type.displayName;
    }
    if (fiber.type.name) {
        return fiber.type.name;
    }
    return getComponentName(fiber._debugOwner);
}
exports.getComponentName = getComponentName;
var eventsWithCoordinates = {
    mouseup: true,
    mousedown: true,
    mousemove: true,
    mouseover: true,
};
function getCoordinates(event) {
    var mouseEvent = event;
    return eventsWithCoordinates[event.type]
        ? { x: mouseEvent.clientX, y: mouseEvent.clientY }
        : null;
}
exports.getCoordinates = getCoordinates;
// map react classes to dom elements
function findReactElementDURKA(target) {
    // console.dir(target)
    var key = Object.keys(target).find(function (key) {
        return key.startsWith("__reactInternalInstance$");
    });
    // console.log('key: ', key)
    // creates an object out of the target passed
    var targetMap = target;
    var internalInstance = key ? targetMap[key] : null;
    // console.log('React Node if Found: ', internalInstance)
    if (internalInstance == null)
        return null;
    // console.log('internalInstance2: ', internalInstance)
    // return internalInstance._debugOwner
    //   ? internalInstance._debugOwner.stateNode
    //   : internalInstance.return.stateNode;
    return internalInstance;
    // for (let key: string in target) {
    //   if (key.startsWith("__reactInternalInstance$")) {
    //     // console.log('keys in the find ReactElement', target[key])
    //     return target[key];
    //   }
    // }
    // return null;
}
exports.findReactElementDURKA = findReactElementDURKA;
function findReactElement(target) {
    // const key = Object.keys(target).find((key) =>
    //   key.startsWith("__reactInternalInstance$")
    // );
    var targetMap = target;
    // const internalInstance = key ? targetMap[key] : null;
    // if (internalInstance == null) return null;
    // return internalInstance._debugOwner
    //   ? internalInstance._debugOwner.stateNode
    //   : internalInstance.return.stateNode;
    for (var key in targetMap) {
        if (key.startsWith("__reactInternalInstance$")) {
            // console.log('keys in the find ReactElement', target[key])
            return targetMap[key];
        }
    }
    return null;
}
exports.findReactElement = findReactElement;
function functionStringify(obj) {
    for (var k in obj) {
        if (obj[k] && {}.toString.call(obj[k]) === "[object Function]") {
            try {
                // obj[k] = "" + obj[k];
                // // get rid of the extra line markers
                // obj[k] = obj[k].replace(/(\r\n|\n|\r)/gm, "");
                obj[k] = "[Function]";
            }
            catch (e) {
                console.error("Error stringifying prop", e);
            }
        }
    }
    stripExtraComponentProps(obj);
}
exports.functionStringify = functionStringify;
function stripExtraComponentProps(props) {
    var keys = Object.keys(props);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (Object.prototype.toString.call(props[key]) === "[object Object]" &&
            (props[key].hasOwnProperty("_owner") ||
                key === "inputRef" ||
                key === "InputProps")) {
            delete props[key];
        }
    }
}
//# sourceMappingURL=utils.js.map