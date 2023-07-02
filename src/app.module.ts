import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamerEntity } from './entities/streamer.entity/streamer.entity';
import { VoteEntity } from './entities/vote.entity/vote.entity';
import { SpotlightService } from './services/spotlight/spotlight.service';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'spotlightDB',
      entities: [StreamerEntity, VoteEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([StreamerEntity, VoteEntity]),
  ],
  controllers: [AppController],
  providers: [Object, Repository, SpotlightService],
})
export class AppModule {}
