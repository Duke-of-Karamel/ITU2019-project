// ITU 2019 Project
// Authors: Ladislav Bezděčík <xbezde13>
// View for schedule of rooms in a single day

class RoomScheduleView {

	constructor($controller)
	{
		this.$container = null;
		this.$controller = $controller;
		this.$rooms = null;
		this.reservationDialog = null;
		this.build();
	}

	rowStart = 0;
	colStart = 0;
	fallback = false;
	$pickedDay = new Date();

	build() {
		let form = $(`
			<div class="room-setup-cont">
				<div class="room-setup">
					<div>Datum: </div>
					<button id="prevDay" class="btn-green">&lt;</button>
					<input type="date" id="datePicker">
					<button id="today" class="btn-green">Dnes</button>
					<button id="nextDay" class="btn-green">&gt;</button>
				</div>
			</div>
		`);


		let tableDiv = $(`
			<div class="table_div">
			</div>
		`);

		let table = $('<table id="autoTable" class="room_table">').addClass('foo');
		let i;
		let j;
		let row;
		let col;
		for(i=0; i<6; i++) {
			row = $('<tr>');
			for(j=0; j<=19; j++) {
				if (i === 0) {
					if (j === 0) {
						col = $('<th>').addClass('head').addClass('side').text('Čas');
					}
					else {
						col = $('<th>').addClass('head').text(j + 3 + ':00-:59');
					}
				}
				else {
					if (j === 0) {
						col = $('<th>').addClass('side').attr("data-row", i).text('room ' + i);
						// col = $('<th>').addClass('side').attr("data-roomId", this.$rooms[i-1].room_id).text(this.$rooms[i-1].room_shortcut);
					}
					else {
						col = $('<td>').addClass('val').attr("data-row", i).attr("data-col", j);
					}
				}
				row.append(col);
			}
			table.append(row);
		}
		tableDiv.append(table);

		let roomDiv = $(`
			<div class="room_div">
			</div>
		`);

		roomDiv.append(form);
		roomDiv.append(tableDiv);

		this.$container = roomDiv;
		this.today();

		this.$container.find("td").filter(".val").on("click",(element) => this.pick($(element.currentTarget)));
		this.$container.find("#prevDay").on("click",() => this.prev_day());
		this.$container.find("#nextDay").on("click",() => this.next_day());
		this.$container.find("#today").on("click",() => this.today());
		this.$container.find("#datePicker").on("change", (element) => this.dateChange($(element.currentTarget)));

	}

	pick($element) {
		let rowEnd;
		let colEnd;
		let rowStart = this.rowStart;
		let colStart = this.colStart;
		if (Number(rowStart) === 0) {
			if(this.isPickable(Number($element.attr("data-row")), Number($element.attr("data-col")))) {
				$element.addClass("picked");
				this.rowStart = Number($element.attr("data-row"));
				this.colStart = Number($element.attr("data-col"));
			}
		}
		else {
			rowEnd = Number($element.attr("data-row"));
			colEnd = Number($element.attr("data-col"));
			if (Number(rowStart) === Number(rowEnd)) {
				if (Number(colEnd) < Number(colStart)) {
					for (let i = colEnd; i <= colStart; i++){
						if(!this.isPickable(rowStart, i)) {
							this.fallback = true;
							break;
						}
					}
					if (!this.fallback) {
						for (let i = colEnd; i <= colStart; i++) {
							$("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").removeClass('picked').addClass('taken');
						}
					}
				}
				else if (Number(colEnd) > Number(colStart)) {
					for (let i = colStart; i <= colEnd; i++){
						if(!this.isPickable(rowStart, i)) {
							this.fallback = true;
							break;
						}
					}
					if (!this.fallback) {
						for (let i = colStart; i <= colEnd; i++) {
							$("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").removeClass('picked').addClass('taken');
						}
					}
				}
				else {
					$("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(colStart) + "]").removeClass('picked').addClass('taken');
				}
				if (!this.fallback) {
					this.rowStart = Number(0);
					this.colStart = Number(0);
					this.showRes($element);
				}
			}
		}
		this.fallback = false;
	}

	prev_day() {
		let datePicker = this.$container.find("#datePicker");
		let date = new Date(datePicker.val());
		date.setDate(date.getDate()-1);
		datePicker.val(date.toISOString().slice(0,10));
		this.dateChange(datePicker)
	}

	next_day() {
		let datePicker = this.$container.find("#datePicker");
		let date = new Date(datePicker.val());
		date.setDate(date.getDate()+1);
		datePicker.val(date.toISOString().slice(0,10));
		this.dateChange(datePicker)
	}

	today() {
		let datePicker = this.$container.find("#datePicker");
		datePicker.val(new Date().toJSON().slice(0,10));
		this.dateChange(datePicker);
	}

	dateChange ($element) {
		this.$pickedDay = new Date($($element).val());
		this.$controller.refreshData();
	}

	update($reservations, $rooms) {
		this.$reservations = $reservations;
		this.$rooms = $rooms;
		this.markReservations();
		this.updateRooms();
		this.rowStart = Number(0);
		this.colStart = Number(0);
	}

	showRes($element) {
		var offset = $element.offset();
		this.reservationDialog = new ReservationDialog(this, $("body"));
		this.reservationDialog.$dialog.css("top",  offset.top + $element.height() +"px");
		this.reservationDialog.$dialog.css("left", offset.left +"px");
	}

	markReservations() {
		$("td").filter(".val").removeClass('taken').removeClass('user').removeClass('nonuser').removeClass('past').removeClass('picked').empty();
		this.$reservations.forEach($element => {
			if(this.isPickedDay(new Date($element.dt_from*1000))) {
				let date_from = new Date($element.dt_from*1000);
				let date_to = new Date($element.dt_to*1000);
				let hours = date_to.getHours() - date_from.getHours() + (date_to.getMinutes()-date_from.getMinutes() > 0);
				let css = null;
				if ($element.user === this.$controller.getCurrentUser()) {
					css = "user"
				}
				else {
					css = "nonuser"
				}
				for(let hrs = hours - 1; hrs >= 0; hrs--){
					let from = 0;
					let to = 60;
					if (hrs === 0){
						from = date_from.getMinutes();
					}
					if (hrs === hours-1){
						to = date_to.getMinutes();
					}
					if (hours === 1){
						to = to-from
					}
					this.markReservation(css, Number($element.room_id),date_from.getHours()+hrs-4, from, to);
				}
			}
		});
	}

	updateRooms() {
		let i = 1;
		this.$rooms.forEach($element => {
			this.$container.find(`.side[data-row='${i}']`).text($element.room_shortcut);
			i++;
		});
	}

	markReservation($css_class, $row, $collumn, from_minu, to_minu) {
		let css_percent = "style=\"margin-left:" + from_minu/60*100 + "%;width:" + to_minu/60*100 + "%;\"";
		this.$container.find(`.room_table .val[data-row='${$row}'][data-col='${$collumn}']`).append(`<div class="${$css_class}" ${css_percent}></div>`).addClass('past');
	}

	isPickable(row, col){
		let elem = $("td").filter("[data-row=" + String(row) + "]").filter("[data-col=" + String(col) + "]");
		return !(elem.hasClass('taken') || elem.hasClass('past'));
	}


	isPickedDay(date) {
		return date.toISOString().slice(0,10) === this.$pickedDay.toISOString().slice(0,10)
	}
}