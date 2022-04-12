import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(role: CreateRoleDto) {
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({
      relations: {
        menus: true,
        users: true,
      },
    });
  }

  findByUUID(uuid: string) {
    return this.roleRepository.findOne({
      where: { uuid: uuid },
      relations: {
        menus: true,
      },
    });
  }

  // update(uuid: string, updateRoleDto: UpdateRoleDto) {}

  // remove(uuid: string) {
  // }
}
