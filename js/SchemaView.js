// ITU 2019 Project
// Radek Veverka <xvever13>
// View for area map


class SchemaView 
{
    constructor()
    {
        this.$container         = $("<div class='schema-container'></div>");
        this.$imageContainer    = $("<div class='schema-image-container'></div>");
        this.image              = new Image();
        this.imgWidth           = 0;
        this.imgHeight          = 0;
    }
    
    build()
    {
        this.$container.append(this.$imageContainer);
        this.$imageContainer.append(this.image);
        this.$pointer = $(`
            <div class='schema-pointer-container'>
                <img src='https://vevesoft.net/ituproject/arrow.png'>
            </div>
        `);
        this.$imageContainer.append(this.$pointer);
    }

    /**
     * Update the schema - change picture and room
     */
    update(data)
    {
        $(this.image).one("load", () => {
            this.imgWidth = this.image.width;
            this.imgHeight = this.image.height;

            this.updateCursor();
        });

        this.image.src = data.schema_src;
    }

    updateCursor()
    {
        let contWidth = this.$imageContainer.width();
        let contHeight = this.$imageContainer.height();

        let ratioX = this.imgWidth / contWidth;
        let ratioY = this.imgHeight / contWidth;

        this.$pointer.css("left", (contWidth * ratioX) + "px").css("top", (contHeight * ratioY) + "px");
    }

    show()
    {

    }

    hide()
    {
       // this.$container.hide();      
    }
}

