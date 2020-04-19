import { AnyObject } from ".";

/**
 * Make K keys partial
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make K keys required
 */
export type RequiredBy<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Make K keys required and everything else partial
 */
export type OnlyMandatory<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

/**
 * Make K keys partial and everything else required
 */
export type OnlyPartial<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

/**
 * Makes any object free-form
 */
export type MakeAnyObject<T> = T & AnyObject;
