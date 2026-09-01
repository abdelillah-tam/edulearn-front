import { inject, runInInjectionContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export function showSnack(
  snack: MatSnackBar,
  value: string,
  type: 'success' | 'error',
) {
  snack.open(value, '', {
    panelClass: [`snack-${type}`],
    duration: 3000,
  });
}
