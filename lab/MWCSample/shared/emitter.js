class Emitter {
    constructor() {
        this._events = new Map();
    }

    on(eventName, handler) {
        if (typeof handler !== "function") {
            throw new TypeError("handler must be a function");
        }

        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
        }

        const handlers = this._events.get(eventName);
        handlers.add(handler);

        return () => this.off(eventName, handler);
    }

    off(eventName, handler) {
        const handlers = this._events.get(eventName);
        if (!handlers) {
            return;
        }

        handlers.delete(handler);
        if (handlers.size === 0) {
            this._events.delete(eventName);
        }
    }

    emit(eventName, ...args) {
        const handlers = this._events.get(eventName);
        if (!handlers || handlers.size === 0) {
            return;
        }

        for (const handler of [...handlers]) {
            handler(...args);
        }
    }

    clear(eventName) {
        if (typeof eventName === "undefined") {
            this._events.clear();
            return;
        }

        this._events.delete(eventName);
    }
}

const uiEmitter = new Emitter();

export default uiEmitter;
