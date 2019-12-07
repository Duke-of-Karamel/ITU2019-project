class Utils 
{
    static parseTimeStamp(timestampseconds)
    {
        let dt = new Date(timestampseconds * 1000);
        return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
    }
}