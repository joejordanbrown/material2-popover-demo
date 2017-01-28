import { AnimationEntryMetadata } from '@angular/core';
/**
 * Below are all the animations for the md-popover component.
 * Animation duration and timing values are based on Material 1.
 */
/**
 * This animation controls the popover panel's entry and exit from the page.
 *
 * When the popover panel is added to the DOM, it scales in and fades in its border.
 *
 * When the popover panel is removed from the DOM, it simply fades out after a brief
 * delay to display the ripple.
 */
export declare const transformPopover: AnimationEntryMetadata;
/**
 * This animation fades in the background color and content of the popover panel
 * after its containing element is scaled in.
 */
export declare const fadeInItems: AnimationEntryMetadata;
