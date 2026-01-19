import { inject, Renderer2 } from '@angular/core';

export function fixBodyTag(renderer: Renderer2) {

  renderer.addClass(document.body, 'fixed');
  renderer.addClass(document.body, 'w-full');
}

export function unfixBodyTag(renderer: Renderer2) {
  renderer.removeClass(document.body, 'fixed');
  renderer.removeClass(document.body, 'w-full');
}
