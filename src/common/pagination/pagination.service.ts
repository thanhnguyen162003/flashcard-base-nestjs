import { Injectable } from '@nestjs/common';
import { PaginationMetaDto, PaginatedResponseDto } from './pagination.dto';

@Injectable()
export class PaginationService {
  createPaginatedResponse<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResponseDto<T> {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    const meta: PaginationMetaDto = {
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrevious,
    };

    return {
      data,
      meta,
    };
  }

  getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
