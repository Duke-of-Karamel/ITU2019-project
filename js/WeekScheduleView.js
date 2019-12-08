class WeekScheduleView
{
    constructor($controller)
    {
        this.$container = null; // Is set later in build
        this.$controller = $controller;
        this.rooms = null;
        this.schemaView = new SchemaView();
        this.reservationDialog = null;
        this.build();
    }

    $dt_selected = new Date();
    $room_selected = "ALL";

    build()
    {
        let html = `
            <div class="week-schedule-container">
                <div class="dayroom-setup-cont">
                    <div class="dayroom-setup">
                        <div>Datum: </div>
                        <button id="dt_shl">&lt;</button>
                        <input type="date" id="dt_picker" name="date">
                        <button id="dt_now">Now</button>
                        <button id="dt_shr">&gt;</button>
                    </div>
                    <div class="dayroom-setup">
                        <div>Místnost: </div>
                        <select id="room_picker" name="room">
                            <!-- Here add more with query -->
                        </select>
                        <a class="show-schema" href="javascript:true">Ukázat</a>
                    </div>
                </div>
                <table class="week_table">
                    <tr>
                        <th class="tHead">Čas</th> <th class="tHead">4:00-:59</th> <th class="tHead">5:00-:59</th> <th class="tHead">6:00-:59</th> <th class="tHead">7:00-:59</th> <th class="tHead">8:00-:59</th> <th class="tHead">9:00-:59</th> <th class="tHead">10:00-:59</th> <th class="tHead">11:00-:59</th> <th class="tHead">12:00-:59</th> <th class="tHead">13:00-:59</th> <th class="tHead">14:00-:59</th> <th class="tHead">15:00-:59</th> <th class="tHead">16:00-:59</th> <th class="tHead">17:00-:59</th> <th class="tHead">18:00-:59</th> <th class="tHead">19:00-:59</th> <th class="tHead">20:00-:59</th> <th class="tHead">21:00-:59</th> <th class="tHead">22:00-:59</th>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="1"><div>Po</div><div class="tDate" data-row="1"></div></th> <td class="tCont" data-row="1" data-col="1"></td> <td class="tCont" data-row="1" data-col="2"></td> <td class="tCont" data-row="1" data-col="3"></td> <td class="tCont" data-row="1" data-col="4"></td> <td class="tCont" data-row="1" data-col="5"></td> <td class="tCont" data-row="1" data-col="6"></td> <td class="tCont" data-row="1" data-col="7"></td> <td class="tCont" data-row="1" data-col="8"></td> <td class="tCont" data-row="1" data-col="9"></td> <td class="tCont" data-row="1" data-col="10"></td> <td class="tCont" data-row="1" data-col="11"></td> <td class="tCont" data-row="1" data-col="12"></td> <td class="tCont" data-row="1" data-col="13"></td> <td class="tCont" data-row="1" data-col="14"></td> <td class="tCont" data-row="1" data-col="15"></td> <td class="tCont" data-row="1" data-col="16"></td> <td class="tCont" data-row="1" data-col="17"></td> <td class="tCont" data-row="1" data-col="18"></td> <td class="tCont" data-row="1" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="2"><div>Út</div><div class="tDate" data-row="2"></div></th> <td class="tCont" data-row="2" data-col="1"></td> <td class="tCont" data-row="2" data-col="2"></td> <td class="tCont" data-row="2" data-col="3"></td> <td class="tCont" data-row="2" data-col="4"></td> <td class="tCont" data-row="2" data-col="5"></td> <td class="tCont" data-row="2" data-col="6"></td> <td class="tCont" data-row="2" data-col="7"></td> <td class="tCont" data-row="2" data-col="8"></td> <td class="tCont" data-row="2" data-col="9"></td> <td class="tCont" data-row="2" data-col="10"></td> <td class="tCont" data-row="2" data-col="11"></td> <td class="tCont" data-row="2" data-col="12"></td> <td class="tCont" data-row="2" data-col="13"></td> <td class="tCont" data-row="2" data-col="14"></td> <td class="tCont" data-row="2" data-col="15"></td> <td class="tCont" data-row="2" data-col="16"></td> <td class="tCont" data-row="2" data-col="17"></td> <td class="tCont" data-row="2" data-col="18"></td> <td class="tCont" data-row="2" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="3"><div>St</div><div class="tDate" data-row="3"></div></th> <td class="tCont" data-row="3" data-col="1"></td> <td class="tCont" data-row="3" data-col="2"></td> <td class="tCont" data-row="3" data-col="3"></td> <td class="tCont" data-row="3" data-col="4"></td> <td class="tCont" data-row="3" data-col="5"></td> <td class="tCont" data-row="3" data-col="6"></td> <td class="tCont" data-row="3" data-col="7"></td> <td class="tCont" data-row="3" data-col="8"></td> <td class="tCont" data-row="3" data-col="9"></td> <td class="tCont" data-row="3" data-col="10"></td> <td class="tCont" data-row="3" data-col="11"></td> <td class="tCont" data-row="3" data-col="12"></td> <td class="tCont" data-row="3" data-col="13"></td> <td class="tCont" data-row="3" data-col="14"></td> <td class="tCont" data-row="3" data-col="15"></td> <td class="tCont" data-row="3" data-col="16"></td> <td class="tCont" data-row="3" data-col="17"></td> <td class="tCont" data-row="3" data-col="18"></td> <td class="tCont" data-row="3" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="4"><div>Čt</div><div class="tDate" data-row="4"></div></th> <td class="tCont" data-row="4" data-col="1"></td> <td class="tCont" data-row="4" data-col="2"></td> <td class="tCont" data-row="4" data-col="3"></td> <td class="tCont" data-row="4" data-col="4"></td> <td class="tCont" data-row="4" data-col="5"></td> <td class="tCont" data-row="4" data-col="6"></td> <td class="tCont" data-row="4" data-col="7"></td> <td class="tCont" data-row="4" data-col="8"></td> <td class="tCont" data-row="4" data-col="9"></td> <td class="tCont" data-row="4" data-col="10"></td> <td class="tCont" data-row="4" data-col="11"></td> <td class="tCont" data-row="4" data-col="12"></td> <td class="tCont" data-row="4" data-col="13"></td> <td class="tCont" data-row="4" data-col="14"></td> <td class="tCont" data-row="4" data-col="15"></td> <td class="tCont" data-row="4" data-col="16"></td> <td class="tCont" data-row="4" data-col="17"></td> <td class="tCont" data-row="4" data-col="18"></td> <td class="tCont" data-row="4" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="5"><div>Pá</div><div class="tDate" data-row="5"></div></th> <td class="tCont" data-row="5" data-col="1"></td> <td class="tCont" data-row="5" data-col="2"></td> <td class="tCont" data-row="5" data-col="3"></td> <td class="tCont" data-row="5" data-col="4"></td> <td class="tCont" data-row="5" data-col="5"></td> <td class="tCont" data-row="5" data-col="6"></td> <td class="tCont" data-row="5" data-col="7"></td> <td class="tCont" data-row="5" data-col="8"></td> <td class="tCont" data-row="5" data-col="9"></td> <td class="tCont" data-row="5" data-col="10"></td> <td class="tCont" data-row="5" data-col="11"></td> <td class="tCont" data-row="5" data-col="12"></td> <td class="tCont" data-row="5" data-col="13"></td> <td class="tCont" data-row="5" data-col="14"></td> <td class="tCont" data-row="5" data-col="15"></td> <td class="tCont" data-row="5" data-col="16"></td> <td class="tCont" data-row="5" data-col="17"></td> <td class="tCont" data-row="5" data-col="18"></td> <td class="tCont" data-row="5" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="6"><div>So</div><div class="tDate" data-row="6"></div></th> <td class="tCont" data-row="6" data-col="1"></td> <td class="tCont" data-row="6" data-col="2"></td> <td class="tCont" data-row="6" data-col="3"></td> <td class="tCont" data-row="6" data-col="4"></td> <td class="tCont" data-row="6" data-col="5"></td> <td class="tCont" data-row="6" data-col="6"></td> <td class="tCont" data-row="6" data-col="7"></td> <td class="tCont" data-row="6" data-col="8"></td> <td class="tCont" data-row="6" data-col="9"></td> <td class="tCont" data-row="6" data-col="10"></td> <td class="tCont" data-row="6" data-col="11"></td> <td class="tCont" data-row="6" data-col="12"></td> <td class="tCont" data-row="6" data-col="13"></td> <td class="tCont" data-row="6" data-col="14"></td> <td class="tCont" data-row="6" data-col="15"></td> <td class="tCont" data-row="6" data-col="16"></td> <td class="tCont" data-row="6" data-col="17"></td> <td class="tCont" data-row="6" data-col="18"></td> <td class="tCont" data-row="6" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead" data-row="7"><div>Ne</div><div class="tDate" data-row="7"></div></th> <td class="tCont" data-row="7" data-col="1"></td> <td class="tCont" data-row="7" data-col="2"></td> <td class="tCont" data-row="7" data-col="3"></td> <td class="tCont" data-row="7" data-col="4"></td> <td class="tCont" data-row="7" data-col="5"></td> <td class="tCont" data-row="7" data-col="6"></td> <td class="tCont" data-row="7" data-col="7"></td> <td class="tCont" data-row="7" data-col="8"></td> <td class="tCont" data-row="7" data-col="9"></td> <td class="tCont" data-row="7" data-col="10"></td> <td class="tCont" data-row="7" data-col="11"></td> <td class="tCont" data-row="7" data-col="12"></td> <td class="tCont" data-row="7" data-col="13"></td> <td class="tCont" data-row="7" data-col="14"></td> <td class="tCont" data-row="7" data-col="15"></td> <td class="tCont" data-row="7" data-col="16"></td> <td class="tCont" data-row="7" data-col="17"></td> <td class="tCont" data-row="7" data-col="18"></td> <td class="tCont" data-row="7" data-col="19"></td>
                    </tr>
                </table>
            </div>
        `;

        this.$container = $(html);

        this.$container.find("#dt_picker").val(Utils.datePickerFormat(new Date()));
        
        this.$container.find(".week_table .tCont").on("click", (event) => this.onTryReserve($(event.currentTarget)));
        this.$container.find("#dt_picker").on("change", (event) => this.onDateChange($(event.currentTarget)));
        this.$container.find("#dt_shl").on("click",(event) => this.onDateShl($(event.currentTarget)));
        this.$container.find("#dt_shr").on("click",(event) => this.onDateShr($(event.currentTarget)));
        this.$container.find("#dt_now").on("click",(event) => this.onDateNow($(event.currentTarget)));
        this.$container.find("#room_picker").on("change",(event) => this.onRoomChange($(event.currentTarget)));

        this.$container.append(this.schemaView.$container);
        this.$container.find(".show-schema").on("mouseover", () =>this.onSchemaShow());
        this.$container.find(".show-schema").on("mouseout", () =>this.onSchemaHide());

    }

    onDateChange($element)
    {
        console.log("Date changed");
        this.$dt_selected = new Date($($element).val());
        this.markDt();
        this.markReservations();
    }

    onDateNow($element)
    {
        let dt = new Date();
        this.$container.find("#dt_picker").val(Utils.datePickerFormat(dt));
        console.log("Date changed to now");
        this.$dt_selected = new Date(this.$container.find("#dt_picker").val());
        this.markDt();
        this.markReservations();
    }

    onDateShl($element)
    {
        let dt_picker = this.$container.find("#dt_picker");
        let dt = new Date(dt_picker.val());
        dt.setDate(dt.getDate()-7);
        dt_picker.val(Utils.datePickerFormat(dt));
        console.log("Date changed left");
        this.$dt_selected = new Date(this.$container.find("#dt_picker").val());
        this.markDt();
        this.markReservations();
    }

    onDateShr($element)
    {
        let dt_picker = this.$container.find("#dt_picker");
        let dt = new Date(dt_picker.val());
        dt.setDate(dt.getDate()+7);
        dt_picker.val(Utils.datePickerFormat(dt));
        console.log("Date changed right");
        this.$dt_selected = new Date(this.$container.find("#dt_picker").val());
        this.markDt();
        this.markReservations();
    }

    onRoomChange($element)
    {
        this.$room_selected = $($element).find("option:selected").text();
        this.markReservations();
    }

    dateFromCell(row, col)
    {
        return; //TODO
    }

    onTryReserve($element)
    {
        let row = parseInt($element.data("row"));
        let col = parseInt($element.data("col"));
        console.log(`Clicked in table pos [${row}] [${col}]`);
        // Did we click to past?
        if ($element.hasClass("cell-past"))
            return;
        
        if (this.reservationDialog == null)
        {
            this.markReservation("selected-cell", row, col, 0, 60);
            this.$container.find(".selected-cell").addClass("dialog-cell");
            this.reservationDialog = new ReservationDialog(this, $("body"));
            this.setupDialogPosition($element, this.reservationDialog.$dialog);
            console.log($element.offset());
        }
        else 
        {
            let $selectedBois = this.$container.find(".selected-cell");
            let selectingRow = parseInt($selectedBois.parent().data("row"));
            if (row != selectingRow)
                return;
            let $first = $selectedBois.first();
            let $last = $selectedBois.last();

            this.$container.find(".selected-cell").not(".dialog-cell").remove();

            let date_select = new Date(this.$dt_selected.getTime());
            let date = this.$dt_selected.getDate();
            let monday_zero = ((this.$dt_selected.getDay()+6)%7);
            let week_start = date - monday_zero;
            let date_shift = week_start + (row - 1)
            date_select.setDate(date_shift);

            let date_dialog = new Date(date_select.getTime());

            date_select.setHours($($element).data("col") + 3);
            date_dialog.setHours(this.$container.find(".dialog-cell").parent().data("col") + 3);

            if (date_dialog.getTime() > date_select.getTime())
            {
                this.reservationDialog.onTimeRangeRefresh(date_select, date_dialog)
                this.markReservationRange(date_select,date_dialog,"selected-cell");
            } else {
                this.reservationDialog.onTimeRangeRefresh(date_dialog, date_select)
                this.markReservationRange(date_dialog,date_select,"selected-cell");
            }
            // TODO
            


            // We are selecting
            
        }
    }

    setupDialogPosition($element, $dialog)
    {
        let offset = $element.offset();
        let left = offset.left > innerWidth / 2 ? $dialog.width() : 0;
        $dialog.css("top", offset.top + $element.height() + "px");
        $dialog.css("left", (offset.left - left) + "px");
    }

    reselect(row, dt_from, dt_to)
    {
        this.$container.find(".selected-cell div").remove();
        let $cols = this.$container.find(`.tCont[data-row="${row}"]`);




    }

    update($reservations, rooms)
    {
        this.$reservations = $reservations;
        this.rooms = rooms;
        this.markReservations();
        this.makeRoomPicker(rooms);
        this.markDt();
    }

    markDt()
    {
        this.$container.find(".week_table .tCont").each((index, element) => {
            $(element).removeClass("cell-past");
            if(this.isInPast($(element).data("row"), $(element).data("col"))){
                $(element).addClass("cell-past");

            } else {
                $(element).css("background-color","white") //FIXME addClass()
            }
        })

        this.$container.find(".week_table .tHead .tDate").each((index, element) => {
            let day_date = new Date(this.$dt_selected.getTime());
            let date = this.$dt_selected.getDate();
            let monday_zero = ((this.$dt_selected.getDay()+6)%7);
            let row = $(element).data("row");
            let week_start = date - monday_zero;
            let date_shift = week_start + (row - 1)
            day_date.setDate(date_shift);
            $(element).empty();
            $(element).append(`${day_date.getDate()}.${day_date.getMonth()+1}.`);
        })
    }

    isSelecting()
    {
        return this.reservationDialog != null;
    }

    makeRoomPicker(rooms)
    {
        this.$container.find("#room_picker").empty();
        this.$container.find("#room_picker").append("<option selected>ALL</option>");
        rooms.forEach(room => {
            this.$container.find("#room_picker").append("<option>" + room.room_shortcut + "</option>");
        });
    }


    markReservations()
    {
        this.$container.find(".week_table .tCont").empty(); // Delete every mark currently in table
        this.$reservations.forEach($element => {
            if(this.$room_selected == $element.room.room_shortcut || this.$room_selected == "ALL")
            {
                let date_from = new Date($element.dt_from*1000/*ms*/);

                if(this.isWithinWeek(date_from,this.$dt_selected))
                {
                    let date_to = new Date($element.dt_to*1000);
                    let markClass = ($element.user == this.$controller.getCurrentUser()) ? "this-user-mark" : "other-user-mark";
                    this.markReservationRange(date_from, date_to, markClass);
                }
            }
        });
    }

    markReservationRange(date_from, date_to, markClass)
    {
        let hours = date_to.getHours() - date_from.getHours() + (date_to.getMinutes()-date_from.getMinutes() > 0);

        for(let hrs = hours - 1; hrs >= 0; hrs--){
            let from = 0;
            let to = 60;
            if (hrs == 0){
                from = date_from.getMinutes();
            }
            if (hrs == hours-1){
                to = date_to.getMinutes();
            }
            if (hours == 1){
                to = to-from
            }
            this.markReservation(markClass,(date_from.getDay()+6)%7+1,date_from.getHours()+hrs-3, from, to);
        }
    }

    markReservation($css_class, $row, $collumn,from_minu, to_minu)
    {
        let css_percent = "style=\"margin-left:" + from_minu/60*100 + "%;width:" + to_minu/60*100 + "%;\"";
        this.$container.find(`.week_table .tCont[data-row='${$row}'][data-col='${$collumn}']`).append(`<div class="${$css_class}" ${css_percent}></div>`);
    }

    isWithinWeek(dt_questionable, dt_week)
    { /*604800 week in seconds*/
        let year = (dt_questionable.getFullYear() == dt_week.getFullYear());
        let month = (dt_questionable.getMonth() == dt_week.getMonth());
        let week = ((dt_questionable.getDate()-(dt_questionable.getDay()+6)%7) == (dt_week.getDate()-(dt_week.getDay()+6)%7));
        return year && month && week;
    }

    isInPast(row, col)
    {
        let dt_now = new Date();
        let dt_week_mon = new Date();
        dt_week_mon.setDate(dt_week_mon.getDate()-(dt_week_mon.getDay()+6)%7);

        let past_week = dt_week_mon.getTime() > this.$dt_selected.getTime();
        let past_day  = (dt_now.getDay()+6)%7+1 > row;
        let current_week = (!(past_week)) && ((dt_week_mon.getTime()+604800000) > (this.$dt_selected.getTime()));
        let past_hour = ((((dt_now.getDay()+6)%7+1) == row) && (dt_now.getHours > (col+3)));
        return past_week || (past_day && current_week) || (past_hour && current_week);
    }


    // Messages from dialog window
    onSelectionRefresh($dialog)
    {
        // TODO - vytahnout data z dialogu
    }

    onSelectionCancel($dialog)
    {
        this.reservationDialog = null;
        this.$container.find(".selected-cell").remove();

    }

    onSelectionConfirm($dialog)
    {
        // TODO - vytahnout data z dialogu
    }

    onSchemaShow()
    {
        console.log("Showing schema.");

        let room_sc = this.$container.find("select option:selected").text();
        let room = this.rooms.find((val) => val.room_shortcut == room_sc );

        this.schemaView.update(room);
        this.schemaView.$container.fadeIn(500);
    }

    onSchemaHide()
    {
        console.log("Hiding schema.");

        this.schemaView.hide();
    }



}