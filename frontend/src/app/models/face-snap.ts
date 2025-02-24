import { snapType } from './like-type.type';

export class FaceSnap {
  location?: string;
  id: number;

  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public createdDate: Date,
    public snaps: number
  ) {
    // this.id = crypto.randomUUID().substring(0, 8);
    this.id = 1;
    console.log(this);
  }

  /////////
  // DEBUT DELETE CAR MARCHE PAS
  // addLike(): void {
  //   this.snaps++;
  //   console.log('LIKE', this.title);
  // }

  // unLike(): void {
  //   this.snaps--;
  //   console.log('UNLIKE', this.title);
  // }

  // like(snapType: snapType): void {
  //   if (snapType === 'like') {
  //     this.addLike();
  //   } else if (snapType === 'unlike') {
  //     this.unLike();
  //   }
  // }

  // //La méthode setLocation est une méthode "void" : elle modifie une propriété d'un objet existant mais ne retourne rien (elle retourne implicitement undefined).
  // setLocation(location: string): void {
  //   this.location = location;
  // }

  // //La méthode withLocation, en revanche, retourne l'instance courante de l'objet (this), ce qui permet de chaîner les appels ou d'initialiser un objet de manière plus fluide. Voici un exemple pour illustrer :
  // withLocation(location: string): FaceSnap {
  //   this.setLocation(location);
  //   // Cela nous permet d'ajouter la localisation au FaceSnap sans avoir besoin d'un contexte où l'on pourrait appeler  setLocation
  //   return this;
  // }

  /////////
  // FIN DELETE
}

// Sur le tuto de la  version 11
// export class FaceSnap {
//   // id permet d'identifier et snap un FaceSnap par identifiant
//   //
//   id!: number;
//   title!: string;
//   description!: string;
//   imageUrl!: string;
//   createdDate!: Date;
//   snaps!: number;
//   location?: string;
// }
