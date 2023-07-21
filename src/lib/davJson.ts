/**
 * json 编辑器
 */
import { Logger } from "wcex";
import BaseDav from "./davBase";
import type { WebDAVClient} from "webdav"

const log = Logger("docDav");
class DocDav extends BaseDav {
  constructor() {
    super('localhost:9528','http');
    this._createDavClient("/");
  }
  /**************** 对外接口函数  *********************** */
  // 读取文件内容
  public async readDoc_sync(dictFilePath: string) {
    try {
      return await this._davClient?.getFileContents(dictFilePath, {
        format: "text",
      });
    } catch (e) {
      // 返回默认值
      console.log("-======Err", e);
      return {
        // type: this.editorType,
        // workspace: 'default',
        // updateAt: new Date().getTime() / 1000,
      };
    }
  }
  // 保存文件
  public async writeDoc_sync(dictFilePath: string, fileData: string) {
    try {
      return await this._davClient?.putFileContents(dictFilePath, fileData);
      // putFileContents: (filename: string, data: string | BufferLike | Stream.Readable, options?: PutFileContentsOptions) => Promise<boolean>;

      // return JSON.parse(await this._davClient.getFileContents(dictFilePath, { format: 'text' }));
    } catch (e) {
      // 返回默认值
      console.log("-======Err", e);
      return {};
    }
  }

  public async readDir_sync(...args: Parameters<WebDAVClient['getDirectoryContents']>){
    try {
      return await this._davClient?.getDirectoryContents(...args)
    } catch (error) {
      console.error(error)
      return {}
    }
  }
  /**************** 私有函数  *********************** */
}
export default new DocDav();
