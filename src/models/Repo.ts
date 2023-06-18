export default class Repo {
  id: number;
  name: string;
  owner: string;
  description: string;
  starsCount: string;
  isBookmarked: boolean;

  constructor(
    id: number,
    name: string,
    owner: string,
    description: string,
    numberOfStars: string,
    isBookmarked: boolean
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.description = description;
    this.starsCount = numberOfStars;
    this.isBookmarked = isBookmarked;
  }
}
