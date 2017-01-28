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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var material_1 = require('@angular/material');
var DialogDemo = (function () {
    function DialogDemo(dialog, doc) {
        this.dialog = dialog;
        this.config = {
            disableClose: false,
            width: '',
            height: '',
            position: {
                top: '',
                bottom: '',
                left: '',
                right: ''
            }
        };
        // Possible useful example for the open and closeAll events.
        // Adding a class to the body if a dialog opens and
        // removing it after all open dialogs are closed
        dialog.afterOpen.subscribe(function (ref) {
            if (!doc.body.classList.contains('no-scroll')) {
                doc.body.classList.add('no-scroll');
            }
        });
        dialog.afterAllClosed.subscribe(function () {
            doc.body.classList.remove('no-scroll');
        });
    }
    DialogDemo.prototype.openJazz = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(JazzDialog, this.config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.lastCloseResult = result;
            _this.dialogRef = null;
        });
    };
    DialogDemo.prototype.openContentElement = function () {
        var dialogRef = this.dialog.open(ContentElementDialog, this.config);
        dialogRef.componentInstance.actionsAlignment = this.actionsAlignment;
    };
    DialogDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dialog-demo',
            templateUrl: 'dialog-demo.html',
            styleUrls: ['dialog-demo.css'],
        }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [material_1.MdDialog, Object])
    ], DialogDemo);
    return DialogDemo;
}());
exports.DialogDemo = DialogDemo;
var JazzDialog = (function () {
    function JazzDialog(dialogRef) {
        this.dialogRef = dialogRef;
        this.jazzMessage = 'Jazzy jazz jazz';
    }
    JazzDialog = __decorate([
        core_1.Component({
            selector: 'demo-jazz-dialog',
            template: "\n  <p>It's Jazz!</p>\n  <p><label>How much? <input #howMuch></label></p>\n  <p> {{ jazzMessage }} </p>\n  <button type=\"button\" (click)=\"dialogRef.close(howMuch.value)\">Close dialog</button>"
        }), 
        __metadata('design:paramtypes', [material_1.MdDialogRef])
    ], JazzDialog);
    return JazzDialog;
}());
exports.JazzDialog = JazzDialog;
var ContentElementDialog = (function () {
    function ContentElementDialog(dialog) {
        this.dialog = dialog;
    }
    ContentElementDialog.prototype.showInStackedDialog = function () {
        this.dialog.open(IFrameDialog);
    };
    ContentElementDialog = __decorate([
        core_1.Component({
            selector: 'demo-content-element-dialog',
            styles: [
                "img {\n      max-width: 100%;\n    }"
            ],
            template: "\n    <h2 md-dialog-title>Neptune</h2>\n\n    <md-dialog-content>\n      <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg\"/>\n\n      <p>\n        Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the\n        Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet,\n        and the densest giant planet. Neptune is 17 times the mass of Earth and is slightly more\n        massive than its near-twin Uranus, which is 15 times the mass of Earth and slightly larger\n        than Neptune. Neptune orbits the Sun once every 164.8 years at an average distance of 30.1\n        astronomical units (4.50\u00D7109 km). It is named after the Roman god of the sea and has the\n        astronomical symbol \u2646, a stylised version of the god Neptune's trident.\n      </p>\n    </md-dialog-content>\n\n    <md-dialog-actions [attr.align]=\"actionsAlignment\">\n      <button\n        md-raised-button\n        color=\"primary\"\n        md-dialog-close>Close</button>\n\n      <a\n        md-button\n        color=\"primary\"\n        href=\"https://en.wikipedia.org/wiki/Neptune\"\n        target=\"_blank\">Read more on Wikipedia</a>\n      \n      <button\n        md-button\n        color=\"secondary\"\n        (click)=\"showInStackedDialog()\">\n        Show in Dialog</button>\n    </md-dialog-actions>\n  "
        }), 
        __metadata('design:paramtypes', [material_1.MdDialog])
    ], ContentElementDialog);
    return ContentElementDialog;
}());
exports.ContentElementDialog = ContentElementDialog;
var IFrameDialog = (function () {
    function IFrameDialog() {
    }
    IFrameDialog = __decorate([
        core_1.Component({
            selector: 'demo-iframe-dialog',
            styles: [
                "iframe {\n      width: 800px;\n    }"
            ],
            template: "\n    <h2 md-dialog-title>Neptune</h2>\n\n    <md-dialog-content>\n      <iframe frameborder=\"0\" src=\"https://en.wikipedia.org/wiki/Neptune\"></iframe>\n    </md-dialog-content>\n\n    <md-dialog-actions>\n      <button\n        md-raised-button\n        color=\"primary\"\n        md-dialog-close>Close</button>\n    </md-dialog-actions>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], IFrameDialog);
    return IFrameDialog;
}());
exports.IFrameDialog = IFrameDialog;

//# sourceMappingURL=dialog-demo.js.map
