/*
async function addToMemory(supabase, id) {
  let {data, err} = await supabase.from('memory').
      select('ids').eq('id', 0);
  if (err) {
    return err;
  }
  data.push(id);
  err = await supabase.from('memory').update({'ids': data});
  if (err) {
    return err;
  }
  return null;
}
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
  /*
   // Получаем текущий список треков для дайнной пары цветов
  data = await supabase.from('combinations').
      select('songs').
      eq('id', `${indFst}${indSnd}`);
  let songArr = data.data[0]['songs'];
  if (songArr.includes(editedId)) continue;
  songArr.push(editedId);
  await supabase.from('combinations').
      update([{'songs': songArr}]).
      eq('id', `${indFst}${indSnd}`);
}
   */
  await updateMemory(supabase, []);

}