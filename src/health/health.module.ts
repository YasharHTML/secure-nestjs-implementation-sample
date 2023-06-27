import { HttpModule } from '@nestjs/axios';
import { ConsoleLogger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule.forRoot({ logger: ConsoleLogger }), HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
