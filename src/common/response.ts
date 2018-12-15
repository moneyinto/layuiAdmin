export class Response {
    private code: number = 200;
    private msg: string = '操作成功';
    private data: object | string | Array<any> = null;
    private success: boolean = true;

    public setCode(code: number) {
        this.code = code;
        return this;
    }

    public setMsg(msg: string) {
        this.msg = msg;
        return this;
    }

    public setData(data: object | string) {
        this.data = data;
        return this;
    }

    public setSuccess(success: boolean) {
        this.success = success;
        return this;
    }
}
