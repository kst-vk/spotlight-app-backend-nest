import { Body, Controller, Get, Param, Post, Put, Sse } from '@nestjs/common';
import { StreamerEntity } from './entities/streamer.entity/streamer.entity';
import { SpotlightService } from './services/spotlight/spotlight.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly spotlightService: SpotlightService) {}

  @Get()
  getHello(): string {
    return this.spotlightService.getHello();
  }

  @Post('streamers')
  addStreamer(@Body() streamer: StreamerEntity): Promise<StreamerEntity> {
    return this.spotlightService.addStreamer(streamer);
  }

  @Get('streamers')
  async getStreamers(): Promise<StreamerEntity[]> {
    return await this.spotlightService.getStreamers();
  }

  @Get('streamer/:id')
  getStreamer(@Param('id') streamerId: string) {
    return this.spotlightService.getStreamer(streamerId);
  }

  @Put('streamers/:id/vote')
  upvoteStreamer(
    @Param('id') streamerId: string,
    @Body() body: { type: string },
  ) {
    if (body.type == 'upvote') {
      return this.spotlightService.upvoteStreamer(streamerId);
    } else if (body.type === 'downvote') {
      return this.spotlightService.downvoteStreamer(streamerId);
    }
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.spotlightService.getEventSubject().asObservable();
  }
}
