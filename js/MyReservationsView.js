
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
                    <thead><th>Od</th><th>Do</th><th>Místnost</th><th>Popis rezervace</th><th></th></thead>
                    <tbody class="res-list-tbody">

                    </tbody>
                </table>

                <div title="Zrušit rezervaci" class="nothing-alert">Nemáte žádné rezervace</div>
            </div>
        `;

        this.$container = $(html);
    }

    update(data_transformed)
    {
        let $nalert = this.$container.find(".nothing-alert");
        let $table  = this.$container.find("table");
        let tbody   = this.$container.find("tbody");
        tbody.empty();

        if (data_transformed.length == 0)
        {
            $table.hide();
            $nalert.show();
        }
        else
        {
            $table.show();
            $nalert.hide();
        }

        // Filter only my reservations
        // TODO data_transformed.filter((val) => val.user_id )

        for (const res of data_transformed) 
        {
            let trClass = (res.dt_from * 1000 < Date.now()) ? "past" : "future";
            let $row = $(`
                <tr class="${trClass}">
                    <td>${Utils.parseTimeStamp(res.dt_from)}</td>
                    <td>${Utils.parseTimeStamp(res.dt_to)}</td>
                    <td>${res.room.room_shortcut}</td>
                    <td>${(res.description.length > 0) ? res.description : "-"}</td>
                    <td><div data-res-id="${res.reservation_id}" class="cancel-cross"></div></td>
                </tr>
            `);

            $row.find(".cancel-cross").on("click", (element) => { this.controller.onReservationCancel($(element.currentTarget).data("res-id")) });

            tbody.append($row);
        }
    }
}