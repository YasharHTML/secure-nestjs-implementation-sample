import { Post, User } from '@app/entities';
import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from '../../constants/Action.enum';

type Subjects = InferSubjects<typeof Post | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can([Action.Update, Action.Delete], Post, { user: { id: user.id } });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
