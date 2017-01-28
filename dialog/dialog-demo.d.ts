import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
export declare class DialogDemo {
    dialog: MdDialog;
    dialogRef: MdDialogRef<JazzDialog>;
    lastCloseResult: string;
    actionsAlignment: string;
    config: MdDialogConfig;
    constructor(dialog: MdDialog, doc: any);
    openJazz(): void;
    openContentElement(): void;
}
export declare class JazzDialog {
    dialogRef: MdDialogRef<JazzDialog>;
    jazzMessage: string;
    constructor(dialogRef: MdDialogRef<JazzDialog>);
}
export declare class ContentElementDialog {
    dialog: MdDialog;
    actionsAlignment: string;
    constructor(dialog: MdDialog);
    showInStackedDialog(): void;
}
export declare class IFrameDialog {
}
