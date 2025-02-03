export class ReadingStatusModel {
    id: number;
    name: string;

    public constructor(status: ReadingStatusModel){
        this.id = status.id;
        this.name = status.name;
    }
}