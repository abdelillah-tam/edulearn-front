import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  createCourse(
    title: string,
    description: string,
    category: string,
    difficulty: string,
    duration: string,
    thumbnailUrl: string,
    objectiveValues: string[],
    prerequisites: string,
    moduleValues: {
      title: string;
      lessons: { title: string; duration: string }[];
    }[],
  ) {
    return this.httpClient.post(
      `${environment.API}/createCourse`,
      {
        title: title,
        description: description,
        category: category,
        difficulty: difficulty,
        duration: duration,
        thumbnail: thumbnailUrl,
        objectives: objectiveValues,
        prerequisites: prerequisites,
        modules: moduleValues,
      },
      {
        withCredentials: true,
      },
    );
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

  async uploadCourseThumbnail(file: File) {
    const storage = getStorage();
    let downloadUrl: string;

    const storageRef = ref(storage, `courseThumbnail/${file.name}`);
    await uploadBytes(storageRef, file);
    let url = await getDownloadURL(storageRef);
    downloadUrl = url;

    return downloadUrl;
  }

  getCategoryList() {
    return this.httpClient.get<string[]>(`${environment.API}/getCategoryList`);
  }

  getDifficultyList() {
    return this.httpClient.get<string[]>(
      `${environment.API}/getDifficultyList`,
    );
  }

  enroll(course_id: number) {
    return this.httpClient.post<boolean>(
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
    return this.httpClient.get(`${environment.API}/course/${id}`, {
      withCredentials: true,
    });
  }

  getCoursesEnrolled() {
    return this.httpClient.get(`${environment.API}/getCoursesEnrolled`, {
      withCredentials: true,
    });
  }

  getPopularCourses() {
    return this.httpClient.get(`${environment.API}/getPopularCourses`);
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
}
