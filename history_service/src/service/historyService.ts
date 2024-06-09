import {History} from "../db/models/history";

interface HistoryQuery {
  userId?: string;
  page?: number;
  pageSize?: number;
}

interface HistoryResponse {
  data: History[];
  total: number;
  page: number;
  pageSize: number;
}

class HistoryService {
  async getHistory(query: HistoryQuery): Promise<HistoryResponse> {
    const { userId, page = 1, pageSize = 10 } = query;
    const where = userId ? { user_id: userId } : {};
    const offset = (Number(page) - 1) * Number(pageSize);

    const history = await History.findAndCountAll({
      where,
      limit: Number(pageSize),
      offset,
    });

    return {
      data: history.rows,
      total: history.count,
      page: Number(page),
      pageSize: Number(pageSize),
    };
  }
}

export default new HistoryService();
