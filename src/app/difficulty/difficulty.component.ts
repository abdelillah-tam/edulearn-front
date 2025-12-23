import { Component, input, output } from '@angular/core';

@Component({
  selector: 'difficulty-list',
  imports: [],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css',
})
export class DifficultyComponent {
  difficultyList = input<string[]>([]);

  selectedDifficulty = output<string>();

  closedDifficulty = input(true);

  selectDifficulty(index: number) {
    this.selectedDifficulty.emit(this.difficultyList()[index]);
  }
}
