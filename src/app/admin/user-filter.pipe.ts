import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from './domain/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: UserModel[], filterText: string): UserModel[] {
    return filterText ? value.filter((u: UserModel) => u.fullName.indexOf(filterText) !== -1) : value;
  }

}
