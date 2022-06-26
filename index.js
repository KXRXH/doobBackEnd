import {createClient} from '@supabase/supabase-js';
import 'dotenv/config';
import {delay} from './utils.js';
import {updateCombinationsTable} from './methods.js';

const supabaseUrl = 'https://dfaopjnyuohnqtbbbhof.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYW9wam55dW9obnF0YmJiaG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYwNzU1ODQsImV4cCI6MTk3MTY1MTU4NH0.m9QQiSqt43idZLEU8XniQg_mArhiUsJqVk922t8jG2U';
const DELAY = 0.5;
let supabase = createClient(supabaseUrl, supabaseAnonKey);

while (true) {
  console.log(`[${new Date()}] Checking database for updates...`);
  await updateCombinationsTable(supabase);
  await delay(1000 * 60 * DELAY);
}