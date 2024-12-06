export class FaceSnap {
  constructor(
    public title: string,
    public description: string,
    public imgUrl: string,
    public createdDate: Date,
    public likeNb: number
  ) {}

  like(): void {
    this.likeNb++;
  }

  unLike(): void {
    this.likeNb--;
  }
}
