// ITU 2019 Project
// Authors: Radek Veverka <xvever13>
// Main view with header

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
                        <div class="head-title">FIT rezervační systém</div>
                    </div>

                    <div class="header-middle">
                        <div data-view="roomScheduleView" class="menu-item btn-green">Místnosti</div>
                        <div data-view="WeekScheduleView" class="menu-item btn-green menu-item-active">Týden</div>
                        <div data-view="myResView" class="menu-item btn-green">Moje rezervace</div>
                    </div>

                    <div class="header-right">
                        <div class="auth-user">${this.controller.getCurrentUser()}</div>
                        <button class="btn-green">Logout</button>
                    </div>
                </header>

                <section>

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