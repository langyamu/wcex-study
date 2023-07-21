/**
 * webDav基础读写函数
 */
import { Logger } from "wcex";
import { AuthType, createClient, FileStat } from "webdav";
import type { WebDAVClient } from "webdav"

const log = Logger("dictDav");
type IListDirOptions = {
  deep?: boolean;
  fileOnly?: boolean;
  dirOnly?: boolean;
  fileMatch?: RegExp;
};

abstract class BaseDav {
  protected _host = "";
  protected _dav_root = "";
  protected _davClient: WebDAVClient | null = null;
  constructor(inHost?: string, protocol?: string) {
    if (inHost) {
      this._host = `${inHost && protocol ? protocol : 'https'}://${inHost}`
    } else {
      // 从meta中取host=
      const metaHost = document?.head
        ?.querySelector("[name=host]")
        ?.getAttribute("content");
      if (metaHost) {
        this._host = `${inHost && protocol ? protocol : 'https'}://${metaHost}`;
      }
    }

  }
  protected _createDavClient(davPath: string) {
    this._dav_root = `${this._host}/${davPath}`;
    this._davClient = createClient(this._dav_root, {
      // authType: AuthType.None,
      authType: AuthType.Digest,
      username: "yjwf91vil7c35w4t",
      password: "krbxj7ldpvw3v6lq",
      withCredentials: true,
    });
  }
  /**************** 对外接口函数  *********************** */
  /**************** 私有函数  *********************** */
}
export default BaseDav;
