import { Scope } from "wcex";
import * as MONACO from "monaco-editor";
import * as _ from "lodash";

var monacoPromise = new Promise<typeof MONACO>((res) => {
    WCEX.amdloader["@wcex/monaco-fixed"]?.then((loader) => {
        (<any>loader.require).config({ paths: { vs: WCEX.npmUrl + "@wcex/monaco-fixed/min/vs" } });
        (<any>loader.require)(["vs/editor/editor.main"], function () {
            res((<any>window).monaco);
        });
    });
});

export default class extends Scope {
    editor: MONACO.editor.IStandaloneCodeEditor = <any>{};
    monaco: typeof MONACO = <any>{};

    // @props
    edValue = ""
    options = {}
    language = ""


    /**
     * @emits [exports] ["edit", "ed-before-create", "ed-created"]
     */
    async onReady() {
        let monaco = this.$noWatch(await monacoPromise)
        this.$emit("ed-before-create", { monaco });
        console.log("🚀 ~ file: monaco.ts:31 ~ extends ~ onReady ~ ed-before-create:", 'ed-before-create')
        this.initEditor(monaco);
        this.$emit("ed-created", { monaco, editor: this.editor });

        // 编辑器发生改变，延迟500毫秒，仅在最后变化时发送消息
        this.editor.onDidChangeModelContent(
            _.debounce(
                (ev) => {
                    this.$emit(
                        new CustomEvent("edit", {
                            detail: { text: this.editor.getValue() },
                        })
                    );
                },
                1000,
                { leading: false, trailing: true }
            )
        );
    }

    initEditor(monaco: typeof MONACO) {
        console.log("🚀 ~ file: monaco.ts:71 ~ extends ~ initEditor ~ this.editor:", this.$id.editor)

        this.editor = this.$noWatch(
            monaco.editor.create(
                this.$id.editorIns, // 如果为 id 定义为 editor ，外部组件使用时 root template id 也为 editor 那么 浏览器中会报警告 id 重复
                Object.assign(
                    {
                        language: this.language,
                        // minimap: { enabled: false },
                        theme: this.$Colors.mode ? "vs" : "vs-dark",
                        lineHeight: 20,
                        // fontFamily: "Abel",
                        // tabSize: 4,
                        readOnly: false,
                        scrollBeyondLastLine: false, // 为 false 时 格式化后不会滚动条顶部不会跳转到行末
                    },
                    this.options
                )
            )
        );
        this.editor.setValue(this.edValue);
    }

    onLayout() {
        requestAnimationFrame(() => {
            if (this.editor) this.editor.layout();
        });
    }

    nextTick(){
       return new Promise((resolve)=>{
        requestAnimationFrame(()=>{
            resolve('ok')
        })
       })
    }
}