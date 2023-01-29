// NumberFormat
const splitThousands = (number) => (dec_point, thousands_point) => {
    const splitNum = number.toString().split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    return splitNum.join(dec_point);
};

const isBigNumber = (number) => number.toString().includes("e");

const isBigFloat = (number) => number.toString().includes("-");

const calcTrailing = (dec, len) => Number(dec) + 2 - len;

const handleBigFloats = (number, decimals) => {
    if (!decimals) {
        return "0";
    }

    const [numbers, dec] = number.toString().replace(".", "").split("e-");
    const trailingZeros = calcTrailing(dec, numbers.length);
    const res = `${"0.".padEnd(trailingZeros + 2, "0")}${numbers}`;

    return decimals ? res.substring(0, 2) + res.substring(2, decimals + 2) : res;
};

const handleBigNumbers = (number, decimals, dec_point, thousands_point) => {
    if (isBigFloat(number)) {
        return handleBigFloats(number, decimals);
    }

    return splitThousands(BigInt(number))(dec_point, thousands_point);
};

function handleFiniteNumbers(number, decimals, dec_point, thousands_point) {
    // if (!isFinite(number)) {
    //     throw new TypeError("number is not finite number");
    // }

    if (!decimals) {
        const len = number.toString().split(".").length;
        decimals = len > 1 ? len : 0;
    }

    return splitThousands(
        parseFloat(number).toFixed(decimals).replace(".", dec_point)
    )(dec_point, thousands_point);
}

export const numberFormat = (
    number,
    decimals = 2,
    dec_point = ",",
    thousands_point = "."
) => {
    number = parseFloat(number);
    if (number == null || typeof number !== "number") {
        throw new TypeError("number is not valid");
    }

    if (isBigNumber(number)) {
        return handleBigNumbers(number, decimals, dec_point, thousands_point);
    }

    return handleFiniteNumbers(number, decimals, dec_point, thousands_point);
};
