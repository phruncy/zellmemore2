export class Agent {
    readonly id: number;
    private _pos: number;
    private _target: number;

    constructor(id: number, pos: number) {
        this.id = id;
        this._pos = pos;
        this._target = pos;
    }

    get pos() {
        return this._pos;
    }
    get target() {
        return this._target;
    }
    set target(target: number) {
        this._target = target;
    }
    set pos(pos: number) {
        this._pos = pos;
    }
}
