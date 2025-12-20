export class Course {
  constructor(
    public title: string,
    public description: string,
    public category: string,
    public duration: string,
    public difficulty: string,
    public objectives: string[],
    public prerequisites: string,
    public modules: { title: string; lessons: string[] }[],
  ) {}
}
