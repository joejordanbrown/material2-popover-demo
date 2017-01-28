var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { MdError } from '../core';
/**
 * Exception thrown when popover trigger doesn't have a valid md-popover instance
 * @docs-private
 */
export var MdPopoverMissingError = (function (_super) {
    __extends(MdPopoverMissingError, _super);
    function MdPopoverMissingError() {
        _super.call(this, "md-popover-trigger: must pass in an md-popover instance.\n\n    Example:\n      <md-popover #popover=\"mdPopover\"></md-popover>\n      <button [mdPopoverTriggerFor]=\"popover\"></button>\n    ");
    }
    return MdPopoverMissingError;
}(MdError));
/**
 * Exception thrown when popover's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export var MdPopoverInvalidPositionX = (function (_super) {
    __extends(MdPopoverInvalidPositionX, _super);
    function MdPopoverInvalidPositionX() {
        _super.call(this, "x-position value must be either 'before' or after'.\n      Example: <md-popover x-position=\"before\" #popover=\"mdPopover\"></md-popover>\n    ");
    }
    return MdPopoverInvalidPositionX;
}(MdError));
/**
 * Exception thrown when popover's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export var MdPopoverInvalidPositionY = (function (_super) {
    __extends(MdPopoverInvalidPositionY, _super);
    function MdPopoverInvalidPositionY() {
        _super.call(this, "y-position value must be either 'above' or below'.\n      Example: <md-popover y-position=\"above\" #popover=\"mdPopover\"></md-popover>\n    ");
    }
    return MdPopoverInvalidPositionY;
}(MdError));

//# sourceMappingURL=popover-errors.js.map
