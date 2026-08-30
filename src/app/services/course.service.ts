import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  createCourse(courseData: FormData) {
    return this.httpClient.post(`${environment.API}/createCourse`, courseData, {
      withCredentials: true,
    });
  }

  retrievAllCourses(
    category: string,
    difficulty: string,
    search: string,
    page: number,
  ) {
    return this.httpClient.post<{
      current_page: number;
      data: any[];
      last_page: number;
      per_page: number;
      total: number;
    }>(
      `${environment.API}/getAllCourses?page=${page}`,
      {
        category: category,
        difficulty: difficulty,
        search: search,
      },
      {
        withCredentials: true,
      },
    );
  }

  enroll(course_id: number) {
    return this.httpClient.post<boolean | { message: string; code: number }>(
      `${environment.API}/enroll`,
      {
        course_id: course_id,
      },
      {
        withCredentials: true,
      },
    );
  }

  getCourse(id: number) {
    return this.httpClient.post(
      `${environment.API}/course/${id}`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  getCoursesEnrolled() {
    return this.httpClient.get(`${environment.API}/getCoursesEnrolled`, {
      withCredentials: true,
    });
  }

  getPopularCourses() {
    return this.httpClient.post(
      `${environment.API}/getPopularCourses`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  setWatched(lessonId: number) {
    return this.httpClient.post(
      `${environment.API}/setWatched`,
      {
        id: lessonId,
      },
      {
        withCredentials: true,
      },
    );
  }

  getInstructorCourses() {
    return this.httpClient.get<any[]>(
      `${environment.API}/getInstructorCourses`,
      {
        withCredentials: true,
      },
    );
  }

  prompt(prompt: string) {
    return this.httpClient.post<{
      ai_response: string;
      courses: {
        title: string;
        description: string;
        level: string;
        link: string;
      }[];
    }>(
      `${environment.API}/prompting`,
      {
        prompt: prompt,
      },
      { withCredentials: true },
    );
  }
}
