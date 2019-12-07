class WeekScheduleView
{
    constructor($controller)
    {
        this.$container = null; // Is set later in build
        this.$controller = $controller;
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
                        <p>Datum: </p>
                        <button id="dt_shl">&lt;</button>
                        <input type="date" id="dt_picker" name="date">
                        <button id="dt_now">Now</button>
                        <button id="dt_shr">&gt;</button>
                    </div>
                    <div class="dayroom-setup">
                        <p>Místnost: </p>
                        <select id="room_picker" name="room">
                            <option value="0">ALL</option>
                            <!-- Here add more with query -->
                        </select>
                    </div>
                </div>
                <table class="week_table">
                    <tr>
                        <th class="tHead">Čas</th> <th class="tHead">4:00-:59</th> <th class="tHead">5:00-:59</th> <th class="tHead">6:00-:59</th> <th class="tHead">7:00-:59</th> <th class="tHead">8:00-:59</th> <th class="tHead">9:00-:59</th> <th class="tHead">10:00-:59</th> <th class="tHead">11:00-:59</th> <th class="tHead">12:00-:59</th> <th class="tHead">13:00-:59</th> <th class="tHead">14:00-:59</th> <th class="tHead">15:00-:59</th> <th class="tHead">16:00-:59</th> <th class="tHead">17:00-:59</th> <th class="tHead">18:00-:59</th> <th class="tHead">19:00-:59</th> <th class="tHead">20:00-:59</th> <th class="tHead">21:00-:59</th> <th class="tHead">22:00-:59</th>
                    </tr>
                    <tr>
                        <th class="tHead">Po</th> <td class="tCont" data-row="1" data-col="1"></td> <td class="tCont" data-row="1" data-col="2"></td> <td class="tCont" data-row="1" data-col="3"></td> <td class="tCont" data-row="1" data-col="4"></td> <td class="tCont" data-row="1" data-col="5"></td> <td class="tCont" data-row="1" data-col="6"></td> <td class="tCont" data-row="1" data-col="7"></td> <td class="tCont" data-row="1" data-col="8"></td> <td class="tCont" data-row="1" data-col="9"></td> <td class="tCont" data-row="1" data-col="10"></td> <td class="tCont" data-row="1" data-col="11"></td> <td class="tCont" data-row="1" data-col="12"></td> <td class="tCont" data-row="1" data-col="13"></td> <td class="tCont" data-row="1" data-col="14"></td> <td class="tCont" data-row="1" data-col="15"></td> <td class="tCont" data-row="1" data-col="16"></td> <td class="tCont" data-row="1" data-col="17"></td> <td class="tCont" data-row="1" data-col="18"></td> <td class="tCont" data-row="1" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">Út</th> <td class="tCont" data-row="2" data-col="1"></td> <td class="tCont" data-row="2" data-col="2"></td> <td class="tCont" data-row="2" data-col="3"></td> <td class="tCont" data-row="2" data-col="4"></td> <td class="tCont" data-row="2" data-col="5"></td> <td class="tCont" data-row="2" data-col="6"></td> <td class="tCont" data-row="2" data-col="7"></td> <td class="tCont" data-row="2" data-col="8"></td> <td class="tCont" data-row="2" data-col="9"></td> <td class="tCont" data-row="2" data-col="10"></td> <td class="tCont" data-row="2" data-col="11"></td> <td class="tCont" data-row="2" data-col="12"></td> <td class="tCont" data-row="2" data-col="13"></td> <td class="tCont" data-row="2" data-col="14"></td> <td class="tCont" data-row="2" data-col="15"></td> <td class="tCont" data-row="2" data-col="16"></td> <td class="tCont" data-row="2" data-col="17"></td> <td class="tCont" data-row="2" data-col="18"></td> <td class="tCont" data-row="2" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">St</th> <td class="tCont" data-row="3" data-col="1"></td> <td class="tCont" data-row="3" data-col="2"></td> <td class="tCont" data-row="3" data-col="3"></td> <td class="tCont" data-row="3" data-col="4"></td> <td class="tCont" data-row="3" data-col="5"></td> <td class="tCont" data-row="3" data-col="6"></td> <td class="tCont" data-row="3" data-col="7"></td> <td class="tCont" data-row="3" data-col="8"></td> <td class="tCont" data-row="3" data-col="9"></td> <td class="tCont" data-row="3" data-col="10"></td> <td class="tCont" data-row="3" data-col="11"></td> <td class="tCont" data-row="3" data-col="12"></td> <td class="tCont" data-row="3" data-col="13"></td> <td class="tCont" data-row="3" data-col="14"></td> <td class="tCont" data-row="3" data-col="15"></td> <td class="tCont" data-row="3" data-col="16"></td> <td class="tCont" data-row="3" data-col="17"></td> <td class="tCont" data-row="3" data-col="18"></td> <td class="tCont" data-row="3" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">Čt</th> <td class="tCont" data-row="4" data-col="1"></td> <td class="tCont" data-row="4" data-col="2"></td> <td class="tCont" data-row="4" data-col="3"></td> <td class="tCont" data-row="4" data-col="4"></td> <td class="tCont" data-row="4" data-col="5"></td> <td class="tCont" data-row="4" data-col="6"></td> <td class="tCont" data-row="4" data-col="7"></td> <td class="tCont" data-row="4" data-col="8"></td> <td class="tCont" data-row="4" data-col="9"></td> <td class="tCont" data-row="4" data-col="10"></td> <td class="tCont" data-row="4" data-col="11"></td> <td class="tCont" data-row="4" data-col="12"></td> <td class="tCont" data-row="4" data-col="13"></td> <td class="tCont" data-row="4" data-col="14"></td> <td class="tCont" data-row="4" data-col="15"></td> <td class="tCont" data-row="4" data-col="16"></td> <td class="tCont" data-row="4" data-col="17"></td> <td class="tCont" data-row="4" data-col="18"></td> <td class="tCont" data-row="4" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">Pá</th> <td class="tCont" data-row="5" data-col="1"></td> <td class="tCont" data-row="5" data-col="2"></td> <td class="tCont" data-row="5" data-col="3"></td> <td class="tCont" data-row="5" data-col="4"></td> <td class="tCont" data-row="5" data-col="5"></td> <td class="tCont" data-row="5" data-col="6"></td> <td class="tCont" data-row="5" data-col="7"></td> <td class="tCont" data-row="5" data-col="8"></td> <td class="tCont" data-row="5" data-col="9"></td> <td class="tCont" data-row="5" data-col="10"></td> <td class="tCont" data-row="5" data-col="11"></td> <td class="tCont" data-row="5" data-col="12"></td> <td class="tCont" data-row="5" data-col="13"></td> <td class="tCont" data-row="5" data-col="14"></td> <td class="tCont" data-row="5" data-col="15"></td> <td class="tCont" data-row="5" data-col="16"></td> <td class="tCont" data-row="5" data-col="17"></td> <td class="tCont" data-row="5" data-col="18"></td> <td class="tCont" data-row="5" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">So</th> <td class="tCont" data-row="6" data-col="1"></td> <td class="tCont" data-row="6" data-col="2"></td> <td class="tCont" data-row="6" data-col="3"></td> <td class="tCont" data-row="6" data-col="4"></td> <td class="tCont" data-row="6" data-col="5"></td> <td class="tCont" data-row="6" data-col="6"></td> <td class="tCont" data-row="6" data-col="7"></td> <td class="tCont" data-row="6" data-col="8"></td> <td class="tCont" data-row="6" data-col="9"></td> <td class="tCont" data-row="6" data-col="10"></td> <td class="tCont" data-row="6" data-col="11"></td> <td class="tCont" data-row="6" data-col="12"></td> <td class="tCont" data-row="6" data-col="13"></td> <td class="tCont" data-row="6" data-col="14"></td> <td class="tCont" data-row="6" data-col="15"></td> <td class="tCont" data-row="6" data-col="16"></td> <td class="tCont" data-row="6" data-col="17"></td> <td class="tCont" data-row="6" data-col="18"></td> <td class="tCont" data-row="6" data-col="19"></td>
                    </tr>
                    <tr>
                        <th class="tHead">Ne</th> <td class="tCont" data-row="7" data-col="1"></td> <td class="tCont" data-row="7" data-col="2"></td> <td class="tCont" data-row="7" data-col="3"></td> <td class="tCont" data-row="7" data-col="4"></td> <td class="tCont" data-row="7" data-col="5"></td> <td class="tCont" data-row="7" data-col="6"></td> <td class="tCont" data-row="7" data-col="7"></td> <td class="tCont" data-row="7" data-col="8"></td> <td class="tCont" data-row="7" data-col="9"></td> <td class="tCont" data-row="7" data-col="10"></td> <td class="tCont" data-row="7" data-col="11"></td> <td class="tCont" data-row="7" data-col="12"></td> <td class="tCont" data-row="7" data-col="13"></td> <td class="tCont" data-row="7" data-col="14"></td> <td class="tCont" data-row="7" data-col="15"></td> <td class="tCont" data-row="7" data-col="16"></td> <td class="tCont" data-row="7" data-col="17"></td> <td class="tCont" data-row="7" data-col="18"></td> <td class="tCont" data-row="7" data-col="19"></td>
                    </tr>
                </table>
            </div>
        `;

        this.$container = $(html);

        this.$container.find("#dt_picker").val(Utils.datePickerFormat(new Date()));
        
        this.$container.find(".week_table.tCont").on("click", (event) => this.onTryReserve($(event.currentTarget)));
        this.$container.find("#dt_picker").on("change", (event) => this.onDateChange($(event.currentTarget)));
        this.$container.find("#dt_shl").on("click",(event) => this.onDateShl($(event.currentTarget)));
        this.$container.find("#dt_shr").on("click",(event) => this.onDateShr($(event.currentTarget)));
        this.$container.find("#dt_now").on("click",(event) => this.onDateNow($(event.currentTarget)));
        this.$container.find("#room_picker").on("change",(event) => this.onRoomChange($(event.currentTarget)));
    }

    onDateChange($element)
    {
        this.$dt_selected = new Date($($element).val());
    }

    onDateNow($element)
    {
        let dt = new Date();
        this.$container.find("#dt_picker").val(Utils.datePickerFormat(dt));
        // Maybe call onDateChange if not automatic
    }

    onDateShl($element)
    {
        let dt_picker = this.$container.find("#dt_picker");
        let dt = new Date(dt_picker.val());
        dt.setDate(dt.getDate()-7);
        dt_picker.val(Utils.datePickerFormat(dt));
        // Maybe call onDateChange if not automatic
    }

    onDateShr($element)
    {
        let dt_picker = this.$container.find("#dt_picker");
        let dt = new Date(dt_picker.val());
        dt.setDate(dt.getDate()+7);
        dt_picker.val(Utils.datePickerFormat(dt));
        // Maybe call onDateChange if not automatic
    }

    onRoomChange($element)
    {
        this.$room_selected = $($element).text();
        this.update(this.$reservations);
    }

    onTryReserve($element)
    {
        if (this.$room_selected == "ALL")
        {
            this.$controller.plsChangeToDayScheduleByLadislav // TODO
        }
        else
        {
            $($element).css("color", "green"); // TODO
        }
    }

    update($reservations, rooms)
    {
        this.$reservations = $reservations;
        this.markReservations();
        this.makeRoomPicker(rooms);
    }

    makeRoomPicker(rooms)
    {
        rooms.forEach(room => {
            this.$container.find("#room_picker").append("<option>" + room + "</option>");
        });
    }


    markReservations()
    {
        this.$reservations.forEach($element => {
            if(this.$room_selected == $element.room.room_shortcut || this.$room_selected == "ALL")
            {
                let date_from = new Date($element.dt_from*1000/*ms*/);

                if(this.isWithinWeek(date_from,this.$dt_selected))
                {
                    let seconds = $element.dt_to - $element.dt_from;
                    let hours = seconds/3600 + (seconds%3600 > 0);
                    let css = null;
                    if ($element.user == this.$controller.getCurrentUser())
                    {
                        css = "green"
                    }
                    else//FIXME
                    {
                        css = "red"
                    }

                    for(; hours > 0; hours--){
                        this.markReservation(css,(date_from.getDay+6)%7+1,date_from.getHours+hours-4/*FIXME my schedule starts at 4:00*/)
                    }
                }
            }
        });
    }

    markReservation($css_class, $row, $collumn)
    {
        //FIXME
    }

    static isWithinWeek(dt_questionable, dt_week)
    { /*604800 week in seconds*/
        let year = (dt_questionable.getFullYear() == dt_week.getFullYear());
        let month = (dt_questionable.getMonth() == dt_week.getMonth());
        let week = (dt_questionable.getDate()-dt_questionable.getDay() == dt_week.getDate()-dt_week.getDay());
        return year && month && week;
    }
}