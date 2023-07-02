import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { StreamerEntity } from 'src/entities/streamer.entity/streamer.entity';
import { VoteEntity } from 'src/entities/vote.entity/vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpotlightService {
  constructor(
    @InjectRepository(StreamerEntity)
    private streamerRepository: Repository<StreamerEntity>,

    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>,
  ) {}

  private eventSubject = new Subject<MessageEvent>();

  getHello(): string {
    return 'Hello World!';
  }

  async getStreamers(): Promise<StreamerEntity[]> {
    return await this.streamerRepository.find({ relations: ['votes'] });
  }

  async addStreamer(streamer: StreamerEntity): Promise<StreamerEntity> {
    streamer.votes = new VoteEntity();

    return await this.streamerRepository.save(streamer).finally(() => {
      this.eventSubject.next({
        data: {
          streamer: streamer,
          type: 'addStreamer',
        },
      } as MessageEvent);
    });
  }

  async getStreamer(streamerId: string) {
    return await this.streamerRepository.findOneBy({ id: streamerId });
  }

  async upvoteStreamer(streamerId: string) {
    return await this.voteRepository
      .increment(Object({ streamer: streamerId }), 'upvotes', 1)
      .finally(() => {
        this.eventSubject.next({
          data: { streamer: streamerId, type: 'upvote' },
        } as MessageEvent);
      });
  }

  async downvoteStreamer(streamerId: string) {
    return await this.voteRepository
      .increment(Object({ streamer: streamerId }), 'downvotes', 1)
      .finally(() => {
        this.eventSubject.next({
          data: { streamer: streamerId, type: 'downvote' },
        } as MessageEvent);
      });
  }

  getEventSubject() {
    return this.eventSubject;
  }
}
