import { computed, isRef } from "vue"

import { type ComputedRef, type Ref } from "vue"
import { type DateTimeOptions } from "vue-i18n"

import _ from "lodash"

export type Nonable = "NONE"

/* CSS Helpers */
type ClassConditionalObject = Record<string, boolean>

export type ClassArray = Array<ClassValue | undefined>
export type ClassObject = ClassArray | ClassConditionalObject
type ClassValue = string | ClassObject
const isClassString = (value: ClassValue): value is string => typeof value === "string"
const isClassObject = (value: ClassValue): value is ClassObject => typeof value === "object"
const isClassArray = (value: ClassValue): value is ClassArray => typeof value === "object" && Array.isArray(value)
const isClassConditionalObject = (value: ClassValue): value is ClassConditionalObject => typeof value === "object" && !Array.isArray(value)

const mapClassNameString = (className: string, styleObject: Record<string, string>): Array<string> =>
    className.split(/\s+/).map((classname: string) => classname in styleObject ? styleObject[classname] : classname)
const mapClassNameObject = (className: ClassConditionalObject, styleObject: Record<string, string>): ClassConditionalObject =>
    Object.keys(className).reduce((accumulator: ClassConditionalObject, currentValue: string) => {
        if (currentValue in styleObject)
            accumulator[styleObject[currentValue]] = className[currentValue]
        else
            accumulator[currentValue] = className[currentValue]
        return accumulator
    }, {})

/**
 * Picks CSS classes that exist in `styleObject` and returns the rest as is
 * Example: pickCssClass("bg-red circle form-heading btn", $style) => "bg-red _circle_asdf3_2 _form-heading_hdtg2_5 btn"
 * @returns A VueJS class object with classes picked from `styleObject` if they exist in `styleObject` and classes as provided if they don't
 */
export const pickCssClass = (className: ClassValue, styleObject: Record<string, string>): ClassObject => {
    if (!isClassObject(className))
        return mapClassNameString(className, styleObject)

    if (isClassConditionalObject(className))
        return mapClassNameObject(className, styleObject)

    // Array<string | ClassConditionalObject | ClassObject>
    return className.reduce((accumulator: ClassArray, currentValue: ClassValue | undefined) => {
        if (currentValue === undefined)
            return accumulator
        if (isClassString(currentValue))
            accumulator = accumulator.concat(mapClassNameString(currentValue, styleObject))
        else if (isClassArray(currentValue))
            accumulator.push(pickCssClass(currentValue, styleObject))
        else
            accumulator.push(mapClassNameObject(currentValue, styleObject))

        return accumulator
    }, [] as ClassArray)
}

const extractClassNameString = (className: string, styleObject: Record<string, string>): Array<string> =>
    className.split(/\s+/).map((classname: string) => styleObject[classname])
const extractClassNameObject = (className: ClassConditionalObject, styleObject: Record<string, string>): ClassConditionalObject =>
    Object.keys(className).reduce((accumulator: ClassConditionalObject, currentValue: string) => {
        accumulator[styleObject[currentValue]] = className[currentValue]
        return accumulator
    }, {})
/**
 * Extracts CSS classes from `styleObject` so you don't have to type `$style.class1 $style.class2`. All passed classes must be in the `styleObject`
 * Example: pickCssClass("circle form-heading", $style) => "_circle_asdf3_2 _form-heading_hdtg2_5"
 * @returns A VueJS class object with classes picked from `styleObject`
 */
export const extractCssClass = (className: ClassValue, styleObject: Record<string, string>): ClassObject => {
    if (!isClassObject(className))
        return extractClassNameString(className, styleObject)

    if (isClassConditionalObject(className))
        return extractClassNameObject(className, styleObject)

    // Array<string | ClassConditionalObject | ClassObject>
    return className.reduce((accumulator: ClassArray, currentValue: ClassValue | undefined) => {
        if (currentValue === undefined)
            return accumulator
        if (isClassString(currentValue))
            accumulator = accumulator.concat(extractClassNameString(currentValue, styleObject))
        else if (isClassArray(currentValue))
            accumulator.push(extractCssClass(currentValue, styleObject))
        else
            accumulator = accumulator.concat(extractClassNameObject(currentValue, styleObject))
        return accumulator
    }, [] as ClassArray)
}

export const getParentBackgroundColor = (el: HTMLElement): string => {
    const parent = el.parentElement
    if (parent == null)
        return "transparent"

    const backgroundColor = window.getComputedStyle(parent).backgroundColor
    if (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)")
        return getParentBackgroundColor(parent)
    return backgroundColor
}
/** Vue helpers **/
export const computedWithPrevious = <T, >(callback: (previous: T | undefined) => T, clearPrevious?: boolean | Ref<boolean> | ComputedRef<boolean>) => {
    let previous: T | undefined = undefined
    return computed<T>(() => {
        if (clearPrevious !== undefined && isRef(clearPrevious) ? clearPrevious.value : clearPrevious)
            previous = undefined

        previous = callback(previous)
        return previous
    })
}

/** Formatting functions **/

const formats: { [key: string]: { [key in 'time' | 'date' | 'month' | 'dateTime']: DateTimeOptions }} = {
    en: {
        time: {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            // formatted: "5:05:00 PM",
        },
        month: {
            month: "short",
            year: "numeric",
        },
        date: {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            // formatted: "9/14/2023",
        },
        get dateTime() {
            return {
                ...this.date,
                ...this.time,
            }
        },
    },
    de: {
        time: {
            // formatted: "02:05:00",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        },
        month: {
            month: "short",
            year: "numeric",
        },
        date: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // formatted: "14.09.23",
        },
        get dateTime() {
            return {
                ...this.date,
                ...this.time,
            }
        },
    },
    bg: {
        time: {
            // formatted: "2:05:00",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        },
        date: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // formatted: "14.09.23",
        },
        month: {
            month: "short",
            year: "numeric",
        },
        get dateTime() {
            return {
                ...this.date,
                ...this.time,
            }
        },
    },
}
export function formatDate(date: Date, locale: string): string
export function formatDate(date: string, locale: string): string
export function formatDate(date: unknown, locale: string) {
    const dateObject = typeof date === "string" ? new Date(date) : date as Date
    const formatter = new Intl.DateTimeFormat(locale, formats[locale].date)
    return formatter.format(dateObject)
}
export function formatDateMonthYear(date: Date, locale: string): string
export function formatDateMonthYear(date: string, locale: string): string
export function formatDateMonthYear(date: unknown, locale: string) {
    const dateObject = typeof date === "string" ? new Date(date) : date as Date
    const dateFormat: DateTimeOptions = {
        month: "short",
        year: "numeric",
        // formatted: "Jan 2024",
    }
    const formatter = new Intl.DateTimeFormat(locale, dateFormat)
    return formatter.format(dateObject)
}
export function formatTime(date: Date, locale: string): string
export function formatTime(date: string, locale: string): string
export function formatTime(date: unknown, locale: string) {
    const dateObject = typeof date === "string" ? new Date(date) : date as Date
    const formatter = new Intl.DateTimeFormat(locale, formats[locale].time)
    return formatter.format(dateObject)
}
export function formatDateTime(date: Date, locale: string, inclTimezone?: boolean): string
export function formatDateTime(date: string, locale: string, inclTimezone?: boolean): string
export function formatDateTime(date: unknown, locale: string, inclTimezone?: boolean) {
    const dateObject = typeof date === "string" ? new Date(date) : date as Date
    const format = formats[locale].dateTime
    if (inclTimezone)
        format.timeZoneName = "shortOffset"
    const formatter = new Intl.DateTimeFormat(locale, format)
    return formatter.format(dateObject)
}
export function formatMonth(date: unknown, locale: string) {
    const dateObject = typeof date === "string" ? new Date(date) : date as Date;
    const monthYearFormatter = new Intl.DateTimeFormat(locale, formats[locale].month)
    const formattedMonthYear = monthYearFormatter.format(dateObject)
    return formattedMonthYear
}

export function getSeparator(separatorType: "decimal", locale: string): string
export function getSeparator(separatorType: "group", locale: string): string | undefined
export function getSeparator(separatorType: "decimal" | "group", locale: string) {
    const numberWithGroupAndDecimalSeparator = 1000.1
    return Intl.NumberFormat(locale).formatToParts(numberWithGroupAndDecimalSeparator).find(part => part.type === separatorType)?.value
}

/**
 * Turns any camelCase or PascalCase string to kebab-case
 */
export const toKebabCase = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

/** Other **/
export const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`
    
    return formattedDate
}

/** Style functions **/
export const hexColorToAlphaHexColor = (hexColor: string, alpha: number) => `${hexColor}${Math.floor(alpha * 255).toString(16)}`
export const hexToRgb = (hexColor: string): [number, number, number] => {
    const input = hexColor.startsWith("#") ? hexColor.substring(1) : hexColor
    const r = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(0, 1)}${input.substring(0, 1)}`, 16) : Number.parseInt(input.substring(0, 2), 16)
    const g = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(1, 2)}${input.substring(1, 2)}`, 16) : Number.parseInt(input.substring(2, 4), 16)
    const b = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(2, 3)}${input.substring(2, 3)}`, 16) : Number.parseInt(input.substring(4, 6), 16)
    return [ r, g, b ]
}
export const hexToRgba = (hexColor: string): [number, number, number, number] => {
    const input = hexColor.startsWith("#") ? hexColor.substring(1) : hexColor
    const r = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(0, 1)}${input.substring(0, 1)}`, 16) : Number.parseInt(input.substring(0, 2), 16)
    const g = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(1, 2)}${input.substring(1, 2)}`, 16) : Number.parseInt(input.substring(2, 4), 16)
    const b = input.length === 3 || input.length === 4 ? Number.parseInt(`${input.substring(2, 3)}${input.substring(2, 3)}`, 16) : Number.parseInt(input.substring(4, 6), 16)
    const a  = input.length === 4 || input.length === 8 ? Number.parseInt(input.substring(6, 8), 16) : 0
    return [ r, g, b, a ]
}
export const rgbToHex = (r: number, g: number, b: number): string => `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
export const rgbaToHex = (r: number, g: number, b: number, a: number): string => `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const d = max - min
    let h
    if (d === 0) h = 0
    else if (max === r) h = ((((g - b) / d) % 6) + 6) % 6
    else if (max === g) h = (b - r) / d + 2
    else if (max === b) h = (r - g) / d + 4
    const l = (min + max) / 2
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
    if (h === undefined)
        return [ NaN, NaN, NaN ]
    return [ h * 60, s, l ]
}

export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = h / 60.0;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let rgb1;
    if (isNaN(h)) rgb1 = [ 0, 0, 0 ];
    else if (hp <= 1) rgb1 = [ c, x, 0 ];
    else if (hp <= 2) rgb1 = [ x, c, 0 ];
    else if (hp <= 3) rgb1 = [ 0, c, x ];
    else if (hp <= 4) rgb1 = [ 0, x, c ];
    else if (hp <= 5) rgb1 = [ x, 0, c ];
    else if (hp <= 6) rgb1 = [ c, 0, x ];
    const m = l - c * 0.5;
    if (rgb1 === undefined)
        return [ NaN, NaN, NaN ]
    return [
        Math.round(255 * (rgb1[0] + m)),
        Math.round(255 * (rgb1[1] + m)),
        Math.round(255 * (rgb1[2] + m)),
    ]
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 */
export const rgbToHsv = (r: number, g: number, b: number): [ number, number, number ] => {
    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = max
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    const v = max

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [ h, s, v ];
}

/**
 * I: An array of three elements hue (h) ∈ [0, 360], and saturation (s) and value (v) which are ∈ [0, 1]
 * O: An array of red (r), green (g), blue (b), all ∈ [0, 255]
 * Derived from https://en.wikipedia.org/wiki/HSL_and_HSV
 * This stackexchange was the clearest derivation I found to reimplement https://cs.stackexchange.com/questions/64549/convert-hsv-to-rgb-colors
 */
export const hsvToRgb = (h: number, s: number, v: number): [ number, number, number ] => {
    const hprime = h / 60;
    const c = v * s;
    const x = c * (1 - Math.abs(hprime % 2 - 1)); 
    const m = v - c;
    let r, g, b;
    if (!hprime) {r = 0; g = 0; b = 0; }
    if (hprime >= 0 && hprime < 1) { r = c; g = x; b = 0}
    if (hprime >= 1 && hprime < 2) { r = x; g = c; b = 0}
    if (hprime >= 2 && hprime < 3) { r = 0; g = c; b = x}
    if (hprime >= 3 && hprime < 4) { r = 0; g = x; b = c}
    if (hprime >= 4 && hprime < 5) { r = x; g = 0; b = c}
    if (hprime >= 5 && hprime < 6) { r = c; g = 0; b = x}

    if (r === undefined || g === undefined || b === undefined)
        return [ NaN, NaN, NaN ]
  
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [ r, g, b ]
}

const additionalThemeColors = {
    warning: "#C16E06",
}
export const themeColors = {
    background: "#141519",
    black: "#000000",
    white: "#FFFFFF",
    grayDark1: "#464850",
    grayDark2: "#3C3B40",
    grayDark3: "#1C1D1F",
    gray: "#868890",
    grayLight1: "#CACACC",
    red: "#E45560",
    green: "#00CC8D",
    greenLight: "#1DE5A7",
    gold: "#C59C6C",
    goldLight: "#C69C6D",
    backgroundLighter1: "",
    backgroundLighter2: "",
    backgroundDarker1: "",
    backgroundDarker2: "",
    ...additionalThemeColors,
}
const backgroundThemeColorHsl = rgbToHsl(...hexToRgb(themeColors.background))
themeColors.backgroundLighter1 = rgbToHex(...hslToRgb(backgroundThemeColorHsl[0], backgroundThemeColorHsl[1], backgroundThemeColorHsl[2] + .06))
themeColors.backgroundLighter2 = rgbToHex(...hslToRgb(backgroundThemeColorHsl[0], backgroundThemeColorHsl[1], backgroundThemeColorHsl[2] + .12))
themeColors.backgroundDarker1 = rgbToHex(...hslToRgb(backgroundThemeColorHsl[0], backgroundThemeColorHsl[1], backgroundThemeColorHsl[2] - .03))
themeColors.backgroundDarker2 = rgbToHex(...hslToRgb(backgroundThemeColorHsl[0], backgroundThemeColorHsl[1], backgroundThemeColorHsl[2] - .06))

/**
 * For usage with the rgb() CSS function (in format: "<r> <g> <b>" - "255 255 255")
 */
export const themeColorsRgb = Object.keys(themeColors).reduce((accumulator: typeof themeColors, colorName: string) => {
    const rgbColor = hexToRgb(themeColors[colorName as keyof typeof themeColors])
    accumulator[colorName as keyof typeof themeColors] = `${rgbColor[0]} ${rgbColor[1]} ${rgbColor[2]}`
    return accumulator
}, { ...themeColors })

export const getEndOfDay = (date: Date): Date => {
    const endOfDay = new Date(date)
    endOfDay.setHours(0, 0, 0, 0)
    endOfDay.setDate(endOfDay.getDate() + 1) // Move to next day at 00:00
    return endOfDay
}

export const getEndOfWeek = (date: Date): Date => {
    const endOfWeek = new Date(date)
    const dayOfWeek = endOfWeek.getDay()
    const daysUntilSunday = 7 - dayOfWeek // Sunday is 0, so we calculate distance to next Sunday
    endOfWeek.setDate(endOfWeek.getDate() + daysUntilSunday)
    endOfWeek.setHours(0, 0, 0, 0)
    return endOfWeek
}

export const getEndOfMonth = (date: Date): Date => {
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0) // Last day of current month
    endOfMonth.setHours(0, 0, 0, 0) // Set time to 00:00
    return endOfMonth
}

export const isNumeric = (str: string) =>
    typeof str !== "string" ? false : // just in case
        !isNaN(str as any) && !isNaN(parseFloat(str))
