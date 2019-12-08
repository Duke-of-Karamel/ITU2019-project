class ReservationDialog 
{
    constructor(view, $appendTo, dt_min, dt_max, reservation = null)
    {
        let html = `
            <div class="res-dialog dialog">
                <div class="res-dialog-header dialog-header">

                </div>  

                <div class="res-dialog-body dialog-body">
                    <div class="res-dialog-from-to">
                        <div class="res-dialog-from">
                            <div>Od:</div>
                            <button class="btn-sub-from">-15 min</button>
                            <input class="res-dialog-inp-from" type="time">
                            <button class="btn-add-from">+15 min</button>
                        </div>

                        <div class="res-dialog-to">
                            <div>Do:</div>
                            <button class="btn-sub-to">-15 min</button>
                            <input class="res-dialog-inp-to" type="time">
                            <button class="btn-add-to">+15 min</button>
                        </div>
                    </div>

                    <div class="res-dialog-desc">
                        <div>Popis rezervace:</div>
                        <textarea class="res-dialog-tarea-desc"></textarea>
                    </div>

                    
                </div>

                <div class="res-dialog-footer dialog-footer">
                    <div class="res-dialog-buttons">
                        <button class="btn-green btn-reserve">Rezervovat</button>
                        <button class="btn-green btn-close">Zavřít</button>
                    </div>
                </div>
            </div>
        `;
        
        let $dialog = $(html);

        $dialog.find(".btn-reserve").on("click", () => this.onReserveClick());
        $dialog.find(".btn-close").on("click", () => this.onCloseClick());
        $dialog.find(".btn-add-to").on("click", () => this.onToAddClick());
        $dialog.find(".btn-add-from").on("click", () => this.onFromAddClick());
        $dialog.find(".btn-sub-to").on("click", () => this.onToSubClick());
        $dialog.find(".btn-sub-from").on("click", () => this.onFromSubClick());

        this.$pickerFrom = $dialog.find(".res-dialog-inp-from");
        this.$pickerTo = $dialog.find(".res-dialog-inp-to");
        this.$descArea = $dialog.find("textarea");
        this.dt_min = dt_min;
        this.minutes_step = 15;
        this.dt_max = dt_max;
        this.$dialog = $dialog;
        this.$dialog.hide();
        $appendTo.append(this.$dialog);
        this.$dialog.fadeIn(200);
        this.view = view;

        this.onTimeRangeRefresh(new Date(), new Date());



    }

    fixFrom(dt_from)
    {

    }

    fixTo(dt_to)
    {

    }

    onReserveClick()
    {
        let data = {
            
        }
        this.view.onSelectionConfirm(this.$dialog);
    }

    onCloseClick()
    {
        this.$dialog.remove();
        this.view.onSelectionCancel(this.$dialog);
    }

    onFromChanged()
    {
        this.view.onSelectionRefresh(this.$dialog);
    }

    onFromAddClick()
    {
        console.log("From add click.");

        let dtfrom = Utils.fromTimePickerFormat(this.$pickerFrom.val());
        dtfrom.setMinutes(dtfrom.getMinutes() + this.minutes_step);
        // TODO fix

        this.$pickerFrom.val(Utils.toTimePickerFormat(dtfrom));
    }

    onFromSubClick()
    {
        console.log("From sub click.");

        let dtfrom = Utils.fromTimePickerFormat(this.$pickerFrom.val());
        dtfrom.setMinutes(dtfrom.getMinutes() - this.minutes_step);
        // TODO fix

        this.$pickerFrom.val(Utils.toTimePickerFormat(dtfrom));
    }

    onToChange()
    {
        // Adjust range

        this.view.onSelectionRefresh(this.$dialog);
    }

    onTimeRangeRefresh(dt_from, dt_to)
    {
        this.$pickerFrom.val(Utils.toTimePickerFormat(dt_from));
        this.$pickerTo.val(Utils.toTimePickerFormat(dt_to));
    }

    onToAddClick()
    {
        console.log("To add click.");
        console.log(this.$pickerTo.val());
        let dtto = Utils.fromTimePickerFormat(this.$pickerTo.val());
        dtto.setMinutes(dtto.getMinutes() + this.minutes_step);
        // TODO fix

        this.$pickerTo.val(Utils.toTimePickerFormat(dtto));
    }

    onToSubClick()
    {
        console.log("To sub click.");

        let dtto = Utils.fromTimePickerFormat(this.$pickerTo.val());
        dtto.setMinutes(dtto.getMinutes() - this.minutes_step);
        // TODO fix

        this.$pickerTo.val(Utils.toTimePickerFormat(dtto));
    }
}