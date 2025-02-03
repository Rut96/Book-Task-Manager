import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { ReadingStatusModel } from "../Models/ReadingStatusModel";

class ReadingStatusService {
    public async getAllStatuses(): Promise<ReadingStatusModel[]> {
        const response = await axios.get(appConfig.readingStatusUrl);
        const tags = response.data;
        return tags;
    }

    public async getOneStatus(statusId: number): Promise<ReadingStatusModel> {
        const response = await axios.get(appConfig.readingStatusUrl + statusId);
        const tag = response.data;
        return tag;
    }

    public async addStatus(status: ReadingStatusModel): Promise<ReadingStatusModel> {
        const response = await axios.post(appConfig.readingStatusUrl,status);
        const dbTag = response.data;
        return dbTag;
    }

    public async updateStatus(status: ReadingStatusModel): Promise<ReadingStatusModel> {
        const response = await axios.post(appConfig.readingStatusUrl + status.id,status);
        const dbTag = response.data;
        return dbTag;
    }

    public async deleteStatus(statusId: number): Promise<void> {
        await axios.delete(appConfig.readingStatusUrl + statusId);
    }

}

export const readingStatusService = new ReadingStatusService();
