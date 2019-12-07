
class MainView 
{
    constructor(controller)
    {
        this.controller = controller;
        this.$container = $("body");
        this.build();
    }

    build()
    {
        let html = `
            <div class="itu-app">
                <header>
                    <div class="header-left">
                        <div class="head-title">FIT reservation system</div>
                    </div>

                    <div class="header-middle">
                        <div data-view="roomScheduleView" class="menu-item btn-green menu-item-active">Rooms</div>
                        <div data-view="WeekScheduleView" class="menu-item btn-green">Week</div>
                        <div data-view="myResView" class="menu-item btn-green">My reservations</div>
                    </div>

                    <div class="header-right">
                        <div class="auth-user">test_user</div>
                        <button class="btn-green">Logout</button>
                    </div>
                </header>

                <section>
                    Zatim tu necham Controller vyprintit obsah db.
                </section>
            </div>
        `; 

        this.$container.append(html);

        this.$container.find(".menu-item").on("click", (el) => {
            let $el = $(el.currentTarget);
            this.$container.find(".menu-item").removeClass("menu-item-active");
            $el.addClass("menu-item-active");
            this.controller.onViewChange( $el.data("view") );
        })
    }
}