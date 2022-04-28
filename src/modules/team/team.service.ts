import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const result = await this.httpService.post(`/items/team`, createTeamDto);

    return result;
  }

  async getTeams() {
    const result = await firstValueFrom(this.httpService.get(`/items/team`));
    return result;
  }

  // async getTeam(condition: FindOneOptions<Team>) {
  //   return await this.teamRepository.findOne(condition);
  // }

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return `This action updates a #${id} team`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} team`;
  // }
}
