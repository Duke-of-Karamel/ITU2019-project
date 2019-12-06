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

        this.mainView = new MainView($("body"));
        this.mainView.build();
        this.getUrl = "https://vevesoft.net/ituproject/GetReservations.php";

        // Test data request
        $.ajax(this.getUrl).done((data) => {
            this.mainView.$container.find("section").append(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
        });
    }
 }

 // Run the application as soon as page is ready
 $(function() {
     new Controller();
 })