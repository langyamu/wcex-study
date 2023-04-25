import { Scope } from "wcex"
let scope = new Scope()

type TScope = typeof scope

export default function (){

    const onReady: TScope['onReady'] = ()=>{}

    return {
        onReady
    }
}