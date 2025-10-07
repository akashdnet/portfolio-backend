import {
  Model,
  Document,
  FilterQuery,
  ProjectionType,
  SortOrder,
  InferRawDocType,
} from "mongoose";

export interface TUniversalSearchOptions<T> {
  page?: number;
  limit?: number;
  filter?: FilterQuery<T>;
  projection?: ProjectionType<T>;
  sort?: Record<string, SortOrder>;
  term?: string;
}

export interface TUniversalSearchResult<T> {
  data: T[] | any;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default class UniversalSearch<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async GetData(
    options: TUniversalSearchOptions<T> = {}
  ): Promise<TUniversalSearchResult<T>> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const skip = (page - 1) * limit;

    let query: FilterQuery<T> = options.filter || {};

    if (options.term) {
      const schemaPaths = Object.keys(this.model.schema.paths).filter(
        (key) => !["_id", "__v"].includes(key)
      );

      query = {
    ...query,
    $or: [
      { title: { $regex: options.term, $options: "i" } },
      { description: { $regex: options.term, $options: "i" } },
    ]
  } as FilterQuery<T>;
    }

    const [total, data] = await Promise.all([
      this.model.countDocuments(query),
      this.model
        .find(query, options.projection)
        .sort(options.sort || {_id: -1})
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    return {
      
      meta:{
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data,
    };
  }
}
