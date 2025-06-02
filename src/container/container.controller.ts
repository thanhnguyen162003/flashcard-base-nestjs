import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { UpdateContainerDto } from './dto/container.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('containers')
@UseGuards(JwtAuthGuard)
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Get(':flashcardId')
  async getContainer(
    @Request() req,
    @Param('flashcardId') flashcardId: string,
  ) {
    return this.containerService.getContainer(req.user.id, flashcardId);
  }

  @Put(':flashcardId')
  async updateContainer(
    @Request() req,
    @Param('flashcardId') flashcardId: string,
    @Body() updateContainerDto: UpdateContainerDto,
  ) {
    return this.containerService.updateContainer(
      req.user.id,
      flashcardId,
      updateContainerDto,
    );
  }

  @Delete(':flashcardId')
  async deleteContainer(
    @Request() req,
    @Param('flashcardId') flashcardId: string,
  ) {
    return this.containerService.deleteContainer(req.user.id, flashcardId);
  }
}
