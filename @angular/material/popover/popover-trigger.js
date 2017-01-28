var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Renderer, ViewContainerRef } from '@angular/core';
import { MdPopoverMissingError } from './popover-errors';
import { isFakeMousedownFromScreenReader, Dir, Overlay, OverlayState, TemplatePortal } from '../core';
/**
 * This directive is intended to be used in conjunction with an md-popover tag.  It is
 * responsible for toggling the display of the provided popover instance.
 */
export var MdPopoverTrigger = (function () {
    function MdPopoverTrigger(_overlay, _element, _viewContainerRef, _renderer, _dir) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._dir = _dir;
        this._popoverOpen = false;
        // tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the popover is opened via the keyboard
        this._openedByMouse = false;
        this._popoverCloseDisabled = false;
        /** Event emitted when the associated popover is opened. */
        this.onPopoverOpen = new EventEmitter();
        /** Event emitted when the associated popover is closed. */
        this.onPopoverClose = new EventEmitter();
    }
    Object.defineProperty(MdPopoverTrigger.prototype, "_deprecatedPopoverTriggerFor", {
        /** @deprecated */
        get: function () { return this.popover; },
        set: function (v) { this.popover = v; },
        enumerable: true,
        configurable: true
    });
    MdPopoverTrigger.prototype.onClick = function () {
        if (this.popover.mdPopoverTrigger == 'click') {
            this.togglePopover();
        }
    };
    MdPopoverTrigger.prototype.onMouseOver = function () {
        var _this = this;
        if (this.popover.mdPopoverTrigger == 'hover') {
            this._mouseoverTimmer = setTimeout(function () {
                _this.openPopover();
            }, this.popover.mdPopoverDelay);
        }
    };
    MdPopoverTrigger.prototype.onMouseLeave = function () {
        var _this = this;
        if (this.popover.mdPopoverTrigger == 'hover') {
            clearTimeout(this._mouseoverTimmer);
            if (this._popoverOpen) {
                setTimeout(function () {
                    if (!_this.popover.closeDisabled) {
                        _this.closePopover();
                    }
                }, 200);
            }
        }
    };
    MdPopoverTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._checkPopover();
        this.popover.close.subscribe(function () { return _this.closePopover(); });
    };
    MdPopoverTrigger.prototype.ngOnDestroy = function () { this.destroyPopover(); };
    Object.defineProperty(MdPopoverTrigger.prototype, "popoverOpen", {
        /** Whether the popover is open. */
        get: function () { return this._popoverOpen; },
        enumerable: true,
        configurable: true
    });
    /** Toggles the popover between the open and closed states. */
    MdPopoverTrigger.prototype.togglePopover = function () {
        return this._popoverOpen ? this.closePopover() : this.openPopover();
    };
    /** Opens the popover. */
    MdPopoverTrigger.prototype.openPopover = function () {
        if (!this._popoverOpen) {
            this._createOverlay();
            this._overlayRef.attach(this._portal);
            this._subscribeToBackdrop();
            this._initPopover();
        }
    };
    /** Closes the popover. */
    MdPopoverTrigger.prototype.closePopover = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
            this._resetPopover();
        }
    };
    /** Removes the popover from the DOM. */
    MdPopoverTrigger.prototype.destroyPopover = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /** Focuses the popover trigger. */
    MdPopoverTrigger.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    Object.defineProperty(MdPopoverTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method ensures that the popover closes when the overlay backdrop is clicked.
     * We do not use first() here because doing so would not catch clicks from within
     * the popover, and it would fail to unsubscribe properly. Instead, we unsubscribe
     * explicitly when the popover is closed or destroyed.
     */
    MdPopoverTrigger.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.closePopover();
        });
    };
    /**
     * This method sets the popover state to open and focuses the first item if
     * the popover was opened via the keyboard.
     */
    MdPopoverTrigger.prototype._initPopover = function () {
        this._setIsPopoverOpen(true);
        // Should only set focus if opened via the keyboard, so keyboard users can
        // can easily navigate popover items. According to spec, mouse users should not
        // see the focus style.
        if (!this._openedByMouse) {
            this.popover.focusFirstItem();
        }
    };
    ;
    /**
     * This method resets the popover when it's closed, most importantly restoring
     * focus to the popover trigger if the popover was opened via the keyboard.
     */
    MdPopoverTrigger.prototype._resetPopover = function () {
        this._setIsPopoverOpen(false);
        // Focus only needs to be reset to the host element if the popover was opened
        // by the keyboard and manually shifted to the first popover item.
        if (!this._openedByMouse) {
            this.focus();
        }
        this._openedByMouse = false;
    };
    // set state rather than toggle to support triggers sharing a popover
    MdPopoverTrigger.prototype._setIsPopoverOpen = function (isOpen) {
        this._popoverOpen = isOpen;
        this._popoverOpen ? this.onPopoverOpen.emit() : this.onPopoverClose.emit();
    };
    /**
     *  This method checks that a valid instance of MdPopover has been passed into
     *  mdPopoverTriggerFor. If not, an exception is thrown.
     */
    MdPopoverTrigger.prototype._checkPopover = function () {
        if (!this.popover) {
            throw new MdPopoverMissingError();
        }
    };
    /**
     *  This method creates the overlay from the provided popover's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openPopover is called.
     */
    MdPopoverTrigger.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.popover.templateRef, this._viewContainerRef);
            var config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy);
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayState
     */
    MdPopoverTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._getPosition()
            .withDirection(this.dir);
        if (this.popover.mdPopoverTrigger == 'click') {
            overlayState.hasBackdrop = true;
            overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        }
        overlayState.direction = this.dir;
        return overlayState;
    };
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the popover based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    MdPopoverTrigger.prototype._subscribeToPositions = function (position) {
        var _this = this;
        this._positionSubscription = position.onPositionChange.subscribe(function (change) {
            var posX = change.connectionPair.originX === 'start' ? 'after' : 'before';
            var posY = change.connectionPair.originY === 'top' ? 'below' : 'above';
            if (!_this.popover.overlapTrigger) {
                posY = posY === 'below' ? 'above' : 'below';
            }
            _this.popover.setPositionClasses(posX, posY);
        });
    };
    /**
     * This method builds the position strategy for the overlay, so the popover is properly connected
     * to the trigger.
     * @returns ConnectedPositionStrategy
     */
    MdPopoverTrigger.prototype._getPosition = function () {
        var _a = this.popover.positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
        var _b = this.popover.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
        var originY = overlayY;
        var fallbackOriginY = fallbackOverlayY;
        if (!this.popover.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        return this._overlay.position()
            .connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
            .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
            .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
            .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
    };
    MdPopoverTrigger.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    MdPopoverTrigger.prototype._handleMousedown = function (event) {
        if (!isFakeMousedownFromScreenReader(event)) {
            this._openedByMouse = true;
        }
    };
    __decorate([
        Input('md-popover-trigger-for'), 
        __metadata('design:type', Object)
    ], MdPopoverTrigger.prototype, "_deprecatedPopoverTriggerFor", null);
    __decorate([
        Input('mdPopoverTriggerFor'), 
        __metadata('design:type', Object)
    ], MdPopoverTrigger.prototype, "popover", void 0);
    __decorate([
        HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdPopoverTrigger.prototype, "onClick", null);
    __decorate([
        HostListener('mouseover'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdPopoverTrigger.prototype, "onMouseOver", null);
    __decorate([
        HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdPopoverTrigger.prototype, "onMouseLeave", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdPopoverTrigger.prototype, "onPopoverOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdPopoverTrigger.prototype, "onPopoverClose", void 0);
    MdPopoverTrigger = __decorate([
        Directive({
            selector: '[md-popover-trigger-for], [mat-popover-trigger-for], [mdPopoverTriggerFor]',
            host: {
                'aria-haspopup': 'true',
                '(mousedown)': '_handleMousedown($event)',
            },
            exportAs: 'mdPopoverTrigger'
        }),
        __param(4, Optional()), 
        __metadata('design:paramtypes', [Overlay, ElementRef, ViewContainerRef, Renderer, Dir])
    ], MdPopoverTrigger);
    return MdPopoverTrigger;
}());

//# sourceMappingURL=popover-trigger.js.map
