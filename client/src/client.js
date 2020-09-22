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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var event_recorder_1 = __importDefault(require("./event-recorder"));
var AssertlyClient = /** @class */ (function () {
    function AssertlyClient() {
        var _this = this;
        this.eventsToRecord = ["click", "change"];
        this.componentEventCache = [];
        this.previousComponent = null;
        this.previousMsg = null;
        this.start = function () {
            _this.eventRecorder.start();
        };
        this.stop = function () {
            _this.eventRecorder.stop();
        };
        this.clearEventCache = function () {
            _this.componentEventCache = [];
        };
        this.reconcileEventCache = function (event) {
            var reactComponent = event.target ? utils_1.findReactElement(event.target) : null;
            if (reactComponent !== _this.previousComponent) {
                _this.componentEventCache.forEach(function (msg) {
                    console.log('in the reconcile');
                    // this.sendEvent(msg);
                });
                _this.clearEventCache();
            }
        };
        // remove all divs with a certain classname
        this.removeMenusByClassname = function (classname) {
            var previousMenus = Array.from(document.getElementsByClassName(classname));
            previousMenus === null || previousMenus === void 0 ? void 0 : previousMenus.map(function (val) { return val.remove(); });
        };
        this.removeSingleMenu = function (elID) { return __awaiter(_this, void 0, void 0, function () {
            var menuDiv;
            return __generator(this, function (_a) {
                menuDiv = document.getElementById(elID);
                menuDiv === null || menuDiv === void 0 ? void 0 : menuDiv.remove();
                return [2 /*return*/];
            });
        }); };
        this.setupMenuDiv = function (mouseEvent) {
            var eventTime = new Date().getTime();
            var divID = "componentMenu" + eventTime;
            var menuDiv = document.createElement("DIV");
            menuDiv.setAttribute("id", divID);
            menuDiv.setAttribute("class", 'componentMenu');
            document.body.appendChild(menuDiv);
            menuDiv.style.position = "absolute";
            menuDiv.style.left = mouseEvent.x + 'px';
            menuDiv.style.top = mouseEvent.y + 'px';
            menuDiv.style.zIndex = '9999999999999';
            return divID;
        };
        this.appendButton = function (elID, label) {
            var _a, _b;
            var btn = document.createElement("BUTTON");
            btn.style.width = '150px';
            btn.innerHTML = label;
            (_a = document.getElementById(elID)) === null || _a === void 0 ? void 0 : _a.appendChild(btn);
            var br = document.createElement("br");
            (_b = document.getElementById(elID)) === null || _b === void 0 ? void 0 : _b.appendChild(br);
            return btn;
        };
        this.createPopupMenu = function (message, mouseEvent) {
            var _a;
            // remove all existing menus
            _this.removeMenusByClassname('componentMenu');
            // create the dom element and store the element ID
            var divID = _this.setupMenuDiv(mouseEvent);
            (_a = message === null || message === void 0 ? void 0 : message.componentInfo) === null || _a === void 0 ? void 0 : _a.map(function (val) {
                var _a, _b;
                console.log("button val: ", val);
                var btn = document.createElement("BUTTON");
                btn.style.width = '150px';
                btn.innerHTML = val === null || val === void 0 ? void 0 : val.componentName;
                if (btn.innerHTML) {
                    btn.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.componentMenuClick(event, divID, message)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    (_a = document.getElementById(divID)) === null || _a === void 0 ? void 0 : _a.appendChild(btn);
                    var br = document.createElement("br");
                    (_b = document.getElementById(divID)) === null || _b === void 0 ? void 0 : _b.appendChild(br);
                }
            });
            var CancelBtn = _this.appendButton(divID, 'Cancel');
            CancelBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.removeSingleMenu(divID)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        };
        this.createExistingTestMenu = function (event, existingTestResponse) { return __awaiter(_this, void 0, void 0, function () {
            var existingTestDivID, test, newTestBtn, cancelBtn;
            var _this = this;
            return __generator(this, function (_a) {
                existingTestDivID = this.setupMenuDiv(event);
                test = ["a", "b"];
                test.map(function (val) {
                    var _a, _b;
                    var btn = document.createElement("BUTTON");
                    btn.style.width = '150px';
                    btn.innerHTML = val;
                    (_a = document.getElementById(existingTestDivID)) === null || _a === void 0 ? void 0 : _a.appendChild(btn);
                    var br = document.createElement("br");
                    (_b = document.getElementById(existingTestDivID)) === null || _b === void 0 ? void 0 : _b.appendChild(br);
                });
                newTestBtn = this.appendButton(existingTestDivID, 'Create New Test');
                cancelBtn = this.appendButton(existingTestDivID, 'Cancel');
                cancelBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.removeSingleMenu(existingTestDivID)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); });
                return [2 /*return*/, { newTestBtn: newTestBtn, existingTestMenuID: existingTestDivID }];
            });
        }); };
        this.componentMenuClick = function (event, divID, message) { return __awaiter(_this, void 0, void 0, function () {
            var selectedComponent, existingTestResponse, existingTestMenuResponse;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.removeSingleMenu(divID)];
                    case 1:
                        _b.sent();
                        selectedComponent = (_a = message.componentInfo) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, curr) {
                            var _a;
                            if (curr.componentName === ((_a = event.target) === null || _a === void 0 ? void 0 : _a.innerHTML)) {
                                return __assign({}, curr);
                            }
                            else {
                                return acc;
                            }
                        }, null);
                        event === null || event === void 0 ? void 0 : event.stopPropagation();
                        return [4 /*yield*/, this.checkForExistingTest(selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.filename)];
                    case 2:
                        existingTestResponse = _b.sent();
                        return [4 /*yield*/, this.createExistingTestMenu(event, existingTestResponse)
                            // add listener for creating a brand new test
                        ];
                    case 3:
                        existingTestMenuResponse = _b.sent();
                        // add listener for creating a brand new test
                        existingTestMenuResponse.newTestBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.createNewTest(__assign(__assign({}, message), { componentInfo: selectedComponent, checkedEvent: existingTestResponse.checkedEvent }))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.removeSingleMenu(existingTestMenuResponse.existingTestMenuID)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getMessage = function (reactComponent, event) {
            var _a, _b, _c;
            // function to use in array reduce
            var findClickHandler = function (accumulator, currentValue) {
                var _a;
                if ((_a = currentValue.props) === null || _a === void 0 ? void 0 : _a.onClick) {
                    return __assign({}, currentValue);
                }
                else {
                    return accumulator;
                }
            };
            var target = event.target || event.srcElement;
            var inputTarget = target;
            var linkTarget = target;
            var componentInfo = utils_1.getComponentInfo(reactComponent, 10, []);
            // find the closest click handler that would have been triggered
            // note, slice(0) copies the array
            var clickHandler = (_b = (_a = componentInfo === null || componentInfo === void 0 ? void 0 : componentInfo.slice(0)) === null || _a === void 0 ? void 0 : _a.reverse()) === null || _b === void 0 ? void 0 : _b.reduce(findClickHandler, null);
            // console.log('component info in GET_MESSAGE: ', componentInfo, clickHandler)
            var message = {
                // componentName, fileName, and lineNumber are already in the object returned
                action: event.type,
                checked: ((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.hasOwnProperty("checked")) ? inputTarget.checked
                    : null,
                coordinates: utils_1.getCoordinates(event),
                href: linkTarget.href ? linkTarget.href : null,
                keyCode: event.keyCode
                    ? event.keyCode
                    : null,
                tagName: inputTarget.tagName,
                tagType: inputTarget.type,
                textContent: inputTarget.textContent || inputTarget.innerText,
                timestamp: new Date().getTime(),
                value: inputTarget.value,
                writeTestLocation: '',
                componentInfo: componentInfo,
                clickHandlerComponent: clickHandler,
                checkedEvent: undefined
            };
            return message;
        };
        this.recordEvent = function (event) {
            var _a, _b;
            var nodeTarget = event.target;
            var mouseEvent = event;
            // if the click is on a menu that pops up, dont go through the record event logic
            if ((_b = (_a = nodeTarget === null || nodeTarget === void 0 ? void 0 : nodeTarget.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute("id")) === null || _b === void 0 ? void 0 : _b.includes('componentMenu')) {
                return;
            }
            if (!event.target)
                return;
            try {
                if (_this.previousMsg) {
                    if ((event.type === "change" || event.type === "click") &&
                        _this.previousMsg &&
                        _this.previousMsg.action === "click" &&
                        new Date().getTime() - _this.previousMsg.timestamp < 100) {
                        console.log("message not send due to time");
                        return;
                    }
                }
                var reactComponent = utils_1.findReactElement(event.target);
                var msg = _this.getMessage(reactComponent, event);
                console.log('reactComponent and message in RECORD_EVENT: ', reactComponent, msg);
                localStorage.setItem("lastEvent", JSON.stringify(msg));
                _this.previousMsg = msg;
                // if (
                //   // if there is no previous component or the previous component is the same as the component you just clicked on
                //   !this.previousComponent ||
                //   (this.previousComponent && this.previousComponent === reactComponent)
                // ) {
                //   this.previousComponent = reactComponent;
                //   if (
                //     this.previousComponent &&
                //     msg.checked !== null &&
                //     msg.action === "click"
                //   ) {
                //     // message is sent when something in the popup menu is selected
                //     this.createPopupMenu(msg);
                //     // this.sendEvent(msg);
                //     return;
                //   }
                //   //pushing a message to the event cache sends it to the api when the reconcile callback is called
                //   this.componentEventCache.push(msg);
                //   return;
                // } else {
                //   this.clearEventCache();
                // }
                _this.previousComponent = reactComponent;
                // message is sent when something in the popup menu is selected
                if (mouseEvent === null || mouseEvent === void 0 ? void 0 : mouseEvent.metaKey)
                    _this.createPopupMenu(msg, mouseEvent);
                // this.sendEvent(msg);
            }
            catch (e) {
                console.error("Error recording event", e);
            }
        };
        this.createNewTest = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var accountId, url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = window["dataLayer"][0]["apiKey"];
                        console.log('message: ', message);
                        // rather get a 403 than a bad route
                        if (!accountId) {
                            accountId = 1;
                        }
                        url = "//localhost:3020/api/accounts/" + accountId + "/events/";
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                mode: "cors",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    url: window.location.href,
                                    event: message,
                                    // TODO: test set id should be set when creating/loading testset in the runner
                                    placeholder: null,
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        this.checkForExistingTest = function (filepath) { return __awaiter(_this, void 0, void 0, function () {
            var accountId, uriFilepath, url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = window["dataLayer"][0]["apiKey"];
                        // rather get a 403 than a bad route
                        if (!accountId) {
                            accountId = 1;
                        }
                        uriFilepath = encodeURI(filepath);
                        url = "//localhost:3020/api/accounts/" + accountId + "/events/?filepath=" + uriFilepath;
                        console.log('url hit: ', url, uriFilepath);
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                mode: "cors",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        this.eventRecorder = new event_recorder_1.default({
            recordEvents: this.eventsToRecord,
            eventCallback: this.recordEvent,
            reconcileCallback: this.reconcileEventCache,
        });
    }
    return AssertlyClient;
}());
exports.default = AssertlyClient;
window.eventRecorder = new AssertlyClient();
window.eventRecorder.start();
//# sourceMappingURL=client.js.map