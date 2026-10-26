import type { Locale } from './config';
import fr from './dictionaries/fr.json';
import en from './dictionaries/en.json';

/** French is the source language: the English file must mirror its shape, or tsc fails. */
export type Dictionary = typeof fr;

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
