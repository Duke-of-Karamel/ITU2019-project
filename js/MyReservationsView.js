
class MyReservationsView
{
    constructor(controller)
    {
        this.$container = null;
        this.controller = controller;
        this.build();
    }

    build()
    {
        let html = `
            <div class="res-list-container">
                <table class="res-list-table">
                    <thead><th>From</th><th>To</th><th>Room</th><th>Cancel</th></thead>
                    <tbody class="res-list-tbody">

                    </tbody>
                </table>
            </div>
        `;

        this.$container = $(html);
    }

    update(data_transformed)
    {
        let tbody = this.$container.find("tbody");
        tbody.empty();

        for (const res of data_transformed) 
        {
            let $row = $(`
                <tr>
                    <td>${parseTimeStamp(res.dt_from)}</td>
                    <td>${parseTimestamp(res.dt_to)}</td>
                    <td>${res.room.room_id}</td>
                    <td><div data-res-id="${res.reservation_id}" class="cancel-cross"></td>
                </tr>
            `);

            $row.on("click", (element) => { this.controller.onReservationCancel($(element.currentTarget).data("data-res-id")) });
        }
    }
}