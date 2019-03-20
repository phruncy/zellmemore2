export class Agent
{
    constructor (id: number, pos: number)
    {
        this._id = id;
        this._pos = pos;
        this._target = pos;
    }

    private _id: number;
    private _pos: number;
    private _target: number;

    get id() {return this._id;}
    get pos() {return this._pos;}
    get target(){return this._target;}
    set target(target: number) {this._target = target;}
    set pos(pos: number) {this._pos = pos;}
}
