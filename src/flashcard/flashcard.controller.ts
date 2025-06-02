import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import {
  CreateFlashcardDto,
  UpdateFlashcardDto,
  CreateFlashcardContentDto,
  StudySessionDto,
  StudyProgressDto,
} from './dto/flashcard.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from '../common/pagination/pagination.dto';
import { PaginatedResponseDto } from '../common/pagination/pagination.dto';
import { FlashcardResponseDto } from './dto/flashcard.dto';

@Controller('flashcards')
@UseGuards(JwtAuthGuard)
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  // Flashcard Set Endpoints
  @Get()
  async getFlashcards(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<FlashcardResponseDto>> {
    return this.flashcardService.getFlashcards(query);
  }

  @Get('my')
  async getMyFlashcards(
    @Query() query: PaginationQueryDto,
    @Request() req,
  ): Promise<PaginatedResponseDto<FlashcardResponseDto>> {
    return this.flashcardService.getFlashcards(query, req.user.id);
  }

  @Get(':id')
  async getFlashcardById(@Param('id') id: string) {
    return await this.flashcardService.getFlashcardById(id);
  }

  @Post()
  async createFlashcard(
    @Request() req,
    @Body() createFlashcardDto: CreateFlashcardDto,
  ) {
    return await this.flashcardService.createFlashcard(
      req.user.id,
      createFlashcardDto,
    );
  }

  @Put(':id')
  async updateFlashcard(
    @Param('id') id: string,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return await this.flashcardService.updateFlashcard(id, updateFlashcardDto);
  }

  @Delete(':id')
  async deleteFlashcard(@Param('id') id: string) {
    return await this.flashcardService.deleteFlashcard(id);
  }

  // Flashcard Content Endpoints
  @Post(':id/contents')
  async addContent(
    @Param('id') flashcardId: string,
    @Body() content: CreateFlashcardContentDto,
  ) {
    return await this.flashcardService.addContent(flashcardId, content);
  }

  @Put('contents/:contentId')
  async updateContent(
    @Param('contentId') contentId: string,
    @Body() content: CreateFlashcardContentDto,
  ) {
    return await this.flashcardService.updateContent(contentId, content);
  }

  @Delete('contents/:contentId')
  async deleteContent(@Param('contentId') contentId: string) {
    return await this.flashcardService.deleteContent(contentId);
  }

  // Study Session Endpoints
  @Post(':id/study-session')
  async createStudySession(
    @Request() req,
    @Param('id') flashcardId: string,
    @Body() studySessionDto: StudySessionDto,
  ) {
    return await this.flashcardService.createStudySession(
      req.user.id,
      flashcardId,
      studySessionDto,
    );
  }

  @Post('study-session/:containerId/progress')
  async updateStudyProgress(
    @Param('containerId') containerId: string,
    @Body() progress: StudyProgressDto,
  ) {
    return await this.flashcardService.updateStudyProgress(
      containerId,
      progress.contentId,
      progress.rating,
    );
  }
}
