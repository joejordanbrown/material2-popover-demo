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
import { Directive, ElementRef, Input, ViewContainerRef, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Overlay, OverlayState, TemplatePortal } from '../core';
import { MdAutocomplete } from './autocomplete';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import { Dir } from '../core/rtl/dir';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
/** The panel needs a slight y-offset to ensure the input underline displays. */
export var MD_AUTOCOMPLETE_PANEL_OFFSET = 6;
export var MdAutocompleteTrigger = (function () {
    function MdAutocompleteTrigger(_element, _overlay, _viewContainerRef, _controlDir, _dir) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._controlDir = _controlDir;
        this._dir = _dir;
        this._panelOpen = false;
    }
    MdAutocompleteTrigger.prototype.ngOnDestroy = function () { this._destroyPanel(); };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelOpen", {
        /* Whether or not the autocomplete panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Opens the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype.openPanel = function () {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._subscribeToClosingActions();
        }
        this._panelOpen = true;
    };
    /** Closes the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype.closePanel = function () {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._panelOpen = false;
    };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected and when the backdrop is clicked.
         */
        get: function () {
            // TODO(kara): add tab event observable with keyboard event PR
            return Observable.merge.apply(Observable, this.optionSelections.concat([this._overlayRef.backdropClick()]));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "optionSelections", {
        /** Stream of autocomplete option selections. */
        get: function () {
            return this.autocomplete.options.map(function (option) { return option.onSelect; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    MdAutocompleteTrigger.prototype._subscribeToClosingActions = function () {
        var _this = this;
        // Every time the option list changes...
        this.autocomplete.options.changes
            .startWith(null)
            .switchMap(function () { return _this.panelClosingActions; })
            .first()
            .subscribe(function (event) { return _this._setValueAndClose(event); });
    };
    /** Destroys the autocomplete suggestion panel. */
    MdAutocompleteTrigger.prototype._destroyPanel = function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    MdAutocompleteTrigger.prototype._setValueAndClose = function (event) {
        if (event) {
            this._controlDir.control.setValue(event.source.value);
            if (event.isUserInput) {
                this._controlDir.control.markAsDirty();
            }
        }
        this.closePanel();
    };
    MdAutocompleteTrigger.prototype._createOverlay = function () {
        this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    };
    MdAutocompleteTrigger.prototype._getOverlayConfig = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        overlayState.width = this._getHostWidth();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'md-overlay-transparent-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        return overlayState;
    };
    MdAutocompleteTrigger.prototype._getOverlayPosition = function () {
        return this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withOffsetY(MD_AUTOCOMPLETE_PANEL_OFFSET);
    };
    /** Returns the width of the input element, so the panel width can match it. */
    MdAutocompleteTrigger.prototype._getHostWidth = function () {
        return this._element.nativeElement.getBoundingClientRect().width;
    };
    __decorate([
        Input('mdAutocomplete'), 
        __metadata('design:type', MdAutocomplete)
    ], MdAutocompleteTrigger.prototype, "autocomplete", void 0);
    MdAutocompleteTrigger = __decorate([
        Directive({
            selector: 'input[mdAutocomplete], input[matAutocomplete]',
            host: {
                '(focus)': 'openPanel()'
            }
        }),
        __param(3, Optional()),
        __param(4, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Overlay, ViewContainerRef, NgControl, Dir])
    ], MdAutocompleteTrigger);
    return MdAutocompleteTrigger;
}());

//# sourceMappingURL=autocomplete-trigger.js.map
