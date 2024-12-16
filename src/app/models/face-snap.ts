import { LikeType } from './like-type.type';

export class FaceSnap {
  location?: string;
  id: string;

  constructor(
    public title: string,
    public description: string,
    public imgUrl: string,
    public createdDate: Date,
    public likeNb: number
  ) {
    this.id = crypto.randomUUID().substring(0, 8);
    console.log(this);
  }

  addLike(): void {
    this.likeNb++;
    console.log('LIKE', this.title);
  }

  unLike(): void {
    this.likeNb--;
    console.log('UNLIKE', this.title);
  }

  like(likeType: LikeType): void {
    if (likeType === 'like') {
      this.addLike();
    } else if (likeType === 'unlike') {
      this.unLike();
    }
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
