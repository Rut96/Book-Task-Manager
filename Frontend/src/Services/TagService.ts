import axios from "axios";
import { TagModel } from "../Models/TagModel";
import { appConfig } from "../Utils/AppConfig";

class TagService {

    public async getAllTags(): Promise<TagModel[]> {
        const response = await axios.get(appConfig.tagsUrl);
        const tags = response.data;
        return tags;
    }

    public async getOneTag(tagId: number): Promise<TagModel> {
        const response = await axios.get(appConfig.tagsUrl + tagId);
        const tag = response.data;
        return tag;
    }

    public async addTag(tag: TagModel): Promise<TagModel> {
        const response = await axios.post(appConfig.tagsUrl,tag);
        const dbTag = response.data;
        return dbTag;
    }

    public async updateTag(tag: TagModel): Promise<TagModel> {
        const response = await axios.post(appConfig.tagsUrl + tag.id,tag);
        const dbTag = response.data;
        return dbTag;
    }

    public async deleteTag(tagId: number): Promise<void> {
        await axios.delete(appConfig.tagsUrl + tagId);
    }

}

export const tagService = new TagService();
