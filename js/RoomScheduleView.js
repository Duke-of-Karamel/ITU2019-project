class RoomScheduleView {

	constructor($controller)
	{
		this.$container = null;
		this.$controller = $controller;
		this.build();
	}

	rowStart = 0;
	colStart = 0;
	fallback = false;

	build() {
		let html = `
			<div class="itu-app">

				<header>
					<div class="header-left">
						<div class="head-title">FIT reservation system</div>
					</div>

					<div class="header-middle">
						<div class="menu-item btn-green">Rooms</div>
						<div class="menu-item btn-green">Week</div>
					</div>

					<div class="header-right">
						<div class="auth-user">test_user</div>
						<button class="btn-green">Logout</button>
					</div>
				</header>
			</div>
			<div class="form">
				<form >
					Date: 
					<button class="btn-green"><</button>
					<input type="date" name="datePicker">
					<button class="btn-green">></button>
				</form>
			</div>

		`;

		let htmljq = $(html);
		htmljq.find("input[type='date']").attr("value", new Date().toJSON().slice(0,10));

		this.$container.append(htmljq);

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
						col = $('<th>').addClass('head').text('Room\\Hour');
					}
					else {
						col = $('<th>').addClass('head').text(j - 1);
					}
				}
				else {
					if (j === 0) {
						col = $('<td>').addClass('head').text('room ' + i);
					}
					else {
						col = $('<td>').addClass('val').attr("data-row", i).attr("data-col", j);
					}
				}
				row.append(col);
			}
			table.append(row);
		}
		this.$container.append(table);

		this.$container.find("td").filter(".val").on("click",(element) => this.pick($(element.currentTarget)));
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
}