export class TagModel {
    id: number;
    name: string;
    public constructor(tag: TagModel) {
        this.id = tag.id;
        this.name = tag.name
    }
}