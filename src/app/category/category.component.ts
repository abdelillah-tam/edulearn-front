import {
  Component,
  input,
  output,
} from '@angular/core';
@Component({
  selector: 'category-list',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryListComponent {
  categoryList = input<string[]>([]);

  selectedCategory = output<string>();

  closedCategories = input(true);


  selectCategory(index: number) {
    this.selectedCategory.emit(this.categoryList()[index]);
  }
}
