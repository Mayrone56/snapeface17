export class FaceSnap {
  location?: string;

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
  //La méthode setLocation est une méthode "void" : elle modifie une propriété d'un objet existant mais ne retourne rien (elle retourne implicitement undefined).
  setLocation(location: string): void {
    this.location = location;
  }

  //La méthode withLocation, en revanche, retourne l'instance courante de l'objet (this), ce qui permet de chaîner les appels ou d'initialiser un objet de manière plus fluide. Voici un exemple pour illustrer :
  withLocation(location: string): FaceSnap {
    this.setLocation(location);
    // Cela nous permet d'ajouter la localisation au FaceSnap sans avoir besoin d'un contexte où l'on pourrait appeler  setLocation
    return this;
  }
}
