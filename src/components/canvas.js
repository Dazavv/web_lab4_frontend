class Canvas {
    SIZE = 300
    LINE_WIDTH = 2
    TEXT_MARGIN = 15
    TEXT_LINE_HEIGHT = 3
    COLOR_RED = "#b50300"
    COLOR_GREEN = "#00b509"
    COLOR_MAIN = "#ff4b2b"
    WIDTH_IN_POINTS = 10

    constructor(canvas, context, r, dots, fetchCoordinates) {
        this.canvas = canvas
        this.ctx = context
        this.r = r
        this.dots = dots || [];
        this.fetchCoordinates = fetchCoordinates
    }

    drawStartImage() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.r && this.r > 0) this.drawGraph(this.r)
        this.drawAxes()
        this.drawLabelForR(1)
        this.drawLabelForR(2)
        if (this.r && this.r > 0 && this.dots && Array.isArray(this.dots))
            this.dots.forEach(dot =>
                this.drawPoint(
                    parseFloat(dot.x),
                    parseFloat(dot.y),
                    parseFloat(dot.r),
                    dot.status
                )
            )
    }



    drawAxes() {
        // this.ctx.fillStyle = "black";
        this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2)
        this.drawArrow(this.SIZE / 2, this.SIZE, this.SIZE / 2, 0)
    }

    drawArrow(fromx, fromy, tox, toy) {
        var headlen = 10 // length of head in pixels
        var dx = tox - fromx
        var dy = toy - fromy
        var angle = Math.atan2(dy, dx)
        this.ctx.beginPath()
        this.ctx.lineWidth = this.LINE_WIDTH
        this.ctx.moveTo(fromx, fromy)
        this.ctx.lineTo(tox, toy)
        this.ctx.lineTo(
            tox - headlen * Math.cos(angle - Math.PI / 6),
            toy - headlen * Math.sin(angle - Math.PI / 6)
        )
        this.ctx.moveTo(tox, toy)
        this.ctx.lineTo(
            tox - headlen * Math.cos(angle + Math.PI / 6),
            toy - headlen * Math.sin(angle + Math.PI / 6)
        )
        this.ctx.stroke()
    }

    drawLabelForR(max_r = 5) {
        const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS
        this.ctx.fillStyle = "black"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText(
            `${max_r}`,
            this.SIZE / 2 + pointInPixels * max_r,
            this.SIZE / 2 - this.TEXT_MARGIN
        )
        this.ctx.fillText(
            `${max_r}`,
            this.SIZE / 2 + this.TEXT_MARGIN,
            this.SIZE / 2 - pointInPixels * max_r
        )

        this.ctx.beginPath()
        this.ctx.lineWidth = this.LINE_WIDTH
        this.ctx.moveTo(
            this.SIZE / 2 + pointInPixels * max_r,
            this.SIZE / 2 + this.TEXT_LINE_HEIGHT
        )
        this.ctx.lineTo(
            this.SIZE / 2 + pointInPixels * max_r,
            this.SIZE / 2 - this.TEXT_LINE_HEIGHT
        )
        this.ctx.moveTo(
            this.SIZE / 2 + this.TEXT_LINE_HEIGHT,
            this.SIZE / 2 - pointInPixels * max_r
        )
        this.ctx.lineTo(
            this.SIZE / 2 - this.TEXT_LINE_HEIGHT,
            this.SIZE / 2 - pointInPixels * max_r
        )
        this.ctx.stroke()
    }

    drawGraph(r) {
        if (r > 0 && r <= 4) {
            const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS
            this.ctx.fillStyle = this.COLOR_MAIN


            // прямоугольник
            this.ctx.fillRect(
                this.SIZE / 2,
                this.SIZE / 2,
                -(r / 2) * pointInPixels,
                r * pointInPixels
            )


            //треугольник
            this.ctx.beginPath()
            this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2)
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r/2 * pointInPixels)
            this.ctx.lineTo(this.SIZE / 2 - (r / 2) * pointInPixels, this.SIZE / 2)
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2)
            this.ctx.fill()


            //четверть круга
            this.ctx.beginPath()
            this.ctx.arc(
                this.SIZE / 2,
                this.SIZE / 2,
                r * pointInPixels,
                Math.PI * (3/2),
                0
            )

            this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2)
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r * pointInPixels)
            this.ctx.lineTo(this.SIZE / 2 + r  * pointInPixels, this.SIZE / 2)
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2)
            this.ctx.fill()
        }
    }
    drawPoint(x, y, r, success = true) {
        this.ctx.fillStyle = success ? this.COLOR_GREEN : this.COLOR_RED
        const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS
        this.ctx.beginPath()
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2
        )
        this.ctx.fill()
        this.ctx.beginPath()
        this.ctx.lineWidth = 0
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2
        )
        this.ctx.stroke()
    }



    // drawPoint(x, y, r, success = true) {
    //     console.log(x, y, r)
    //     let r_graph = this.r
    //     if (r_graph != null) {
    //         x *= r_graph / r
    //         y *= r_graph / r
    //     }
    //     this.ctx.fillStyle = success ? this.COLOR_GREEN : this.COLOR_RED
    //     const pointInPixels = this.SIZE / this.WIDTH_IN_POINTS
    //     this.ctx.beginPath()
    //     this.ctx.arc(
    //         this.SIZE / 2 + pointInPixels * x,
    //         this.SIZE / 2 - y * pointInPixels,
    //         5,
    //         0,
    //         Math.PI * 2
    //     )
    //     this.ctx.fill()
    //     this.ctx.beginPath()
    //     this.ctx.lineWidth = 1.5
    //     this.ctx.arc(
    //         this.SIZE / 2 + pointInPixels * x,
    //         this.SIZE / 2 - y * pointInPixels,
    //         5,
    //         0,
    //         Math.PI * 2
    //     )
    //     this.ctx.stroke()
    // }
}

export default Canvas
