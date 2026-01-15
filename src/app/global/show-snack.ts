import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export function showSnack(value: string, type: 'success' | 'error') {
  let snack = inject(MatSnackBar);

  snack.open(value, '', {
    panelClass: [`snack-${type}`],
    duration: 3000,
  });
}
