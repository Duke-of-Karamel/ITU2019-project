/**
 * The entry point of the application, main controller, manages views and provides data to both backend and frontend. Connects backend and frontend
 */
 class Controller 
 {
    constructor()
    {
        console.log("Constructing application controller.");

        // Make sure the body is clean
        $("body").empty();

        this.myResView = new MyReservationsView(this);
        this.mainView  = new MainView(this, this.myResView);
        this.currentView = null;
        this.getUrl = "https://vevesoft.net/ituproject/GetReservations.php";


        // Test data request
        $.ajax(this.getUrl).done((data) => {
            this.mainView.$container.find("section").append(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
        });
    }

    resDataTransform(data_from_server)
    {
        let result = [];
        for (let it of data_from_server.reservations) 
        {
            let room = data_from_server.rooms.find((val) => val.room_id == it.romm_id);    
            it.room = room;
            result.push(it);
        }

        return result;
    }

    onReservationCancel(res_id)
    {
        console.log("Canceling reservation " + res_id);

    }

    onViewChange(viewName)
    {
        console.log("Changing view to " + viewName);
        let nextView = null;
        if (viewName == "myResView")
            nextView = this.myResView;
        else 
            return;
        
        this.currentView = nextView;
    }
 }

 // Run the application as soon as page is ready
 $(function() {
     new Controller();
 })