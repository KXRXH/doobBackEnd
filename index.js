import {createClient} from '@supabase/supabase-js';
import 'dotenv/config';
import {delay} from './utils.js';
import {updateCombinationsTable} from './methods.js';

let supabase = createClient(process.env.URL, process.env.API_KEY);

while (true) {
  console.log(new Date());
  await updateCombinationsTable(supabase);
  await delay(1000 * 60 * process.env.DELAY);
}