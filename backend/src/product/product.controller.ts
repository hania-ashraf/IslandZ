import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.Schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProduct():Promise<Product[]>{
        return this.productService.getProduct();
    }

    @Get(':id')
    getProductById(@Param('id') id:string):Promise<Product>{
        return this.productService.getProductById(id);

    }
    @Post()
    createProduct(@Body()createProductDto:CreateProductDto){
       return this.productService.createProduct(createProductDto);
        
    }
    @Put(':id')
    updateProduct(@Param('id') id:string , @Body() updateProductDto:UpdateProductDto){
        return this.productService.updateProduct(id,updateProductDto);
    }

    @Delete('id')
    removeProduct(@Param('id') id:string){
        console.log('Delete route hit');
        return this.productService.removeProduct(id);

    }

}
