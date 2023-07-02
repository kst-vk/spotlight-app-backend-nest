import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { StreamerEntity } from '../streamer.entity/streamer.entity';

@Entity()
export class VoteEntity {
  constructor(downvotes = 0, upvotes = 0) {
    this.downvotes = downvotes;
    this.upvotes = upvotes;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  downvotes: number;

  @Column()
  upvotes: number;

  @OneToOne(() => StreamerEntity, (streamer) => streamer.votes)
  @JoinColumn()
  streamer: StreamerEntity;
}
