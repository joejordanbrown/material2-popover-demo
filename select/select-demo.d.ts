import { FormControl } from '@angular/forms';
import { MdSelectChange } from '@angular/material';
export declare class SelectDemo {
    isRequired: boolean;
    isDisabled: boolean;
    showSelect: boolean;
    currentDrink: string;
    latestChangeEvent: MdSelectChange;
    foodControl: FormControl;
    foods: {
        value: string;
        viewValue: string;
    }[];
    drinks: {
        value: string;
        viewValue: string;
    }[];
    pokemon: {
        value: string;
        viewValue: string;
    }[];
    toggleDisabled(): void;
}
