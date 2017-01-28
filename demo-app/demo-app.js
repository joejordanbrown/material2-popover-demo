"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <p>Welcome to the development demos for Angular Material!</p>\n    <p>Open the sidenav to select a demo. </p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
}());
exports.Home = Home;
var DemoApp = (function () {
    function DemoApp(_element) {
        this._element = _element;
        this.navItems = [
            { name: 'Autocomplete', route: 'autocomplete' },
            { name: 'Button', route: 'button' },
            { name: 'Button Toggle', route: 'button-toggle' },
            { name: 'Card', route: 'card' },
            { name: 'Chips', route: 'chips' },
            { name: 'Checkbox', route: 'checkbox' },
            { name: 'Dialog', route: 'dialog' },
            { name: 'Gestures', route: 'gestures' },
            { name: 'Grid List', route: 'grid-list' },
            { name: 'Icon', route: 'icon' },
            { name: 'Input', route: 'input' },
            { name: 'Input Container', route: 'input-container' },
            { name: 'List', route: 'list' },
            { name: 'Menu', route: 'menu' },
            { name: 'Live Announcer', route: 'live-announcer' },
            { name: 'Overlay', route: 'overlay' },
            { name: 'Popover', route: 'popover' },
            { name: 'Portal', route: 'portal' },
            { name: 'Projection', route: 'projection' },
            { name: 'Progress Bar', route: 'progress-bar' },
            { name: 'Progress Spinner', route: 'progress-spinner' },
            { name: 'Radio', route: 'radio' },
            { name: 'Ripple', route: 'ripple' },
            { name: 'Select', route: 'select' },
            { name: 'Sidenav', route: 'sidenav' },
            { name: 'Slider', route: 'slider' },
            { name: 'Slide Toggle', route: 'slide-toggle' },
            { name: 'Snack Bar', route: 'snack-bar' },
            { name: 'Tabs', route: 'tabs' },
            { name: 'Toolbar', route: 'toolbar' },
            { name: 'Tooltip', route: 'tooltip' },
            { name: 'Platform', route: 'platform' }
        ];
    }
    DemoApp.prototype.toggleFullscreen = function () {
        var elem = this._element.nativeElement.querySelector('.demo-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    };
    DemoApp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo-app',
            providers: [],
            templateUrl: 'demo-app.html',
            styleUrls: ['demo-app.css'],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;

//# sourceMappingURL=demo-app.js.map
