class Utils 
{
    static parseTimeStamp(timestampseconds)
    {
        let dt = new Date(timestampseconds * 1000);
        return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }

    static datePickerFormat(dt)
    {
        let month = dt.getMonth();
        if (month < 10) // Zero pad month
            month = `0${month}`;
        let day = dt.getDate();
        if (day < 10) // Zero pad day
            day = `0${day}`;

        return dt.getFullYear() + "-" + month + "-" + day;
    }
}