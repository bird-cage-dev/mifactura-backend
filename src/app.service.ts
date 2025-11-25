import { Injectable } from '@nestjs/common';
import { asc } from 'drizzle-orm';
import { DatabaseService } from './database/database.service';
import { messages } from './database/schema';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getHello(): Promise<string> {
    if (!this.databaseService.db) {
      return 'Hello World!';
    }

    const [message] = await this.databaseService.db
      .select()
      .from(messages)
      .orderBy(asc(messages.createdAt))
      .limit(1);

    return message?.content ?? 'Hello World!';
  }
}
