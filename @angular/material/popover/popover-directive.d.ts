import { AfterContentInit, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { PopoverPositionX, PopoverPositionY } from './popover-positions';
import { MdPopoverPanel } from './popover-panel';
export declare class MdPopover implements AfterContentInit, MdPopoverPanel, OnDestroy {
    /** Subscription to tab events on the popover panel */
    private _tabSubscription;
    /** Config object to be passed into the popover's ngClass */
    _classList: any;
    /** Position of the popover in the X axis. */
    positionX: PopoverPositionX;
    /** Position of the popover in the Y axis. */
    positionY: PopoverPositionY;
    templateRef: TemplateRef<any>;
    overlapTrigger: boolean;
    /** @NEW Custom Start */
    closeDisabled: boolean;
    /** Popover Trigger event */
    mdPopoverTrigger: string;
    /** Popover placement */
    mdPopoverPlacement: string;
    /** Popover delay */
    mdPopoverDelay: number;
    onMouseOver(): void;
    onMouseLeave(): void;
    /** @NEW Custom End */
    constructor(posX: PopoverPositionX, posY: PopoverPositionY);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * This method takes classes set on the host md-popover element and applies them on the
     * popover template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing popover from outside the component.
     * @param classes list of class names
     */
    classList: string;
    /** Event emitted when the popover is closed. */
    close: EventEmitter<void>;
    /**
     * Focus the first item in the popover. This method is used by the popover trigger
     * to focus the first item when the popover is opened by the ENTER key.
     */
    focusFirstItem(): void;
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the popover.
     */
    _emitCloseEvent(): void;
    private _setPositionX(pos);
    private _setPositionY(pos);
    /**
     * It's necessary to set position-based classes to ensure the popover panel animation
     * folds out from the correct direction.
     */
    setPositionClasses(posX: PopoverPositionX, posY: PopoverPositionY): void;
}
