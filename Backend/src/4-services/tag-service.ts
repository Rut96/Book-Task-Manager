import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { TagModel } from "../3-models/tag-model";
import { NotFoundError } from "../3-models/error-models";

class TagService {

    public async getAllTags(): Promise<TagModel[]> {
        const sql = "select * from tags";
        return await dal.execute(sql);
    }

    public async getOneTag(id: number): Promise<TagModel> {
        const sql = "select * from tags where id = ?";
        return await dal.execute(sql,[id]);
    }

    public async addTag(tag: TagModel): Promise<TagModel> {
        const sql = "insert into tags values name = ?";
        const successParams: OkPacketParams = await dal.execute(sql, [tag.name]);
        tag.id = successParams.insertId;
        return tag;
    }

    public async updateTag(tag: TagModel): Promise<void> {
        const sql = "update tags set name = ?";
        const successParams: OkPacketParams = await dal.execute(sql, [tag.name]);
        if (successParams.affectedRows === 0) throw new NotFoundError(`id ${tag.id} not found`);
    }

    public async deleteTag(tagId: number): Promise<void> {
        const sql = "delete from tags where id = ?";
        await dal.execute(sql, [tagId]);
    }

}

export const tagService = new TagService();