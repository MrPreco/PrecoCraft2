class UpdateObservable {
    constructor() {
        this.deltaTime = 0;
        this.lastRenderTime = 0;
        this.subscriptions = [];
    }

    update() {
        let now = window.performance.now();

        if((now - this.lastRenderTime) < (1000 / this.fps)){
            return;
        }

        this.deltaTime = (now - this.lastRenderTime) / 1000;
        this.lastRenderTime = now;
        this.subscriptions.forEach(s => s(this.deltaTime));
    }

    subscribe(callback) {
        this.subscriptions.push(callback);
        return () => {
            this.subscriptions = this.subscriptions.filter(cb => cb !== callback);
        }
    }

    setFps(fps){
        this.fps = fps;
    }
}

const fps_div = document.getElementById("Fps");
let lastCountFps = window.performance.now() / 1000;

const UpdateManager = new UpdateObservable();
UpdateManager.setFps(90);
window.requestAnimationFrame(Refresh);

function Refresh() {
    UpdateManager.update();
    count_fps();
    window.requestAnimationFrame(Refresh);    
}

function count_fps() {
    let now = window.performance.now() / 1000;
    if (now - lastCountFps < 0.5) {
        return;
    }
    lastCountFps = now;
    let fps = 1.0 / UpdateManager.deltaTime;
    let absFps = Math.round(fps);
    if (fps_div) {
    fps_div.innerHTML = absFps + " fps";
    }
}