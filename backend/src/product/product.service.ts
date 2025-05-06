import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/schemas/product.Schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: mongoose.Model<Product>) { }

    async getProduct() {
        try {
            return await this.productModel.find().exec();
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }


    async getProductById(id: string) {
        try {
            const product = await this.productModel.findById(id).exec();
            if (!product) throw new NotFoundException('Product not found');
            return product;
        }
        catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch product');
        }
    }

    async createProduct(createProductDto: CreateProductDto) {
        try {
            const exsitingProduct = await this.productModel.findOne({ name: createProductDto.name });
            if (exsitingProduct) {
                throw new BadRequestException('Product with this title already exists');
            }
            return await this.productModel.create(createProductDto);
        }
        catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create product');
        }
    }


    async updateProduct(id: string, updateProductDto: UpdateProductDto) {
        try {
            const updated = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec()
            if (!updated) throw new NotFoundException('Product not found');

            return updated;
        }
        catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to update product');
        }

    }

    async removeProduct(id: string) {
        try {
            const deleted = await this.productModel.findByIdAndDelete(id).exec();
            if (!deleted) throw new NotFoundException('Product not found');
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete product');
        }
    }

}
