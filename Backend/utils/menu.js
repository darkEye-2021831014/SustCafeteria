export const convertBanglaToEnglishNumber = (value) => {
    if (value === null || value === undefined) return "";

    const str = String(value);

    const bangla = "০১২৩৪৫৬৭৮৯";
    const english = "0123456789";

    const converted = str.replace(/[০-৯]/g, (ch) => {
        return english[bangla.indexOf(ch)];
    });

    return converted;
};