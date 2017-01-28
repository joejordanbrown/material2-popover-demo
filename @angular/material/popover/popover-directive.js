// TODO(kara): prevent-close functionality
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
import { Attribute, Component, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdPopoverInvalidPositionX, MdPopoverInvalidPositionY } from './popover-errors';
import { transformPopover, fadeInItems } from './popover-animations';
export var MdPopover = (function () {
    /** @NEW Custom End */
    function MdPopover(posX, posY) {
        /** Config object to be passed into the popover's ngClass */
        this._classList = {};
        /** Position of the popover in the X axis. */
        this.positionX = 'after';
        /** Position of the popover in the Y axis. */
        this.positionY = 'below';
        //@ContentChildren(MdPopoverItem) items: QueryList<MdPopoverItem>;
        this.overlapTrigger = true;
        /** @NEW Custom Start */
        this.closeDisabled = false;
        /** Popover Trigger event */
        this.mdPopoverTrigger = 'hover';
        /** Popover placement */
        this.mdPopoverPlacement = 'bottom';
        /** Popover delay */
        this.mdPopoverDelay = 300;
        /** Event emitted when the popover is closed. */
        this.close = new EventEmitter();
        if (posX) {
            this._setPositionX(posX);
        }
        if (posY) {
            this._setPositionY(posY);
        }
        this.setPositionClasses(this.positionX, this.positionY);
    }
    MdPopover.prototype.onMouseOver = function () {
        if (this.mdPopoverTrigger == 'hover') {
            this.closeDisabled = true;
            console.log('mouseover: md-popover');
        }
    };
    MdPopover.prototype.onMouseLeave = function () {
        if (this.mdPopoverTrigger == 'hover') {
            this.closeDisabled = false;
            this.close.emit();
            console.log('mouseleave: md-popover');
        }
    };
    MdPopover.prototype.ngAfterContentInit = function () {
        //this._keyManager = new FocusKeyManager(this.items).withWrap();
        //this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
        //this._emitCloseEvent();
        //});
    };
    MdPopover.prototype.ngOnDestroy = function () {
        this._tabSubscription.unsubscribe();
    };
    Object.defineProperty(MdPopover.prototype, "classList", {
        /**
         * This method takes classes set on the host md-popover element and applies them on the
         * popover template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing popover from outside the component.
         * @param classes list of class names
         */
        set: function (classes) {
            this._classList = classes.split(' ').reduce(function (obj, className) {
                obj[className] = true;
                return obj;
            }, {});
            this.setPositionClasses(this.positionX, this.positionY);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focus the first item in the popover. This method is used by the popover trigger
     * to focus the first item when the popover is opened by the ENTER key.
     */
    MdPopover.prototype.focusFirstItem = function () {
        //this._keyManager.setFirstItemActive();
    };
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the popover.
     */
    MdPopover.prototype._emitCloseEvent = function () {
        this.close.emit();
    };
    MdPopover.prototype._setPositionX = function (pos) {
        if (pos !== 'before' && pos !== 'after') {
            throw new MdPopoverInvalidPositionX();
        }
        this.positionX = pos;
    };
    MdPopover.prototype._setPositionY = function (pos) {
        if (pos !== 'above' && pos !== 'below') {
            throw new MdPopoverInvalidPositionY();
        }
        this.positionY = pos;
    };
    /**
     * It's necessary to set position-based classes to ensure the popover panel animation
     * folds out from the correct direction.
     */
    MdPopover.prototype.setPositionClasses = function (posX, posY) {
        this._classList['md-popover-before'] = posX == 'before';
        this._classList['md-popover-after'] = posX == 'after';
        this._classList['md-popover-above'] = posY == 'above';
        this._classList['md-popover-below'] = posY == 'below';
    };
    __decorate([
        ViewChild(TemplateRef), 
        __metadata('design:type', TemplateRef)
    ], MdPopover.prototype, "templateRef", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdPopover.prototype, "overlapTrigger", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdPopover.prototype, "mdPopoverTrigger", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdPopover.prototype, "mdPopoverPlacement", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdPopover.prototype, "mdPopoverDelay", void 0);
    __decorate([
        HostListener('mouseover'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdPopover.prototype, "onMouseOver", null);
    __decorate([
        HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MdPopover.prototype, "onMouseLeave", null);
    __decorate([
        Input('class'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], MdPopover.prototype, "classList", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdPopover.prototype, "close", void 0);
    MdPopover = __decorate([
        Component({selector: 'md-popover, mat-popover',
            host: { 'role': 'dialog' },
            template: "<template> <div class=\"md-popover-panel\" role=\"dialog\" [class.md-popover-overlap]=\"overlapTrigger\" [ngClass]=\"_classList\" (click)=\"_emitCloseEvent()\" [@transformPopover]=\"'showing'\"> <div class=\"direction-arrow\" *ngIf=\"!overlapTrigger\"></div> <div class=\"md-popover-content\" [@fadeInItems]=\"'showing'\" (mouseover)=\"onMouseOver()\" (mouseleave)=\"onMouseLeave()\"> <ng-content></ng-content> </div> </div> </template> ",
            styles: ["/** The mixins below are shared between md-menu and md-select */ /** * This mixin adds the correct panel transform styles based * on the direction that the menu panel opens. */ /** * Applies styles for users in high contrast mode. Note that this only applies * to Microsoft browsers. Chrome can be included by checking for the `html[hc]` * attribute, however Chrome handles high contrast differently. */ .md-popover-panel { max-height: calc(100vh + 48px); } .md-popover-panel.md-menu-after.md-menu-below { transform-origin: left top; } .md-popover-panel.md-menu-after.md-menu-above { transform-origin: left bottom; } .md-popover-panel.md-menu-before.md-menu-below { transform-origin: right top; } .md-popover-panel.md-menu-before.md-menu-above { transform-origin: right bottom; } [dir='rtl'] .md-popover-panel.md-menu-after.md-menu-below { transform-origin: right top; } [dir='rtl'] .md-popover-panel.md-menu-after.md-menu-above { transform-origin: right bottom; } [dir='rtl'] .md-popover-panel.md-menu-before.md-menu-below { transform-origin: left top; } [dir='rtl'] .md-popover-panel.md-menu-before.md-menu-above { transform-origin: left bottom; } @media screen and (-ms-high-contrast: active) { .md-popover-panel { outline: solid 1px; } } .md-popover-content { padding: 15px 0; } [md-popover-item] { cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; line-height: 48px; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; position: relative; } [md-popover-item][disabled] { cursor: default; } [md-popover-item] md-icon { margin-right: 16px; } [dir='rtl'] [md-popover-item] md-icon { margin-left: 16px; } button[md-popover-item] { width: 100%; } .md-popover-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-popover-below .direction-arrow { position: absolute; top: 0px; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 15px solid rgba(0, 0, 0, 0.12); } .md-popover-above .direction-arrow { position: absolute; bottom: -1px; width: 0; height: 0; border-top: 15px solid rgba(0, 0, 0, 0.12); border-left: 15px solid transparent; border-right: 15px solid transparent; } .md-popover-after .direction-arrow { left: 20px; } .md-popover-before .direction-arrow { right: 20px; } .md-popover-above.md-popover-overlap .md-popover-content { padding: 30px 0 0 0; } .md-popover-below.md-popover-overlap .md-popover-content { padding: 0; } /*# sourceMappingURL=popover.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            animations: [
                transformPopover,
                fadeInItems
            ],
            exportAs: 'mdPopover'
        }),
        __param(0, Attribute('x-position')),
        __param(1, Attribute('y-position')), 
        __metadata('design:paramtypes', [String, String])
    ], MdPopover);
    return MdPopover;
}());

//# sourceMappingURL=popover-directive.js.map
