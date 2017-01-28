import { ElementRef } from '@angular/core';
export declare class Home {
}
export declare class DemoApp {
    private _element;
    navItems: {
        name: string;
        route: string;
    }[];
    constructor(_element: ElementRef);
    toggleFullscreen(): void;
}
