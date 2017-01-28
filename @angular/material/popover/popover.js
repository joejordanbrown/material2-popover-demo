var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '../core';
import { MdPopover } from './popover-directive';
import { MdPopoverTrigger } from './popover-trigger';
import { MdRippleModule } from '../core/ripple/ripple';
export { MdPopover } from './popover-directive';
// export {MdPopoverItem} from './popover-item';
export { MdPopoverTrigger } from './popover-trigger';
export var MdPopoverModule = (function () {
    function MdPopoverModule() {
    }
    /** @deprecated */
    MdPopoverModule.forRoot = function () {
        return {
            ngModule: MdPopoverModule,
            providers: [],
        };
    };
    MdPopoverModule = __decorate([
        NgModule({
            imports: [OverlayModule, CommonModule, MdRippleModule],
            exports: [MdPopover, MdPopoverTrigger],
            declarations: [MdPopover, MdPopoverTrigger],
        }), 
        __metadata('design:paramtypes', [])
    ], MdPopoverModule);
    return MdPopoverModule;
}());

//# sourceMappingURL=popover.js.map
