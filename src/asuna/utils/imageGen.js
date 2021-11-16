const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs')

class imageGen {
    constructor(canvasSize, colour) {
        this.image;
        this.canvas = createCanvas(canvasSize[0], canvasSize[1])
        this.canvasSize = canvasSize
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = colour
        registerFont(__dirname + '/../fonts/Helvetica_Bold.ttf', {family: "Helvet", weight: "bold"})
        registerFont(__dirname + '/../fonts/Helvetica_Medium.ttf', {family: "Helvet", weight: "medium"})
    }

    async imageLoad(img) {
        try {
            this.image = await loadImage(img)
        } catch (error) {
            return {success:false ,err: error}
        }
        return {success:true, res: this.image}
    }

    drawImage(location) {
        try {
            this.ctx.drawImage(this.image, location[0], location[1])
        } catch (error) {
            return {success: false, err: error}
        }
        return {success: true, res: null}
    }

    drawCircle(size, location) {
        this.ctx.beginPath()
        this.ctx.arc(location[0], location[1], size, 0, Math.PI * 2)
        this.ctx.clip()
    }

    drawText(font, txt, location) {
        this.ctx.font = font
        this.ctx.fillText(txt, location[0], location[1])
    }

    getDataBuff() {
        return this.canvas.toBuffer("image/png")
    }

    fillR() {
        this.ctx.fillRect(0,0,this.canvasSize[0], this.canvasSize[1])
    }

}

process.on("message", data => {
    let imggen = new imageGen(data.canvasSize, data.colour)
        .imageLoad(data.BGImage.src)
        .drawImage(data.BGImage.location)
        .drawText(data.imgText.font, data.imgText.txt, data.imageText.location)
        .drawCircle(data.circle.size, data.circle.location)
        .fillr()
        .drawCircle(data.circle2.size, data.circle2.location)
        .imageLoad(data.userPf.src)
        .drawImage(data.userPf.location)

    process.send({img: imggen.getDataBuff()})
})