import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { ReadingStatusModel } from "../3-models/reading-status-model";

class ReadingStatusService {

    public async getAllStatuses(): Promise<ReadingStatusModel[]> {
        const sql = "select * from readingStatus";
        return await dal.execute(sql);
    }

    public async getOneStatus(id: number): Promise<ReadingStatusModel> {
        const sql = "select * from readingStatus where id = ?";
        return await dal.execute(sql,[id]);
    }

    public async addStatus(status: ReadingStatusModel): Promise<ReadingStatusModel> {
        const sql = "insert into readingStatus values name = ?";
        const successParams: OkPacketParams = await dal.execute(sql, [status.name]);
        status.id = successParams.insertId;
        return status;
    }

    public async updateStatus(status: ReadingStatusModel): Promise<void> {
        const sql = "update readingStatus set name = ?";
        const successParams: OkPacketParams = await dal.execute(sql, [status.name]);
        if (successParams.affectedRows === 0) throw new NotFoundError(`id ${status.id} not found`);
    }

    public async deleteStatus(statusId: number): Promise<void> {
        const sql = "delete from readingStatus where id = ?";
        await dal.execute(sql, [statusId]);
    }

}

export const readingStatusService = new ReadingStatusService();