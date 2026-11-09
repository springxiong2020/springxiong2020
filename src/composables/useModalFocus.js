import { nextTick, onScopeDispose, watch } from "vue";

const stack = [];
let originalOverflow = "";
const focusableSelector = "a[href], button, input, select, textarea, [tabindex]";

export function useModalFocus(visible, dialogRef, close, initialFocusRef) {
  let entry = null;
  const focusableElements = () =>
    [...(dialogRef.value?.querySelectorAll(focusableSelector) || [])].filter(
      (element) =>
        element.tabIndex >= 0 &&
        !element.matches(":disabled, [hidden], [inert], [inert] *") &&
        element.getClientRects().length,
    );
  const isTop = () => entry && stack.at(-1) === entry;
  const focusInside = () => {
    const target = initialFocusRef?.value || focusableElements()[0] || dialogRef.value;
    target?.focus({ preventScroll: true });
  };
  const onFocus = (event) => {
    if (isTop() && dialogRef.value && !dialogRef.value.contains(event.target)) focusInside();
  };
  const onKeydown = (event) => {
    if (!isTop()) return;
    if (event.key === "Escape" && !event.isComposing) {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    }
    if (event.key !== "Tab") return;
    const items = focusableElements();
    const index = items.indexOf(document.activeElement);
    if (
      !items.length ||
      index === -1 ||
      (!event.shiftKey && index === items.length - 1) ||
      (event.shiftKey && index === 0)
    ) {
      event.preventDefault();
      (event.shiftKey ? items.at(-1) : items[0])?.focus({
        preventScroll: true,
      });
      if (!items.length) dialogRef.value?.focus({ preventScroll: true });
    }
  };
  const deactivate = () => {
    if (!entry) return;
    const restore = entry.trigger;
    const wasTop = isTop();
    stack.splice(stack.indexOf(entry), 1);
    entry = null;
    document.removeEventListener("keydown", onKeydown, true);
    document.removeEventListener("focusin", onFocus);
    if (!stack.length) document.body.style.overflow = originalOverflow;
    if (wasTop && restore?.isConnected) restore.focus({ preventScroll: true });
  };
  watch(
    visible,
    async (open) => {
      if (!open) return deactivate();
      if (entry) return;
      if (!stack.length) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
      entry = { trigger: document.activeElement };
      const currentEntry = entry;
      stack.push(entry);
      document.addEventListener("keydown", onKeydown, true);
      document.addEventListener("focusin", onFocus);
      await nextTick();
      if (entry === currentEntry && isTop()) focusInside();
    },
    { immediate: true, flush: "sync" },
  );
  onScopeDispose(deactivate);
  return { isTop };
}
