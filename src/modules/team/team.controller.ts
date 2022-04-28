import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeamResponseDto } from './dto/response/team-response.dto';
import { TeamsResponseDto } from './dto/response/teams-response.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('team')
@ApiTags('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  /* ------------------------------- Create Team ------------------------------ */
  @Post()
  @ApiOperation({ summary: 'Create team' })
  @ApiCreatedResponse({
    type: TeamResponseDto,
  })
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
    const response = await this.teamService.createTeam(createTeamDto);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_TEAM_OK',
      data: response,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ------------------------------ Get All Team ------------------------------ */
  @Get()
  @Roles('viewer')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all team' })
  @ApiResponse({
    type: TeamResponseDto,
  })
  async findAll(): Promise<TeamsResponseDto> {
    const response = await this.teamService.getTeams();
    const data = { ...response.data };
    return {
      status: HttpStatus.OK,
      message: 'GET_TEAMS_OK',
      data: data.data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  // /* ----------------------------- Get Team By ID ----------------------------- */
  // @Get(':id')
  // @ApiOperation({ summary: 'Get team' })
  // @ApiResponse({
  //   type: TeamResponseDto,
  // })
  // async findOne(@Param('id') id: string): Promise<TeamResponseDto> {
  //   const response = await this.teamService.getTeam({ where: { id } });
  //   return {
  //     status: HttpStatus.OK,
  //     message: 'GET_TEAM_OK',
  //     data: response,
  //     error: null,
  //     timestamp: new Date().toISOString(),
  //   };
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamService.remove(+id);
  // }
}
