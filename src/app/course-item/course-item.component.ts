import { DecimalPipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-course-item',
  imports: [DecimalPipe, MatIcon],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
})
export class CourseItemComponent {
  course = input<{
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    instructor: string;
    category: string;
  }>();

  shortDescription(description?: string) {
    const firstPeriod = description?.indexOf('.');

    if (firstPeriod !== -1) {
      // We add 1 to include the period itself
      let text = this.course()?.description.substring(0, firstPeriod! + 1);

      return text;
    }

    return firstPeriod;
  }
}
