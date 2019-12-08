class RoomScheduleView {
	constructor($container) {
		this.$container = $container;
	}

	rowStart = 0;
	colStart = 0;
	fallback = false;

	build() {
		let form = $(`
			<div class="dayroom-setup-cont">
				<div class="dayroom-setup">
					<div>Datum: </div>
					<button id="prevDay">&lt;</button>
					<input type="date" id="datePicker">
					<button id="today">Dnes</button>
					<button id="nextDay">&gt;</button>
				</div>
			</div>
		`);


		let tableDiv = $(`
			<div class="table_div">
			</div>
		`);

		let table = $('<table id="autoTable">').addClass('foo');
		let i;
		let j;
		let row;
		let col;
		for(i=0; i<3; i++) {
			row = $('<tr>');
			for(j=0; j<=24; j++) {
				if (i === 0) {
					if (j === 0) {
						col = $('<th>').addClass('head').addClass('side').text('Čas');
					}
					else {
						col = $('<th>').addClass('head').text(j - 1);
					}
				}
				else {
					if (j === 0) {
						col = $('<th>').addClass('side').text('room ' + i);
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

		this.$container.append(roomDiv);
		this.today();

		this.$container.find("td").filter(".val").on("click",(element) => this.pick($(element.currentTarget)));
		this.$container.find("#prevDay").on("click",() => this.prev_day());
		this.$container.find("#nextDay").on("click",() => this.next_day());
		this.$container.find("#today").on("click",() => this.today());
	}

	pick($element) {
		let rowEnd;
		let colEnd;
		let rowStart = this.rowStart;
		let colStart = this.colStart;
		if (Number(rowStart) === 0) {
			$element.addClass("picked");
			this.rowStart = Number($element.attr("data-row"));
			this.colStart = Number($element.attr("data-col"));
		}
		else {
			rowEnd = Number($element.attr("data-row"));
			colEnd = Number($element.attr("data-col"));
			if (Number(rowStart) === Number(rowEnd)) {
				if (Number(colEnd) < Number(colStart)) {
					for (let i = colEnd; i <= colStart; i++){
						if ($("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").hasClass('taken')){
							this.fallback = true;
							break;
						}
					}
					if (!this.fallback) {
						for (let i = colEnd; i <= colStart; i++) {
							$("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").addClass('picked').addClass('taken');
						}
					}
				}
				else if (Number(colEnd) > Number(colStart))
				{
					for (let i = colStart; i <= colEnd; i++){
						if ($("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").hasClass('taken')) {
							this.fallback = true;
							break;
						}
					}
					if (!this.fallback) {
						for (let i = colStart; i <= colEnd; i++) {
							$("td").filter("[data-row=" + String(rowStart) + "]").filter("[data-col=" + String(i) + "]").addClass('picked').addClass('taken');
						}
					}
				}
				if (!this.fallback) {
					this.rowStart = Number(0);
					this.colStart = Number(0);
				}
			}
		}
		this.fallback = false;
	}

	prev_day() {
		let dt_picker = this.$container.find("#datePicker");
		let dt = new Date(dt_picker.val());
		dt.setDate(dt.getDate()-1);
		dt_picker.val(dt.toISOString().slice(0,10));
	}

	next_day() {
		let dt_picker = this.$container.find("#datePicker");
		let dt = new Date(dt_picker.val());
		dt.setDate(dt.getDate()+1);
		dt_picker.val(dt.toISOString().slice(0,10));
	}

	today() {
		console.log('today');
		this.$container.find("#datePicker").val( new Date().toJSON().slice(0,10));
	}

	update($reservations, $rooms)
	{
		this.$reservations = $reservations;
		this.$rooms = $rooms;
	}
}