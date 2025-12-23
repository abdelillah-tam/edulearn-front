import {
  AfterContentChecked,
  Component,
  input,
  InputSignal,
  OnInit,
  output,
} from '@angular/core';
import { CATEGORIES } from '../global/categories';
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
