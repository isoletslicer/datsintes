import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schemas/products.schema";

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

    async create(product: Product): Promise<Product> {
        const newProduct = new this.ProductModel(product);
        return newProduct.save();
    }

    async readAll(): Promise<Product[]> {
        return await this.ProductModel.find().exec();
    }

    async readById(id: any): Promise<Product> {
        return await this.ProductModel.findById(id).exec();
    }

    async update(id: any, product: Product): Promise<Product> {
        return await this.ProductModel.findByIdAndUpdate(id, product, { new: true });
    }

    async delete(id: any): Promise<any> {
        return await this.ProductModel.findByIdAndRemove(id);
    }
}
