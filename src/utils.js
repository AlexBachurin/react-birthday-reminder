//function to transform month name
const transformMonthName = (name) => {
    if (name.endsWith('ь') || name.endsWith('й')) {
        return `${name.slice(0, name.length - 1)}я`;
    } else {
        return `${name.slice(0, name.length)}а`
    }
}

export default transformMonthName;