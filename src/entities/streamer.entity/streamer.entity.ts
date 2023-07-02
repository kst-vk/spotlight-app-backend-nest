import { VoteEntity } from 'src/entities/vote.entity/vote.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class StreamerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  platform: string;

  @OneToOne(() => VoteEntity, (votes) => votes.streamer, { cascade: true })
  votes: VoteEntity;
}
