export class BookModel {
    public id: number;
    public userId: number;
    public title: string;
    public author: string;
    public genre: string;
    public tagId: number;
    public tagName?: string;
    public statusId: number;
    public statusName?: string;
    public notes: string;
    public imageName: string;
    public image: File;
}