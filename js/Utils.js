class Utils 
{
    static parseTimeStamp(timestampseconds)
    {
        let dt = new Date(timestampseconds * 1000);
        return `${Utils.zeroPad(dt.getDate())}.${Utils.zeroPad(dt.getMonth() + 1)}.${dt.getFullYear()} ${Utils.zeroPad(dt.getHours())}:${Utils.zeroPad(dt.getMinutes())}`;
    }

    static zeroPad(num)
    {
        return (num < 10) ? `0${num}` : `${num}`;
    }

    static datePickerFormat(dt)
    {
        let month = dt.getMonth()+1;
        if (month < 10) // Zero pad month
            month = `0${month}`;
        let day = dt.getDate();
        if (day < 10) // Zero pad day
            day = `0${day}`;

        return dt.getFullYear() + "-" + month + "-" + day;
    }

    static toTimePickerFormat(dt)
    {
        let hours = dt.getHours();
        if (hours < 10)
            hours = `0${hours}`;
        let minutes = dt.getMinutes();
        if (minutes < 10)
            minutes = `0${minutes}`;

        return `${hours}:${minutes}`;
    }

    static fromTimePickerFormat(pickerval)
    {
        let spl = pickerval.split(":");
        let date = new Date();

        date.setHours(parseInt(spl[0]));
        date.setMinutes(parseInt(spl[1]));

        return date;
    }
}