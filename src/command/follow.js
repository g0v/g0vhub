import _ from 'lodash';
import Project from '../model/Project';
import Event from '../model/Event';
import Interaction from '../model/Interaction';

const typeNmae = {
  Event: '活動',
  Project: '專案',
};

async function appendFollower(user, inputs) {
  const { target } = inputs;
  if (!target) return 'Sorry! 找不到專案或活動';

  await target.appendValue('followerIds', user);

  const { name } = target.constructor;
  return `Done, 追蹤 ${target.title} ${typeNmae[name]}`;
}

async function inputTarget(user) {
  const targets = _.concat(
    await (new Event()).whereUnfollowed(user).whereBefore().fetchAll(),
    await (new Project()).whereUnfollowed(user).fetchAll(),
  );

  if (targets.length < 1) return 'Sorry! 找不到未追蹤的專案或活動';

  Interaction.set(user, async ({ text }) => {
    const index = _.trim(text);
    const target = targets[index - 1];
    return appendFollower(user, { target });
  });

  return [
    '請選擇要追蹤的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`',
    _.map(targets, (target, idx) => (
      `*${idx + 1}*. ${target.title} ${typeNmae[target.constructor.name]}`)
    ).join('\n'),
  ].join('\n');
}

export default async function ({ value }, { user }) {
  const title = _.trim(value);
  if (title) {
    const target =
      await (new Event({ title })).whereBefore().fetch() ||
      await (new Project({ title })).fetch();

    return appendFollower(user, { target });
  }

  return inputTarget(user);
}
