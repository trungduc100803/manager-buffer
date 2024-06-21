export const formatNumberWithDots = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `ngày ${parseInt(day)} tháng ${parseInt(month)} năm ${year}`;
}

export const getNumberChairNew = (numberChair, currentChair) => {
    let num = 0
    for (let i = 0; i < numberChair.length; i++) {
        if (numberChair[i].numberChairStatus) {
            num += numberChair[i].numberChairStatus
        }
    }
    return currentChair - num
}