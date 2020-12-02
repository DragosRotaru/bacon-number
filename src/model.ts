// Our anemic "domain model"

export type ID = number;

export const KEVIN_BACON_ID: ID = 4724;

export type CastMember = {
  id: ID;
  name: string;
  credit_id: string;
  cast_id: ID;
  order: number;
  character: string;
  gender: number;
  profile_path: string;
};
