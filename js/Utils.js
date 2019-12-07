class Utils 
{
    static parseTimestamp(timestampseconds)
    {
        let dt = new Date(timestamp * 1000);
        return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }
}