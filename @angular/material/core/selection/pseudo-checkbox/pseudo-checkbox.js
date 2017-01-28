var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, Input, ElementRef, Renderer } from '@angular/core';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export var MdPseudoCheckbox = (function () {
    function MdPseudoCheckbox(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
        this.color = 'accent';
    }
    Object.defineProperty(MdPseudoCheckbox.prototype, "color", {
        /** Color of the checkbox. */
        get: function () { return this._color; },
        set: function (value) {
            if (value) {
                var nativeElement = this._elementRef.nativeElement;
                this._renderer.setElementClass(nativeElement, "md-" + this.color, false);
                this._renderer.setElementClass(nativeElement, "md-" + value, true);
                this._color = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdPseudoCheckbox.prototype, "state", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdPseudoCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdPseudoCheckbox.prototype, "color", null);
    MdPseudoCheckbox = __decorate([
        Component({encapsulation: ViewEncapsulation.None,
            selector: 'md-pseudo-checkbox',
            styles: ["md-pseudo-checkbox { width: 20px; height: 20px; border: 2px solid; border-radius: 2px; cursor: pointer; display: inline-block; vertical-align: middle; box-sizing: border-box; position: relative; transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1); } md-pseudo-checkbox::after { position: absolute; opacity: 0; content: ''; border-bottom: 2px solid currentColor; transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1); } .md-pseudo-checkbox-disabled { cursor: default; } .md-pseudo-checkbox-indeterminate::after { top: 9px; left: 2px; width: 16px; opacity: 1; } .md-pseudo-checkbox-checked::after { top: 5px; left: 3px; width: 12px; height: 5px; border-left: 2px solid currentColor; transform: rotate(-45deg); opacity: 1; } /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
            template: '',
            host: {
                '[class.md-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                '[class.md-pseudo-checkbox-checked]': 'state === "checked"',
                '[class.md-pseudo-checkbox-disabled]': 'disabled',
            },
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], MdPseudoCheckbox);
    return MdPseudoCheckbox;
}());

//# sourceMappingURL=pseudo-checkbox.js.map
