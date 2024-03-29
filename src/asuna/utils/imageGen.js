const { createCanvas, loadImage, registerFont } = require('canvas')

/**
 * @param {Array<number>} canvasSize - int array for canvas size
 * @param {String} colour - hex string for colour
 */
class imageGen {
    constructor(canvasSize, colour) {
        this.canvas = createCanvas(canvasSize[0], canvasSize[1])
        this.image;
        this.canvasSize = canvasSize
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = colour
        registerFont(__dirname + '/../fonts/Helvetica_Bold.ttf', {family: "Helvet", weight: "bold"})
        registerFont(__dirname + '/../fonts/Helvetica_Medium.ttf', {family: "Helvet", weight: "medium"})
    }

    /**
     * 
     * @param {String} img - path or url of image to be laoded and drawn
     * @param {Array<Number>} location - location of and size of image to render on canvas | [locationX, locationY, sizeX?, sizeY?] 
     * @returns {Object} Success and result / error 
     */
    async imageLoad(img, location) {
        try {
            this.image = await loadImage(img)
            this.ctx.drawImage(this.image, location[0], location[1], location[2] || this.canvasSize[0], location[3] || this.canvasSize[1])
        } catch (error) {
            return {success:false ,err: error}
        }
        return {success:true, res: this.image}
    }

    /**
     * 
     * @param {Array<Number>} location - location of image to render on canvas | [locationX, locationY] 
     * @deprecated
     * @returns 
     */
    drawImage(location) {
        try {
            this.ctx.drawImage(this.image, location[0], location[1])
            this.image = null
        } catch (error) {
            return {success: false, err: error}
        }
        return {success: true, res: null}
    }

    /**
     * 
     * @param {Number} size - radius of circle
     * @param {Array<Number>} location - location of circle
     */
    drawCircle(size, location) {
        this.ctx.beginPath()
        this.ctx.arc(location[0], location[1], size, 0, Math.PI * 2)
        this.ctx.clip()
        this.fillR()
    }

    /**
     * 
     * @param {String} font - font to use
     * @param {String} txt - text to be rendered
     * @param {Array<Number>} location - location of text to render on canvas | [locationX, locationY] 
     */
    drawText(font, txt, location, memberCount, server, username) {
        let msg = txt.replace("{memberCount}", memberCount).replace("{server}", server).replace("{username}", username)
        this.ctx.font = font
        this.ctx.fillText(msg, location[0], location[1])
    }

    /**
     * 
     * @returns {Buffer} buffer of image
     */
    async getDataBuff() {
        return await this.canvas.toBuffer("image/png")
    }

    /**
     * @private
     */
    fillR() {
        this.ctx.fillRect(0,0,this.canvasSize[0], this.canvasSize[1])
    }

}

process.on("message",async data => {
    
    let imggen = new imageGen(data.canvasSize, data.colour)
    await imggen.imageLoad(data.BGImage.src, data.BGImage.location)

    if(data.Text) {
        await data.Text.forEach(item => {
            imggen.drawText(item.font, item.text, item.location, data.memberCount, data.guildname, data.userPF.name)
        });
    }
    
    if(data.circles) {
        await data.circles.forEach(item => {
            imggen.drawCircle(item.size, item.location)
        });
    }

    imggen.imageLoad(data.userPF.SRC, data.userPF.location).then(async test => {
        let img = await imggen.getDataBuff()
        process.send({img: img})
    })

})