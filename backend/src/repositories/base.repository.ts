import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { IFilterOptions } from "../types";

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: Types.ObjectId): Promise<T | null> {
    return this.model.findById(id);
  }

  async find(
    filter: FilterQuery<T>,
    populate: PopulateOptions = { path: "" }
  ): Promise<T[]> {
    return this.model.find(filter).populate(populate);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async findByIdAndUpdate(
    id: Types.ObjectId,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, {
      upsert: true,
      new: true,
    });
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: any = {
      upsert: true,
      new: true,
    }
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, update, options);
  }

  async delete(id: Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async findOneAndDelete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter);
  }

  async paginate(
    filterOptions: FilterQuery<T>,
    page: number,
    limit: number,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T[]> {
    const skip = (page - 1) * limit;
    const query = this.model
      .find(filterOptions)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (populate) {
      query.populate(populate);
    }
    return await query;
  }

}
