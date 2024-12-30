
export function invalidText(value: any) {
	return (
		value == null ||
		value == undefined ||
		value.toString().trim().length == 0 ||
		value === 'null'
	);
}

export function convertToBoolean(value:any) {
    if (typeof value === "string") {
        value = value.trim().toLowerCase();
    }

    const truthyValues = ["true", "1", "yes"];
    const falsyValues = ["false", "0", "no"];

    if (truthyValues.includes(value)) {
        return true;
    } else if (falsyValues.includes(value)) {
        return false;
    }

    return false
}