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

function getRandomColor() {
    // Tạo giá trị ngẫu nhiên từ 0 đến 255 cho mỗi thành phần màu
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Chuyển các giá trị này thành dạng hex và đảm bảo luôn có 2 ký tự
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Kết hợp các giá trị hex lại thành mã màu
    return `#${hexR}${hexG}${hexB}`;
}

export const getDataChartChair = (data) => {
    let chart = [
        ["Element", "Số lượng", { role: "style" }],
        // ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ];

    data.forEach((d) => {
        chart.push([d.nameChair, d.number, getRandomColor()])
    })

    return chart
}

export const getDataChartTable = (data) => {
    let chart = [
        ["Element", "Số lượng", { role: "style" }],
        // ["Platinum", 100.45, "color: #e5e4e2"], // CSS-style declaration
    ];

    data.forEach((d) => {
        chart.push([d.nameTable, d.number, getRandomColor()])
    })

    return chart
}