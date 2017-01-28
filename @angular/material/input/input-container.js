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
import { Component, Input, Directive, ContentChild, ContentChildren, ElementRef, QueryList, ViewEncapsulation, Optional, Output, EventEmitter, Renderer } from '@angular/core';
import { coerceBooleanProperty } from '../core';
import { NgControl } from '@angular/forms';
import { getSupportedInputTypes } from '../core/platform/features';
import { MdInputContainerUnsupportedTypeError, MdInputContainerPlaceholderConflictError, MdInputContainerDuplicatedHintError, MdInputContainerMissingMdInputError } from './input-container-errors';
// Invalid input type. Using one of these will throw an MdInputContainerUnsupportedTypeError.
var MD_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var nextUniqueId = 0;
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
export var MdPlaceholder = (function () {
    function MdPlaceholder() {
    }
    MdPlaceholder = __decorate([
        Directive({
            selector: 'md-placeholder, mat-placeholder'
        }), 
        __metadata('design:paramtypes', [])
    ], MdPlaceholder);
    return MdPlaceholder;
}());
/** The hint directive, used to tag content as hint labels (going under the input). */
export var MdHint = (function () {
    function MdHint() {
        // Whether to align the hint label at the start or end of the line.
        this.align = 'start';
    }
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdHint.prototype, "align", void 0);
    MdHint = __decorate([
        Directive({
            selector: 'md-hint, mat-hint',
            host: {
                'class': 'md-hint',
                '[class.md-right]': 'align == "end"',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdHint);
    return MdHint;
}());
/** The input directive, used to mark the input that `MdInputContainer` is wrapping. */
export var MdInputDirective = (function () {
    function MdInputDirective(_elementRef, _renderer, _ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        /** Variables used as cache for getters and setters. */
        this._type = 'text';
        this._placeholder = '';
        this._disabled = false;
        this._required = false;
        /** Whether the element is focused or not. */
        this.focused = false;
        /**
         * Emits an event when the placeholder changes so that the `md-input-container` can re-validate.
         */
        this._placeholderChange = new EventEmitter();
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return getSupportedInputTypes().has(t); });
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    Object.defineProperty(MdInputDirective.prototype, "disabled", {
        /** Whether the element is disabled. */
        get: function () {
            return this._ngControl ? this._ngControl.disabled : this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "id", {
        /** Unique id of the element. */
        get: function () { return this._id; },
        set: function (value) { this._id = value || this._uid; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdInputDirective.prototype, "placeholder", {
        /** Placeholder attribute of the element. */
        get: function () { return this._placeholder; },
        set: function (value) {
            if (this._placeholder !== value) {
                this._placeholder = value;
                this._placeholderChange.emit(this._placeholder);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "required", {
        /** Whether the element is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "type", {
        /** Input type of the element. */
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
                this._renderer.setElementProperty(this._elementRef.nativeElement, 'type', this._type);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "value", {
        /** The input element's value. */
        get: function () { return this._elementRef.nativeElement.value; },
        set: function (value) { this._elementRef.nativeElement.value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "empty", {
        get: function () {
            return !this._isNeverEmpty() &&
                (this.value == null || this.value === '') &&
                // Check if the input contains bad input. If so, we know that it only appears empty because
                // the value failed to parse. From the user's perspective it is not empty.
                // TODO(mmalerba): Add e2e test for bad input case.
                !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "_uid", {
        get: function () { return this._cachedUid = this._cachedUid || "md-input-" + nextUniqueId++; },
        enumerable: true,
        configurable: true
    });
    /** Focuses the input element. */
    MdInputDirective.prototype.focus = function () { this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus'); };
    MdInputDirective.prototype._onFocus = function () { this.focused = true; };
    MdInputDirective.prototype._onBlur = function () { this.focused = false; };
    MdInputDirective.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    /** Make sure the input is a supported type. */
    MdInputDirective.prototype._validateType = function () {
        if (MD_INPUT_INVALID_TYPES.indexOf(this._type) !== -1) {
            throw new MdInputContainerUnsupportedTypeError(this._type);
        }
    };
    MdInputDirective.prototype._isNeverEmpty = function () { return this._neverEmptyInputTypes.indexOf(this._type) !== -1; };
    MdInputDirective.prototype._isBadInput = function () {
        return this._elementRef.nativeElement.validity.badInput;
    };
    /** Determines if the component host is a textarea. If not recognizable it returns false. */
    MdInputDirective.prototype._isTextarea = function () {
        var nativeElement = this._elementRef.nativeElement;
        return nativeElement ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "id", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "placeholder", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "required", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "type", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdInputDirective.prototype, "_placeholderChange", void 0);
    MdInputDirective = __decorate([
        Directive({
            selector: "input[mdInput], textarea[mdInput], input[matInput], textarea[matInput]",
            host: {
                'class': 'md-input-element',
                // Native input properties that are overwritten by Angular inputs need to be synced with
                // the native input element. Otherwise property bindings for those don't work.
                '[id]': 'id',
                '[placeholder]': 'placeholder',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '(blur)': '_onBlur()',
                '(focus)': '_onFocus()',
                '(input)': '_onInput()'
            }
        }),
        __param(2, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Renderer, NgControl])
    ], MdInputDirective);
    return MdInputDirective;
}());
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
export var MdInputContainer = (function () {
    function MdInputContainer() {
        /** Alignment of the input container's content. */
        this.align = 'start';
        /** Color of the input divider, based on the theme. */
        this.dividerColor = 'primary';
        this._hintLabel = '';
        this._floatingPlaceholder = true;
    }
    Object.defineProperty(MdInputContainer.prototype, "hintLabel", {
        /** Text for the input hint. */
        get: function () { return this._hintLabel; },
        set: function (value) {
            this._hintLabel = value;
            this._validateHints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "floatingPlaceholder", {
        /** Text or the floating placeholder. */
        get: function () { return this._floatingPlaceholder; },
        set: function (value) { this._floatingPlaceholder = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    MdInputContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this._mdInputChild) {
            throw new MdInputContainerMissingMdInputError();
        }
        this._validateHints();
        this._validatePlaceholders();
        // Re-validate when things change.
        this._hintChildren.changes.subscribe(function () { return _this._validateHints(); });
        this._mdInputChild._placeholderChange.subscribe(function () { return _this._validatePlaceholders(); });
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    MdInputContainer.prototype._shouldForward = function (prop) {
        var control = this._mdInputChild ? this._mdInputChild._ngControl : null;
        return control && control[prop];
    };
    /** Whether the input has a placeholder. */
    MdInputContainer.prototype._hasPlaceholder = function () { return !!(this._mdInputChild.placeholder || this._placeholderChild); };
    MdInputContainer.prototype._focusInput = function () { this._mdInputChild.focus(); };
    /**
     * Ensure that there is only one placeholder (either `input` attribute or child element with the
     * `md-placeholder` attribute.
     */
    MdInputContainer.prototype._validatePlaceholders = function () {
        if (this._mdInputChild.placeholder && this._placeholderChild) {
            throw new MdInputContainerPlaceholderConflictError();
        }
    };
    /**
     * Ensure that there is a maximum of one of each `<md-hint>` alignment specified, with the
     * attribute being considered as `align="start"`.
     */
    MdInputContainer.prototype._validateHints = function () {
        var _this = this;
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new MdInputContainerDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new MdInputContainerDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "align", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "dividerColor", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdInputContainer.prototype, "hintLabel", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdInputContainer.prototype, "floatingPlaceholder", null);
    __decorate([
        ContentChild(MdInputDirective), 
        __metadata('design:type', MdInputDirective)
    ], MdInputContainer.prototype, "_mdInputChild", void 0);
    __decorate([
        ContentChild(MdPlaceholder), 
        __metadata('design:type', MdPlaceholder)
    ], MdInputContainer.prototype, "_placeholderChild", void 0);
    __decorate([
        ContentChildren(MdHint), 
        __metadata('design:type', QueryList)
    ], MdInputContainer.prototype, "_hintChildren", void 0);
    MdInputContainer = __decorate([
        Component({selector: 'md-input-container, mat-input-container',
            template: "<div class=\"md-input-wrapper\"> <div class=\"md-input-table\"> <div class=\"md-input-prefix\"><ng-content select=\"[mdPrefix], [md-prefix]\"></ng-content></div> <div class=\"md-input-infix\" [class.md-end]=\"align == 'end'\"> <ng-content selector=\"input, textarea\"></ng-content> <label class=\"md-input-placeholder\" [attr.for]=\"_mdInputChild.id\" [class.md-empty]=\"_mdInputChild.empty\" [class.md-focused]=\"_mdInputChild.focused\" [class.md-float]=\"floatingPlaceholder\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\" *ngIf=\"_hasPlaceholder()\"> <ng-content select=\"md-placeholder\"></ng-content> {{_mdInputChild.placeholder}} <span class=\"md-placeholder-required\" *ngIf=\"_mdInputChild.required\">*</span> </label> </div> <div class=\"md-input-suffix\"><ng-content select=\"[mdSuffix], [md-suffix]\"></ng-content></div> </div> <div class=\"md-input-underline\" [class.md-disabled]=\"_mdInputChild.disabled\"> <span class=\"md-input-ripple\" [class.md-focused]=\"_mdInputChild.focused\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\"></span> </div> <div *ngIf=\"hintLabel != ''\" class=\"md-hint\">{{hintLabel}}</div> <ng-content select=\"md-hint\"></ng-content> </div> ",
            styles: ["md-input-container { display: inline-block; position: relative; font-family: Roboto, \"Helvetica Neue\", sans-serif; line-height: normal; text-align: left; } [dir='rtl'] md-input-container { text-align: right; } .md-input-wrapper { margin: 1em 0; padding-bottom: 6px; } .md-input-table { display: inline-table; flex-flow: column; vertical-align: bottom; width: 100%; } .md-input-table > * { display: table-cell; } .md-input-infix { position: relative; } .md-input-element { font: inherit; background: transparent; color: currentColor; border: none; outline: none; padding: 0; width: 100%; } .md-end .md-input-element { text-align: right; } [dir='rtl'] .md-end .md-input-element { text-align: left; } .md-input-element:-moz-ui-invalid { box-shadow: none; } .md-input-element:-webkit-autofill + .md-input-placeholder.md-float { display: block; transform: translateY(-1.35em) scale(0.75); width: 133.33333%; } .md-input-element::-webkit-input-placeholder { color: transparent; } .md-input-element:-ms-input-placeholder { color: transparent; } .md-input-element::placeholder { color: transparent; } .md-input-element::-moz-placeholder { color: transparent; } .md-input-element::-webkit-input-placeholder { color: transparent; } .md-input-element:-ms-input-placeholder { color: transparent; } .md-input-placeholder { position: absolute; left: 0; top: 0; font-size: 100%; pointer-events: none; z-index: 1; width: 100%; display: none; white-space: nowrap; text-overflow: ellipsis; overflow-x: hidden; transform: translateY(0); transform-origin: bottom left; transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), color 400ms cubic-bezier(0.25, 0.8, 0.25, 1), width 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-input-placeholder.md-empty { display: block; cursor: text; } .md-input-placeholder.md-float:not(.md-empty), .md-input-placeholder.md-float.md-focused { display: block; transform: translateY(-1.35em) scale(0.75); width: 133.33333%; } [dir='rtl'] .md-input-placeholder { transform-origin: bottom right; left: auto; right: 0; } .md-input-underline { position: absolute; height: 1px; width: 100%; margin-top: 4px; border-top-width: 1px; border-top-style: solid; } .md-input-underline.md-disabled { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%); background-size: 4px 1px; background-repeat: repeat-x; border-top: 0; background-position: 0; } .md-input-underline .md-input-ripple { position: absolute; height: 2px; z-index: 1; top: -1px; width: 100%; transform-origin: top; opacity: 0; transform: scaleY(0); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-input-underline .md-input-ripple.md-focused { opacity: 1; transform: scaleY(1); } .md-hint { display: block; position: absolute; font-size: 75%; bottom: 0; } .md-hint.md-right { right: 0; } [dir='rtl'] .md-hint { right: 0; left: auto; } [dir='rtl'] .md-hint.md-right { right: auto; left: 0; } .md-input-prefix, .md-input-suffix { width: 0.1px; white-space: nowrap; } /*# sourceMappingURL=input-container.css.map */ "],
            host: {
                // Remove align attribute to prevent it from interfering with layout.
                '[attr.align]': 'null',
                '[class.ng-untouched]': '_shouldForward("untouched")',
                '[class.ng-touched]': '_shouldForward("touched")',
                '[class.ng-pristine]': '_shouldForward("pristine")',
                '[class.ng-dirty]': '_shouldForward("dirty")',
                '[class.ng-valid]': '_shouldForward("valid")',
                '[class.ng-invalid]': '_shouldForward("invalid")',
                '[class.ng-pending]': '_shouldForward("pending")',
                '(click)': '_focusInput()',
            },
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputContainer);
    return MdInputContainer;
}());

//# sourceMappingURL=input-container.js.map
