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
    moduleValues: { title: string; lessons: string[] }[],
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

  retrievAllCourses() {
    return this.httpClient.get<[]>(`${environment.API}/getAllCourses`);
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

  getCategories() {
    return this.httpClient.get<string[]>(`${environment.API}/getCategories`);
  }
}
