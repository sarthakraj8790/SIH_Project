import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("suspicious_transactions")
export class SuspiciousTransaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  transactionHash: string;

  @Column()
  walletAddress: string;

  @Column()
  ipAddress: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @Column()
  location: string;

  @Column("float")
  riskScore: number;

  @Column("jsonb")
  details: any;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, user => user.suspiciousTransactions)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;
}