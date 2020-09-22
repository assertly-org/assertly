"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventRecorder = /** @class */ (function () {
    function EventRecorder(config) {
        var _this = this;
        this.recordEvents = [];
        this.reconcileEvents = ["blur", "focus", "change"];
        this.addAllListeners = function () {
            _this.recordEvents.forEach(function (event) {
                window.addEventListener(event, _this.eventCallback, true);
            });
            _this.reconcileEvents.forEach(function (event) {
                window.addEventListener(event, _this.reconcileCallback, true);
            });
        };
        this.removeAllListeners = function () {
            _this.recordEvents.forEach(function (event) {
                window.removeEventListener(event, _this.eventCallback, true);
            });
            _this.reconcileEvents.forEach(function (event) {
                window.removeEventListener(event, _this.reconcileCallback, true);
            });
        };
        this.start = function () {
            if (!window.recorderAddedControlListeners) {
                _this.addAllListeners();
                window.recorderAddedControlListeners = true;
            }
        };
        this.stop = function () {
            if (window.recorderAddedControlListeners) {
                _this.removeAllListeners();
                window.recorderAddedControlListeners = false;
            }
        };
        var eventCallback = config.eventCallback, reconcileCallback = config.reconcileCallback, recordEvents = config.recordEvents, _a = config.reconcileEvents, reconcileEvents = _a === void 0 ? null : _a;
        this.eventCallback = eventCallback;
        this.reconcileCallback = reconcileCallback;
        this.recordEvents = recordEvents;
        if (reconcileEvents) {
            this.reconcileEvents = reconcileEvents;
        }
    }
    return EventRecorder;
}());
exports.default = EventRecorder;
//# sourceMappingURL=event-recorder.js.map