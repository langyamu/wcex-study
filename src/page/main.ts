import { Scope } from "wcex";
// @ts-ignore
import Editor, { IElement, RowFlex, Command, EditorMode, IEditorData, ElementType, TableBorder } from "@hufe921/canvas-editor"


type CommandsMapItem = {
    [K in keyof Command]: {
        id: K,
        label: string,
        title: string
    }
}[keyof Command]


export default class extends Scope {


    // @ts-ignore
    editor_ins: Editor


    toolbarBtnList: CommandsMapItem[] = [
        {
            id: 'executeMode',
            label: '编辑模式',
            title: '切换编辑模式:编辑、清洁、只读',
        },
        {
            id: 'executeUndo',
            label: '撤销',
            title: '撤销',
        },
        {
            id: 'executeRedo',
            label: '重做',
            title: '重做',
        },
        {
            id: 'executeCut',
            label: '剪切',
            title: '剪切',
        },
        {
            id: 'executeCopy',
            label: '复制',
            title: '复制',
        },
        {
            id: 'executePaste',
            label: '粘贴',
            title: '粘贴',
        },
        {
            id: 'executePaste',
            label: '粘贴',
            title: '粘贴',
        },
        {
            id: 'executeInsertTable',
            label: '插入表格',
            title: '插入表格',
        },
        {
            id: 'executeTableBorderType',
            label: '表格边框',
            title: '设置表格边框',
        },
    ]




    mode = {
        index: 0,
        list: [
            {
                mode: EditorMode.EDIT, // 编辑
                label: '编辑模式',
            },
            {
                mode: EditorMode.READONLY, // 只读
                label: '只读模式',
            },
            {
                mode: EditorMode.CLEAN, // 清洁
                label: '清洁模式',
            },
        ]
    }



    onCreate(doc: DocumentFragment): void {
    }

    onReady(): void {

        console.log(this.$rootElem)

        this.$rootElem.shadowRoot?.appendChild(document.getElementById('canvas-editor-style') as Node)

        const editor_dom = this.$id.editor

        /**
         * @note
         * 顶部工具栏与目录等不在 编辑器框架内集成，包括右键菜单事件，需要手动实现，
         * 不过可以参考 canvas-editor 源码 src/main 中有 demo 示例
         */

        const editorData = {

            // 页眉
            header: [{
                value: "Header",
                rowFlex: RowFlex.CENTER
            }],
            // 实际数据
            main: [{
                value: "Hello World"
            }],
            // 页脚
            footer: [{
                value: 'canvas-editor',
                size: 12
            }],
        }


        const editor_data2: IEditorData = {
            // 页眉
            header: [{
                value: "Header",
                rowFlex: RowFlex.CENTER
            }],
            main: [
                {
                    type: ElementType.TEXT,
                    value: '第一段内容',
                    font: 'YaHei',
                    size: 16,
                    color: '#333',
                },
            ],

            footer: [
                {
                    type: ElementType.TEXT,
                    value: '© 引力 2022',
                    font: 'YaHei',
                    size: 12,
                    rowFlex: RowFlex.CENTER
                }
            ]
        }



        this.editor_ins = this.$noWatch(new Editor((editor_dom as HTMLDivElement), editor_data2, {
            // placeholder: ''
            pageNumber: {
                format: "第{pageNo}页/共{pageCount}页"
            }
        }))

        console.log(':[this.editor_ins]:', this.editor_ins)
    }

    onClick_toolbarBtn(id: CommandsMapItem['id'], item: CommandsMapItem) {

        const command = this.editor_ins.command

        switch (id) {
            case 'executeMode':
                if (this.mode.index >= this.mode.list.length - 1) {
                    this.mode.index = 0
                } else {
                    this.mode.index++
                }
                console.log("🚀 ~ file: main.ts:129 ~ extends ~ onClick_toolbarBtn ~  this.mode.index:", this.mode.index)

                command['executeMode'](this.mode.list[this.mode.index].mode)
                item.label = this.mode.list[this.mode.index].label
                break;
            case 'executeUndo': // 撤销
            case 'executeRedo': // 重做
            case 'executeCut': // 剪切
            case 'executeCopy': // 复制
            case 'executePaste': // 粘贴
                console.log("🚀 ~ file: main.ts:142 ~ extends ~ onClick_toolbarBtn ~ id:", id)
                command[id]()
                break;
            case "executeInsertTable": // 插入表格
                command['executeInsertTable'](3, 5)
                break;
            case "executeTableBorderType": // 删除边框
                command['executeTableBorderType'](TableBorder.EMPTY)
                break;
            default:
                break;
        }

    }

}