import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("wallet_analyses")
export class WalletAnalysis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  address: string;

  @Column("float")
  riskScore: number;

  @Column("jsonb")
  flags: string[];

  @Column("jsonb")
  patterns: string[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.analyses)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;
}