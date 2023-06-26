import { Post, User } from '@app/entities';
import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from '../../../constants/Action.enum';

type Subjects = InferSubjects<typeof Post | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, rules, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
      cannot([Action.Update, Action.Delete], Post);
    }

    can(Action.Create, Post)

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
