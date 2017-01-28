import { OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
export declare class AutocompleteDemo implements OnDestroy {
    stateCtrl: FormControl;
    currentState: string;
    reactiveStates: any[];
    tdStates: any[];
    reactiveValueSub: Subscription;
    tdDisabled: boolean;
    states: {
        code: string;
        name: string;
    }[];
    constructor();
    filterStates(val: string): {
        code: string;
        name: string;
    }[];
    ngOnDestroy(): void;
}
