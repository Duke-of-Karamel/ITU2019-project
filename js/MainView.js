
class MainView 
{
    constructor($container)
    {
        this.$container = $container;
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
                        <div class="menu-item btn-green">Rooms</div>
                        <div class="menu-item btn-green">Week</div>
                    </div>

                    <div class="header-right">
                        <div class="auth-user">test_user</div>
                        <button class="btn-green">Logout</button>
                    </div>
                </header>

                <section>
                    Toto je nejaky content
                </section>
            </div>
        `; 

        this.$container.append(html);
    }
}