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

export const normalizedPrice = (price) => {
    const convertedPrice = convertBanglaToEnglishNumber(price);
    const numericPrice = parseFloat(convertedPrice);

    if (isNaN(numericPrice)) {
        throw new Error("Invalid price format");
    }

    if (numericPrice < 0) {
        throw new Error("Price cannot be negative");
    }

    return numericPrice;
};