import { useEffect } from "react";

// Taken from https://medium.com/@im_rahul/focus-trapping-looping-b3ee658e5177, but should be
// amended if other focusable elements are detected, but not caught within this list
const FOCUSABLE_ELEMENT_SELECTORS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

const TRAPPABLE_KEYS = ["Tab", "PageUp", "PageDown", "Home", "End"];

// Handles focus transfer for the first and last items when the tab key is pressed
export default function useFocusTrap(wrapperRef, isOpen, onClose) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      const { key, shiftKey } = e;

      if (key === "Escape" && onClose) {
        e.preventDefault();
        onClose();
      }

      if (!TRAPPABLE_KEYS.includes(key) || !wrapperRef.current) return;

      // Focusable elements is recalcualted on every tab click to ensure that
      // any changes that might have happened to the DOM are also caught here.
      const focusableEls = wrapperRef.current.querySelectorAll(
        FOCUSABLE_ELEMENT_SELECTORS
      );

      // If there are no focusable elements, no focus transfer should be made
      if (focusableEls.length === 0) {
        e.preventDefault();
      }

      const { activeElement } = document;

      const firstFocusableEl = focusableEls[0];
      const firstIsFocused = activeElement === firstFocusableEl;

      // Ensures that even if there is only one that the focus is properly
      // transfered to that item, and that nothing happens if that item is
      // already focused.
      if (focusableEls.length === 1) {
        !firstIsFocused && firstFocusableEl.focus();
        e.preventDefault();
      }

      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      const lastIsFocused = activeElement === lastFocusableEl;

      let newFocusEl;

      // Cycle the focus through the elements by shifting the focus back to the
      // start/end depending on the following conditions. If neither of these
      // conditions are met the event is not prevented and the regular focus
      // transfer occurs. This could be rewritten to be a series of compound
      // conditions, but its most easily understood as a series of if/else
      // statements.
      if (key === "PageDown" || key === "End") {
        newFocusEl = lastFocusableEl;
      } else if (key === "PageUp" || key === "Home") {
        newFocusEl = firstFocusableEl;
      } else if (key === "Tab" && shiftKey && firstIsFocused) {
        newFocusEl = lastFocusableEl;
      } else if (key === "Tab" && !shiftKey && lastIsFocused) {
        newFocusEl = firstFocusableEl;
      }

      if (newFocusEl) {
        e.preventDefault();
        newFocusEl.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wrapperRef, onClose, isOpen]);
}
