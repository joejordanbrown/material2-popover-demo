import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer, ViewContainerRef } from '@angular/core';
import { MdPopoverPanel } from './popover-panel';
import { Dir, LayoutDirection, Overlay } from '../core';
/**
 * This directive is intended to be used in conjunction with an md-popover tag.  It is
 * responsible for toggling the display of the provided popover instance.
 */
export declare class MdPopoverTrigger implements AfterViewInit, OnDestroy {
    private _overlay;
    private _element;
    private _viewContainerRef;
    private _renderer;
    private _dir;
    private _portal;
    private _overlayRef;
    private _popoverOpen;
    private _backdropSubscription;
    private _positionSubscription;
    private _openedByMouse;
    private _mouseoverTimmer;
    private _popoverCloseDisabled;
    /** @deprecated */
    _deprecatedPopoverTriggerFor: MdPopoverPanel;
    /** References the popover instance that the trigger is associated with. */
    popover: MdPopoverPanel;
    onClick(): void;
    onMouseOver(): void;
    onMouseLeave(): void;
    /** Event emitted when the associated popover is opened. */
    onPopoverOpen: EventEmitter<void>;
    /** Event emitted when the associated popover is closed. */
    onPopoverClose: EventEmitter<void>;
    constructor(_overlay: Overlay, _element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer, _dir: Dir);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Whether the popover is open. */
    readonly popoverOpen: boolean;
    /** Toggles the popover between the open and closed states. */
    togglePopover(): void;
    /** Opens the popover. */
    openPopover(): void;
    /** Closes the popover. */
    closePopover(): void;
    /** Removes the popover from the DOM. */
    destroyPopover(): void;
    /** Focuses the popover trigger. */
    focus(): void;
    /** The text direction of the containing app. */
    readonly dir: LayoutDirection;
    /**
     * This method ensures that the popover closes when the overlay backdrop is clicked.
     * We do not use first() here because doing so would not catch clicks from within
     * the popover, and it would fail to unsubscribe properly. Instead, we unsubscribe
     * explicitly when the popover is closed or destroyed.
     */
    private _subscribeToBackdrop();
    /**
     * This method sets the popover state to open and focuses the first item if
     * the popover was opened via the keyboard.
     */
    private _initPopover();
    /**
     * This method resets the popover when it's closed, most importantly restoring
     * focus to the popover trigger if the popover was opened via the keyboard.
     */
    private _resetPopover();
    private _setIsPopoverOpen(isOpen);
    /**
     *  This method checks that a valid instance of MdPopover has been passed into
     *  mdPopoverTriggerFor. If not, an exception is thrown.
     */
    private _checkPopover();
    /**
     *  This method creates the overlay from the provided popover's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openPopover is called.
     */
    private _createOverlay();
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    private _getOverlayConfig();
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the popover based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    private _subscribeToPositions(position);
    /**
     * This method builds the position strategy for the overlay, so the popover is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    private _getPosition();
    private _cleanUpSubscriptions();
    _handleMousedown(event: MouseEvent): void;
}
