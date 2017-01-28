import { MdError } from '../core';
/**
 * Exception thrown when popover trigger doesn't have a valid md-popover instance
 * @docs-private
 */
export declare class MdPopoverMissingError extends MdError {
    constructor();
}
/**
 * Exception thrown when popover's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export declare class MdPopoverInvalidPositionX extends MdError {
    constructor();
}
/**
 * Exception thrown when popover's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export declare class MdPopoverInvalidPositionY extends MdError {
    constructor();
}
