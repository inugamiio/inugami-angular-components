import * as moment from "moment";
import { Trend } from 'inugami-components/models';

export class Formatter {


    //==================================================================================================================
    // JIRA
    //==================================================================================================================
    public static extractJiraName(jiraUrl: string | undefined | null): string {
        if (!jiraUrl) {
            return '';
        }

        var urlParts = jiraUrl.split("/");
        return urlParts[urlParts.length - 1];
    }

    //==================================================================================================================
    // NUMBER
    //==================================================================================================================
    public static number(value: number, nbDigit: number, digit?: number): string {
        var result = [];

        var str = "" + value;
        var diff = nbDigit - str.length;
        if (diff > 0) {
            result.push(digit ? digit : '0');
        }
        result.push(str);

        return result.join("");
    }

    public static truncateNumberOfMaxValue(value: number | undefined | null, nbFloatDigit: number, maxValue: number, resultMax: string): string {

        if (!value) {
            return '';
        }
        let result = "";

        if (value < maxValue) {
            result = Formatter.truncateNumber(value, nbFloatDigit);
        } else {
            result = resultMax;
        }
        return result;
    }

    public static truncateNumber(value: number | undefined | null, nbDigit?: number): string {
        if (!value) {
            return '';
        }

        let unit = "";
        let sign = "";

        if (value < 0) {
            value = -value;
            sign = '-';
        }
        var reduceValue = value;


        if (value >= 1000 && value < 1000000) {
            reduceValue = value / 1000;
            unit = "K";
        }
        else if (value >= 1000000 && value < 1000000000) {
            reduceValue = value / 1000000;
            unit = "M";
        }
        else if (value >= 1000000000 && value < 1000000000000) {
            reduceValue = value / 1000000000;
            unit = "G";
        }
        else if (value >= 1000000000000) {
            reduceValue = value / 1000000000000;
            unit = "T";
        }

        const currentNbDigit = nbDigit ? nbDigit : 2;
        return [sign, reduceValue.toFixed(nbDigit), unit].join("");
    }



    //==================================================================================================================
    // STRING
    //==================================================================================================================
    public static truncate(str: string | undefined | null, maxLength: number, suffix: string): string {
        if (!str) {
            return '';
        }
        if (str.length > maxLength) {
            str = str.substring(0, maxLength + 1);
            str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
            str = str + suffix;
        }
        return str;
    }

    public static message(message: string, values?: any[]) {
        let formatted = message;
        if (values) {
            for (var i = 0; i < values.length; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                formatted = formatted.replace(regexp, `${values[i]}`);
            }
        }
        return formatted;
    }

    //==================================================================================================================
    // TIME 
    //==================================================================================================================
    public static hour(value: string, delimiter?: string): string {

        const delimiterToUse = delimiter ? delimiter : 'h';
        let val = '';
        let size = 4 - ("" + value).length;
        for (var i = 0; i < size; i++) {
            val += "0";
        }
        val += value;

        return val.substring(0, 2) + delimiterToUse + val.substring(2);
    }


    //==================================================================================================================
    // DATE
    //==================================================================================================================
    public static dateToString(value: Date, format?:string): string {
        const timestamp = value.getTime()/1000;
        return Formatter.timestampToTimeFormat(timestamp, format?format:"YYYY-MM-DD HH:mm:ss");
    }


    public static timestampToDate(value: number): string {
        return Formatter.timestampToTimeFormat(value, "YYYY-MM-DD HH:mm");
    }

    public static timestampToDateTime(value: number): string {
        return Formatter.timestampToTimeFormat(value, "YYYY-MM-DD HH:mm:ss");
    }

    public static timestampToHour(value: number): string {
        return Formatter.timestampToTimeFormat(value, "HH:mm");
    }


    public static timestampToTimeFormat(value: number, timeFormat: string): string {
        return moment.unix(value).format(timeFormat);
    }


    //==================================================================================================================
    // TREND
    //==================================================================================================================

    public static defaultTrendFormat(value: number, oldValue: number | undefined | null, maxInt?: number): Trend {
        let trend = [];
        let percent = 0;

        if (oldValue && oldValue !== 0) {
            var diff = value - oldValue;
            percent = Math.round((diff / oldValue) * 100);

            if (percent > 0) {
                trend.push("+");
            }

            if (maxInt != undefined && percent < maxInt) {
                trend.push(percent);
            } else {
                trend.push(Formatter.truncateNumber(percent));
            }

            trend.push("%");
        }

        return {
            trend: trend.join(""),
            trendClass: (percent > 0 ? "positif" : "negatif")
        }
    }

}