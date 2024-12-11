import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Alert } from "./Alert";
import { Report } from "./Report";
import { WalletAnalysis } from "./WalletAnalysis";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Alert, alert => alert.user)
  alerts: Alert[];

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => WalletAnalysis, analysis => analysis.user)
  analyses: WalletAnalysis[];
}