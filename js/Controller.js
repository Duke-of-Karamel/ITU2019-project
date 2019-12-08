// ITU 2019 Project
// Authors: Radek Veverka <xvever13>
// Controller of the application

/**
 * The entry point of the application, main controller, manages views and provides data to both backend and frontend. Connects backend and frontend
 */
 class Controller 
 {
    constructor()
    {
        console.log("Constructing application controller.");
        
        this.currentView    = null;
        this.loggedUser     = "test_user";
        this.getUrl         = "https://vevesoft.net/ituproject/GetReservations.php";
        this.removeUrl      = "https://vevesoft.net/ituproject/RemoveReservation.php";
        this.createUrl      = "https://vevesoft.net/ituproject/InsertReservation.php";

        // Make sure the body is clean
        $("body").empty();

        this.mainView           = new MainView(this, this.myResView);
        let $mainSection        = this.mainView.$container.find("section");
        this.myResView          = new MyReservationsView(this);
        this.myWeekScheduleView = new WeekScheduleView(this);
        this.roomScheduleView   = new RoomScheduleView(this);

        this.myResView.$container.hide();
        this.myWeekScheduleView.$container.hide();
        this.roomScheduleView.$container.hide();

        $mainSection.append(this.myWeekScheduleView.$container);
        $mainSection.append(this.myResView.$container);
        $mainSection.append(this.roomScheduleView.$container);

        this.refreshData();

        this.onViewChange("WeekScheduleView");
    }

    refreshData()
    {
        $.ajax(this.getUrl).done((data) => {
            // this.mainView.$container.find("section").append(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
            let transformedData = this.resDataTransform(data);
            this.myResView.update(transformedData);
            this.myWeekScheduleView.update(transformedData, data.rooms);
            this.roomScheduleView.update(transformedData, data.rooms);      
        });
    }

    resDataTransform(data_from_server)
    {
        let result = [];
        for (let it of data_from_server.reservations) 
        {
            let room = data_from_server.rooms.find((val) => val.room_id == it.room_id);    
            it.room = room;
            result.push(it);
        }

        return result;
    }

    onReservationCancel(res_id)
    {
        console.log("Canceling reservation " + res_id);

        $.ajax({
            url: this.removeUrl,
            data: {
                "reservation_id": res_id
            },
            method: "POST"
        }).done(() => {
            this.refreshData();
        });
    }

    onViewChange(viewName)
    {
        console.log("Changing view to " + viewName);
        if (this.currentView != null)
            this.currentView.$container.hide();
        let nextView = null;
        if (viewName == "myResView")
            nextView = this.myResView;
        else if (viewName == "WeekScheduleView")
            nextView = this.myWeekScheduleView;
        else if (viewName == "roomScheduleView")
            nextView = this.roomScheduleView;
        else 
            return;
        
        this.currentView = nextView;
        this.currentView.$container.fadeIn(300);
    }

    createReservation(data)
    {
        data.user_id = this.getCurrentUser();

        $.ajax({
            url: this.createUrl,
            data: data,
            method: "POST"
        }).done(() => {
            this.refreshData();
        });
    }

    getCurrentUser()
    {
        return this.loggedUser;
    }
 }

 // Run the application as soon as page is ready
 $(function() {
     new Controller();
 })