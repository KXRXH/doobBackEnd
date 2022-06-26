/*
 */

import {getIndexesOfMaxValues} from './utils.js';

/**
 * @param supabase
 * @param editedIds {array}
 * @returns {Promise<null|*>}
 */

export async function updateMemory(supabase, editedIds) {
  const {err} = await supabase.from('memory').
      update({'ids': editedIds}).
      eq('id', 0);
  if (err) {
    return err;
  }
  return null;
}

export async function updateCombinationsTable(supabase) {
  // Получаем последние обновлённыее треки
  const {data, err} = await supabase.from('memory').
      select('ids').eq('id', 0);
  if (err) {
    console.log(err);
    return;
  }
  // Перебираем все изменённые id
  for (let editedId of data[0]['ids']) {
    // Получаем список с рейтингом по цветам
    let data = await supabase.from('tracks').
        select('rates', 'combination').
        eq('id', editedId);
    data = data.data;
    // Получаем id 2ух самых популярных цветов  (строкой)
    const combStr = getIndexesOfMaxValues(data[0]['rates']);
    // Проверяем изменилась ли комбинация для трека
    if (combStr !== data[0]['combination']) {
      await supabase.from('tracks').
          update({'combination': combStr}).
          eq('id', editedId);
    }

  }
  await updateMemory(supabase, []);

}