export function formattingMoney(amountInCents) {
    return (Math.round(amountInCents) / 100).toFixed(2);
}