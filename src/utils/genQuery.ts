// import { directusFields } from './../entities/DirectusFields.entity';
const _ = require('lodash');
import { FragmentsOnCompositeTypesRule } from 'graphql';
import {
  Repository,
  Brackets,
  Not,
  Like,
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { EntitySchema, SelectQueryBuilder } from 'typeorm';

export default {};

export const genQuery = (path: string) => {
  const tempObject = {};
  let container = tempObject;
  const defaultValues = true;
  path.split('.').map((k, i, values) => {
    container = container[k] = i == values.length - 1 ? defaultValues : {};
  });
  return tempObject;
};

export const genMultiFields = (paths: string) => {
  let pathList = paths ? paths.split(',') : [];
  // let buffer = []
  const tempObject = {};
  console.log('pathList', pathList);
  let buffer = pathList.map((path) => {
    let container = tempObject;
    const defaultValues = true;
    tempObject[path] = true;
  });

  return tempObject;
};

export const genMultiRelations = (paths: string) => {
  let pathList = paths ? paths.split(',') : [];
  // let buffer = []
  pathList.indexOf('*') !== -1 && pathList.splice(pathList.indexOf('*'), 1);

  let buffer = pathList.map((path) => {
    const tempObject = {};
    let container = tempObject;
    const defaultValues = true;
    if (path.split('.').length > 0) {
      path
        .split('.')
        .filter((r) => r !== '*')
        .map((k, i, values) => {
          container = container[k] =
            i == values.length - 1 ? defaultValues : {};
        });
      return tempObject;
    } else {
      return undefined;
    }
  });
  const allRules = Object.assign({}, ...buffer);

  return allRules;
};

export const mapDirectusFieldsToTypeORM = (inputStr) => {
  // Split the input string into an array of strings
  const inputArr = inputStr.split(',');

  // Start with an empty JSON object
  let result = {};
  let currentObj = result;

  // Iterate through the array of strings
  for (let i = 0; i < inputArr.length; i++) {
    const keys = inputArr[i].split('.');
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      // Check if it is the last element in the array
      if (j === keys.length - 1) {
        currentObj[key] = true;
      } else {
        if (!currentObj[key]) {
          currentObj[key] = {};
        }
        currentObj = currentObj[key];
      }
    }
    // Reset the current object to the root object
    currentObj = result;
  }
  return result;
};

export function mapDirectusQueryToTypeORM(query) {
  const options = {};

  // Filter
  if (query.filter) {
    options['where'] = {};
    const handleFilter = (filter) => {
      Object.entries(filter).forEach(([key, value]) => {
        console.log([key, value]);
        if (key.startsWith('_')) {
          if (Array.isArray(value)) {
            options['where'] = value.map((val) => handleFilter(val));
          } else {
            handleFilter(value);
          }
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([operator, operand]) => {
            if (operator === '_contains') {
              options['where'][key] = Like(`%${operand}%`);
            } else if (operator === '_gt') {
              options['where'][key] = MoreThan(operand);
            } else if (operator === '_lt') {
              options['where'][key] = LessThan(operand);
            } else if (operator === '_gte') {
              options['where'][key] = MoreThanOrEqual(operand);
            } else if (operator === '_lte') {
              options['where'][key] = LessThanOrEqual(operand);
            } else if (operator === '_ne') {
              options['where'][key] = Not(operand);
            } else {
              // Add more operators as per requirement
            }
          });
        } else {
          options['where'][key] = value;
        }
      });
      return options['where'];
    };
    options['where'] = { [query.andOr]: handleFilter(query.filter) };
  }

  // Sort
  if (query.sort) {
    options['order'] = {};
    query.sort.split(',').forEach((sort) => {
      let [field, direction = 'ASC'] = sort.split(':');
      if (field[0] === '-') {
        field = field.slice(1);
        direction = 'DESC';
      }
      options['order'][field] = direction;
    });
  }

  return options;
}

function makeId(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

interface UniqueRelationMap {
  [key: string]: {
    uniqueAlias: string;
    targetRelation: string;
    aliasedTargetRelation: string;
  };
}

function sanitizeFieldMap(fieldMap: string[]): string[] {
  let map: string[] = [...fieldMap];
  map.forEach((field, key) => {
    map.forEach((otherField, otherKey) => {
      if (otherKey === key) {
        return;
      }
      if (otherField.indexOf(field) !== -1) {
        delete map[key];
      }
    });
  });
  map = map.filter((field) => field != null);
  return map;
}

function getRelationMap(fieldMap: string[]) {
  const map: string[] = [];
  fieldMap
    .filter((field) => field.indexOf('.') !== -1)
    .forEach((field) => {
      const relation = field.substr(0, field.lastIndexOf('.'));
      if (map.indexOf(relation) === -1) {
        map.push(relation);
      }
    });
  return map;
}

function getUniqueRelationMap(fieldMap: string[]): UniqueRelationMap {
  const relationMap = getRelationMap(fieldMap);
  const urm: UniqueRelationMap = {};

  const getAliasedTargetRelation = (targetRelation: string): string => {
    let targetRel = '';
    //Ignore root relations (they have no alias prefix).
    if (targetRelation.indexOf('.') === -1) {
      return targetRelation;
    }
    const prefix = targetRelation.substr(0, targetRelation.lastIndexOf('.'));
    Object.keys(urm).forEach((relation): void => {
      if (relation == prefix) {
        targetRel = targetRelation.replace(prefix, urm[relation].uniqueAlias);
      }
    });
    return targetRel === '' ? targetRelation : targetRel;
  };
  relationMap.forEach((targetRelation) => {
    const aliasedTargetRelation = getAliasedTargetRelation(targetRelation);
    const uniqueAlias = makeId(5);
    urm[targetRelation] = {
      targetRelation: targetRelation,
      aliasedTargetRelation: aliasedTargetRelation,
      uniqueAlias,
    };
  });
  return urm;
}

function joinRelationsToQuery<TEntity>(
  urm: UniqueRelationMap,
  query: SelectQueryBuilder<TEntity>,
): void {
  Object.keys(urm).forEach((relation) => {
    if (relation.indexOf('.') === -1) {
      query.leftJoinAndSelect(
        query.alias + urm[relation].targetRelation,
        urm[relation].uniqueAlias,
      );
    } else {
      query.leftJoinAndSelect(
        urm[relation].aliasedTargetRelation,
        urm[relation].uniqueAlias,
      );
    }
  });
}

function assignSelectionToQuery<TEntity>(
  fieldMap: string[],
  urm: UniqueRelationMap,
  query: SelectQueryBuilder<TEntity>,
): void {
  const selection = fieldMap.map((field) => {
    let uf = field;
    console.log(field);
    Object.keys(urm).forEach((relation) => {
      if (field.indexOf(relation) !== -1) {
        uf = field.replace(relation, urm[relation].uniqueAlias);
        console.log(field, uf, relation, urm[relation].uniqueAlias);
      }
    });
    // Properties without a . are root properties and must use the query alias.
    if (uf.indexOf('.') === -1) {
      uf = `${query.alias}.${uf}`;
    }
    return uf;
  });
  query.select(selection);
}

export function mapGraph<TEntity>(
  fieldMap: string[],
  query: SelectQueryBuilder<TEntity>,
  entity: Function | EntitySchema<any> | string,
): UniqueRelationMap {
  // TODO Encapsulate this code into its own method.
  const entityMetadata = query.connection.getMetadata(entity);
  const effectiveFieldMap: string[] = sanitizeFieldMap(fieldMap);

  const urm = getUniqueRelationMap(effectiveFieldMap);
  console.log(urm);
  joinRelationsToQuery(urm, query);
  assignSelectionToQuery(effectiveFieldMap, urm, query);
  return urm;
}
