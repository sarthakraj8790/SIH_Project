import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("jsonb", { nullable: true })
  data: any;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.reports)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;
}