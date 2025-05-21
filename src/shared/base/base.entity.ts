export class BaseEntity {
  id: string;

  constructor(data: Partial<BaseEntity>) {
    Object.assign(this, data);
  }
}
