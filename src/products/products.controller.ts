import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Product } from "./schemas/products.schema";
import { ProductService } from "./products.service";
import { HasRoles } from "src/auth/guards/roles/has-roles.decorator";
import { Role } from "src/users/schemas/role.enum";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";



@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HasRoles(Role.Staff)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productService.readAll();
    return response.status(HttpStatus.OK).json({
      products
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productService.readById(id);
    return response.status(HttpStatus.OK).json({
      product
    });
  }

  @HasRoles(Role.Staff)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() product: Product) {
    const updatedProduct = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedProduct
    });
  }

  @HasRoles(Role.Staff)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedProduct = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedProduct
    });
  }
}
